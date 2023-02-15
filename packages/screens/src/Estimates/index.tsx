/**
 * The Home Screen for RideSaver.
 * @author Elias Schablowski
 * @format
 */

import React, { useEffect, useState } from "react";
import { View, ScrollView, useDisclose } from "native-base";
import {
    ServiceMap,
    TopDrawer,
    BottomDrawer,
    LocationInput,
} from "@RideSaver/components";
import { useGetEstimatesQuery } from "@RideSaver/api/redux";
import type { location } from "@RideSaver/components/src/LocationInput";
import getCurrentLocation from "@RideSaver/components/src/LocationInput/currentLocation";

import RideEstimate from "./Estimate";
import { NumberInput } from "@RideSaver/components";
import { t } from "@lingui/macro";
import { useLingui } from "@lingui/react";

export default function Estimates() {
    const [startPoint, setStartPoint] = useState<location>(undefined);
    const [endPoint, setEndPoint] = useState<location>(undefined);
    const [riders, setRiders] = useState(1);
    const { i18n } = useLingui();
    const topBarDisclosure = useDisclose(false);
    useEffect(()=>{
        getCurrentLocation().then(setStartPoint);
    }, []);

    const estimates =
        useGetEstimatesQuery(
            {
                startPoint: {
                    latitude: startPoint?.latitude,
                    longitude: startPoint?.longitude,
                },
                endPoint: {
                    latitude: endPoint?.latitude,
                    longitude: endPoint?.longitude,
                },
                seats: riders,
            },
            { skip: !startPoint || !endPoint }
        ).data || [];

    return (
        <View display="flex" flex="1">
            <TopDrawer {...topBarDisclosure}>
                {topBarDisclosure.isOpen ? ( // Restrict rendering to only when this is open
                    <LocationInput
                        onUpdateLocation={setStartPoint}
                        location={startPoint}
                        placeholder={t(i18n)`Start Point`}
                        startWithCurrentLocation
                    />
                ) : null}
                <LocationInput
                    onUpdateLocation={setEndPoint}
                    placeholder={t(i18n)`Destination`}
                />
                <NumberInput
                    value={riders}
                    onChangeValue={setRiders}
                    placeholder={t(i18n)`Riders`}
                />
            </TopDrawer>
            <View width="full" height="full">
                <ServiceMap>
                    <ServiceMap.Route
                        waypoints={[startPoint, endPoint].filter((p) => !!p)}
                    />
                </ServiceMap>
            </View>
            <BottomDrawer>
                <ScrollView showsHorizontalScrollIndicator={false}>
                    {estimates.map((estimate) => (
                        <RideEstimate estimate={estimate} key={estimate.id} />
                    ))}
                </ScrollView>
            </BottomDrawer>
        </View>
    );
}

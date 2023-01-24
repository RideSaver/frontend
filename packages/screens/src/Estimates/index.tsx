/**
 * The Home Screen for RideSaver.
 * @author Elias Schablowski
 * @format
 */

import React, { useCallback, useState } from "react";
import { View } from "react-native";
import { Button } from "native-base";
import { t } from "@lingui/macro";
import { user, useDispatch } from "@RideSaver/store";
import {
    LocationSelector,
    NumberInput,
} from "@RideSaver/components";
import { useGetEstimatesQuery } from "@RideSaver/api/redux";
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import type { location } from "@RideSaver/components/src/LocationSelector";

import RideEstimate from "./Estimate";

export default ( {navigation} ) => {
    const dispatch = useDispatch();

    const [startPoint, setStartPoint] = useState<location>({
        latitude: 0,
        longitude: 0
    });
    const [endPoint, setEndPoint] = useState<location>({
        latitude: 0,
        longitude: 0
    });
    const [riders, setRiders] = useState(1);
    const estimates = useGetEstimatesQuery(
        {
            startPoint: {
                latitude: startPoint.latitude,
                longitude: startPoint.longitude,
            },
            endPoint: {
                latitude: endPoint.latitude,
                longitude: endPoint.longitude,
            },
            seats: riders
        },
        {
            skip: !startPoint || !endPoint,
        }
    ).data || [];

    useCallback(() => {
        dispatch(user.load());
    }, []);

    return (
        <View>
            <LocationSelector onUpdateLocation={setStartPoint} />
            <LocationSelector onUpdateLocation={setEndPoint} />
            <NumberInput
                value={riders}
                onChangeValue={setRiders}
                // label={t`Riders`}
            />
            {estimates.map((estimate) => (
                <RideEstimate estimate={estimate} key={estimate.id} />
            ))}
            <Button 
                onPress={ (  ) => navigation.navigate('Request', {
                    initalLat: 34.0907883,
                    initalLong: -117.4199699
                })}

            >/ 
            Request 
            </Button>
        </View>
        
    );
};

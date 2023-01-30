/**
 * The Home Screen for RideSaver.
 * @author Elias Schablowski
 * @format
 */

import React, { useCallback, useState } from "react";
import { View } from "react-native";
import { Button } from "native-base";
import { user, useDispatch } from "@RideSaver/store";
import { UserCurrentLocation, UserCurrentDestination } from "@RideSaver/components";
import { useGetEstimatesQuery } from "@RideSaver/api/redux";
import type { location } from "@RideSaver/components/src/LocationSelector";

import RideEstimate from "./Estimate";

export default ( {navigation} ) => {

    const dispatch = useDispatch();
    const [startPoint, setStartPoint] = useState<location>({latitude: 0, longitude: 0});
    const [endPoint, setEndPoint] = useState<location>({latitude: 0, longitude: 0});
    const [riders, setRiders] = useState(1);

    const estimates = useGetEstimatesQuery(
        { 
            startPoint: { latitude: startPoint.latitude,  longitude: startPoint.longitude, },
            endPoint: {  latitude: endPoint.latitude, longitude: endPoint.longitude, },
            seats: riders },{ skip: !startPoint || !endPoint, }
        ).data || [];
        
    useCallback(() => { dispatch(user.load());}, []);

    return (
        <View>
            <UserCurrentLocation /* Gets the user current-location through location-services. TODO: Add an option to manually change pickup location. */
                onUpdateLocation={setStartPoint}
            />

            <UserCurrentDestination /* Allows the user to input their physical address & geocodes it into lat/long - also controls the seats counter. */
                onUpdateLocation={setEndPoint}
                onUpdateSeats={setRiders}
                seats={riders}
            />

            {estimates.map((estimate) => (
                <RideEstimate 
                    estimate={estimate} 
                    key={estimate.id} 
                />
            ))}

            <Button mt="5" onPress={() => navigation.navigate("Request")} > 
                Request Ride 
            </Button>
        </View>
        
    );
};

/**
 * The Home Screen for RideSaver.
 * @author Elias Schablowski
 * @format
 */

import React, { useCallback, useState } from "react";
import { View } from "react-native";
import { Button } from "native-base";
import { user, useDispatch } from "@RideSaver/store";
import { LocationSelector, NumberInput, UserCurrentLocation } from "@RideSaver/components";
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
            <UserCurrentLocation
                onUpdateLocation={setStartPoint}
            />

            

            <LocationSelector 
                onUpdateLocation={setEndPoint} 
            />
            <NumberInput 
                value={riders} 
                onChangeValue={setRiders}
            />
    
            {estimates.map((estimate) => (
                <RideEstimate 
                    estimate={estimate} 
                    key={estimate.id} 
                />
            ))}

            <Button mt="5" onPress={() => navigation.navigate("Request")} > 
                Request Vehicle 
            </Button>
        </View>
        
    );
};

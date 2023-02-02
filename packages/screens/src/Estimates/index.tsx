/**
 * The Home Screen for RideSaver.
 * @author Elias Schablowski
 * @format
 */

import React, { useCallback, useState } from "react";
import { Button, View, ZStack } from "native-base";
import { user, useDispatch } from "@RideSaver/store";
import { UserCurrentLocation, UserCurrentDestination, ServiceMap } from "@RideSaver/components";
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
        <View width="100%" height="100%">
            <ZStack width="100%" height="100%">
                
                <View flex="1" width="100%" height="100%" borderWidth="1">
                    <ServiceMap/>
                </View>

                <View flex="1" width="100%" height="100%">
                    <View flex="1" flexDirection="column" alignItems="center" width="100%" mt="10">
                    
                            <UserCurrentLocation /* Gets the user current-location through location-services. TODO: Add an option to manually change pickup location. */
                                onUpdateLocation={setStartPoint}
                            />

                            <UserCurrentDestination /* Allows the user to input their physical address & geocodes it into lat/long - also controls the seats counter. */
                                onUpdateLocation={setEndPoint}
                                onUpdateSeats={setRiders}
                                seats={riders}
                            />
                    </View>
                    <View flex="3" flexDirection="column" width="100%" alignItems="center" justifyContent="center" height="100%">
                        {estimates.map((estimate) => 
                            (
                                <Button 
                                    mt="3" mb="5" 
                                    minWidth="100%" minHeight="10%" 
                                    alignItems="center" justifyContent="center"
                                    backgroundColor="muted.200" 
                                    opacity="80%"
                                    borderWidth="1"
                                    borderLeftWidth="0"
                                    borderRightWidth="0"
                                    _hover={  {backgroundColor: "muted.300"} }
                                    >
                                        <RideEstimate 
                                            estimate={estimate}  
                                            key={estimate.id}
                                        />
                                </Button>
                            )      
                        )}

                        <Button mt="5" onPress={() => navigation.navigate("Request")} > 
                            Request Ride 
                        </Button>
                    </View>
                </View>
            </ZStack>
        </View>
    );
};

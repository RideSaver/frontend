/**
 * The Home Screen for RideSaver.
 * @author Elias Schablowski
 * @format
 */

import React, { useCallback, useState } from "react";
import { Button, View, ZStack, VStack } from "native-base";
import { user, useDispatch } from "@RideSaver/store";
import { ServiceMap } from "@RideSaver/components";
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
        <View display="flex" flex="1">
            <ZStack flex="1" flexDirection="column" justifyContent="flex-end" overflow="hidden">
                <View flex="3" width="100%" height="100%">
                    <ServiceMap 
                        onUpdateLocation={setStartPoint} 
                        onUpdateDestination={setEndPoint} 
                        onUpdateSeats={setRiders} 
                        seats={riders}   
                    />
                </View>
                <View flex="1" width="100%" height={-30}>
                    <View>
                        {estimates.map((estimate) => 
                            (
                                <Button 
                                    mt="3" mb="3" 
                                    minWidth="100%" minHeight="10%" 
                                    alignItems="center" justifyContent="center"
                                    backgroundColor="muted.200" 
                                    opacity="90%"
                                    borderWidth="1"
                                    borderLeftWidth="0"
                                    borderRightWidth="0"
                                    _hover={ {backgroundColor: "muted.300"} }
                                    >
                                        <RideEstimate 
                                            estimate={estimate}  
                                            key={estimate.id}
                                        />
                                </Button>
                            )      
                        )}
                    </View>
                    <View>
                        <Button 
                        borderTopRadius={20} 
                        mt={5}
                        shadow={9}
                        backgroundColor="blueGray.900"
                        _text={ {fontFamily:"roboto", fontWeight:"extrabold", fontSize:"md"} }
                        _hover={ {backgroundColor:"blueGray.800"}}
                        onPress={() => navigation.navigate("Request")} > 
                           Confirm Ride
                        </Button>
                    </View>
                </View>
            </ZStack>
        </View>
    );
};

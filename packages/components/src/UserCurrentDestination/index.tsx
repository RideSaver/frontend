import React, { useState } from 'react';
import { NumberInput } from "../index"
import { IInputProps, Input, View, Button } from "native-base";
import * as Location from 'expo-location';

Location.setGoogleApiKey("AIzaSyA3NFMJxqPN_q7JU_ctLAoi4eUaWxCcYtk");

export type location = {
    latitude: number;
    longitude: number;
};

interface Props extends Partial<IInputProps> {
    seats: number;
    onUpdateSeats: (seats : number) => void;
    onUpdateLocation: (userLocation: location) => void;
}

export default (options: Props) => {

    const [userAddress, setUserAddress] = useState("");
    const [riders, setRiders] = useState(options.seats);
    const [userLocation, setUserLocation] = useState<location>({latitude: 0, longitude: 0});

    const handleTextChange = (text : string) => { setUserAddress(text); }
    
    const changeHandler = (value : number) => { 
        setRiders(value);
        options.onUpdateSeats(riders)
    }
    
    const clickHandler = async () => {
            const location = await Location.geocodeAsync(userAddress, { 
                useGoogleMaps: true 
            });
            setUserLocation({ 
                latitude: location[0].latitude, 
                longitude: location[0].longitude 
            });
            options.onUpdateLocation({ 
                latitude: userLocation.latitude, 
                longitude: userLocation.longitude 
            });
    }

    return(
        <View>
            <Input 
                onChangeText={handleTextChange}
            />

            <NumberInput 
                value={riders} 
                onChangeValue={changeHandler}
            />

            <Button onPress={clickHandler}> 
                Display Available Rides 
            </Button>
        </View>
    );
};


import React, { useState, useEffect } from 'react';
import { Container } from "native-base";
import * as Location from 'expo-location';

export type location = {
    latitude: number;
    longitude: number;
};

interface Props extends Partial<IInputProps> {
    userLocation?: location;
    onUpdateLocation: (userLocation: location) => void;
}

export default (options: Props) => {

    const [userLocation, setUserLocation] = useState(null);
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const [location, setLocation] = useState(null);
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const [errorMessage, setErrorMessage] = useState("");

    useEffect(() => {
      (async () => {
        const { status } = await Location.requestForegroundPermissionsAsync();
        if(status !== "granted")
        {
            setErrorMessage("Permission to access current location denied!");
            return;
        }

        const location = await Location.getCurrentPositionAsync({});
        setLocation(location);

        options.onUpdateLocation({ 
            latitude: location.coords.latitude, 
            longitude: location.coords.longitude 
        });

        setUserLocation({
            latitude: location.coords.latitude, 
            longitude: location.coords.longitude
        });
        
      }) ();
    }, []);
  
    return (
            <Container value={userLocation}></Container>
    );
};

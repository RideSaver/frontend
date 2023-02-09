import { useEffect, useState } from "react";
import * as Location from "expo-location";

export type location = { latitude: number; longitude: number };

export default async function useCurrentLocation(
    active: boolean,
    setLocation?: (location: location) => void
) {
    useEffect(() => {
        let int: ReturnType<typeof setInterval>;
        if(!active) {
            if(int) clearInterval(int);
            int = undefined;
            return;
        }
        int = setInterval(async () => {
            const { status } =
                await Location.requestForegroundPermissionsAsync();
            if (status !== "granted")
                throw new Error("Permission not granted for current location");
            const currentLocation = await Location.getCurrentPositionAsync();
            setLocation({
                latitude: currentLocation.coords.latitude,
                longitude: currentLocation.coords.longitude,
            });
        }, 10000);
        return () => clearInterval(int);
    }, [setLocation]);

    return location;
}

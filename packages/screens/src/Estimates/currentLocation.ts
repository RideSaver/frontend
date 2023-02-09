import { useEffect } from "react";
import Location from "expo-location";

export default function useCurrentLocation(setLocation) {
    useEffect(() => {
        (async () => {
            const { status } =
                await Location.requestForegroundPermissionsAsync();
            if (status !== "granted") {
                return;
            }

            const location = await Location.getCurrentPositionAsync({});

            setLocation({
                latitude: location.coords.latitude,
                longitude: location.coords.longitude,
            });
        })();
    }, []);
}

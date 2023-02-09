import { useEffect } from "react";
import * as Location from "expo-location";

export type location = { latitude: number; longitude: number };

export default async function useCurrentLocation(
    active: boolean,
    setLocation?: (location: location) => void
) {
    useEffect(() => {
        console.log(active);
        const runner = new IntervalRunner(setLocation);
        if (!active) {
            runner.cancel();
            return;
        }
        runner.run();
        return () => runner.cancel();
    }, [active, setLocation]);
}

class IntervalRunner {
    int: ReturnType<typeof setTimeout>;
    setLocation?: (location: location) => void;
    constructor(setLocation?: (location: location) => void) {
        this.setLocation = setLocation;
    }
    run() {
        return setTimeout(async () => {
            const { granted } =
                await Location.requestForegroundPermissionsAsync();
            console.log(granted);
            if (!granted)
                throw new Error("Permission not granted for current location");
            try {
                const currentLocation =
                    await Location.getCurrentPositionAsync();
                console.log(currentLocation);
                this.setLocation({
                    latitude: currentLocation.coords.latitude,
                    longitude: currentLocation.coords.longitude,
                });
            } catch (error) {
                console.error(error);
            }
            this.int = this.run();
        }, 10000);
    }
    cancel() {
        this.int && clearTimeout(this.int);
        this.int = undefined;
    }
}

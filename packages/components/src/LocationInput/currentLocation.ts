import * as Location from "expo-location";

export type location = { latitude: number; longitude: number };

export default async function getCurrentLocation() {
    const { granted } = await Location.requestForegroundPermissionsAsync();
    console.log(granted);
    if (!granted)
        throw new Error("Permission not granted for current location");
    try {
        const currentLocation = await Location.getCurrentPositionAsync();
        console.log(currentLocation);
        return {
            latitude: currentLocation.coords.latitude,
            longitude: currentLocation.coords.longitude,
        };
    } catch (error) {
        console.error(error);
    }
}

/**
 * This is a "fast" precurser to the getLocation. getLocationFast is faster (relatively speaking - it can still take a couple seconds), but less accurate/outdated compared to getCurrentLocation.
 * @returns The last known location
 */
export async function getCurrentLocationFast() {
    const { granted } = await Location.requestForegroundPermissionsAsync();
    console.log(granted);
    if (!granted)
        throw new Error("Permission not granted for current location");
    try {
        const currentLocation = await Location.getLastKnownPositionAsync();
        console.log(currentLocation);
        if(!currentLocation) return;
        return {
            latitude: currentLocation.coords.latitude,
            longitude: currentLocation.coords.longitude,
        };
    } catch (error) {
        console.error(error);
    }
}

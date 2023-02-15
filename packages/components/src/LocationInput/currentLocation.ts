import * as Location from "expo-location";

export type location = { latitude: number; longitude: number };

export default async function getCurrentLocation() {
    console.time("Current Location Permissions");
    const { granted } = await Location.requestForegroundPermissionsAsync();
    console.timeEnd("Current Location Permissions");
    if (!granted)
        throw new Error("Permission not granted for current location");
    try {
        console.time("Current Location Search");
        const currentLocation = await Location.getCurrentPositionAsync();
        console.timeEnd("Current Location Search");
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
    if (!granted)
        throw new Error("Permission not granted for current location");
    try {
        const currentLocation = await Location.getLastKnownPositionAsync();
        if(!currentLocation) return;
        return {
            latitude: currentLocation.coords.latitude,
            longitude: currentLocation.coords.longitude,
        };
    } catch (error) {
        console.error(error);
    }
}


export async function warmup(){
    console.info("Getting current location.");
    await getCurrentLocation();
    console.info("Got current location, YAY!");
};

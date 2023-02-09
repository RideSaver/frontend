import * as Location from 'expo-location';

export default async function geoCode(address: string){
    return await Location.geocodeAsync(address, { 
        useGoogleMaps: true 
    });
}

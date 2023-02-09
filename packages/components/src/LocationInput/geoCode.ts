import GeocodingService from "@mapbox/mapbox-sdk/services/geocoding";
import { useEffect, useState } from "react";
import { useLingui } from "@lingui/react";

const geocodingClient = GeocodingService({
    accessToken: process.env.__MAPBOX_API_TOKEN__,
});

export interface Location {
    name?: string;
    address: string;
    latitude: number;
    longitude: number;
}

export default function useGeoCode(
    address: string,
    prox?: {
        latitude: number;
        longitude: number;
    }
) {
    const { i18n } = useLingui();
    type GeoCodeError = ReturnType<
        typeof geocodingClient.forwardGeocode
    >["emitter"]["error"];
    const [locations, setLocations] = useState<{
        error?: GeoCodeError;
        locations: Location[];
    }>({
        error: undefined,
        locations: [],
    });
    useEffect(() => {
        geocodingClient
            .forwardGeocode({
                query: address,
                autocomplete: true,
                language: i18n.locales as string[],
                proximity: prox ? [prox.longitude, prox.latitude] : undefined,
            })
            .send()
            .then(({ body: locations }) => {
                setLocations({
                    ...locations,
                    locations: locations.features.map((feat) => ({
                        longitude: feat.geometry.coordinates[0],
                        latitude: feat.geometry.coordinates[1],
                        name: feat.place_name,
                        address: feat.address,
                    })),
                    error: undefined,
                });
            })
            .catch((error) => {
                setLocations({
                    ...locations,
                    error,
                });
            });
    }, [prox, address]);
    return locations;
}
import GeocodingService from "@mapbox/mapbox-sdk/services/geocoding";
import React, { useEffect, useState, useMemo } from "react";
import { useLingui } from "@lingui/react";

const geocodingClient = GeocodingService({
    accessToken: "pk.eyJ1Ijoiam9obmludGhldXMiLCJhIjoiY2xibmU1dGMzMHFvZzNvb3NhNjhoMzJ5NCJ9.1YGZAf1llc75Jc6LT3Ooaw"
});

export interface Location {
    name?: string;
    address: string;
    latitude: number;
    longitude: number;
}

const cache: Map<
    [
        string,
        {
            latitude: number;
            longitude: number;
        }
    ],
    Location[]
> = new Map();

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
        if (cache.has([address, prox]))
            return setLocations({
                ...locations,
                error: undefined,
                locations: cache.get([address, prox]),
            });
        console.log(prox);
        geocodingClient
            .forwardGeocode({
                query: address,
                autocomplete: true,
                language: i18n.locales as string[],
                proximity: prox ? [prox.longitude, prox.latitude] : undefined,
            })
            .send()
            .then(({ body: locations }) => {
                cache.set(
                    [address, prox],
                    locations.features.map((feat) => ({
                        longitude: feat.geometry.coordinates[0],
                        latitude: feat.geometry.coordinates[1],
                        name: feat.place_name,
                        address: feat.address,
                    }))
                );
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

export function useReverseGeoCode(location: {
    latitude: number;
    longitude: number;
}) {
    type GeoCodeError = ReturnType<
        typeof geocodingClient.forwardGeocode
    >["emitter"]["error"];
    const [address, setAddress] = useState<{
        error?: GeoCodeError;
        address: string;
    }>({
        error: undefined,
        address: "",
    });
    useEffect(() => {
        if (
            typeof location == "object" &&
            "latitude" in location &&
            "longitude" in location
        )
            geocodingClient
                .reverseGeocode(
                    location as unknown as Parameters<
                        typeof geocodingClient.reverseGeocode
                    >[0]
                )
                .send()
                .then(({ body: location }) => {
                    setAddress({
                        ...location,
                        address: (
                            location.features[0] as unknown as { name: string }
                        ).name,
                        error: undefined,
                    });
                })
                .catch((error) => {
                    setAddress({
                        ...address,
                        error,
                    });
                });
    }, [location]);
    return address;
}

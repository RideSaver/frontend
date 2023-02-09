import React, { useMemo } from "react";
import { useRef, useCallback, useState } from "react";
import { View, ZStack } from "native-base";
import MapBox, { MapRef, Marker } from "react-map-gl";
import PropTypes, { InferProps } from "prop-types";

const MAPBOX_TOKEN =
    "pk.eyJ1Ijoiam9obmludGhldXMiLCJhIjoiY2xibmU1dGMzMHFvZzNvb3NhNjhoMzJ5NCJ9.1YGZAf1llc75Jc6LT3Ooaw";

const markerIcon = "https://img.icons8.com/color/48/null/place-marker--v1.png";

export type location = {
    latitude: number;
    longitude: number;
};

type viewState = {
    latitude: number;
    longitude: number;
    zoom: number;
    bearing: number;
    pitch: number;
};

export default function Map({ children }: InferProps<typeof Map.propTypes>) {
    const mapRef = useRef<MapRef>();

    const [viewState, setViewState] = useState<viewState>({
        /* Initial map view state */ latitude: 37.7751,
        longitude: -122.4193,
        zoom: 11,
        bearing: 0,
        pitch: 0,
    });

    return (
        <MapBox
            {...viewState}
            ref={mapRef}
            onMove={(evt) => {
                setViewState(evt.viewState);
            }}
            mapStyle="mapbox://styles/mapbox/light-v11"
            mapboxAccessToken={MAPBOX_TOKEN}
            attributionControl={false}
            interactive={false}
        >
            {children}
        </MapBox>
    );
}

Map.propTypes = {
    children: PropTypes.node,
};

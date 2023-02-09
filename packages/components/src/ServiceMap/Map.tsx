import React, { useRef, useState } from "react";
import MapBox, { MapRef } from "react-map-gl";
import PropTypes, { InferProps } from "prop-types";

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

    const [viewState, setViewState] = useState<viewState>({
        /* Initial map view state */ latitude: 37.7751,
        longitude: -122.4193,
        zoom: 11,
        bearing: 0,
        pitch: 0,
    });
    console.log(process.env.__MAPBOX_API_TOKEN__);

    return (
        <MapBox
            {...viewState}
            onMove={(evt) => {
                setViewState(evt.viewState);
            }}
            mapStyle="mapbox://styles/mapbox/light-v11"
            mapboxAccessToken={process.env.__MAPBOX_API_TOKEN__}
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

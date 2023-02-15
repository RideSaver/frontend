import React, { useState } from "react";
import MapBox from "react-map-gl";
import { useColorModeValue } from "native-base";
import PropTypes, { InferProps } from "prop-types";

export default function Map({ children }: InferProps<typeof Map.propTypes>) {
    const mapStyle = useColorModeValue(
        "mapbox://styles/mapbox/light-v11?optimize=true",
        "mapbox://styles/mapbox/dark-v11?optimize=true"
    );

    const [viewState, setViewState] = useState({
        zoom: 1,
        bearing: 0,
        pitch: 0,
    });

    return (
        <MapBox
            {...viewState}
            onMove={(evt) => {
                setViewState(evt.viewState);
            }}
            dragPan
            mapStyle={mapStyle}
            mapboxAccessToken={process.env.__MAPBOX_API_TOKEN__}
            // projection="globe"
        >
            {children}
        </MapBox>
    );
}

Map.propTypes = {
    children: PropTypes.node,
};

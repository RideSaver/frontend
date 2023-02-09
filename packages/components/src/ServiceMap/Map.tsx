import React from "react";
import MapBox from "react-map-gl";
import { useColorModeValue } from "native-base";
import PropTypes, { InferProps } from "prop-types";

export default function Map({ children }: InferProps<typeof Map.propTypes>) {
    const mapStyle = useColorModeValue("mapbox://styles/mapbox/light-v11", "mapbox://styles/mapbox/dark-v11");
    return (
        <MapBox
            // {...viewState}
            // onMove={(evt) => {
            //     setViewState(evt.viewState);
            // }}
            dragPan
            mapStyle={mapStyle}
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

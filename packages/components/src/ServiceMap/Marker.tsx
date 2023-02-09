import React, { useMemo } from "react";
import { Marker as MapBoxMarker } from "react-map-gl";
import PropTypes, { InferProps } from "prop-types";
import { Image } from "native-base";

export default function Marker({
    latitude,
    longitude,
}: InferProps<typeof Marker.propTypes>) {
    return useMemo(
        () => (
            <MapBoxMarker longitude={longitude} latitude={latitude}>
                <Image
                    source={{
                        uri: "https://img.icons8.com/color/48/null/place-marker--v1.png",
                    }}
                />
            </MapBoxMarker>
        ),
        [latitude, longitude]
    );
}

Marker.propTypes = {
    latitude: PropTypes.number.isRequired,
    longitude: PropTypes.number.isRequired,
};

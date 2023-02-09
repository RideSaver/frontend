import React, { useMemo } from "react";
import { Marker as MapBoxMarker } from "react-map-gl";
import PropTypes, { InferProps } from "prop-types";

export default function Marker({ latitude, longitude }: InferProps<typeof Marker.propTypes>) {
    return useMemo(
        () => (
            <MapBoxMarker
                longitude={longitude}
                latitude={latitude}
            />
        ),
        [latitude, longitude]
    );
}

Marker.propTypes = {
    latitude: PropTypes.number.isRequired,
    longitude: PropTypes.number.isRequired,
};

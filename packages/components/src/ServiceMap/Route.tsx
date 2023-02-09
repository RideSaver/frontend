import React from "react";
import PropTypes, { InferProps } from "prop-types";
import Marker from "./Marker";

export default function Route({
    waypoints,
}: InferProps<typeof Route.propTypes>) {
    return (
        <>
            {waypoints.map((location) => (
                <Marker
                    latitude={location.latitude}
                    longitude={location.longitude}
                />
            ))}
        </>
    );
}

Route.propTypes = {
    waypoints: PropTypes.arrayOf(
        PropTypes.shape({
            latitude: PropTypes.number.isRequired,
            longitude: PropTypes.number.isRequired,
        })
    ),
};

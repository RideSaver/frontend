import React from "react";
import PropTypes, { InferProps } from "prop-types";
import { useMap } from "react-map-gl";
import Marker from "./Marker";

export default function Route({
    waypoints,
}: InferProps<typeof Route.propTypes>) {
    const { current: map } = useMap();
    const lats = waypoints
        .filter((w) => typeof w !== "undefined")
        .map((w) => w.latitude);
    const longs = waypoints
        .filter((w) => typeof w !== "undefined")
        .map((w) => w.longitude);
    const bbox: mapboxgl.LngLatBoundsLike = [
        [Math.min(...longs), Math.min(...lats)],
        [Math.max(...longs), Math.max(...lats)],
    ];
    console.log(map);
    !!map &&
        lats.length > 0 &&
        longs.length > 0 &&
        map.fitBounds(bbox, {
            padding: { top: 10, bottom: 25, left: 15, right: 5 },
            maxZoom: 15
        });
    return (
        <>
            {waypoints.map((location, index) => (
                <Marker
                    latitude={location.latitude}
                    longitude={location.longitude}
                    key={index}
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

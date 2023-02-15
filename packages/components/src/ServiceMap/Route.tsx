import React from "react";
import PropTypes, { InferProps } from "prop-types";
import { Source, Layer, useMap } from "react-map-gl";
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
            maxZoom: 15,
        });
    const geojson = {
        type: "FeatureCollection",
        features: [
            {
                type: "Feature",
                properties: {},
                geometry: {
                    coordinates: waypoints.map((loc) => [
                        loc.longitude,
                        loc.latitude,
                    ]),
                    type: "LineString",
                },
            },
        ],
    };
    return (
        <>
            {/* eslint-disable-next-line @typescript-eslint/no-explicit-any */}
            <Source type="geojson" data={geojson as any}>
                <Layer
                    type="line"
                    source="line"
                    id="line-dashed"
                    paint={{
                        "line-color": "yellow",
                        "line-width": 6,
                        "line-dasharray": [0, 4, 3],
                    }}
                />
            </Source>
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

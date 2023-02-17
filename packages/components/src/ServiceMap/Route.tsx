import React, { useState, useEffect, useMemo } from "react";
import PropTypes, { InferProps } from "prop-types";
import { Source, Layer, useMap } from "react-map-gl";
import Marker from "./Marker";


const api_key = ""

export default function Route({
    waypoints,
}: InferProps<typeof Route.propTypes>) {

    const { current: map } = useMap();
    const lats = waypoints.filter((w) => typeof w !== "undefined").map((w) => w.latitude);
    const longs = waypoints.filter((w) => typeof w !== "undefined").map((w) => w.longitude);
        
    const bbox: mapboxgl.LngLatBoundsLike = [
        [Math.min(...longs), Math.min(...lats)],
        [Math.max(...longs), Math.max(...lats)],
    ];

    console.log(map);
    !!map && lats.length > 0 && longs.length > 0 && map.fitBounds(bbox, {
        padding: { top: 10, bottom: 25, left: 20, right: 15 },
        maxZoom: 20,
    });

    const [routeValues, setRouteValues] = useState<number[]>(null);
    useEffect( () => {
        fetch(
            `https://api.mapbox.com/directions/v5/mapbox/driving/${longs[0]},${lats[0]};${longs[1]},${lats[1]}?geometries=geojson&access_token=${api_key}`,
            { method: 'GET' }
        )
        .then(response => response.json())
        .then(json => setRouteValues(json.routes[0].geometry.coordinates))
        .catch(err => console.error('Could not load data', err)); // eslint-disable-line
        
        console.log("RoutesValues:"+ routeValues);
    }, [lats[1], longs[1]]);

    const layerData = useMemo(() => {
        return({
        type: "FeatureCollection",
        features: [
            {
                type: "Feature",
                properties: { },
                geometry: {
                    coordinates: routeValues,
                    type: "LineString",
                },
            },
        ],
    })}, [routeValues]);

   return (
        <>
            {/* eslint-disable-next-line @typescript-eslint/no-explicit-any */}
            <Source type="geojson" data={layerData as any}>
                <Layer
                    type="line"
                    source="line"
                    id="line-dashed"
                    layout={{
                        'line-join': 'round',
                        'line-cap': 'butt',
                    }}
                    paint={{
                        'line-pattern': "",
                        'line-color': '#3887be',
                        'line-width': 5,
                        'line-opacity': 1.00,
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

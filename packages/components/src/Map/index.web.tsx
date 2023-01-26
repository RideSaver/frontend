import "mapbox-gl/dist/mapbox-gl.css";
import React from "react";
import ReactMapboxGl, { Marker as MapBoxMarker } from "react-mapbox-gl";

const MapboxMap = ReactMapboxGl({
    accessToken:
        "pk.eyJ1Ijoiam9obmludGhldXMiLCJhIjoiY2xibmU1dGMzMHFvZzNvb3NhNjhoMzJ5NCJ9.1YGZAf1llc75Jc6LT3Ooaw",
});

const Map: React.Component & {
    Marker: React.Component
} = ({ children }) => {
    return (
        <MapboxMap
            style="mapbox://styles/mapbox/streets-v9"
            containerStyle={{ height: "100vh", width: "100vw" }}
        >
            {children}
        </MapboxMap>
    );
}

Map.Marker = ({ latitude, longitude, imageURL, ...props }) => {
    return (
        <MapBoxMarker
            longitude={longitude}
            latitude={latitude}
            anchor="bottom"
            {...props}
        >
            <img src={imageURL} />
        </MapBoxMarker>
    );
}

export default Map;

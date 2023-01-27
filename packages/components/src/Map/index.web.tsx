import "mapbox-gl/dist/mapbox-gl.css";
import React from "react";
import ReactMapboxGl, { Marker as MapBoxMarker } from "react-mapbox-gl";

const MapboxMap = ReactMapboxGl({
    accessToken:
        "pk.eyJ1Ijoiam9obmludGhldXMiLCJhIjoiY2xibmU1dGMzMHFvZzNvb3NhNjhoMzJ5NCJ9.1YGZAf1llc75Jc6LT3Ooaw",
});

const Map: React.Component & { Marker: React.Component
    
} = ({ children }) => {
    return (
        <MapboxMap
            style="mapbox://styles/mapbox/streets-v9"
            containerStyle={{ height: "100vh", width: "100vw" }}
            initialViewState={{longitude: 34.1180416, latitude: -117.4208512, zoom: 14}}
            animationMode="flyTo"
            centerCoordinate={[34.1180416, -117.4208512]}
            animationDuration={1100}
        >
            {children}
        </MapboxMap>
    );
}

Map.Marker = ({ latitude, longitude, imageURL, ...props }) => {
    return (
        <Marker 
            longitude={longitude}
            latitude={latitude}
            anchor="bottom"
            {...props}
        >
            <img src={imageURL} />
        </Marker>
    );
}

export default Map;

import "mapbox-gl/dist/mapbox-gl.css";
import React from "react";
import ReactMapboxGl, { Layer, Feature } from "react-mapbox-gl";

const Map = ReactMapboxGl({
    accessToken:
        "pk.eyJ1Ijoiam9obmludGhldXMiLCJhIjoiY2xibmU1dGMzMHFvZzNvb3NhNjhoMzJ5NCJ9.1YGZAf1llc75Jc6LT3Ooaw",
});

export default ({ latitude, longitude }) => {
    return (
        <Map
            style="mapbox://styles/mapbox/streets-v9"
            containerStyle={{ height: "100vh", width: "100vw" }}
        >
            <Layer
                type="symbol"
                id="marker"
                layout={{ "icon-image": "marker-15" }}
            >
                <Feature coordinates={[latitude, longitude]} />
            </Layer>
        </Map>
    );
};

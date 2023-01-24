/**
 * Exports the ride-request MapBox component with the current ride waypoints.
 * @author John Hanna
 * @format
 */


import React from "react";
import { Map } from "@RideSaver/components";

export default ({startLat = 34.0907883 , startLong = -117.4199699, endLat, endLong})  => {

    return (
        <Map latitude={startLat} longitude={startLong}></Map>
    );
};

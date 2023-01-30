/**
 * Exports the ride-request MapBox component with the current ride waypoints.
 * @author John Hanna
 * @format
 */

import React from "react";
import { Map } from "@RideSaver/components";

export default ({startLat , startLong, endLat, endLong})  => {

    return (
        <Map 
            startLat={startLat} 
            startLong={startLong}
            endLat={endLat}
            endLong={endLong}
        />

    );
};

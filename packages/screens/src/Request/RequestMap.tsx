/**
 * Exports the ride-request MapBox component with the current ride waypoints.
 * @author John Hanna
 * @format
 */


import React from "react";
import { Map } from "@RideSaver/components";

export default ({
    startLocation,
    endLocation,
    driverLocation
})  => {

    return (
        <Map>
            {/* <Map.Marker latitude={startLocation.latitude} longitude={startLocation.longitude} />
            <Map.Marker latitude={endLocation.latitude} longitude={endLocation.longitude} /> */}
            <Map.Marker latitude={driverLocation.latitude} longitude={driverLocation.longitude} />
        </Map>
    );
};

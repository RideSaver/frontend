import React, { useRef, useEffect, useState} from 'react';
import MapboxGL from '@rnmapbox/maps';
import { View } from 'native-base';

MapboxGL.setAccessToken(
    "pk.eyJ1Ijoiam9obmludGhldXMiLCJhIjoiY2xibmU1dGMzMHFvZzNvb3NhNjhoMzJ5NCJ9.1YGZAf1llc75Jc6LT3Ooaw"
);


export default () => {  

    const [centerCoords, setCenterCoords] = useState([-73.990593, 40.740121]);

    const mapViewRef = useRef<MapboxGL.MapView>(null);
    const mapCameraRef = useRef<MapboxGL.Camera>(null);
  
    useEffect(() => {
        mapCameraRef.current?.setCamera({
                    centerCoordinate: centerCoords,
                    zoomLevel: 15 
        });
   }, [mapCameraRef]);

    return (
        <MapboxGL.MapView
          ref={mapViewRef}
        >
            <MapboxGL.Camera
            ref={mapCameraRef} 
            centerCoordinate= {centerCoords}
            zoomLevel= {15} 
            />

        </MapboxGL.MapView>
    );
};
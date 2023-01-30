import React, { useState, useEffect, FC }  from 'react';
import MapboxGL from '@rnmapbox/maps';
import { Alert, View } from 'native-base';
import { onSortOptions } from '@RideSaver/components';;

MapboxGL.setAccessToken(
    "pk.eyJ1Ijoiam9obmludGhldXMiLCJhIjoiY2xibmU1dGMzMHFvZzNvb3NhNjhoMzJ5NCJ9.1YGZAf1llc75Jc6LT3Ooaw"
);


export default () => {
  
    return (
            <MapboxGL.MapView>
                <MapboxGL.Camera
                    centerCoordinate={[-73.984638, 40.759211]}
                    zoomLevel={12}
                    animationDuration={0}
                />
            </MapboxGL.MapView>
        );
  };
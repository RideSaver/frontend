import { IInputProps } from 'native-base';
import React from 'react';
import {useRef, useCallback, useState} from 'react';
import Map, { MapRef } from 'react-map-gl'
import UserCurrentDestination from '../UserCurrentDestination';

const MAPBOX_TOKEN = "pk.eyJ1Ijoiam9obmludGhldXMiLCJhIjoiY2xibmU1dGMzMHFvZzNvb3NhNjhoMzJ5NCJ9.1YGZAf1llc75Jc6LT3Ooaw"

export type location = {
    latitude: number;
    longitude: number;
};

export default () => { 

    const mapRef = useRef<MapRef>();
    const [userDestination, setUserDestination] = useState<location>({latitude: 0, longitude: 0});
    const [viewState, setViewState] = useState({
        latitude: 37.7751,
        longitude: -122.4193,
        zoom: 11,
        bearing: 0,
        pitch: 0
    })

    const onSelectCity = useCallback(({longitude, latitude}) => {
        mapRef.current?.flyTo({center: [longitude, latitude], duration: 2000});
      }, []);

    return( 
        <Map
        {...viewState}
        ref={mapRef}
        onMove={evt => setViewState(evt.viewState)}

        mapStyle="mapbox://styles/mapbox/light-v11"
        mapboxAccessToken={MAPBOX_TOKEN}
        attributionControl={false}
        />
  );
}
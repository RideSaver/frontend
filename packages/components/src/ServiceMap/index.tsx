import React, { useMemo } from 'react';
import {useRef, useCallback, useState} from 'react';
import { View, ZStack } from 'native-base';
import Map, { MapRef, Marker } from 'react-map-gl'
import UserCurrentDestination from '../UserCurrentDestination';
import UserCurrentLocation from '../UserCurrentLocation';

const MAPBOX_TOKEN = "pk.eyJ1Ijoiam9obmludGhldXMiLCJhIjoiY2xibmU1dGMzMHFvZzNvb3NhNjhoMzJ5NCJ9.1YGZAf1llc75Jc6LT3Ooaw"

const markerIcon = "https://img.icons8.com/color/48/null/place-marker--v1.png";

interface Props {
    userLocation?: location;
    userDestination?: location
    seats?: number;
    onUpdateLocation: (userLocation: location) => void;
    onUpdateDestination: (userDestination: location) => void;
    onUpdateSeats?: (seats : number) => void;
};

export type location = {
    latitude: number;
    longitude: number;
};

type viewState = {
    latitude: number,
    longitude: number,
    zoom: number,
    bearing: number,
    pitch: number
}

export default (options: Props) => { 

    const mapRef = useRef<MapRef>();
    const [destinationMarker, setDestinationMarker] = useState<location>({longitude: 0, latitude: 0});

    const [viewState, setViewState] = useState<viewState>({ /* Initial map view state */
        latitude: 37.7751,
        longitude: -122.4193,
        zoom: 11,
        bearing: 0,
        pitch: 0
    })
    
    const updateViewPort = useCallback( ({longitude, latitude}) => { /* Update view port & destination marker upon getting address */
        mapRef.current?.flyTo({ center: [longitude, latitude],  duration: 4000, zoom: 12 });
        setDestinationMarker({longitude: longitude, latitude: latitude})
    }, []);

    const updateMarkerView = useMemo(() => ( /* Create destination-marker post-render */
        <Marker
            key={"destination-marker"}
            longitude={destinationMarker.longitude}
            latitude={destinationMarker.latitude}
        />
    ), [destinationMarker]);

    return( 
        <View display="flex" flex="1" borderWidth="1">
            <ZStack flex="1">
                <View flex="1" width="100%" height="100%">
                    <Map
                    {...viewState}
                    ref={mapRef}
                    onMove={evt => { setViewState(evt.viewState) }}
                    mapStyle="mapbox://styles/mapbox/light-v11"
                    mapboxAccessToken={MAPBOX_TOKEN}
                    attributionControl={false}
                    interactive={false}
                    >
                        {updateMarkerView /* Destination Marker -> renders after destination is received */}
                    </Map>
                </View>
                <View flex="1" width="100%">
                    <UserCurrentLocation /* Current user Location (phone-location) */
                        onUpdateLocation={options.onUpdateLocation}
                    />
                        <UserCurrentDestination /* Current user Destination (geocoder) */
                            onUpdateLocation={options.onUpdateDestination}
                            onUpdateSeats={options.onUpdateSeats}
                            onUpdateView={updateViewPort}
                            seats={options.seats}
                        />
                </View>
            </ZStack>
        </View>
  );
}
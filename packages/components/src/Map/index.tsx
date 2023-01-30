import 'mapbox-gl/dist/mapbox-gl.css';
import ReactMapboxGl from 'react-mapbox-gl';

const Map = ReactMapboxGl(
    { accessToken: "pk.eyJ1Ijoiam9obmludGhldXMiLCJhIjoiY2xibmU1dGMzMHFvZzNvb3NhNjhoMzJ5NCJ9.1YGZAf1llc75Jc6LT3Ooaw" }
);    

export default ({ startLat, startLong, endLat, endLong }) => {

    return (
        <Map
            style="mapbox://styles/mapbox/streets-v9"
            containerStyle={{ height: '100vh', width: '100vw' }}>
        </Map>
    );
 };
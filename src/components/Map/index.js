import React from 'react';
import {Gmaps} from 'react-gmaps';

const Map = (props) => {
    const config = {
        key: 'AIzaSyBm0FuEWLNyULROmrcjdnwPn3ki_HAOD_s'
    }
    return (
        <Gmaps
            className="main-map"
            lat={props.coords.lat}
            lng={props.coords.long}
            zoom={10}
            params={props.config}>
            {props.children}
        </Gmaps>
    );
};

export default Map;
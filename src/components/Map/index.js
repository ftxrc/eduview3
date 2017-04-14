import React from 'react';
import {Gmaps} from 'react-gmaps';
import {config} from '../../mapConfig';

const Map = (props) => {
    return (
        <Gmaps
            zoom={10}
            params={config}
            {...props}>
            {props.children}
        </Gmaps>
    );
};

export default Map;
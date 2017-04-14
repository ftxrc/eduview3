import React from 'react';
import {Marker} from 'react-gmaps';
import {Button} from 'react-bootstrap';
import axios from 'axios';
import Spinner from '../Spinner';
import ErrorMessage from '../ErrorMessage';
import MapContainer from './MapContainer';

class HomePage extends React.Component {
    constructor() {
        super();

        this.state = {
            schools: null,
            hasCrashed: null
        }

        this.getSchools();
        this.getSchools = this.getSchools.bind(this);
    }

    render() {
        let schools = this.state.schools;
        
        if (!schools && !this.state.hasCrashed) {
            return <Spinner />
        } else if (this.state.hasCrashed) {
            return (
                <ErrorMessage>
                    <Button onClick={this.getSchools}>Try again</Button>
                </ErrorMessage>
            );
        }

        return <MapContainer schools={schools} />;
    }

    getSchools() {
        axios.get('http://127.0.0.1:5000/schools/?ignore_limits=true')
            .then((response) => {
                console.log(response)
                this.setState({ hasCrashed: false });
                this.setState({ schools: response.data.results });
            })
            .catch((error) => {
                this.setState({ hasCrashed: true });
            })
    }
}

export default HomePage;
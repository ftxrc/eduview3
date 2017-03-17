import React from 'react';
import {Marker} from 'react-gmaps';
import {Button} from 'react-bootstrap';
import axios from 'axios';
import Spinner from '../Spinner';
import DetailModal from './DetailModal';
import ErrorMessage from '../ErrorMessage';
import Map from '../Map';

const coords = {
    lat: 18.2208,
    long: -66.5901
};

class HomePage extends React.Component {
    constructor() {
        super();

        this.state = {
            schools: null,
            selectedSchool: null,
            hasCrashed: null
        }

        axios.get('http://127.0.0.1:5000/schools/?ignore_limits=true')
            .then((response) => {
                console.log(response)
                this.setState({ schools: response.data.results });
            })
            .catch((error) => {
                this.setState({ hasCrashed: true });
            })

        this.onMarkerClick = this.onMarkerClick.bind(this);
        this.selectSchool = this.selectSchool.bind(this);
        this.openModal = this.openModal.bind(this);
        this.closeModal = this.closeModal.bind(this);
        this.getSchools = this.getSchools.bind(this);
    }

    render() {
        let schools = this.state.schools;
        
        if (!schools && !this.state.hasCrashed) {
            return <Spinner />
        }

        if (this.state.hasCrashed) {
            return (
                <ErrorMessage message="The Eduview servers couldn't return the data in time.">
                    <Button onClick={this.getSchools}>Try again</Button>
                </ErrorMessage>
                );
        }

        return (
            <div>
                <Map coords={coords}>
                    {schools.map((school) =>
                        <Marker key={school.id} lat={school.location.coordinates[0]} lng={school.location.coordinates[1]} onClick={() => {this.onMarkerClick(school)}}></Marker>
                    )};
                </Map>

                { this.state.selectedSchool !== null && 
                    <DetailModal show={this.state.showModal} school={this.state.selectedSchool} handleClose={this.closeModal} />
                }
                
            </div>
        );
    }
    onMarkerClick(school) {
        this.selectSchool(school)
        this.openModal()
    }

    selectSchool(school) {
        this.setState({selectedSchool: school})
    }

    openModal() {
        this.setState({ showModal: true})
    }

    closeModal() {
        this.setState({ showModal: false })
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
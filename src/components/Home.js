import React from 'react';
import {Link} from 'react-router-dom';
import {Gmaps, Marker} from 'react-gmaps';
import {Modal} from 'react-bootstrap';
import axios from 'axios';

const coords = {
    lat: 18.2208,
    long: -66.5901
};

const config = {
    key: 'AIzaSyBm0FuEWLNyULROmrcjdnwPn3ki_HAOD_s'
}

const Map = (props) => {
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

const MarkerModal = ({ show, school, handleClose }) => {
    return (
        <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
                <Modal.Title>{school.name}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <p>This school covers level {school.level}. It is located in the {school.location.metadata.district} district.</p>
            </Modal.Body>
            <Modal.Footer>
                <Link to={"/school/" + school.id}>View school &raquo;</Link>
            </Modal.Footer>
        </Modal>
    );
}

class Home extends React.Component {
    constructor() {
        super();

        this.state = {
            schools: null,
            selectedSchool: null
        }

        axios.get('http://127.0.0.1:5000/schools/?ignore_limits=true')
            .then((response) => {
                console.log(response)
                this.setState({ schools: response.data.results });
            })
            .catch((error) => {
            })

        this.onMarkerClick = this.onMarkerClick.bind(this);
        this.selectSchool = this.selectSchool.bind(this);
        this.openModal = this.openModal.bind(this);
        this.closeModal = this.closeModal.bind(this);
    }

    render() {
        let schools = this.state.schools;
        if(!schools) {
            return null;
        }
        return (
            <div>
                <Map config={config} coords={coords}>
                    {schools.map((school) =>
                        <Marker key={school.id} lat={school.location.coordinates[0]} lng={school.location.coordinates[1]} onClick={() => {this.onMarkerClick(school)}}></Marker>
                    )};
                </Map>

                { this.state.selectedSchool !== null && 
                    <MarkerModal show={this.state.showModal} school={this.state.selectedSchool} handleClose={this.closeModal} />
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
}

export default Home;
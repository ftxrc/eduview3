import React from 'react';
import { Marker } from 'react-gmaps';
import DetailModal from './DetailModal';
import Map from '../Map';
import {defaultCoords} from '../../mapConfig.js';

class MapContainer extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            showModal: false,
            selectedSchool: null
        }

        this.openModal = this.openModal.bind(this);
        this.closeModal = this.closeModal.bind(this);
        this.onMarkerClick = this.onMarkerClick.bind(this);
        this.selectSchool = this.selectSchool.bind(this);
    }

    render() {
        const schools = this.props.schools;
        return (
            <div>
                <Map className="main-map" lat={defaultCoords.mainMap.lat} lng={defaultCoords.mainMap.long}>
                    {schools.map((school) =>
                        <Marker key={school.id} lat={school.location.coordinates[0]} lng={school.location.coordinates[1]} onClick={() => { this.onMarkerClick(school) }}></Marker>
                    )};
                </Map>

                {this.state.selectedSchool !== null &&
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
        this.setState({ selectedSchool: school })
    }

    openModal() {
        this.setState({ showModal: true })
    }

    closeModal() {
        this.setState({ showModal: false })
    }
}

export default MapContainer;
import React from 'react';
import {Grid, Row, Col, PageHeader, Button, Alert, Panel} from 'react-bootstrap';
import { Marker } from 'react-gmaps';
import axios from 'axios';
import Spinner from '../Spinner';
import Map from '../Map';

const Header = ({ title, subtitle }) => <PageHeader>{title} <small>{subtitle}</small></PageHeader>;

const ErrorMessage = ({ handleButtonClick }) => {
    return (
        <div className="container">
            <Alert bsStyle="danger" onDismiss={handleButtonClick}>
                <h4>We're sorry, eduview had a problem.</h4>
                <p>Eduview couldn't fetch the entry in time. Click the button to try again.</p>
                <p>
                    <Button onClick={handleButtonClick}>Try Again</Button>
                </p>
            </Alert>
        </div>
    );
}

const SchoolInfoPanel = ({ name, gpa }) => {
    return (
        <Panel header={"About " + name} footer="Note: Data may be outdated.">
            <center>
            <span className="big-number">{ gpa }</span><br />
                <i>average GPA for school (from list of students graduated).</i>
            </center>
            <hr />
            <div class="media">
                <div class="media-body">
                    <h4 class="media-heading">Students from <b>{name}</b> are in...</h4>
                    Top (insert bullshit number here) of Puerto Rico.
                </div>
            </div>
        </Panel>
    );
}

class SchoolDetails extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        const school = this.props.school;
        const lat = school.location.coordinates[0];
        const lng = school.location.coordinates[1];

        return (
            <Grid>
                <Row className="show-grid">
                    <Header title={school.name} subtitle="Data for this school" />
                    <Col xs={12} md={8}>
                        <Map
                            className="details-map"
                            lat={lat}
                            lng={lng}
                            zoom={15}>
                            <Marker lat={lat} lng={lng} />
                        </Map>
                    </Col>
                    <Col xs={6} md={4}>
                        <SchoolInfoPanel name={school.name} gpa="4.0" />
                    </Col>
                </Row>
            </Grid>
        );
    }
}

class SchoolPage extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            schoolData: null,
            hasCrashed: null
        }

        this.getSchoolData();
        this.getSchoolData = this.getSchoolData.bind(this);
    }

    render() {    
        let school = this.state.schoolData;

        if (school) {
            return (
                <div className="container">
                    <SchoolDetails school={school} />
                </div>
            );
        } else if(this.state.hasCrashed) {
            return <ErrorMessage handleButtonClick={this.getSchoolData} />
        } else {
            return <Spinner />;
        }
    }

    getSchoolData() {
        axios.get('http://127.0.0.1:5000/schools/' + this.props.match.params.id)
            .then((response) => {
                this.setState({ schoolData: response.data.results[0] });
            })
            .catch((error) => {
                // TODO: Errors
                console.log("Couldn't get data from API. Axios crashed.");
                this.setState({ hasCrashed: true });
            })
    }
}

export default SchoolPage;
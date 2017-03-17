import React from 'react';
import {Grid, Row, Col, PageHeader, Button, Alert, Panel} from 'react-bootstrap';
import { Gmaps, Marker } from 'react-gmaps';
import Halogen from 'halogen';
import axios from 'axios';

// TODO: Remove this into separate file (See DRY). Just a quick fix
const config = {
    key: 'AIzaSyBm0FuEWLNyULROmrcjdnwPn3ki_HAOD_s'
}

const Header = ({ title }) => <PageHeader>{title} <small>Data for this school</small></PageHeader>;
const Spinner = () => <center><Halogen.ScaleLoader color="#777" /></center>;
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
            <div>
                <Header title={school.name} />
                <Grid>
                    <Row className="show-grid">
                        <Col xs={12} md={8}>
                            <Gmaps
                                className="details-map"
                                lat={lat}
                                lng={lng}
                                zoom={15}
                                params={config}>
                                <Marker lat={lat} lng={lng} />
                            </Gmaps>
                        </Col>
                        <Col xs={6} md={4}>
                            <SchoolInfoPanel name="SchoolInfoPanel" gpa="5.0" />
                        </Col>
                    </Row>
                </Grid>
            </div>
        );
    }
}

class SchoolContainer extends React.Component {
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

        if (school !== null) {
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

export default SchoolContainer;
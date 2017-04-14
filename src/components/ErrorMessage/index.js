import React from 'react';
import {Alert} from 'react-bootstrap';

const ErrorMessage = (props) => {
    return (
        <div className="container">
            <Alert bsStyle="danger">
                <h4>We're sorry, eduview had a problem.</h4>
                <p>The Eduview servers couldn't return the data in time.</p>
                <p>
                    {props.children}
                </p>
            </Alert>
        </div>
    );
}

export default ErrorMessage;
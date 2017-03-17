import React from 'react';
import {Link} from 'react-router-dom';
import {Modal} from 'react-bootstrap';

const DetailModal = ({ show, school, handleClose }) => {
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

export default DetailModal;
import React, { useState } from 'react';
import { Button, Form, Modal } from 'react-bootstrap';

const AddListModal = ({ show, setShow, setStatuses, statuses }) => {
    const [input, setinput] = useState('');
    return (
        <Modal show={show} onHide={() => setShow(false)}>
            <Modal.Header closeButton>
                <Modal.Title>Enter List Name</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form>
                    <Form.Group
                        className="mb-3"
                        controlId="exampleForm.ControlTextarea1"
                    >
                        <Form.Control as="input" onChange={(e) => setinput(e.target.value)} />
                    </Form.Group>
                </Form>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="primary" onClick={() => { if (input) { setStatuses([...statuses, input]); setShow(false); } }}>
                    Add List
                </Button>
            </Modal.Footer>
        </Modal>
    );
}

export default AddListModal;
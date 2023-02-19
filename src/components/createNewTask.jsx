import React, { useState } from 'react';
import { Button, Form, Modal } from 'react-bootstrap';

const NewTaskModal = ({ show, setShow, addTask, updateTask, status, task = {
    id: '',
    title: '',
    description: '',
    status: '',
} }) => {
    const [input, setinput] = useState(task?.title);
    const [description, setDescription] = useState(task?.description);

    return (
        <Modal show={show} onHide={() => setShow(false)}>
            <Modal.Header closeButton>
                <Modal.Title>{task?.id ? 'Update Task' : 'Create New Task'}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form>
                    <Form.Group
                        className="mb-3"
                        controlId="exampleForm.ControlTextarea1"
                    >
                        <Form.Label>Enter Title</Form.Label>
                        <Form.Control as="input" onChange={(e) => setinput(e.target.value)} defaultValue={input} />
                    </Form.Group>
                    <Form.Group
                        className="mb-3"
                        controlId="exampleForm.ControlTextarea1"
                    >
                        <Form.Label>Enter Description</Form.Label>
                        <Form.Control as="textarea" row={5} onChange={(e) => setDescription(e.target.value)} defaultValue={description} />
                    </Form.Group>
                </Form>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="primary" onClick={() => {
                    task ? updateTask(task.id, task.status, input, description) : addTask(status, input, description)
                    setShow(false);
                }}>
                    {task?.id ? 'Update Task' : 'Add Task'}
                </Button>
            </Modal.Footer>
        </Modal>
    );
}

export default NewTaskModal;
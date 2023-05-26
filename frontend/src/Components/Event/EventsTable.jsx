import React, { useState, useEffect } from 'react';
import { Container, Table, Button, Modal } from 'react-bootstrap';
import UpdateEvent from './UpdateEvent';
import AddEvent from './AddEvent'
const EventsTable = () => {
    const [events, setEvents] = useState([])
    const [showEditModal, setShowEditModal] = useState(false);
    const [showAddModal, setShowAddModal] = useState(false);
    const [selectedEvent, setSelectedEvent] = useState(null);

    const handleEdit = (event) => {
        setSelectedEvent(event);
        setShowEditModal(true);
    };

    const handleDelete = (id) => {
        fetch(`${process.env.REACT_APP_BACKEND_URL}/api/events/${id}`, {
            method: 'DELETE',
        })
            .then(response => response.json())
            .then(data => {
                // Remove deleted event from state
                setEvents(events.filter(event => event._id !== id));
            })
            .catch(error => console.error('Error:', error));
    };

    const handleCloseModal = () => {
        setSelectedEvent(null);
        setShowEditModal(false);
    };

    useEffect(() => {
        fetch(`${process.env.REACT_APP_BACKEND_URL}/api/events`)
            .then(response => response.json())
            .then(data => {
                setEvents(data)
            })
            .catch(error => console.error('Error:', error));

    }, []);

    return (
        <Container
            style={{
                marginTop: "2rem"
            }}
        >
            <Table striped bordered hover>
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Type</th>
                        <th>Location</th>
                        <th>Date</th>
                        <th>Starting Time</th>
                        <th>Price</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {events.map((event) => (
                        <tr key={event._id}>
                            <td>{event.eventName}</td>
                            <td>{event.eventType}</td>
                            <td>{event.location}</td>
                            <td>{event.date.split('T')[0]}</td>
                            <td>{event.startingTime}</td>
                            <td>{event.price}</td>
                            <td>
                                <Button
                                    variant="primary"
                                    size="sm"
                                    onClick={() => handleEdit(event)}
                                >
                                    Edit
                                </Button>{" "}
                                <Button
                                    variant="danger"
                                    size="sm"
                                    onClick={() => handleDelete(event._id)}
                                >
                                    Delete
                                </Button>
                            </td>
                        </tr>
                    ))}
                    <tr>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td>
                            <Button
                                variant="primary"
                                size="sm"
                                onClick={() => setShowAddModal(true)}
                                style={{
                                    width: "7rem"
                                }}
                            >
                                Add Event
                            </Button>{" "}
                        </td>
                    </tr>
                </tbody>
            </Table>

            <Modal show={showEditModal} onHide={handleCloseModal}>
                <Modal.Header closeButton>
                    <Modal.Title>Edit Event</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <UpdateEvent
                        initialValues={selectedEvent}
                        closeModal={handleCloseModal}
                        setEvents={setEvents}
                    />
                </Modal.Body>
            </Modal>


            <Modal show={showAddModal} onHide={()=>setShowAddModal(false)}>
                <Modal.Header closeButton>
                    <Modal.Title>Add Event</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <AddEvent
                        closeModal={()=>setShowAddModal(false)}
                        setEvents={setEvents}
                    />
                </Modal.Body>
            </Modal>
        </Container>
    );
};

export default EventsTable;

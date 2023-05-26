import React, { useEffect, useState } from 'react';
import { Container, Card, ListGroup } from 'react-bootstrap';
import EventDisplay from './EventDisplay';
const EventList = () => {
    const [events, setEvents] = useState([]);
    const [selectedEvent, setSelectedEvent] = useState(null)

    useEffect(() => {
        fetch(`${process.env.REACT_APP_BACKEND_URL}/api/events`)
            .then(response => response.json())
            .then(data => setEvents(data))
            .catch(err => console.error(err));
    }, []);

    return (
        <Container
            style={{
                marginTop: "2rem"
            }}
        >
            {!selectedEvent && (
                <ListGroup
                    horizontal
                    style={{
                        margin: "auto",
                        width: "100%",
                        flexDirection: "column"

                    }}
                >
                    {events.map((event, index) => (
                        <ListGroup.Item
                            key={index}
                            style={{
                                width: "100%",
                            }}
                        >
                            <Card
                                style={{
                                    width: "100%",
                                    display: "flex",
                                    flexDirection: "row",
                                    cursor: "pointer"
                                }}
                                onClick={()=> setSelectedEvent(event)}
                            >
                                <Card.Img
                                    variant="top"
                                    src={`${process.env.REACT_APP_BACKEND_URL}${event.image}`}
                                    width="250px"
                                    height="250px"
                                    style={{
                                        width: "250px",
                                    }}
                                />
                                <Card.Body>
                                    <Card.Title>{event.eventName}</Card.Title>
                                    <Card.Text>
                                        {event.eventType} - {event.location}
                                    </Card.Text>
                                    <Card.Text>
                                        Date: {new Date(event.date).toLocaleDateString()} - Starting time: {event.startingTime}
                                    </Card.Text>
                                    <Card.Text>
                                        Price: ${event.price}
                                    </Card.Text>
                                    <Card.Text>
                                        Description: {event.description}
                                    </Card.Text>
                                </Card.Body>
                            </Card>
                        </ListGroup.Item>
                    ))}
                </ListGroup>
            )}
            {selectedEvent && <EventDisplay event={selectedEvent} />}
        </Container>
    );
};

export default EventList;

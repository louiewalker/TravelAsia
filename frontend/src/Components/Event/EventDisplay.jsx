import React, {useState} from 'react';
import { Card, Button, Row, Col } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faMapMarkerAlt, faClock, faTag, faBook, faCalendarAlt, faMusic } from '@fortawesome/free-solid-svg-icons'
import addItemToCart from '../../utils/addItemToCart'
import jwt_decode from 'jwt-decode'
import { useNavigate } from 'react-router-dom';

const EventDisplay = ({ event }) => {
    const [booking, setBooking]= useState(false)
    const navigate= useNavigate()
    const termsAndConditions = [
        "Tickets are not subject to cancellation, refund or exchange",
        "All prices include value added tax.",
        "It is strictly forbidden to resell the ticket.",
        "The ticket holder is responsible for verifying the date, time, place and age of event, and the ticket holder must arrive early at the event site.",
        "The owner of event has the right to postpone or change the dates of event on the stage at any time",
    ];


    async function bookEvent(){
        const token= localStorage.getItem('token')
        if(!token) return navigate('/login')
        const userId= jwt_decode(token)._id

        setBooking(true)
        await addItemToCart(userId, {
            item: event._id,
            category: 'Event',
            quantity: 1
        })
        setBooking(false)
        navigate('/cart')
    }


    return (
        <Card style={{ width: '100%' }}>
            <Card.Img
                variant="top"
                src={`${process.env.REACT_APP_BACKEND_URL}/${event.image}`}
                style={{
                    maxHeight: "500px",
                }}
            />
            <Card.Body>
                <Row>
                    <Col>
                        <Card.Title><h2>{event.eventName}</h2></Card.Title>
                        <Card.Text>
                            <FontAwesomeIcon icon={faMapMarkerAlt} /> {event.eventType} - {event.location}
                        </Card.Text>
                        <Card.Text>
                            <FontAwesomeIcon icon={faCalendarAlt} /> Date: {new Date(event.date).toLocaleDateString()} - Starting time: {event.startingTime}
                        </Card.Text>
                        <Card.Text>
                            <FontAwesomeIcon icon={faTag} /> Price: ${event.price}
                        </Card.Text>
                        <Card.Text>
                            <FontAwesomeIcon icon={faBook} /> Description: {event.description}
                        </Card.Text>
                    </Col>
                    <Col>
                        <Card.Text
                            style={{
                                border: "1px solid black",
                                borderRadius: "1rem",
                                padding: "1rem"
                            }}
                        >
                            <Card.Title
                                style={{
                                    fontWeight: "bold"
                                }}
                            >Terms and Conditions</Card.Title>

                            {termsAndConditions.map((item, index) => (
                                <li key={index}> {item}</li>
                            ))}
                        </Card.Text>
                        <Button 
                            variant="primary" 
                            style={{ marginTop: '10px' }}
                            onClick={bookEvent}
                            disabled={booking}
                        >
                            {booking ? "Booking... " : "Add to Cart"}
                        </Button>

                    </Col>
                </Row>
            </Card.Body>
        </Card>
    )
}

export default EventDisplay;

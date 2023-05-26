import React, { useState } from 'react';
import { Card, Button, Container } from 'react-bootstrap';
import addItemToCart from '../../utils/addItemToCart';
import { useNavigate } from 'react-router-dom'
import jwt_decode from 'jwt-decode'




const TravelDisplay = ({ travel }) => {

    const navigate = useNavigate();

    const [booking, setBooking] = useState(false)

    async function bookTravel() {
        const token = localStorage.getItem('token')
        if (!token) return navigate('/login')
        const userId = jwt_decode(token)._id

        setBooking(true)
        await addItemToCart(userId, {
            item: travel._id,
            category: 'Travel',
            quantity: 1
        })

        setBooking(false)

        navigate('/cart')


    }


    return (
        <Container style={{
            border: "1px solid rgba(0, 0, 0, 0.175)",
            height: "fit-content",
            minHeight: "60vh",
            padding: "2rem"
        }}>
            <Card style={{
                width: '100%',
                display: "flex",
                flexDirection: "column",
                flexWrap: "wrap",
                border: "none"
            }}>
                <div
                    style={{
                        display: "flex",
                        flexDirection: "row",
                    }}
                >
                    <Card.Img
                        variant="top"
                        src={`${process.env.REACT_APP_BACKEND_URL}${travel.image}`}
                        style={{
                            width: "30%",
                        }}
                    />
                    <Card.Body>
                        <Card.Title><h2>{travel.title}</h2></Card.Title>
                        <Card.Text>
                            <h3>
                                ${travel.price}
                            </h3>
                        </Card.Text>
                        <Button
                            variant="primary"
                            onClick={bookTravel}
                        >{booking ? "Booking..." : "Book Now"}</Button>
                    </Card.Body>
                </div>
                <div>
                    <p style={{ marginTop: '10px' }}>
                        {travel.summary}
                    </p>
                    <p style={{ marginTop: '10px' }}>
                        {travel.description}
                    </p>
                </div>
            </Card>

        </Container>
    )
}

export default TravelDisplay;

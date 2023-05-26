import React, { useState, useEffect } from 'react';
import {
    Container,
    Button,
    Modal,
    Form,
    Row,
    Col
} from 'react-bootstrap';
import jwt_decode from 'jwt-decode'
import { useNavigate } from 'react-router-dom';
import './styles.scss'

function Cart() {

    const navigate = useNavigate();
    const [cartItems, setCartItems] = useState([])
    const [show, setShow] = useState(false);
    const [agree, setAgree] = useState(false);
    const [paymentDetails, setPaymentDetails] = useState({
        cardNumber: '',
        expiryDate: '',
        cvc: ''
    });
    const [paymentSuccess, setPaymentSuccess] = useState(false);


    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const total = cartItems.filter(item => item.item).reduce((total, item) => total + (item.item.price * item.quantity), 0);

    const handlePayment = () => {

        setPaymentSuccess(true);
        emptyCart();
        handleClose();
    };

    const handleAcknowledgePaymentSuccess = () => {
        setPaymentSuccess(false);
    };


    useEffect(function () {
        async function fetchCartItems() {
            const token = localStorage.getItem('token')
            if (!token) return navigate('/signin')
            const userId = jwt_decode(token)._id

            const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/api/cart/${userId}`)
            const cartItems = await response.json()

            setCartItems(cartItems)
        }

        fetchCartItems()
    }, [])


    function emptyCart() {
        const userId = jwt_decode(localStorage.getItem('token'))._id;

        fetch(`${process.env.REACT_APP_BACKEND_URL}/api/cart/${userId}`, {
          method: 'DELETE'
        })
          .then(response => {
            if (response.ok) {
              console.log('Cart emptied successfully');
              setCartItems([]);
            } else {
              console.error('Failed to empty the cart');
            }
          })
          .catch(error => {
            console.error('Error occurred while emptying the cart:', error);
          });
      }
      
    function handleDelete( itemId) {
        const userId= jwt_decode(localStorage.getItem('token'))._id
        fetch(`${process.env.REACT_APP_BACKEND_URL}/api/cart/${userId}/${itemId}`, {
            method: 'DELETE'
        })
            .then(response => {
                if (response.ok) {
                    console.log('Item removed from cart successfully');
                    setCartItems(cartItems.filter(item => item._id !== itemId));
                } else {
                    console.error('Failed to remove item from cart');
                }
            })
            .catch(error => {
                console.error('Error occurred while deleting item:', error);
            });
    }


    return (
        <div>
            <Container
                style={{
                    marginTop: "4rem",
                    border: "1px solid #ccc",
                    padding: "1rem"
                }}
            >
                <Row className="mb-3">
                    <Col><strong>Name/Title</strong></Col>
                    <Col><strong>Price</strong></Col>
                    <Col><strong>Action</strong></Col>
                </Row>

                {cartItems.filter(item => item.item).map(item => (
                    <Row className="mb-3" key={item._id}>
                        <Col>{item.item.name || item.item.title || item.item.eventName}</Col>
                        <Col>{item.item.price}</Col>
                        <Col>
                            <Button
                                variant="danger"
                                size="sm"
                                onClick={() => handleDelete(item._id)}
                            >
                                Delete
                            </Button>
                        </Col>
                    </Row>
                ))}

                <Row className="mb-3">
                    <Col></Col>
                    <Col style={{
                        display: "flex",
                        alignItems: "center"
                    }}>
                        <h5
                            style={{
                                margin: "0",
                                border: "1px solid #ccc",
                                padding: ".5rem",
                                borderRadius: ".5rem"
                            }}
                        >Total: {total.toFixed(2)}</h5>
                    </Col>
                    <Col>
                        <Button variant="primary" onClick={handleShow}>Pay Now</Button>
                    </Col>
                </Row>

            </Container>
            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Payment Details</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Group>
                            <Form.Label>Card Number</Form.Label>
                            <Form.Control type="text" placeholder="Enter Card Number" onChange={e => setPaymentDetails({ ...paymentDetails, cardNumber: e.target.value })} />
                        </Form.Group>

                        <div
                            style={{
                                display: "flex",
                                gap: '1rem',
                                margin: "2rem 0"
                            }}
                        >
                            <Form.Group>
                                <Form.Label>Expiry Date</Form.Label>
                                <Form.Control type="text" placeholder="MM/YY" onChange={e => setPaymentDetails({ ...paymentDetails, expiryDate: e.target.value })} />
                            </Form.Group>

                            <Form.Group>
                                <Form.Label>CVC</Form.Label>
                                <Form.Control type="text" placeholder="CVC" onChange={e => setPaymentDetails({ ...paymentDetails, cvc: e.target.value })} />
                            </Form.Group>
                        </div>

                        <Form.Group controlId="formBasicCheckbox">
                            <Form.Check type="checkbox" label="I agree to terms and services" onChange={() => setAgree(!agree)} />
                        </Form.Group>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>Close</Button>
                    <Button variant="primary" onClick={handlePayment} disabled={!agree}>Proceed</Button>
                </Modal.Footer>
            </Modal>

            <Modal show={paymentSuccess} onHide={handleAcknowledgePaymentSuccess}>
                <Modal.Header closeButton>
                    <Modal.Title>Payment Successful</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    Your payment has been processed successfully. Thank you for your purchase.
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="primary" onClick={handleAcknowledgePaymentSuccess}>OK</Button>
                </Modal.Footer>
            </Modal>
        </div>
    );
}

export default Cart;

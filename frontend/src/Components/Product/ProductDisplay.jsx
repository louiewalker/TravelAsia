import React, {useState} from 'react';
import { Card, Button, Container } from 'react-bootstrap';
import jwt_decode from 'jwt-decode'
import { useNavigate } from 'react-router-dom';
import addItemToCart from '../../utils/addItemToCart';
const ProductDisplay = ({ product }) => {

    const navigate= useNavigate()
    const [buying, setBuying]= useState(false)
    async function buyProduct(){
        const token= localStorage.getItem('token')
        if(!token) return navigate('/login')
        const userId= jwt_decode(token)._id

        setBuying(true)
        await addItemToCart(userId, {
            item: product._id,
            category: 'Product',
            quantity: 1
        })

        setBuying(false)

        navigate('/cart')
    }

    return (
        <Container style={{
            border: "1px solid rgba(0, 0, 0, 0.175)",
            height: "60vh",
            padding: "2rem"
        }}>
            <Card style={{
                width: '100%',
                display: "flex",
                flexDirection: "row",
                flexWrap: "wrap",
                broder: "none"
            }}>
                <Card.Img
                    variant="top"
                    src={`${process.env.REACT_APP_BACKEND_URL}${product.image}`}
                    style={{
                        width: "30%",
                    }}
                />
                <Card.Body>
                    <Card.Title><h2>{product.name}</h2></Card.Title>
                    <Card.Text>
                        <h3>
                            ${product.price}
                        </h3>
                    </Card.Text>
                    <Button 
                        variant="primary"
                        onClick={buyProduct}
                        disabled={buying}
                    >{buying ? "Adding to Cart.." : "Add to Cart"}</Button>

                </Card.Body>
            </Card>

            <p style={{ marginTop: '10px' }}>
                {product.description}
            </p>
        </Container>
    )
}

export default ProductDisplay;

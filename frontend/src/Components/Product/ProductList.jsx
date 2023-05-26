import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Card, Button, Modal } from 'react-bootstrap';
import ProductDisplay from './ProductDisplay';

const ProductList = () => {
  const [show, setShow] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [products, setProducts] = useState([]);

  const handleClose = () => setShow(false);
  const handleShow = (product) => {
    setSelectedProduct(product);
    setShow(true);
  };


  useEffect(() => {
    fetch(`${process.env.REACT_APP_BACKEND_URL}/api/products`)
      .then(response => response.json())
      .then(data => {
        setProducts(data);
      })
      .catch(error => console.error('Error:', error));

  }, []);
  return (
    <Container style={{ marginTop: "2rem" }}>
      {!selectedProduct && (
        <Row>
          {products.map((product, index) => (
            <Col sm={6} md={3} key={index} style={{ marginBottom: "1rem" }}>
              <Card>
                <Card.Img
                  variant="top"
                  src={`${process.env.REACT_APP_BACKEND_URL}${product.image}`}
                  height="250px"
                />
                <Card.Body>
                  <Card.Title>{product.name}</Card.Title>
                  <Card.Text>${product.price}</Card.Text>
                  <Button variant="primary" onClick={() => handleShow(product)}>
                    View Details
                  </Button>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      )}
      {selectedProduct && <ProductDisplay product={selectedProduct} />}
    </Container>
  );
};

export default ProductList;

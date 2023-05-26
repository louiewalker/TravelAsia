import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Card, Button } from 'react-bootstrap';
import TravelDisplay from './TravelDisplay';

const TravelList = () => {
  const [selectedTravel, setSelectedTravel] = useState(null);
  const [travels, setTravels] = useState([]);

  const handleShow = (travel) => {
    setSelectedTravel(travel);
  };

  useEffect(() => {
    fetch(`${process.env.REACT_APP_BACKEND_URL}/api/travels`)
      .then(response => response.json())
      .then(data => {
        setTravels(data);
      })
      .catch(error => console.error('Error:', error));
  }, []);

  return (
    <Container style={{ marginTop: "2rem" }}>
      {!selectedTravel && (
        <Row>
          {travels.map((travel, index) => (
            <Col sm={6} md={3} key={index} style={{ marginBottom: "1rem" }}>
              <Card>
                <Card.Img
                  variant="top"
                  src={`${process.env.REACT_APP_BACKEND_URL}${travel.image}`}
                  height="250px"
                />
                <Card.Body>
                  <Card.Title>{travel.title}</Card.Title>
                  <Card.Text>${travel.price}</Card.Text>
                  <Button variant="primary" onClick={() => handleShow(travel)}>
                    View Details
                  </Button>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      )}
      {selectedTravel && <TravelDisplay travel={selectedTravel} />}
    </Container>
  );
};

export default TravelList;

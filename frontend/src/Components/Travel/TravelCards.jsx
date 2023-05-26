import React, { useEffect, useState } from 'react';
import {
  Container,
  Row,
  Col,
  Card,
  Button,
  ButtonGroup,
  Modal
} from 'react-bootstrap';
import UpdateTravel from './UpdateTravel';
import TravelDisplay from './TravelDisplay';
import AddTravel from './AddTravel';


function trimString(str) {
  if (str.length <= 25) {
    return str;
  } else {
    return str.substring(0, 25) + "...";
  }
}


const TravelGrid = ({ user }) => {
  const [travels, setTravels] = useState([]);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showAddModal, setShowAddModal] = useState(false);
  const [selectedTravel, setSelectedTravel] = useState(null);

  useEffect(() => {
    fetch(`${process.env.REACT_APP_BACKEND_URL}/api/travels`)
      .then(response => response.json())
      .then(data => setTravels(data))
      .catch(error => console.error('Error:', error));
  }, []);

  const handleEdit = (travel) => {
    setSelectedTravel(travel);
    setShowEditModal(true);
  };

  const handleDelete = (id) => {
    fetch(`${process.env.REACT_APP_BACKEND_URL}/api/travels/${id}`, {
      method: 'DELETE',
    })
      .then(response => response.json())
      .then(data => {
        // Remove deleted travel from state
        setTravels(travels.filter(travel => travel._id !== id));
      })
      .catch(error => console.error('Error:', error));
  };

  const closeModal = () => {
    setSelectedTravel(null);
    setShowEditModal(false);
  };

  return (
    <Container
      style={{
        marginTop: "2rem"
      }}
    >
      <Row>
        <Col>
          <Button
            variant="primary"
            onClick={() => setShowAddModal(true)}
            style={{
              marginBottom: "1rem"
            }}
          >Add Travel</Button>
        </Col>
      </Row>
      <Row>
        {travels.map((travel) => (
          <Col key={travel._id} md={3} style={{ marginBottom: '1rem' }}>
            <Card>
              <Card.Img
                variant="top"
                src={`${process.env.REACT_APP_BACKEND_URL}${travel.image}`}
                style={{
                  height: "250px"
                }}
              />
              <Card.Body>
                <Card.Title>{travel.title}</Card.Title>
                <Card.Text>{trimString(travel.summary)}</Card.Text>
                <Card.Text>Price: {travel.price}</Card.Text>

                <ButtonGroup className="d-flex justify-content-between">
                  <Button variant="primary" onClick={() => handleEdit(travel)}>Edit</Button>
                  <Button variant="danger" onClick={() => handleDelete(travel._id)}>Delete</Button>
                </ButtonGroup>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>

      <Modal show={showEditModal} onHide={closeModal}>
        <Modal.Header closeButton>
          <Modal.Title>Edit Travel</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {selectedTravel && (
            <UpdateTravel
              initialValues={selectedTravel}
              closeModal={closeModal}
              setTravels={setTravels}
            />
          )}
        </Modal.Body>
      </Modal>

      <Modal show={showAddModal} onHide={() => setShowAddModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Add Travel</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <AddTravel
            closeModal={() => setShowAddModal(false)}
            setTravels={setTravels}
          />

        </Modal.Body>
      </Modal>
    </Container>
  );
};

export default TravelGrid;

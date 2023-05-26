import React from 'react';
import { Card, Row, Col } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faMapMarkerAlt, faCalendarAlt, faBook } from '@fortawesome/free-solid-svg-icons'

const BlogDisplay = ({ blog }) => {

    return (
        <Card style={{ width: '100%' }}>
            {blog.images.map((image, index) => 
                <Card.Img
                    key={index}
                    variant="top"
                    src={`${process.env.REACT_APP_BACKEND_URL}/${image}`}
                    style={{
                        maxHeight: "500px",
                    }}
                />
            )}
            <Card.Body>
                <Row>
                    <Col>
                        <Card.Title><h2>{blog.blogName}</h2></Card.Title>
                        <Card.Text>
                            <FontAwesomeIcon icon={faMapMarkerAlt} /> Location: {blog.location}
                        </Card.Text>
                        <Card.Text>
                            <FontAwesomeIcon icon={faCalendarAlt} /> Date: {new Date(blog.date).toLocaleDateString()}
                        </Card.Text>
                        <Card.Text>
                            {blog.description}
                        </Card.Text>
                    </Col>
                </Row>
            </Card.Body>
        </Card>
    )
}

export default BlogDisplay;

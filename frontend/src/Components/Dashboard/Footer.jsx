import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    faFacebook,
    faTwitter,
    faInstagram,

} from '@fortawesome/free-brands-svg-icons';
import {
    faPhone,
    faEnvelope,
    faMapMarkerAlt
} from '@fortawesome/free-solid-svg-icons';

const Footer = () => {
    return (
        <footer 
            style={{ 
                backgroundColor: '#f8f9fa',
                padding: '20px 0',
                marginTop: "auto"
            }}>
            <Container>
                <Row>
                    <Col xs={12} md={3} className="text-center text-md-start">
                        <p><FontAwesomeIcon icon={faPhone} /> +94 112 896 523</p>
                        <p><FontAwesomeIcon icon={faEnvelope} /> travelasia@gmail.com</p>
                        <p><FontAwesomeIcon icon={faMapMarkerAlt} /> 54 main street</p>
                    </Col>
                    <Col xs={12} md={9}>
                        <div style={{
                            display: "flex",
                            flexDirection: "column",
                            alignItems: "center",
                            justifyContent: "center"
                        }}>
                            <div>
                                <FontAwesomeIcon
                                    icon={faFacebook}
                                    size="lg"
                                    style={{
                                        margin: '0 10px',
                                        width: "50px",
                                        height: "50px"
                                    }}
                                />
                                <FontAwesomeIcon
                                    icon={faTwitter}
                                    size="lg"
                                    style={{
                                        margin: '0 10px',
                                        width: "50px",
                                        height: "50px"
                                    }}
                                />
                                <FontAwesomeIcon
                                    icon={faInstagram}
                                    size="lg"
                                    style={{
                                        margin: '0 10px',
                                        width: "50px",
                                        height: "50px"
                                    }}
                                />
                            </div>
                            <small
                                style={{
                                    marginTop: "2rem"
                                }}
                            >&copy; 2023 Travel Asia</small>
                        </div>
                    </Col>
                </Row>
            </Container>
        </footer>
    );
};

export default Footer;

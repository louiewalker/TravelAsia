import React, { useContext } from 'react';
import { Container, Navbar, Nav } from 'react-bootstrap';
import { AuthContext } from '../../context/AuthContext'
import { useNavigate } from 'react-router-dom';

const NavigationBar = () => {
    const navigate = useNavigate()
    const { user, logOut } = useContext(AuthContext)
    return (
        <Navbar bg="light" expand="lg">
            <Container>
                <Navbar.Brand
                    href="/"
                    className="mr-3"
                >Travel Asia {user && user.role == "Admin" && "(Admin)"}</Navbar.Brand>
                <Navbar.Toggle
                    aria-controls="basic-navbar-nav"

                />
                <Navbar.Collapse
                    id="basic-navbar-nav"
                    className="justify-content-between"
                >
                    <Nav className="mr-auto">
                        <Nav.Link
                            href={user && user.role == "Admin" ? "/admin/travel-guides" : "/travel-guides"}
                            style={{
                                marginRight: "20px"
                            }}
                        >Travel Guides</Nav.Link>
                        <Nav.Link
                            href={user && user.role == "Admin" ? "/admin/events" : "/events"}
                            style={{
                                marginRight: "20px"
                            }}
                        >Events</Nav.Link>
                        <Nav.Link
                            href={user && user.role == "Admin" ? "/admin/blogs" : "/blogs"}
                            style={{
                                marginRight: "20px"
                            }}
                        >Blogs</Nav.Link>
                        <Nav.Link
                            href={user && user.role == "Admin" ? "/admin/shop" : "/shop"}
                            style={{
                                marginRight: "20px"
                            }}
                        >Shop</Nav.Link>
                        {user && user.role != "Admin" ? (
                            <Nav.Link
                                href="/cart"
                                style={{
                                    marginRight: "20px"
                                }}
                            >Cart</Nav.Link>
                        ) : []}
                    </Nav>
                    {!user && (
                        <Nav className="ml-auto">
                            <Nav.Link href="/signup">Sign Up</Nav.Link>
                            <Nav.Link href="/login">Sign In</Nav.Link>
                        </Nav>
                    )}

                    {user && (
                        <Nav className="ml-auto">
                            <Nav.Link onClick={() => {
                                logOut()
                                navigate("/")
                            }}>Log Out</Nav.Link>

                        </Nav>
                    )}
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
};

export default NavigationBar;

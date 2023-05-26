import React, { useState, useEffect } from 'react';
import { Container, Table, Button, Modal } from 'react-bootstrap';
import UpdateBlog from './UpdateBlog';
import AddBlog from './AddBlog';

const BlogsTable = () => {
    const [blogs, setBlogs] = useState([]);
    const [showEditModal, setShowEditModal] = useState(false);
    const [selectedBlog, setSelectedBlog] = useState(null);
    const [showAddModal, setShowAddModal] = useState(false);

    const handleEdit = (blog) => {
        setSelectedBlog(blog);
        setShowEditModal(true);
    };

    const handleDelete = (id) => {
        fetch(`${process.env.REACT_APP_BACKEND_URL}/api/blogs/${id}`, {
            method: 'DELETE',
        })
            .then(response => response.json())
            .then(data => {
                setBlogs(blogs.filter(blog => blog._id !== id));
            })
            .catch(error => console.error('Error:', error));
    };

    const handleCloseModal = () => {
        setSelectedBlog(null);
        setShowEditModal(false);
    };

    useEffect(() => {
        fetch(`${process.env.REACT_APP_BACKEND_URL}/api/blogs`)
            .then(response => response.json())
            .then(data => setBlogs(data))
            .catch(error => console.error('Error:', error));
    }, []);

    return (
        <Container style={{marginTop: "2rem"}}>
            <Table striped bordered hover>
                <thead>
                    <tr>
                        <th>Blog Name</th>
                        <th>Location</th>
                        <th>Date</th>
                        <th>Description</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {blogs.map((blog) => (
                        <tr key={blog._id}>
                            <td>{blog.blogName}</td>
                            <td>{blog.location}</td>
                            <td>{new Date(blog.date).toLocaleDateString()}</td>
                            <td>{blog.description}</td>
                            <td>
                                <Button variant="primary" size="sm" onClick={() => handleEdit(blog)}>Edit</Button>{" "}
                                <Button variant="danger" size="sm" onClick={() => handleDelete(blog._id)}>Delete</Button>
                            </td>
                        </tr>
                    ))}

                    <tr>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td>
                            <Button variant="primary" size="sm" onClick={() => setShowAddModal(true)} style={{width: "7rem"}}>
                                Add Blog
                            </Button>{" "}
                        </td>
                    </tr>
                </tbody>
            </Table>

            <Modal show={showEditModal} onHide={handleCloseModal}>
                <Modal.Header closeButton>
                    <Modal.Title>Edit Blog</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <UpdateBlog initialValues={selectedBlog} closeModal={handleCloseModal} setBlogs={setBlogs} />
                </Modal.Body>
            </Modal>

            <Modal show={showAddModal} onHide={() => setShowAddModal(false)}>
                <Modal.Header closeButton>
                    <Modal.Title>Add Blog</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <AddBlog closeModal={() => setShowAddModal(false)} setBlogs={setBlogs} />
                </Modal.Body>
            </Modal>
        </Container>
    );
};

export default BlogsTable;

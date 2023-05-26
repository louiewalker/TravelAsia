import React, { useState, useEffect } from 'react';
import { Container, Table, Button, Modal } from 'react-bootstrap';
import UpdateProduct from './UpdateProduct';
import AddProduct from './AddProduct';



function convertToTitleCase(str) {
    return str.toLowerCase().replace(/(?:^|\s)\w/g, function (match) {
        return match.toUpperCase();
    });
}


const ProductsTable = () => {
    const [products, setProducts] = useState([]);
    const [showEditModal, setShowEditModal] = useState(false);
    const [selectedProduct, setSelectedProduct] = useState(null);
    const [showAddModal, setShowAddModal] = useState(false);

    const handleEdit = (product) => {
        setSelectedProduct(product);
        setShowEditModal(true);
    };

    const handleDelete = (id) => {
        fetch(`${process.env.REACT_APP_BACKEND_URL}/api/products/${id}`, {
            method: 'DELETE',
        })
            .then(response => response.json())
            .then(data => {
                // Remove deleted product from state
                setProducts(products.filter(product => product._id !== id));
            })
            .catch(error => console.error('Error:', error));
    };

    const handleCloseModal = () => {
        setSelectedProduct(null);
        setShowEditModal(false);
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
        <Container
            style={{
                marginTop: "2rem"
            }}
        >
            <Table striped bordered hover>
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Type</th>
                        <th>Description</th>
                        <th>Price</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {products.map((product) => (
                        <tr key={product._id}>
                            <td>{product.name}</td>
                            <td>{convertToTitleCase( product.type.replace(/_/g, ' '))}</td>
                            <td>{product.description}</td>
                            <td>{product.price}</td>
                            <td>
                                <Button
                                    variant="primary"
                                    size="sm"
                                    onClick={() => handleEdit(product)}
                                >
                                    Edit
                                </Button>{" "}
                                <Button
                                    variant="danger"
                                    size="sm"
                                    onClick={() => handleDelete(product._id)}
                                >
                                    Delete
                                </Button>
                            </td>
                        </tr>
                    ))}

                    <tr>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td></td>

                        <td>
                            <Button
                                variant="primary"
                                size="sm"
                                onClick={() => setShowAddModal(true)}
                                style={{
                                    width: "7rem"
                                }}
                            >
                                Add Product
                            </Button>{" "}
                        </td>
                    </tr>
                </tbody>
            </Table>

            <Modal show={showEditModal} onHide={handleCloseModal}>
                <Modal.Header closeButton>
                    <Modal.Title>Edit Product</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <UpdateProduct
                        initialValues={selectedProduct}
                        closeModal={handleCloseModal}
                        setProducts={setProducts}
                    />
                </Modal.Body>
            </Modal>

            <Modal show={showAddModal} onHide={() => setShowAddModal(false)}>
                <Modal.Header closeButton>
                    <Modal.Title>Add Product</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <AddProduct
                        closeModal={() => setShowAddModal(false)}
                        setProducts={setProducts}
                    />
                </Modal.Body>
            </Modal>
        </Container>
    );
};

export default ProductsTable;

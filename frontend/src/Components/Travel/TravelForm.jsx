import React, { useState, useEffect } from 'react';
import { Formik, Field, Form, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { Container, Form as BootstrapForm, Button } from 'react-bootstrap';

const TravelForm = ({ initialValues, setTravels, closeModal }) => {
    const [selectedImage, setSelectedImage] = useState(null);
    const [previewImage, setPreviewImage] = useState(null);

    useEffect(() => {
        if (initialValues && initialValues.image) {
            setPreviewImage(`${process.env.REACT_APP_BACKEND_URL}${initialValues.image}`);
        }
    }, [initialValues]);

    const handleImageChange = (event) => {
        if (event.target.files && event.target.files[0]) {
            setSelectedImage(event.target.files[0]);

            const reader = new FileReader();
            reader.onload = function (e) {
                setPreviewImage(e.target.result);
            }
            reader.readAsDataURL(event.target.files[0]);
        }
    };

    const validationSchema = Yup.object().shape({
        title: Yup.string().required('Title is required'),
        summary: Yup.string().required('Summary is required'),
        price: Yup.number().required('Price is required'),
        description: Yup.string().required('Description is required'),
    });

    const onSubmit = (values, { setSubmitting, resetForm }) => {
        const url = initialValues
            ? `${process.env.REACT_APP_BACKEND_URL}/api/travels/${initialValues._id}`
            : `${process.env.REACT_APP_BACKEND_URL}/api/travels`;

        const method = initialValues ? 'PATCH' : 'POST';

        const formData = new FormData();

        Object.keys(values).forEach((key) => {
            if (key !== 'image')
                formData.append(key, values[key]);
        });

        // If there's an image file selected, append it to the form data
        if (selectedImage) {
            formData.append('image', selectedImage);
        }

        fetch(url, {
            method,
            headers: {
                'Accept': 'application/json',
            },
            body: formData,
        })
            .then(response => response.json())
            .then(data => {
                if (initialValues) {
                    setTravels(prevTravels => prevTravels.map(travel => travel._id === data._id ? data : travel));
                    closeModal();
                }else{
                    setTravels(prevTravels => [...prevTravels, data])
                    closeModal();
                }
                resetForm();
                setSubmitting(false);
            })
            .catch((error) => {
                console.error('Error:', error);
                setSubmitting(false);
            });
    };


    return (
        <Container>
            <Formik
                initialValues={initialValues || {
                    title: '',
                    summary: '',
                    price: '',
                    description: '',
                }}
                validationSchema={validationSchema}
                onSubmit={onSubmit}
            >
                {({ isSubmitting }) => (
                    <Form>
                        <BootstrapForm.Group controlId="title">
                            <BootstrapForm.Label>Title</BootstrapForm.Label>
                            <Field name="title" type="text" as={BootstrapForm.Control} />
                            <ErrorMessage name="title" component="div" />
                        </BootstrapForm.Group>

                        <BootstrapForm.Group controlId="image">
                            <BootstrapForm.Label>Image</BootstrapForm.Label>
                            <BootstrapForm.Control type="file" onChange={handleImageChange} />
                            {previewImage && <img
                                src={previewImage}
                                alt="preview"
                                style={{
                                    maxHeight: '400px',
                                    width: '100%',
                                    margin: "1rem 0"
                                }}
                            />}
                        </BootstrapForm.Group>

                        <BootstrapForm.Group controlId="summary">
                            <BootstrapForm.Label>Summary</BootstrapForm.Label>
                            <Field name="summary" type="text" as={BootstrapForm.Control} />
                            <ErrorMessage name="summary" component="div" />
                        </BootstrapForm.Group>

                        <BootstrapForm.Group controlId="price">
                            <BootstrapForm.Label>Price</BootstrapForm.Label>
                            <Field name="price" type="number" as={BootstrapForm.Control} />
                            <ErrorMessage name="price" component="div" />
                        </BootstrapForm.Group>

                        <BootstrapForm.Group controlId="description">
                            <BootstrapForm.Label>Description</BootstrapForm.Label>
                            <Field name="description" as="textarea" rows={3} style={{ width: '100%' }} />
                            <ErrorMessage name="description" component="div" />
                        </BootstrapForm.Group>

                        <Button type="submit" disabled={isSubmitting}>
                            {isSubmitting ? 'Please wait...' : 'Submit'}
                        </Button>
                    </Form>
                )}
            </Formik>
        </Container>
    );
};

export default TravelForm;
import React, { useState, useEffect } from 'react';
import { Formik, Field, Form, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { Container, Form as BootstrapForm, Button } from 'react-bootstrap';

const BlogForm = ({ initialValues, setBlogs, closeModal }) => {
    const [selectedImages, setSelectedImages] = useState([]);
    const [previewImages, setPreviewImages] = useState([]);

    useEffect(() => {
        if (initialValues && initialValues.images) {
            setPreviewImages(initialValues.images.map(img => `${process.env.REACT_APP_BACKEND_URL}${img}`));
        }
    }, [initialValues]);

    const handleImageChange = (event) => {
        if (event.target.files && event.target.files.length > 0) {
            setSelectedImages([...selectedImages, ...event.target.files]);

            const readers = [...event.target.files].map(file => {
                const reader = new FileReader();
                reader.onload = function (e) {
                    setPreviewImages(prev => [...prev, e.target.result]);
                }
                reader.readAsDataURL(file);
                return reader;
            });

            
        }
    };

    const validationSchema = Yup.object().shape({
        blogName: Yup.string().required('Blog name is required'),
        location: Yup.string().required('Location is required'),
        date: Yup.date().required('Date is required'),
        description: Yup.string().required('Description is required'),
    });

    const onSubmit = (values, { setSubmitting, resetForm }) => {
        const url = initialValues
            ? `${process.env.REACT_APP_BACKEND_URL}/api/blogs/${initialValues._id}`
            : `${process.env.REACT_APP_BACKEND_URL}/api/blogs`;

        const method = initialValues ? 'PATCH' : 'POST';

        const formData = new FormData();

        Object.keys(values).forEach((key) => {
            if (key !== 'images')
                formData.append(key, values[key]);
        });

        // If there's an image file selected, append it to the form data
        selectedImages.forEach(image => {
            formData.append('images', image);
        });

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
                    setBlogs(prevBlogs => prevBlogs.map(blog => blog._id === data._id ? data : blog));
                    closeModal();
                }else{
                    setBlogs(prevBlogs => [...prevBlogs, data])
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
                    blogName: '',
                    location: '',
                    date: '',
                    description: '',
                }}
                validationSchema={validationSchema}
                onSubmit={onSubmit}
            >
                {({ isSubmitting }) => (
                    <Form>
                        <BootstrapForm.Group controlId="blogName">
                            <BootstrapForm.Label>Blog Name</BootstrapForm.Label>
                            <Field name="blogName" type="text" as={BootstrapForm.Control} />
                            <ErrorMessage name="blogName" component="div" />
                        </BootstrapForm.Group>

                        <BootstrapForm.Group controlId="images">
                            <BootstrapForm.Label>Images</BootstrapForm.Label>
                            <BootstrapForm.Control 
                                type="file" 
                                onChange={handleImageChange} 
                                multiple
                                value={undefined} 
                            />
                            {previewImages.map((img, index) => (
                                <img
                                    key={index}
                                    src={img}
                                    alt="preview"
                                    style={{
                                        maxHeight: '400px',
                                        width: '100%',
                                        margin: "1rem 0"
                                    }}
                                />
                            ))}
                        </BootstrapForm.Group>

                        <BootstrapForm.Group controlId="location">
                            <BootstrapForm.Label>Location</BootstrapForm.Label>
                            <Field name="location" type="text" as={BootstrapForm.Control} />
                            <ErrorMessage name="location" component="div" />
                        </BootstrapForm.Group>

                        <BootstrapForm.Group controlId="date">
                            <BootstrapForm.Label>Date</BootstrapForm.Label>
                            <Field name="date" type="date" as={BootstrapForm.Control} />
                            <ErrorMessage name="date" component="div" />
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

export default BlogForm;

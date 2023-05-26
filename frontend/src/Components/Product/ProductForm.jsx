import React, { useState, useEffect } from 'react';
import { Formik, Field, Form, ErrorMessage, useField } from 'formik';
import * as Yup from 'yup';
import { Container, Form as BootstrapForm, Button } from 'react-bootstrap';
import Select from 'react-select';

const ProductSelect = ({ name }) => {
    const [field, meta, helpers] = useField(name);
    const options = [
        {
            "value": "electronics",
            "label": "Electronics"
        },
        {
            "value": "clothing_fashion",
            "label": "Clothing & Fashion"
        },
        {
            "value": "home_kitchen",
            "label": "Home & Kitchen"
        },
        {
            "value": "beauty_personal_care",
            "label": "Beauty & Personal Care"
        },
        {
            "value": "sports_fitness",
            "label": "Sports & Fitness"
        },
        {
            "value": "books_stationery",
            "label": "Books & Stationery"
        },
        {
            "value": "health_wellness",
            "label": "Health & Wellness"
        },
        {
            "value": "toys_games",
            "label": "Toys & Games"
        },
        {
            "value": "automotive_tools",
            "label": "Automotive & Tools"
        },
        {
            "value": "food_beverages",
            "label": "Food & Beverages"
        },
        {
            "value": "other",
            "label": "Other"
        }
    ]

    const selectedOption = options.find(option => option.value === field.value);

    return (
        <Select
            {...field}
            options={options}
            isSearchable
            value={selectedOption}
            onChange={(option) => helpers.setValue(option.value)}
            onBlur={() => helpers.setTouched(true)}
        />
    );
};


const ProductForm = ({initialValues, closeModal, setProducts}) => {
    const [selectedImage, setSelectedImage] = useState(null);
    const [previewImage, setPreviewImage] = useState(null);

    const handleImageChange = (event) => {
        if (event.target.files && event.target.files[0]) {
            setSelectedImage(event.target.files[0]);

            const reader = new FileReader();
            reader.onload = function (e) {
                setPreviewImage(e.target.result);
            };
            reader.readAsDataURL(event.target.files[0]);
        }
    };

    const validationSchema = Yup.object().shape({
        name: Yup.string().required('Name is required'),
        type: Yup.string().required('Type is required'),
        description: Yup.string().required('Description is required'),
        price: Yup.number().required('Price is required'),
    });

    const onSubmit = (values, { setSubmitting }) => {

        const isUpdateForm= !!initialValues
        const url = isUpdateForm
            ? `${process.env.REACT_APP_BACKEND_URL}/api/products/${initialValues._id}`
            : `${process.env.REACT_APP_BACKEND_URL}/api/products`;

        const method = isUpdateForm ? 'PATCH' : 'POST';

        const formData = new FormData();

        Object.keys(values).forEach((key) => {
            if (key !== 'image') {
                formData.append(key, values[key]);
            }
        });

        // If there's an image file selected, append it to the form data
        if (values.image) {
            formData.append('image', values.image);
        }

        fetch(url, {
            method,
            headers: {
                Accept: 'application/json',
            },
            body: formData,
        })
            .then((response) => response.json())
            .then((data) => {
                if (isUpdateForm) {
                    setProducts((prevProducts) =>
                        prevProducts.map((product) => (product._id === data._id ? data : product))
                    );
                    closeModal();
                }else{
                    setProducts((prevProducts) => [...prevProducts, data]);
                    closeModal();
                }

                setSubmitting(false);
            })
            .catch((error) => {
                console.error('Error:', error);
                setSubmitting(false);
            });
    };

    useEffect(() => {
        if ( initialValues && initialValues.image) {
            setPreviewImage(`${process.env.REACT_APP_BACKEND_URL}${initialValues.image}`);
        }
    }, [initialValues]);


    return (
        <Container>
            <Formik
                initialValues={ initialValues || {
                    name: '',
                    type: '',
                    description: '',
                    price: '',
                }}
                validationSchema={validationSchema}
                onSubmit={onSubmit}
            >
                {({ isSubmitting, setFieldValue }) => (
                    <Form>
                        <BootstrapForm.Group controlId="name">
                            <BootstrapForm.Label>Name</BootstrapForm.Label>
                            <Field name="name" type="text" as={BootstrapForm.Control} />
                            <ErrorMessage name="name" component="div" />
                        </BootstrapForm.Group>

                        <BootstrapForm.Group controlId="type">
                            <BootstrapForm.Label>Type</BootstrapForm.Label>
                            <ProductSelect name="type" />

                            <ErrorMessage name="type" component="div" />
                        </BootstrapForm.Group>

                        <BootstrapForm.Group controlId="description">
                            <BootstrapForm.Label>Description</BootstrapForm.Label>
                            <Field
                                name="description"
                                as="textarea"
                                rows={3}
                                style={{ width: '100%' }}
                            />
                            <ErrorMessage name="description" component="div" />
                        </BootstrapForm.Group>

                        <BootstrapForm.Group controlId="price">
                            <BootstrapForm.Label>Price</BootstrapForm.Label>
                            <Field name="price" type="number" as={BootstrapForm.Control} />
                            <ErrorMessage name="price" component="div" />
                        </BootstrapForm.Group>

                        <BootstrapForm.Group controlId="image">
                            <BootstrapForm.Label>Image</BootstrapForm.Label>
                            <BootstrapForm.Control
                                name="image"
                                type="file"
                                onChange={(e) => {
                                    handleImageChange(e);
                                    setFieldValue("image", e.currentTarget.files[0]);
                                }}
                            />
                            {previewImage && (
                                <img
                                    src={previewImage}
                                    alt="Preview"
                                    style={{
                                        maxHeight: '400px',
                                        width: '100%',
                                        margin: '1rem 0',
                                    }}
                                />
                            )}
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

export default ProductForm;
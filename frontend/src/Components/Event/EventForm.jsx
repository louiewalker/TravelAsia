import React, { useState, useRef, useEffect } from 'react';
import { Formik, Field, Form, ErrorMessage, useField } from 'formik';
import * as Yup from 'yup';
import {
    Container,
    Form as BootstrapForm,
    Button,
    Image
} from 'react-bootstrap';
import Select from 'react-select';

const EventSelect = ({ name }) => {
    const [field, meta, helpers] = useField(name);
    const options = [
        { value: 'Cultural', label: 'Cultural' },
        { value: 'Musical', label: 'Musical' },
        { value: 'Sports', label: 'Sports' },
        { value: 'Other', label: 'Other' },
    ];




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

const EventForm = ({ initialValues, closeModal, setEvents }) => {
    const isUpdateForm = !!initialValues;

    const [selectedImage, setSelectedImage] = useState(null);
    const [previewImage, setPreviewImage] = useState(null);
    const imageRef = useRef();


    const validationSchema = Yup.object().shape({
        eventName: Yup.string().required('Event Name is required'),
        eventType: Yup.string().required('Event Type is required'),
        location: Yup.string().required('Location is required'),
        date: Yup.date().required('Date is required'),
        startingTime: Yup.string().required('Starting Time is required'),
        price: Yup.number().required('Price is required'),
        description: Yup.string().required('Description is required'),
    });

    const handleImageChange = (e) => {
        if (e.target.files && e.target.files[0]) {
            setSelectedImage(e.target.files[0]);
            let reader = new FileReader();
            reader.readAsDataURL(e.target.files[0]);
            reader.onloadend = function (e) {
                setPreviewImage(reader.result);
            };
        }
    }

    useEffect(() => {
        if ( initialValues && initialValues.image) {
            setPreviewImage(`${process.env.REACT_APP_BACKEND_URL}${initialValues.image}`);
        }
    }, [initialValues]);

    const onSubmit = (values, { setSubmitting }) => {
        const url = isUpdateForm
            ? `${process.env.REACT_APP_BACKEND_URL}/api/events/${initialValues._id}`
            : `${process.env.REACT_APP_BACKEND_URL}/api/events`;
    
        const method = isUpdateForm ? 'PATCH' : 'POST';
    
        const formData = new FormData();
    
        Object.keys(values).forEach((key) => {
            if(key !== 'image')
                formData.append(key, values[key]);
        });

    
        // If there's an image file selected, append it to the form data
        if(values.image){
            formData.append('image', values.image);
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
                if(isUpdateForm){
                    setEvents(prevEvents => prevEvents.map(event => event._id === data._id ? data : event));
                    closeModal();
                }else{
                    setEvents(prevEvents => [...prevEvents, data])
                    closeModal();
                }
    
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
                    eventName: '',
                    eventType: '',
                    location: '',
                    date: '',
                    startingTime: '',
                    price: '',
                    description: '',
                }}
                validationSchema={validationSchema}
                onSubmit={onSubmit}
            >
                {({ isSubmitting, setFieldValue }) => (
                    <Form>
                        <BootstrapForm.Group controlId="eventName">
                            <BootstrapForm.Label>Event Name</BootstrapForm.Label>
                            <Field name="eventName" type="text" as={BootstrapForm.Control} />
                            <ErrorMessage name="eventName" component="div" />
                        </BootstrapForm.Group>

                        <BootstrapForm.Group controlId="eventType">
                            <BootstrapForm.Label>Event Type</BootstrapForm.Label>
                            <EventSelect name="eventType" />
                        </BootstrapForm.Group>

                        <BootstrapForm.Group controlId="location">
                            <BootstrapForm.Label>Location</BootstrapForm.Label>
                            <Field name="location" type="text" as={BootstrapForm.Control} />
                            <ErrorMessage
                                name="location"
                                component="div"
                                style={{
                                    color: 'red',

                                }}
                            ></ErrorMessage>
                        </BootstrapForm.Group>

                        <BootstrapForm.Group controlId="date">
                            <BootstrapForm.Label>Date</BootstrapForm.Label>
                            <Field name="date" type="date" as={BootstrapForm.Control} />
                            <ErrorMessage
                                name="date"
                                component="div"
                                style={{
                                    color: 'red',
                                }}
                            />
                        </BootstrapForm.Group>

                        <BootstrapForm.Group controlId="startingTime">
                            <BootstrapForm.Label>Starting Time</BootstrapForm.Label>
                            <Field
                                name="startingTime"
                                type="time"
                                as={BootstrapForm.Control}
                            />
                            <ErrorMessage
                                name="startingTime"
                                component="div"
                                style={{
                                    color: 'red',
                                }}
                            />
                        </BootstrapForm.Group>

                        <BootstrapForm.Group controlId="price">
                            <BootstrapForm.Label>Price</BootstrapForm.Label>
                            <Field name="price" type="number" as={BootstrapForm.Control} />
                            <ErrorMessage
                                name="price"
                                component="div"
                                style={{
                                    color: 'red',
                                }}
                            />
                        </BootstrapForm.Group>

                        <BootstrapForm.Group controlId="description">
                            <div>
                                <BootstrapForm.Label>Description</BootstrapForm.Label>
                            </div>
                            <Field
                                name="description"
                                as="textarea"
                                rows={3}
                                style={{
                                    width: '100%',
                                }}
                            />
                            <ErrorMessage
                                name="description"
                                component="div"
                                style={{
                                    color: 'red',
                                }}
                            />
                        </BootstrapForm.Group>

                        <BootstrapForm.Group controlId="image" className='mb-3'>
                            <input
                                id="image"
                                name="image"
                                type="file"
                                onChange={(e) => {
                                    handleImageChange(e);
                                    setFieldValue("image", e.currentTarget.files[0]);
                                }}
                                style={{ display: 'none' }}
                                ref={imageRef}
                            />

                            {previewImage && (
                                <Image
                                    src={previewImage}
                                    alt="preview"
                                    style={{
                                        width: "100%"
                                    }}
                                    height="auto"
                                />
                            )}
                            <label
                                htmlFor="image"
                                style={{ 
                                    width: "100",
                                    marginTop: "1rem" 
                                }}
                            >
                                <Button
                                    variant="outline-primary"
                                    type="button"
                                    onClick={() => imageRef.current.click()}
                                    
                                >
                                    {previewImage ? "Change Image": "Upload Image"}
                                </Button>
                            </label>

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

export default EventForm;        
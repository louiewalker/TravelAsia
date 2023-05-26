import React, { useState, useEffect } from 'react';
import { Container, Button } from 'react-bootstrap';
import BlogDisplay from './BlogDisplay';
import Carousel from '../Dashboard/Carousel';

const BlogSlider = ({width}) => {
  const [selectedBlog, setSelectedBlog] = useState(null);
  const [blogs, setBlogs] = useState([]);

  const handleShow = (blog) => {
    setSelectedBlog(blog);
  };

  useEffect(() => {
    fetch(`${process.env.REACT_APP_BACKEND_URL}/api/blogs`)
      .then(response => response.json())
      .then(data => {
        setBlogs(data);
      })
      .catch(error => console.error('Error:', error));
  }, []);

  return (
    <Container style={{ marginTop: "2rem", width: width ? width: "80%" }}>
      {!selectedBlog && (
        <Carousel data={blogs} onClick={handleShow} />
      )}
      {selectedBlog && <BlogDisplay blog={selectedBlog} />}
    </Container>
  );
};

export default BlogSlider;

import React from 'react';
import BlogsSlider from '../../Components/Blog/BlogsSlider';
import Navbar from '../../Components/Dashboard/Navbar';
import Footer from '../../Components/Dashboard/Footer';

const Blogs = () => {
  return (
    <div>
      <div style={{
        minHeight: "100vh"
      }}>
        <Navbar />
        <div>
          <BlogsSlider />
        </div>
      </div>
      <Footer />
    </div >
  );
};

export default Blogs;

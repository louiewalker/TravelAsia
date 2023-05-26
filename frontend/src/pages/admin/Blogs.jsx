import React from 'react';
import BlogsTable from '../../Components/Blog/BlogsTable';
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
          <BlogsTable />
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Blogs;

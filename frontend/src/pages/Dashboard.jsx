import React from 'react';
import Navbar from '../Components/Dashboard/Navbar';
import BlogsSlider from '../Components/Blog/BlogsSlider';
import EventList from '../Components/Event/EventList';
import ProductList from '../Components/Product/ProductList';
import TravelList from '../Components/Travel/TravelList';
import Footer from '../Components/Dashboard/Footer';
import { Container } from 'react-bootstrap'
const Dashboard = () => {
  return (
    <div>
      <Navbar />
      <div>
        <div style={{
          marginTop: "2rem"
        }}>
          <Container>
            <h2>Blogs</h2>
          </Container>
          <BlogsSlider width={"100%"} />
        </div>

        <div style={{
          marginTop: "2rem"
        }}>
          <Container>
            <h2>Events</h2>
          </Container>
          <EventList />
        </div>

        <div style={{
          marginTop: "2rem"
        }}>
          <Container>
            <h2>Products</h2>
          </Container>
          <ProductList />
        </div>

        <div style={{
          marginTop: "2rem"
        }}>
          <Container>
            <h2>Travel Guides</h2>
          </Container>
          <TravelList />
        </div>
        
      </div>
      <Footer
        style={{
          marginTop: "2rem"
        }}
      />
    </div>
  );
};

export default Dashboard;

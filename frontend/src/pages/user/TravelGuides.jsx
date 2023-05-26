import React from 'react';
import TravelList from '../../Components/Travel/TravelList';
import Navbar from '../../Components/Dashboard/Navbar';
import Footer from '../../Components/Dashboard/Footer';

const TravelGuides = () => {
  return (
    <div style={{
      minHeight: "100vh"
    }}>
      <div style={{
        minHeight: "100vh"
      }}>
        <Navbar />
        <div>
          <TravelList />
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default TravelGuides;

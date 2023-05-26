import React from 'react';
import EventList from '../../Components/Event/EventList';
import Navbar from '../../Components/Dashboard/Navbar';
import Footer from '../../Components/Dashboard/Footer';

const TravelGuides = () => {
  return (
    <div>
      <div style={{
        minHeight: "100vh"
      }}>
        <Navbar />
        <div>
          <EventList />
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default TravelGuides;

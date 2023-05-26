import React from 'react';
import EventsTable from '../../Components/Event/EventsTable';
import Navbar from '../../Components/Dashboard/Navbar';
import Footer from '../../Components/Dashboard/Footer';

const TravelGuides = () => {
  return (
    <div >
      <div style={{
        minHeight: "100vh"
      }}>
        <Navbar />
        <div>
          <EventsTable />
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default TravelGuides;

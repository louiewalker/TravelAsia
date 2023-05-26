import React from 'react';
import TravelCards from '../../Components/Travel/TravelCards';
import Navbar from '../../Components/Dashboard/Navbar';
import Footer from '../../Components/Dashboard/Footer';


const TravelGuides = () => {
  return (
    <div>
      <Navbar />
      <div>
        <TravelCards />
      </div>
      <Footer/>
    </div>
  );
};

export default TravelGuides;

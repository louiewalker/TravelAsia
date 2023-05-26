import React from 'react';
import ProductList from '../../Components/Product/ProductList';
import Navbar from '../../Components/Dashboard/Navbar';
import Footer from '../../Components/Dashboard/Footer';

const Shop = () => {
  return (
    <div>
       <div style={{
        minHeight: "100vh"
      }}>
      <Navbar />
      <div>
        <ProductList />
      </div>
      </div>
      <Footer/>
    </div>
  );
}; 

export default Shop;

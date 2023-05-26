import React from 'react';
import ProductsTable from '../../Components/Product/ProductsTable';
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
          <ProductsTable />
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Shop;

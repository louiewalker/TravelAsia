import React from 'react';
import Navbar from '../Components/Dashboard/Navbar';
import Footer from '../Components/Dashboard/Footer';
import CartDisplay from '../Components/Cart/CartDisplay'
const Cart = () => {
  return (
    <div>
      <Navbar />
      <div>
        <CartDisplay/>
      </div>
      <Footer/>
    </div>
  );
};

export default Cart;

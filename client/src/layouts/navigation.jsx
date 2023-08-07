import React from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
const Navigation = ({ children }) => {
  return (
    <>
      <Header />
      {children}
      <Footer />
    </>
  );
};

export default Navigation;

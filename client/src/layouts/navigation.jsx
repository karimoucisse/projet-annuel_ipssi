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

// import React from "react";
// import { accountService } from "../_services/account.service";
// import { useNavigate } from "react-router-dom";

// const Navigation = () => {
//   const navigate = useNavigate();

//   const logout = () => {
//     accountService.logout();
//     navigate('/auth/login');
//   }
//   let nav;
//   if(accountService.isLogged()){
//     nav = (
//       <button onClick={logout}>Logout</button>
//     );
//   } else {
//     nav = "Ma barre de navigation";
//   }

//   return (
//     <div>{nav}</div>
//   );
// };

// export default Navigation;


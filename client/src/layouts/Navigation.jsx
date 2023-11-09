import React, { useEffect, useState } from "react";
import { accountService } from "../_services/account.service";
import { useNavigate } from "react-router-dom";
import Header from "../components/Header";
import Footer from "../components/Footer";

const Navigation = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(null); // Utilisez null comme état initial

  useEffect(() => {
    // Vérifiez l'authentification de manière asynchrone
    const checkAuthentication = async () => {
      if (accountService.isLogged()) {
        setIsAuthenticated(true);
      } else {
        setIsAuthenticated(false);
      }
    };

    checkAuthentication();
  }, []);

  // Affiche le contenu uniquement si l'authentification est résolue
  return (
    <>
      <Header />
      {children}
      <Footer />
    </>
  );
};

export default Navigation;

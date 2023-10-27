import { useEffect, useState } from "react";
import { accountService } from "../_services/account.service";
import { useNavigate } from "react-router-dom";
import Header from "../components/Header";
import Footer from "../components/Footer";

const Navigation = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    if (accountService.isLogged()) {
      setIsAuthenticated(true);
    }
  }, []);

  return (
    <>
      {isAuthenticated && <Header />}
      {children}
      {isAuthenticated && <Footer />}
    </>
  );
};

export default Navigation;

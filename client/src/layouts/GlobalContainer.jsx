import { useEffect, useState } from 'react';
import { accountService } from '../_services/account.service';
import Footer from '../components/Footer';
import Header from '../components/Header';

const GlobalContainer = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    if (accountService.isLogged()) {
      setIsAuthenticated(true);
    }
  }, []);

  return (
    <div>
      {isAuthenticated && <Header />}
      {children}
      {isAuthenticated && <Footer />}
    </div>
  );
};

export default GlobalContainer;

import { useEffect, useState } from 'react';
import { accountService } from '../_services/account.service';
import Footer from '../components/Footer';
import Header from '../components/Header';

const Container = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false); // État pour vérifier l'authentification

  useEffect(() => {
    if (accountService.isLogged()) {
      setIsAuthenticated(true);
    }
  }, [isAuthenticated]);

  return (
    <>
      {isAuthenticated ? (
        <div>
          <Header />
          {children}
          <Footer />
        </div>
      ) : (
        <div>{children}</div>
      )}
    </>
  );
};

export default Container;

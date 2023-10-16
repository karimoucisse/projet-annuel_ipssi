import { accountService } from "../_services/account.service";
import Footer from "../components/Footer";
import Header from "../components/Header";

const Container = ({ children }) => {

  return (
    <>
      {accountService.isLogged() ?
        <div>
          <Header />
          {children}
          <Footer />
        </div>
        :
        <div>
          {children}
        </div>}
    </>
  );
};

export default Container;
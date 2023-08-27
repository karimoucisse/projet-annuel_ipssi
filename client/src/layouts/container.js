import Footer from "../components/Footer";
import Header from "../components/Header";
import Navigation from "./navigation";

const Container = ({children}) => {

  return (
      <div>
        <Navigation />
        <div>
          <Header />
          {children}
          <Footer />
        </div>
      </div>
  );
};

export default Container;
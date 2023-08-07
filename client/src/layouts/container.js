import Navigation from "./navigation";

const Container = ({children}) => {

  return (
      <div>
        <Navigation />
        <div>
          {children}
        </div>
      </div>
  );
};

export default Container;
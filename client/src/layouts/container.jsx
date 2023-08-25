import Navigation from './Navigation';

const Container = ({ children }) => {
  return (
    <div>
      <Navigation>
        <div>{children}</div>
      </Navigation>
    </div>
  );
};

export default Container;

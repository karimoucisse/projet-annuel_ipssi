import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Navigation from '../layout/Navigation';
import Signup from '../pages/Signup';
const Router = () => {
  return (
    <BrowserRouter>
      <Navigation>
        <Routes>
          <Route exact path="/" element={<Signup />} />
        </Routes>
      </Navigation>
    </BrowserRouter>
  );
};

export default Router;

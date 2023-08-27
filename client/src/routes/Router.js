import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Signup from '../pages/Signup';
import Signin from '../pages/Signin';
import Home from '../pages/Home';
import NoMatch from '../pages/NoMatch';
const Router = () => {
  
  return (
    <BrowserRouter>
      <Routes>
        <Route exact path="/" element={<Home />} />
        <Route exact path="/signup" element={<Signup />} />
        <Route exact path="/signin" element={<Signin />} />
        <Route path="*" element={<NoMatch />} />
      </Routes>
    </BrowserRouter>
  );
};

export default Router;

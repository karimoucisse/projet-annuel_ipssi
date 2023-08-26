import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Signup from '../pages/Signup';
import Signin from '../pages/Signin';
import Home from '../pages/Home';
import { ThemeProvider } from '@mui/material';
const Router = () => {
  return (
    <ThemeProvider>
        <BrowserRouter>
          <Routes>
            <Route exact path="/" element={<Home />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/signin" element={<Signin />} />
          </Routes>
        </BrowserRouter>
    </ThemeProvider>
  );
};

export default Router;

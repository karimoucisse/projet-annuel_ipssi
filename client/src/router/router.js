import { BrowserRouter, Routes, Route } from 'react-router-dom';
import NoMatch from './NoMatch';
import Container from '../layouts/container';
import Signin from '../pages/Signin';


const Routeur = () => {
  return (
    <BrowserRouter>
      <Container>
        <Routes>
          <Route path={'/'} element={<Signin />} />
          <Route path="*" element={<NoMatch />} />
        </Routes>
      </Container>
    </BrowserRouter>
  );
};

export default Routeur;

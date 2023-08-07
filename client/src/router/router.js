import { BrowserRouter, Routes, Route } from 'react-router-dom';
import NoMatch from './NoMatch';
import Container from '../layouts/container';
import Main from '../pages/main';

const Routeur = () => {
  return (
    <BrowserRouter>
      <Container>
        <Routes>
          <Route path={'/'} element={<Main />} />
          <Route path="*" element={<NoMatch />} />
        </Routes>
      </Container>
    </BrowserRouter>
  );
};

export default Routeur;

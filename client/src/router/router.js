import { BrowserRouter, Routes, Route } from 'react-router-dom';
import NoMatch from './NoMatch';

const Routeur = () => {
  return (
    <BrowserRouter>
      <Container>
        <Routes>
          <Route path={"/"} element={<Main />} />
          <Route path="*" element={<NoMatch />} />
        </Routes>
      </Container>
    </BrowserRouter>
  );
};

export default Routeur;
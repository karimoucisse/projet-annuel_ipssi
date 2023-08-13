import { BrowserRouter, Routes, Route } from 'react-router-dom';
import NoMatch from './NoMatch';
import Container from '../layouts/container';
import Main from '../pages/main';
import AuthRouter from '../pages/auth/authRouter';
import AuthGuard from '../_helpers/authGuard';
import UserList from '../pages/admin/userList';

const Routeur = () => {
  return (
    <BrowserRouter>
      <Container>
        <Routes>
          <Route path={"/"} element={<Main />} />
          <Route path="/admin/*" element={
            <AuthGuard>
              <UserList />
            </AuthGuard>
          } />
          <Route path="/auth/*" element={<AuthRouter />} />
          <Route path="*" element={<NoMatch />} />
        </Routes>
      </Container>
    </BrowserRouter>
  );
};

export default Routeur;
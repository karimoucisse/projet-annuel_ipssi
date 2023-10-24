import { BrowserRouter, Routes, Route } from 'react-router-dom';
import NoMatch from './NoMatch';
import Container from '../layouts/Container';
import Main from '../pages/main';
import AuthRouter from '../pages/auth/authRouter';
import AuthGuard from '../_helpers/authGuard';
import UserList from '../pages/admin/userList';
import Details from '../pages/details';
import CheckoutSuccess from '../pages/stripe/checkoutSuccess';
import CheckoutFailed from '../pages/stripe/checkoutFailed';
import VisitorGuard from '../_helpers/visitorGuard';
import Profile from '../pages/profile/profile';
import MyDocument from '../pages/profile/storage';

const Routeur = () => {
  return (
    <BrowserRouter>
<<<<<<< HEAD
      <Container>
        <Routes>
          <Route path={"/"} element={
            <AuthGuard>
              <Main />
            </AuthGuard>
          } />
          <Route path={"/details/:fileId"} element={
=======
      {/* <Container> */}
      <Routes>
        <Route
          path={'/'}
          element={
            <AuthGuard>
              <Main />
            </AuthGuard>
          }
        />
        <Route
          path={'/details/:fileId'}
          element={
>>>>>>> f69f19c643f46b4b7d9666f4d619e6b27e1a2179
            <AuthGuard>
              <Details />
            </AuthGuard>
          }
        />
        <Route
          path="/admin/*"
          element={
            <AuthGuard>
              <UserList />
            </AuthGuard>
          }
        />
        <Route
          path="/profile/"
          element={
            <AuthGuard>
              <Profile />
            </AuthGuard>
<<<<<<< HEAD
          } />
          <Route path="/storage/" element={
            <AuthGuard>
              <MyDocument />
            </AuthGuard>
          } />
          <Route path="/checkout-success" element={<CheckoutSuccess />} />
          <Route path="/checkout-failed" element={<CheckoutFailed />} />
          <Route path="/auth/*" element={
=======
          }
        />
        <Route path="/checkout-success" element={<CheckoutSuccess />} />
        <Route path="/checkout-failed" element={<CheckoutFailed />} />
        <Route
          path="/auth/*"
          element={
>>>>>>> f69f19c643f46b4b7d9666f4d619e6b27e1a2179
            <VisitorGuard>
              <AuthRouter />
            </VisitorGuard>
          }
        />
        <Route path="*" element={<NoMatch />} />
      </Routes>
      {/* </Container> */}
    </BrowserRouter>
  );
};

export default Routeur;

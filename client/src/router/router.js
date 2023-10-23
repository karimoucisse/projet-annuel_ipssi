import { BrowserRouter, Routes, Route } from 'react-router-dom';
import NoMatch from './NoMatch';
import Container from '../layouts/container';
import Main from '../pages/main';
import AuthRouter from '../pages/auth/authRouter';
import AuthGuard from '../_helpers/authGuard';
import AdminRouter from '../pages/admin/adminRouter';
import Details from '../pages/details';
import CheckoutSuccess from '../pages/stripe/checkoutSuccess';
import CheckoutFailed from '../pages/stripe/checkoutFailed';
import VisitorGuard from '../_helpers/visitorGuard';
import MyDocument from '../pages/profile/storage';
import ProfileRouter from '../pages/profile/profileRouter';

const Routeur = () => {
  return (
    <BrowserRouter>
      <Container>
        <Routes>
          <Route path={"/"} element={
            <AuthGuard>
              <Main />
            </AuthGuard>
          } />
          <Route path={"/details/:fileId"} element={
            <AuthGuard>
              <Details />
            </AuthGuard>
          } />
          <Route path="/admin/*" element={ // TODO: FAIRE AUTH ADMIN GUARD POUR SECURISER LES ROUTES ADMIN
            <AuthGuard>
              <AdminRouter />
            </AuthGuard>
          } />
          <Route path="/profile/*" element={
            <AuthGuard>
              <ProfileRouter />
            </AuthGuard>
          } />
          <Route path="/storage/" element={
            <AuthGuard>
              <MyDocument />
            </AuthGuard>
          } />
          <Route path="/checkout-success" element={<CheckoutSuccess />} />
          <Route path="/checkout-failed" element={<CheckoutFailed />} />
          <Route path="/auth/*" element={
            <VisitorGuard>
              <AuthRouter />
            </VisitorGuard>
          } />
          <Route path="*" element={<NoMatch />} />
        </Routes>
      </Container>
    </BrowserRouter>
  );
};

export default Routeur;
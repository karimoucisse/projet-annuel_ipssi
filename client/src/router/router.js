import { BrowserRouter, Routes, Route } from "react-router-dom";
import NoMatch from "./NoMatch";
import GlobalContainer from "../layouts/GlobalContainer";
import Main from "../pages/main";
import AuthGuard from "../_helpers/authGuard";
import AdminRouter from "../pages/admin/adminRouter";
import Details from "../pages/details";
import CheckoutSuccess from "../pages/stripe/checkoutSuccess";
import CheckoutFailed from "../pages/stripe/checkoutFailed";
import MyDocument from "../pages/profile/storage";
import ProfileRouter from "../pages/profile/profileRouter";
import LegalInformation from "../pages/InformationsLegal";
import Authentication from "../pages/auth/authentication";
import Subscription from "../pages/auth/subscription";
import AuthAdminGuard from "../_helpers/authAdminGuard";

const Routeur = () => {
  return (
    <BrowserRouter>
      <GlobalContainer>
        <Routes>
          <Route
            path={"/"}
            element={
              <AuthGuard>
                <Main />
              </AuthGuard>
            }
          />
          <Route
            path={"/details/:fileId"}
            element={
              <AuthGuard>
                <Details />
              </AuthGuard>
            }
          />
          <Route
            path="/admin/*"
            element={
              <AuthAdminGuard>
                <AdminRouter />
              </AuthAdminGuard>
            }
          />
          <Route
            path="/profile/*"
            element={
              <AuthGuard>
                <ProfileRouter />
              </AuthGuard>
            }
          />
          <Route
            path="/storage/"
            element={
              <AuthGuard>
                <MyDocument />
              </AuthGuard>
            }
          />
          <Route path="/informations-legales" element={<LegalInformation />} />
          <Route path="/checkout-success" element={<CheckoutSuccess />} />
          <Route path="/checkout-failed" element={<CheckoutFailed />} />
          <Route
            path="/auth/*"
            element={
                <Routes>
                  <Route index element={<Authentication />} />
                  <Route path="login" element={<Authentication />} />
                  <Route path="signup" element={<Subscription />} />
                  <Route path="*" element={<Authentication />} />
                </Routes>
            }
          />
          <Route path="*" element={<NoMatch />} />
        </Routes>
      </GlobalContainer>
    </BrowserRouter>
  );
};

export default Routeur;

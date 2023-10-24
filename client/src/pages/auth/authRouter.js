import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Authentication from './authentication';
import NoMatch from '../../router/NoMatch';
import Subscription from './subscription';
import Signup from '../Signup';

const AuthRouter = () => {
<<<<<<< HEAD
    return (
        <Routes>
            <Route index element={<Authentication />} />
            <Route path="login" element={<Authentication />} />
            <Route path="signup" element={<Subscription />} />
            <Route path="*" element={<NoMatch />} />
        </Routes>
    );
=======
  return (
    <Routes>
      <Route index element={<Authentication />} />
      <Route path="login" element={<Authentication />} />
      {/* <Route path="signup" element={<Subscription />} /> */}
      <Route path="signup" element={<Signup />} />
      <Route path="*" element={<NoMatch />} />
    </Routes>
  );
>>>>>>> f69f19c643f46b4b7d9666f4d619e6b27e1a2179
};

export default AuthRouter;

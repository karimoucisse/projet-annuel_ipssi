import React from "react";
import { accountService } from "../_services/account.service";
import { useNavigate } from "react-router-dom";

const Navigation = () => {
  const navigate = useNavigate();

  const logout = () => {
    accountService.logout();
    navigate('/auth/login');
  }

  return (
      <div>Ici ma nav
        <button onClick={logout}>Logout</button>
      </div>
  );
};

export default Navigation;
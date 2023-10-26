import React from "react";
import { accountService } from "../_services/account.service";
import { useNavigate } from "react-router-dom";

const Navigation = () => {
  const navigate = useNavigate();

  const logout = () => {
    accountService.logout();
    navigate('/auth/login');
  }
  let nav;
  if (accountService.isLogged()) {
    nav = (
      <button onClick={logout}>Logout</button>
    );
  }

  return (
    <div>{nav}</div>
  );
};

export default Navigation;
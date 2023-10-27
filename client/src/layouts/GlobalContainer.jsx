import { useEffect, useState } from "react";
import { accountService } from "../_services/account.service";
import Footer from "../components/Footer";
import Header from "../components/Header";
import { Box, Container } from "@mui/material";
import Navigation from "./Navigation";

const GlobalContainer = ({ children }) => {
  return (
    <>
      <Navigation>{children}</Navigation>
    </>
  );
};

export default GlobalContainer;

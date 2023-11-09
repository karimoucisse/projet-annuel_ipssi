import React, { useEffect, useState } from "react";
import {
  Avatar,
  Box,
  Chip,
  Container,
  Link,
  Stack,
  Typography,
  useTheme,
  IconButton,
  Drawer,
  List,
  ListItem,
  ListItemText,
  Button,  // Importez le bouton
} from "@mui/material";
import ApartmentIcon from "@mui/icons-material/Apartment";
// import PersonIcon from "@mui/icons-material/Person";
import MenuIcon from "@mui/icons-material/Menu";
import { accountService } from "../_services/account.service";
import { Link as RouterLink } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import Logout from "@mui/icons-material/Logout";


const Header = () => {
  const navigate = useNavigate();
  const currentLocation = window.location.pathname;
  const theme = useTheme();
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };
  useEffect(() => {
    console.log("menuOpen a changé :", menuOpen);
    // Vous pouvez ajouter ici tout code qui doit s'exécuter lorsque menuOpen change
  }, [menuOpen]);
  const handleLogout = async () => {
    setMenuOpen(!menuOpen);
    accountService.logout();
    navigate("/auth/login");
  };

  if (!accountService.isLogged()) return null;

  const btnLogoutStyle = {
    color: "#FADF8B",
    backgroundColor: "#1C2930",
    width: "100%",
    display: "flex",
    marginTop: "100%",
  };
  return (
    <Box
      sx={{
        backgroundColor: "white",
        height: "70px",
        px: "100px",
        color: theme.palette.primary.main,
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
      }}
    >
      <Box flex={1}>
        <Link href={`/`} color="inherit">
          <Typography
            variant="h5"
            sx={{
              display: "flex",
              alignItems: "center",
              gap: 1,
              // fontFamily: "MontSerrat",
              fontWeight: "bold",
              textDecoration: "none",
              // textTransform: "uppercase",
            }}
          >
            <ApartmentIcon /> ArchiConnect
          </Typography>

        </Link>
      </Box>
      <Box flex={1} sx={{ display: "flex", justifyContent: "flex-end" }}>
        <IconButton
          onClick={() => toggleMenu()}
          sx={{ marginRight: "10px" }}
          color="inherit"
        >
          <MenuIcon />
        </IconButton>
      </Box>
      <Drawer anchor="right" open={menuOpen} onClose={() => toggleMenu()}>
        <List>
          <ListItem
            button
            component={RouterLink}
            to={`/`}
            sx={currentLocation === "/" ? { backgroundColor: theme.palette.primary.main, color: "white" } : {}}
            onClick={() => toggleMenu()}
          >
            <ListItemText primary="Accueil" />
          </ListItem>
          <ListItem
            button
            component={RouterLink}
            to={`/profile`}
            sx={currentLocation === "/profile" ? { backgroundColor: theme.palette.primary.main, color: "white" } : {}}
            onClick={() => toggleMenu()}
          >
            <ListItemText primary="Mon compte" />
          </ListItem>
          <ListItem
            button
            component={RouterLink}
            to={`/profile/invoices`}
            sx={currentLocation === "/profile/invoices" ? { backgroundColor: theme.palette.primary.main, color: "white" } : {}}
            onClick={() => toggleMenu()}
          >
            <ListItemText primary="Mes factures" />
          </ListItem>
          <ListItem>
            <Button onClick={handleLogout} variant="contained" style={btnLogoutStyle} startIcon={<Logout />}>Déconnexion</Button>
          </ListItem>
        </List>
      </Drawer>
    </Box>
  );
};

export default Header;

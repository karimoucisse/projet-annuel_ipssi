import React from "react";
import { Container, Grid, Typography, Button } from "@mui/material";
import Navigation from "../layouts/navigation";
import "../style/Home.css"; // Assurez-vous d'importer le fichier CSS

const Home = () => {
  return (
    <Navigation>
      <Container>
        {/* <Grid item xs={12} md={6} lg={8} className="image-background"> */}
        <Typography variant="h3" className="image-text">
          Gérez vos fichiers clients en toute simplicité
        </Typography>
        <Typography variant="body2" className="image-text">
          ArchiConnect est une plateforme sécurisée qui vous permet de stocker et de partager vos fichiers avec vos clients.
        </Typography>
        {/* </Grid> */}
      </Container>
    </Navigation>
  );
};

export default Home;

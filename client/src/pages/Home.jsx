import React from "react";
import { Container, Typography } from "@mui/material";
import Navigation from "../layouts/Navigation";
import "../style/Home.css"; // Assurez-vous d'importer le fichier CSS

const styles = {
  homeContainer: {
    minHeight: "100vh",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    position: "relative", // Ajoutez cette ligne pour positionner les éléments enfants
  },
  blurBackground: {
    position: "absolute",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
    backdropFilter: "blur(10px)", // Ajoutez cet effet de flou
    backgroundColor: "rgba(255, 255, 255, 0.5)", // Couleur de fond transparente
    zIndex: -1, // Pour placer cet élément derrière le texte
  },
};

const Home = () => {
  return (
    <Navigation>
      <Container style={styles.homeContainer}>
        {/* Ajoutez l'arrière-plan flou */}
        <div style={styles.blurBackground}></div>
        <Typography variant="h3" className="principal-text">
          Gérez vos fichiers clients en toute simplicité
        </Typography>
        <Typography variant="body2" className="secondary-text">
          ArchiConnect est une plateforme sécurisée qui vous permet de stocker et de partager vos fichiers avec vos clients.
        </Typography>
      </Container>
    </Navigation>
  );
};

export default Home;

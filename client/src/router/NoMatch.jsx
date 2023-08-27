import React from 'react';
import { Container, Typography, Button, Link } from '@mui/material';

const styles = {
  container: {
    // backgroundColor: 'rgba(28, 41, 48, 0.8)', // Couleur d'arrière-plan transparente
    minHeight: '100vh', // Hauteur minimale de la vue
    minWidth: '100vw', // Hauteur minimale de la vue
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    color: '#FADF8B', // Couleur du texte
  },
  title: {
    fontSize: '3rem', // Taille du titre
    marginBottom: '1rem',
    color: '#1C2930', // Couleur du texte
  },
  button: {
    backgroundColor: '#1C2930', // Couleur du button
    color: '#FADF8B', // Couleur du texte

  },
  paragraph: {
    fontSize: '1.5rem', // Taille du paragraphe
    marginBottom: '2rem',
    textAlign: 'center',
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
  }
};

const NoMatch = () => {
  return (
    <Container style={styles.container}>
      <div style={styles.blurBackground}></div>
      <Typography variant="h4" style={styles.title}>
        404 - Page Not Found
      </Typography>
      <Typography variant="body1" style={styles.paragraph}>
        La page que vous recherchez n'existe pas.
      </Typography>
      <Button variant="contained" style={styles.button}>
        <Link href="/" color="inherit">
          Retour à la page d'accueil
        </Link>
      </Button>
    </Container>
  );
};

export default NoMatch;

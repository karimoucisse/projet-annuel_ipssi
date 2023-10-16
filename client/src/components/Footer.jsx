import React from 'react';
import {
  Box,
  Container,
  Grid,
  IconButton,
  Link,
  Stack,
  Typography,
} from '@mui/material';
import PhoneIcon from '@mui/icons-material/Phone';
import MailOutlineIcon from '@mui/icons-material/MailOutline';
import RoomIcon from '@mui/icons-material/Room';

const styles = {
  footerContainer: {
    backgroundColor: '#1c2930',
    color: 'white',
    py: 3,
    bottom: 0,
    width: '100%',
  },
  column: {
    display: 'flex',
    flexDirection: 'column',
  },
  columnWrapper: {
    display: 'flex',
    flexDirection: 'row',
  },
  columnWithMargin: {
    marginRight: '50px',
  },
};

const Footer = () => {
  return (
    <div style={styles.footerContainer}>
      <Box
        sx={{
          backgroundColor: '#1c2930',
          color: 'white',
          py: 3,
        }}
      >
        <Container>
          <Grid container spacing={2}>
            {/* Colonne "Pages" */}
            <Grid item xs={12} md={6} lg={4}>
              <Stack spacing={2}>
                <Typography variant="h6">Pages</Typography>
                <div
                  style={{
                    ...styles.column,
                    ...styles.columnWrapper,
                  }}
                >
                  <div
                    style={{
                      ...styles.column,
                      ...styles.columnWithMargin,
                    }}
                  >
                    <Link href="/" color="inherit" variant="body1">
                      Accueil
                    </Link>
                    <Link href="/storage" color="inherit" variant="body1">
                      Stockage
                    </Link>
                    <Link href="/support" color="inherit" variant="body1">
                      Support
                    </Link>
                  </div>
                  <div style={styles.column}>
                    <Link href="/profile" color="inherit" variant="body1">
                      Compte
                    </Link>
                    <Link href="/favoris" color="inherit" variant="body1">
                      Favoris
                    </Link>
                  </div>
                </div>
              </Stack>
            </Grid>
            {/* Colonne "Coordonnées de contact" au milieu */}
            <Grid item xs={12} md={6} lg={4}>
              <Stack spacing={2}>
                <Typography variant="h6">Coordonnées de contact</Typography>
                <Box display="flex" alignItems="center">
                  <PhoneIcon />
                  <Typography variant="body1" sx={{ ml: 1 }}>
                    +1 123 456 7890
                  </Typography>
                </Box>
                <Box display="flex" alignItems="center">
                  <MailOutlineIcon />
                  <Typography variant="body1" sx={{ ml: 1 }}>
                    <a href="mailto:archiConnect@gmail.com">archiConnect@gmail.com</a>
                  </Typography>
                </Box>
                <Box display="flex" alignItems="center">
                  <RoomIcon />
                  <Typography variant="body1" sx={{ ml: 1 }}>
                    52 Rue John Doe
                  </Typography>
                </Box>
              </Stack>
            </Grid>
            {/* Colonne "Informations légales" à droite */}
            <Grid item xs={12} md={6} lg={4}>
              <Stack spacing={2}>
                <Typography variant="h6">Informations légales</Typography>
                <Link href="/mentions-legales" color="inherit" variant="body1">
                  Mentions légales
                </Link>
                <Link href="/politique-confidentialite" color="inherit" variant="body1">
                  Politique de confidentialité
                </Link>
                <Link href="/conditions-utilisation" color="inherit" variant="body1">
                  Conditions d'utilisation
                </Link>
              </Stack>
            </Grid>
          </Grid>
          {/* Copyright */}
          <Box mt={3} textAlign="center">
            <Typography variant="body2">
              Copyright : © 2023 ArchiConnect. Tous droits réservés.
            </Typography>
          </Box>
        </Container>
      </Box>
    </div>

  );
};

export default Footer;

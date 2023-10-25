import React from 'react';
import { Avatar, Box, Chip, Container, Link, Stack, Typography } from '@mui/material';
import ApartmentIcon from '@mui/icons-material/Apartment';
import PersonIcon from '@mui/icons-material/Person';
import { accountService } from "../_services/account.service";
import { Link as RouterLink } from 'react-router-dom'; // Importez Link de react-router-dom

const Header = () => {
  const currentLocation = window.location.pathname;
  const linkList = [
    {
      text: 'Accueil',
      link: '',
    },
    {
      text: 'Stockage',
      link: 'storage',
    },
    {
      text: 'Support',
      link: 'support',
    },
  ];

  if (!accountService.isLogged()) return null; // Renvoyez null si l'utilisateur n'est pas connecté

  return (
    <Box
      sx={{
        backgroundColor: 'white',
        height: '70px',
        px: '100px',
        color: '#1C2930',
        display: 'flex',
        alignItems: 'center',
      }}
    >
      <Box flex={1}>
        <Link href={`/`} color="inherit">
          <Typography
            variant="h5"
            sx={{
              display: 'flex',
              alignItems: 'center',
              gap: 1,
              fontFamily: 'cursive',
              fontWeight: 'bold',
            }}
          >
            <ApartmentIcon /> ArchiConnect
          </Typography>
        </Link>
      </Box>
      <Stack
        direction="row"
        spacing={4}
        sx={{
          flex: 2,
          color: '#1C2930',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        {linkList.map((item, i) => (
          <Link
            component={RouterLink} // Utilisez le composant RouterLink pour créer un lien
            to={`/${item.link}`} // Utilisez "to" au lieu de "href"
            color="inherit"
            key={i}
            sx={{
              backgroundColor:
                (currentLocation.includes(item.link) && item.link.length > 1) ||
                  (currentLocation === '/' && item.text === 'Accueil')
                  ? '#1C2930'
                  : '#F3F3F3',
              color:
                (currentLocation.includes(item.link) && item.link.length > 1) ||
                  (currentLocation === '/' && item.text === 'Accueil')
                  ? 'white'
                  : '#1C2930',
              padding: '8px 16px',
              borderRadius: '4px',
              textDecoration: 'none',
              '&:hover': {
                backgroundColor: 'white',
                color: '#1C2930',
              },
            }}
          >
            <Typography variant="body1">{item.text}</Typography>
          </Link>
        ))}
      </Stack>
      <Box flex={1} sx={{ display: 'flex', justifyContent: 'flex-end' }}>
        <Link to="/profile" component={RouterLink}> {/* Ajoutez un lien vers /profile */}
          <Chip
            label="Compte"
            avatar={<Avatar><PersonIcon /></Avatar>}
            sx={{ color: '#1C2930', cursor: 'pointer' }}
            size="medium"
          />
        </Link>
      </Box>
    </Box>
  );
};

export default Header;

import React from 'react';
import {
  Avatar,
  Box,
  Chip,
  Container,
  Link,
  Stack,
  Typography,
} from '@mui/material';
import ApartmentIcon from '@mui/icons-material/Apartment';
import PersonIcon from '@mui/icons-material/Person';
import { accountService } from "../_services/account.service";


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
  if (!accountService.isLogged()
  ) return

  return (
    <Box
      sx={{
        backgroundColor: 'white', // Arrière-plan blanc pour tout le header
        height: '70px',
        px: '100px',
        color: '#1C2930', // Texte en #1C2930
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
              fontFamily: 'cursive', // Police
              fontWeight: 'bold',   // Gras
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
          color: '#1C2930', // Texte en #1C2930
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        {linkList.map((item, i) => (
          <Link
            href={`/${item.link}`}
            color="inherit"
            key={i}
            sx={{
              backgroundColor:
                (currentLocation.includes(item.link) && item.link.length > 1) ||
                  (currentLocation === '/' && item.text === 'Accueil')
                  ? '#1C2930' // Couleur de fond lorsque la condition est vraie
                  : '#F3F3F3', // Couleur de fond lorsque la condition est fausse
              color:
                (currentLocation.includes(item.link) && item.link.length > 1) ||
                  (currentLocation === '/' && item.text === 'Accueil')
                  ? 'white' // Couleur du texte lorsque la condition est vraie
                  : '#1C2930', // Couleur du texte lorsque la condition est fausse
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
        <Chip
          label="Compte"
          avatar={<Avatar><PersonIcon /></Avatar>}
          sx={{ color: '#1C2930', cursor: 'pointer' }} // Texte en #1C2930
          size="medium"
        />
      </Box>
    </Box>
  );
};

export default Header;

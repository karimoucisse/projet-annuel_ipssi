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
// mui icons
import PersonIcon from '@mui/icons-material/Person';
const Header = () => {
  const currentLocation = window.location.pathname;
  const linkList = [
    {
      text: 'Accueil',
      link: '',
    },
    {
      text: 'Stockage',
      link: 'stockage',
    },
    {
      text: 'Support',
      link: 'support',
    },
  ];
  return (
    <Box
      sx={{
        backgroundColor: '#1c2930',
        height: '70px',
        px: '100px',
        color: 'white',
        display: 'flex',
        alignItems: 'center',
      }}
    >
      <Box flex={1}>
        <Link href={`/`} color="inherit">
          <Typography
            variant="h5"
            sx={{ display: 'flex', alignItems: 'center', gap: 1 }}
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
          color: 'white',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        {linkList.map((item, i) => (
          <Link href={`/${item.link}`} color="inherit" key={i}>
            <Typography
              color={
                (currentLocation.includes(item.link) && item.link.length > 1) ||
                  (currentLocation === '/' && item.text === 'Accueil')
                  ? 'lightgray'
                  : 'white'
              }
              variant="body1"
            >
              {item.text}
            </Typography>
          </Link>
        ))}
      </Stack>
      <Box flex={1} sx={{ display: 'flex', justifyContent: 'flex-end' }}>
        <Chip
          label="Compte"
          avatar={<Avatar>K</Avatar>}
          sx={{ color: 'white', cursor: 'pointer' }}
          size="medium"
        />
      </Box>
    </Box>
  );
};

export default Header;

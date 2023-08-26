import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Signup from '../pages/Signup';
import Signin from '../pages/Signin';
import Home from '../pages/Home';
import { palette } from '../theme/appTheme';
import { CssBaseline, ThemeProvider, createTheme } from '@mui/material';

const Router = () => {
  const theme = createTheme({
    components: {
      MuiButton: {
        styleOverrides: {
          root: {
            fontSize: '3rem !important', // Update to your desired font size
            backgroundColor: 'red !important',
          },
        },
      },
    },
    palette: {
      // mode: 'light',
      primary: {
        main: '#1c2930',
        // light: will be calculated from palette.primary.main,
        // dark: will be calculated from palette.primary.main,
        // contrastText: will be calculated to contrast with palette.primary.main
      },
      secondary: {
        main: '#E0C2FF',
        light: '#F5EBFF',
        // dark: will be calculated from palette.secondary.main,
        contrastText: '#47008F',
      },
    },
  });
  return (
    <ThemeProvider theme={palette}>
      {/* <CssBaseline /> */}
      <BrowserRouter>
        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/signin" element={<Signin />} />
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  );
};

export default Router;

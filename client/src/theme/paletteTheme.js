import { createTheme } from '@mui/material/styles';
import { light } from '@mui/material/styles/createPalette';

export const palette = {
    mode: 'light',
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
};
import { createTheme } from '@mui/material/styles';
import { palette } from './paletteTheme';

export const theme = createTheme({
    palette: {
        ...palette,
    },
});
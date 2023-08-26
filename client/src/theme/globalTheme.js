import { createTheme } from '@mui/material/styles';
import { light } from '@mui/material/styles/createPalette';
import { palette } from './paletteTheme';

export const theme = createTheme({
  palette: {
    ...palette,
  },
});

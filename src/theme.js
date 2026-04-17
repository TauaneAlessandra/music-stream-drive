import { createTheme } from '@mui/material';

export const premiumTheme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: '#9d50bb',
    },
    background: {
      default: '#09090b',
      paper: 'rgba(255, 255, 255, 0.03)',
    },
  },
  typography: {
    fontFamily: '"Plus Jakarta Sans", "Outfit", sans-serif',
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 12,
          textTransform: 'none',
          fontWeight: 600,
        },
      },
    },
  },
});

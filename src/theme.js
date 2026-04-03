import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    primary: {
      main: '#FF5A5F',
      dark: '#E04E53',
      contrastText: '#ffffff',
    },
    secondary: {
      main: '#00A699',
    },
    background: {
      default: '#F7F7F7',
      paper: '#ffffff',
    },
    text: {
      primary: '#222222',
      secondary: '#717171',
    },
  },
  typography: {
    fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
    h1: { fontSize: '2.125rem', fontWeight: 600 },
    h2: { fontSize: '1.5rem', fontWeight: 600 },
    h3: { fontSize: '1.25rem', fontWeight: 600 },
    body1: { fontSize: '1rem', fontWeight: 400 },
    body2: { fontSize: '0.875rem', fontWeight: 400 },
  },
  shape: {
    borderRadius: 12,
  },
  spacing: 8,
});

export default theme;

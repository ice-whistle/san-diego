import { createTheme } from '@mui/material/styles';
import '@fontsource/figtree';
import '@fontsource/figtree/700.css';

const customTheme = createTheme({
  palette: {
    primary: {
      extraLight: '#c6caf1',
      light: '#4e59bc',
      main: '#2230ac',
      dark: '#172178',
      contrastText: '#fff',
    },
    secondary: {
      extraLight: '#f8cdd6',
      light: '#bc4e59',
      main: '#ac2230',
      dark: '#781721',
      contrastText: '#fff',
    },
  },
  typography: {
    fontFamily: '"Figtree", sans-serif',
    h4: {
      fontWeight: 700,
      color: '#172178',
    },
    h5: {
      color: '#4e59bc',
    },
    h6: {
      color: '#2230ac',
    },
    body1: {
      color: '#172178',
    }
  }
});

export default customTheme;

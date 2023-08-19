import { createTheme } from '@mui/material';

export const theme = createTheme({
  components: {
    MuiButton: {
      styleOverrides: {
        sizeLarge: {
          height: '48px',
        },
      },
    },
  },
  palette: {
    mode: 'light',
    primary: {
      main: '#eb6200',
    },
    orange: {
      10: '#fff2e8',
      20: '#ffd9be',
      30: '#ffb784',
      40: '#ff83eb',
      50: '#eb6200',
      60: '#ba4e00',
      70: '#8a3800',
      80: '#5e2900',
      90: '#3e1a00',
      100: '#231000',
    },
    gray: {
      10: '#F2F4F8',
      20: '#DDE1E6',
      30: '#C1C7CD',
      40: '#A2A9B0',
      50: '#878D96',
      60: '#697077',
      70: '#4D5358',
      80: '#343A3F',
      90: '#21272A',
      100: '#121619',
    },
  },
});

type Color = {
  10: string;
  20: string;
  30: string;
  40: string;
  50: string;
  60: string;
  70: string;
  80: string;
  90: string;
  100: string;
};

declare module '@mui/material/styles' {
  interface Palette {
    orange: Color;
    gray: Color;
  }
  interface PaletteOptions {
    orange: Color;
    gray: Color;
  }
}

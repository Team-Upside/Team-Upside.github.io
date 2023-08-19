import { createTheme } from '@mui/material';

export const theme = createTheme({
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
  },
});

type Orange = {
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
    orange: Orange;
  }
  interface PaletteOptions {
    orange: Orange;
  }
}

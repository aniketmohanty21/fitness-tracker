// src/theme.js
import { extendTheme } from '@chakra-ui/react';

const theme = extendTheme({
  colors: {
    brand: {
      50: '#e3f9f2',
      100: '#c1eedd',
      200: '#9fe3c8',
      300: '#7dd8b3',
      400: '#5bcd9e',
      500: '#3bb389', // main brand color
      600: '#2b8c6a',
      700: '#1b654b',
      800: '#0b3e2c',
      900: '#00170d',
    },
  },
  fonts: {
    heading: `'Poppins', sans-serif`,
    body: `'Inter', sans-serif`,
  },
  styles: {
    global: {
      body: {
        bg: 'gray.50',
        color: 'gray.800',
      },
    },
  },
});

export default theme;

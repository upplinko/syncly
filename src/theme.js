import { extendTheme } from '@chakra-ui/react';

const theme = extendTheme({
  fonts: {
    heading: "'Plus Jakarta Sans', 'Inter', sans-serif",
    body: "'Poppins', 'Inter', sans-serif"
  },
  colors: {
    syncly: {
      primary: '#1A365D',    // Deep Navy Blue
      secondary: '#2C5282',  // Lighter Navy
      accent: '#4299E1',     // Elegant Blue
      background: '#F7FAFC', // Soft Light Gray-Blue
      muted: '#718096'       // Gray for secondary text
    }
  },
  components: {
    Button: {
      baseStyle: {
        fontFamily: "'Inter', sans-serif",
        _hover: {
          transform: 'translateY(-2px)',
          boxShadow: 'md'
        }
      },
      variants: {
        solid: {
          bg: 'syncly.accent',
          color: 'white',
          _hover: {
            bg: 'syncly.primary'
          }
        },
        outline: {
          borderColor: 'syncly.primary',
          color: 'syncly.primary',
          _hover: {
            bg: 'syncly.primary',
            color: 'white'
          }
        }
      }
    }
  },
  styles: {
    global: {
      body: {
        bg: 'syncly.background',
        color: 'gray.800',
        fontFamily: "'Poppins', 'Inter', sans-serif"
      },
      h1: {
        fontFamily: "'Plus Jakarta Sans', 'Inter', sans-serif"
      },
      h2: {
        fontFamily: "'Plus Jakarta Sans', 'Inter', sans-serif"
      },
      h3: {
        fontFamily: "'Plus Jakarta Sans', 'Inter', sans-serif"
      }
    }
  }
});

export default theme;

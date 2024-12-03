import { extendTheme } from '@chakra-ui/react';

const theme = extendTheme({
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
        color: 'gray.800'
      }
    }
  }
});

export default theme;

import React from 'react';
import Navbar from './Navbar';
import Footer from './Footer';
import { Box } from '@chakra-ui/react';

const Layout = ({ children }) => {
  return (
    <Box>
      <Navbar />
      <Box mt="72px">
        {children}
      </Box>
      <Footer />
    </Box>
  );
};

export default Layout;
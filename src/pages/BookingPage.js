import React from 'react';
import { Box, Heading, VStack } from '@chakra-ui/react';

function BookingPage() {
  return (
    <Box maxWidth="container.md" mx="auto" p={6}>
      <VStack spacing={6} align="stretch">
        <Heading>Book a Meeting</Heading>
        {/* Calendar Component */}
        {/* Time Slot Selection */}
      </VStack>
    </Box>
  );
}

export default BookingPage;

import React from 'react';
import { Box, Grid, GridItem } from '@chakra-ui/react';

function DashboardPage() {
  return (
    <Grid templateColumns="200px 1fr" gap={4}>
      {/* Sidebar Navigation */}
      <GridItem bg="gray.100" p={4}>
        {/* Navigation Items */}
      </GridItem>

      {/* Main Dashboard Content */}
      <GridItem bg="white" p={6}>
        {/* Dashboard Widgets */}
      </GridItem>
    </Grid>
  );
}

export default DashboardPage;

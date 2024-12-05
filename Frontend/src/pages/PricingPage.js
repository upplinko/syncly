import React from 'react';
import { 
  Box, 
  VStack, 
  Heading, 
  Text, 
  Flex, 
  Button, 
  Container, 
  Badge,
  Icon,
  HStack,
  Divider,
  SimpleGrid
} from '@chakra-ui/react';
import { 
  RiCheckLine, 
  RiStarLine 
} from 'react-icons/ri';

const PricingCard = ({ 
  title, 
  price, 
  features, 
  description,
  isPopular = false, 
  isFreeTier = false 
}) => {
  return (
    <Box 
      bg="white" 
      p={8} 
      borderRadius="xl" 
      border="1px solid"
      borderColor="gray.200"
      boxShadow="md"
      position="relative"
      transition="all 0.3s ease"
      _hover={{
        transform: 'translateY(-5px)',
        boxShadow: 'lg'
      }}
    >
      {isPopular && (
        <Badge 
          position="absolute" 
          top={4} 
          right={4} 
          colorScheme="green"
        >
          Most Popular
        </Badge>
      )}
      
      <VStack spacing={6} align="start" width="full">
        <Flex 
          width="full" 
          justifyContent="space-between" 
          alignItems="center"
        >
          <Heading 
            as="h3" 
            size="lg" 
            color="gray.800"
          >
            {title}
          </Heading>
        </Flex>
        
        <Text color="gray.500" mb={4}>
          {description}
        </Text>
        
        <Flex align="baseline" width="full">
          <Heading 
            as="h2" 
            size="2xl" 
            mr={2}
            bgGradient="linear(to-r, #179c5f, #46cc6b)"
            bgClip="text"
          >
            {price === 0 ? 'Free' : `$${price}`}
          </Heading>
          {price !== 0 && (
            <Text color="gray.500">/ month</Text>
          )}
        </Flex>
        
        <VStack spacing={3} align="start" width="full" mt={4}>
          {features.map((feature, index) => (
            <HStack key={index} spacing={2} width="full">
              <Icon 
                as={RiCheckLine} 
                color="green.500" 
                w={5} 
                h={5}
              />
              <Text>{feature}</Text>
            </HStack>
          ))}
        </VStack>
        
        <Button 
          width="full"
          mt={6}
          size="lg"
          variant="outline"
          borderColor="green.500"
          color="green.500"
          _hover={{
            bg: 'green.50',
            borderColor: 'green.600'
          }}
        >
          {isFreeTier ? 'Get Started' : 'Choose Plan'}
        </Button>
      </VStack>
    </Box>
  );
};

const PricingPage = () => {
  return (
    <Box 
      bg="gray.50" 
      minHeight="100vh" 
      pt={36}
      pb={20}
    >
      <Container maxW="container.xl">
        <VStack spacing={12} textAlign="center" mb={16}>
          <Heading 
            as="h1" 
            size="2xl" 
            lineHeight="1.2"
            color="gray.800"
          >
            Simple, Transparent{' '}
            <Text 
              as="span" 
              display="inline" 
              bgGradient="linear(to-r, #179c5f, #46cc6b)"
              bgClip="text"
            >
              Pricing
            </Text>
          </Heading>
          
          <Text 
            fontSize="xl" 
            color="gray.600" 
            maxW="700px"
          >
            Choose a plan that fits your team's unique needs. 
            No hidden fees, no complicated tiers.
          </Text>
        </VStack>
        
        <SimpleGrid 
          columns={{ base: 1, md: 3 }}
          spacing={8}
          mb={16}
        >
          {/* Free Tier */}
          <PricingCard 
            title="Starter"
            price={0}
            description="Perfect for individuals and small teams"
            isFreeTier={true}
            features={[
              'Single User Account',
              'Basic Scheduling',
              'Limited Integrations',
              'Community Support'
            ]}
          />
          
          {/* Pro Tier */}
          <PricingCard 
            title="Pro"
            price={29}
            description="Ideal for growing teams and businesses"
            isPopular={true}
            features={[
              'Up to 5 Team Members',
              'Advanced Scheduling',
              'AI Recommendations',
              'Team Collaboration',
              'Priority Email Support'
            ]}
          />
          
          {/* Enterprise Tier */}
          <PricingCard 
            title="Enterprise"
            price={99}
            description="Comprehensive solution for large organizations"
            features={[
              'Unlimited Team Members',
              'Custom Integrations',
              'Advanced Analytics',
              'Dedicated Account Manager',
              '24/7 Premium Support'
            ]}
          />
        </SimpleGrid>
        
        <VStack spacing={8} textAlign="center">
          <Divider />
          
          <Heading 
            as="h2" 
            size="xl" 
            color="gray.800"
          >
            Why Syncly?
          </Heading>
          
          <SimpleGrid 
            columns={{ base: 1, md: 4 }}
            spacing={8}
            width="full"
          >
            <VStack spacing={4} align="center">
              <Icon as={RiStarLine} w={10} h={10} color="green.500" />
              <Heading size="md" color="gray.800">AI-Powered</Heading>
              <Text color="gray.600" textAlign="center">
                Intelligent scheduling recommendations
              </Text>
            </VStack>
            
            <VStack spacing={4} align="center">
              <Icon as={RiStarLine} w={10} h={10} color="green.500" />
              <Heading size="md" color="gray.800">Flexible</Heading>
              <Text color="gray.600" textAlign="center">
                Adaptable to your unique workflow
              </Text>
            </VStack>
            
            <VStack spacing={4} align="center">
              <Icon as={RiStarLine} w={10} h={10} color="green.500" />
              <Heading size="md" color="gray.800">Secure</Heading>
              <Text color="gray.600" textAlign="center">
                Enterprise-grade data protection
              </Text>
            </VStack>
            
            <VStack spacing={4} align="center">
              <Icon as={RiStarLine} w={10} h={10} color="green.500" />
              <Heading size="md" color="gray.800">Scalable</Heading>
              <Text color="gray.600" textAlign="center">
                Grows with your business needs
              </Text>
            </VStack>
          </SimpleGrid>
        </VStack>
      </Container>
    </Box>
  );
};

export default PricingPage;

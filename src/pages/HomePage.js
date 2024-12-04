import React from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Box, 
  VStack, 
  Flex, 
  Heading, 
  Text, 
  Button, 
  HStack, 
  Grid, 
  GridItem, 
  Tag, 
  TagLabel,
  Icon
} from '@chakra-ui/react';
import { 
  RiStarLine, 
  RiArrowRightLine, 
  RiPlayCircleLine, 
  RiCalendarCheckLine, 
  RiTeamLine, 
  RiTimeLine, 
  RiCloudLine 
} from 'react-icons/ri';
import { motion } from 'framer-motion';

// Background animation variants
const backgroundVariants = {
  initial: { 
    opacity: 0.6,
    scale: 1,
    background: 'linear-gradient(135deg, rgba(23,156,95,0.05) 0%, rgba(70,204,107,0.05) 100%)'
  },
  animate: {
    opacity: [0.6, 0.7, 0.6],
    scale: [1, 1.02, 1],
    background: [
      'linear-gradient(135deg, rgba(23,156,95,0.05) 0%, rgba(70,204,107,0.05) 100%)',
      'linear-gradient(135deg, rgba(70,204,107,0.08) 0%, rgba(23,156,95,0.08) 100%)',
      'linear-gradient(135deg, rgba(23,156,95,0.05) 0%, rgba(70,204,107,0.05) 100%)'
    ],
    transition: {
      duration: 6,
      ease: 'easeInOut',
      repeat: Infinity,
      repeatType: 'loop'
    }
  }
};

const backgroundElementVariants = {
  initial: { 
    opacity: 0,
    y: 50,
    rotate: 0
  },
  animate: {
    opacity: [0, 0.2, 0],
    y: [50, -50, 50],
    rotate: [0, 15, -15, 0],
    transition: {
      duration: 8,
      ease: 'easeInOut',
      repeat: Infinity,
      repeatType: 'loop'
    }
  }
};

const FeatureCard = ({ icon, title, description }) => (
  <Box 
    bg="white" 
    p={6} 
    borderRadius="xl" 
    border="1px solid"
    borderColor="gray.200"
    boxShadow="md"
    transition="all 0.3s ease"
    position="relative"
    overflow="hidden"
    _hover={{
      transform: 'translateY(-10px)',
      boxShadow: 'xl',
      bgGradient: "linear(to-r, #179c5f, #46cc6b)",
    }}
  >
    <VStack 
      spacing={4} 
      align="start"
      position="relative"
      zIndex="10"
      _hover={{
        '& > *': {
          color: 'white'
        }
      }}
    >
      <Icon 
        as={icon}
        w={10} 
        h={10}
        color="syncly.primary"
        transition="color 0.3s ease"
        _hover={{
          color: "white"
        }}
      />
      <Heading 
        as="h3" 
        size="md" 
        mb={2}
        color="gray.800"
        transition="color 0.3s ease"
        _hover={{
          color: "white"
        }}
      >
        {title}
      </Heading>
      <Text
        color="gray.600"
        transition="color 0.3s ease"
        _hover={{
          color: "white"
        }}
      >
        {description}
      </Text>
    </VStack>
  </Box>
);

function HomePage() {
  const navigate = useNavigate();
  return (
    <Box 
      bg="gray.50" 
      minHeight="100vh" 
      position="relative" 
      overflow="hidden"
      color="gray.800"
      pt="0"
    >
      {/* Gradient Background */}
      <Box
        position="absolute"
        top="-72px"
        left="0"
        right="0"
        bottom="0"
        bg="gray.50"
        zIndex="0"
      />

      {/* Hero Section */}
      <Box 
        position="relative" 
        width="full" 
        minHeight="100vh" 
        overflow="hidden"
      >
        <motion.div
          initial="initial"
          animate="animate"
          variants={backgroundVariants}
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            zIndex: -1,
            background: 'linear-gradient(135deg, rgba(23,156,95,0.05) 0%, rgba(70,204,107,0.05) 100%)'
          }}
        />
        
        {/* Subtle animated background elements */}
        <motion.div
          initial="initial"
          animate="animate"
          variants={backgroundElementVariants}
          style={{
            position: 'absolute',
            top: '10%',
            right: '10%',
            width: '200px',
            height: '200px',
            background: 'rgba(70,204,107,0.05)',
            borderRadius: '50%',
            filter: 'blur(80px)',
            zIndex: -2
          }}
        />
        
        <motion.div
          initial="initial"
          animate="animate"
          variants={backgroundElementVariants}
          style={{
            position: 'absolute',
            bottom: '10%',
            left: '10%',
            width: '250px',
            height: '250px',
            background: 'rgba(23,156,95,0.05)',
            borderRadius: '50%',
            filter: 'blur(80px)',
            zIndex: -2
          }}
        />

        <Flex 
          maxW="container.xl"
          mx="auto"
          px={4}
          direction={{ base: 'column', md: 'row' }}
          align="center" 
          justify="center"  
          minHeight="calc(100vh)"  
          pb={16}
          gap={12}
          pt={0}
          color="gray.800"
          textAlign={{ base: 'center', md: 'left' }}
          position="relative"
          zIndex={1}
        >
          {/* Left Content */}
          <VStack 
            align={{ base: 'center', md: 'start' }}
            spacing={6} 
            maxW="500px" 
            width={{ base: '100%', md: '50%' }}
            pr={{ md: 10 }}
            mx="auto"
          >
            {/* Trending Tag */}
            <Tag 
              size="lg" 
              variant="subtle" 
              bg="linear-gradient(to right, #179c5f, #46cc6b)"
              color="white"
              mb={4}
            >
              <RiStarLine style={{ marginRight: '8px', color: 'white' }} />
              <TagLabel>Trending Scheduling Platform</TagLabel>
            </Tag>

            {/* Headline */}
            <Heading 
              as="h1" 
              size="3xl" 
              lineHeight="1.2"
              mb={4}
              color="gray.800"
            >
              Scheduling
              <Text 
                as="span" 
                display="block" 
                bgGradient="linear(to-r, #179c5f, #46cc6b)"
                bgClip="text"
              >
                Made Effortless
              </Text>
            </Heading>

            {/* Subtext */}
            <Text 
              fontSize="xl" 
              color="gray.600"
              mb={6}
            >
              Revolutionize your time management with Syncly's AI-powered 
              scheduling solution. Experience intelligent planning, 
              seamless integrations, and an intuitive interface that adapts to your 
              professional rhythm.
            </Text>

            {/* CTA Buttons */}
            <HStack 
              spacing={4} 
              width="full" 
              justify={{ base: 'center', md: 'start' }}
            >
              <Button 
                size="lg"
                bgGradient="linear(to-r, #179c5f, #46cc6b)"
                color="white"
                _hover={{
                  bgGradient: "linear(to-r, #46cc6b, #179c5f)",
                  transform: 'translateY(-2px)'
                }}
                rightIcon={<RiArrowRightLine />}
                onClick={() => navigate('/signup')}
              >
                Get Started
              </Button>
              <Button 
                size="lg"
                variant="outline"
                borderColor="gray.300"
                color="gray.700"
                _hover={{
                  bg: 'gray.100',
                  borderColor: 'gray.400'
                }}
                leftIcon={<RiPlayCircleLine />}
                onClick={() => navigate('/demo')}
              >
                Watch Demo
              </Button>
            </HStack>
          </VStack>

          {/* Right Content */}
          <VStack 
            spacing={8} 
            maxW="600px" 
            width={{ base: '100%', md: '50%' }}
            position="relative"
            mx="auto"
          >
            {/* Feature Grid */}
            <Grid 
              templateColumns={{ base: '1fr', md: 'repeat(2, 1fr)' }}
              gap={6} 
              width="100%"
              position="relative"
            >
              <GridItem>
                <FeatureCard 
                  icon={RiCalendarCheckLine}
                  title="Smart Scheduling"
                  description="AI-powered calendar management that learns and adapts for you."
                />
              </GridItem>
              <GridItem>
                <FeatureCard 
                  icon={RiTeamLine}
                  title="Team Collaboration"
                  description="Seamless coordination and scheduling across your entire team."
                />
              </GridItem>
              <GridItem>
                <FeatureCard 
                  icon={RiTimeLine}
                  title="Time Optimization"
                  description="Intelligent algorithms to maximize productivity and minimize conflicts."
                />
              </GridItem>
              <GridItem>
                <FeatureCard 
                  icon={RiCloudLine}
                  title="Cloud Sync"
                  description="Real-time synchronization across all your devices and platforms."
                />
              </GridItem>
            </Grid>
          </VStack>
        </Flex>
      </Box>
    </Box>
  );
}

export default HomePage;

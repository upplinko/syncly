import React from 'react';
import { motion } from 'framer-motion';
import { 
  Box, 
  VStack, 
  HStack, 
  Heading, 
  Text, 
  Button, 
  Container, 
  Flex, 
  Icon,
  Grid,
  GridItem,
  Spacer,
  Image,
  Tag,
  TagLabel,
  Divider,
  Link,
  Stack
} from '@chakra-ui/react';
import { 
  RiCalendarCheckLine, 
  RiTeamLine, 
  RiTimeLine, 
  RiCloudLine,
  RiStarLine,
  RiRocketLine,
  RiTwitterFill,
  RiLinkedinFill,
  RiGithubFill,
  RiFacebookFill
} from 'react-icons/ri';

const Navbar = () => {
  return (
    <Box 
      position="fixed" 
      top="0" 
      left="0" 
      right="0" 
      zIndex="100" 
      bg="rgba(255,255,255,0.8)" 
      backdropFilter="blur(10px)"
      boxShadow="sm"
    >
      <Container maxW="container.xl">
        <Flex 
          align="center" 
          justify="space-between" 
          py={4}
        >
          {/* Logo */}
          <Flex align="center" cursor="pointer">
            <Image 
              src="/images/logolight.svg" 
              alt="Syncly Logo" 
              height="40px" 
              objectFit="contain"
              mr={2}
            />
          </Flex>

          {/* Navigation Links */}
          <HStack spacing={6} color="syncly.muted">
            <Text 
              cursor="pointer" 
              _hover={{ color: 'syncly.accent' }}
            >
              Features
            </Text>
            <Text 
              cursor="pointer" 
              _hover={{ color: 'syncly.accent' }}
            >
              Pricing
            </Text>
            <Text 
              cursor="pointer" 
              _hover={{ color: 'syncly.accent' }}
            >
              About
            </Text>
          </HStack>

          {/* CTA Buttons */}
          <HStack spacing={4}>
            <Button 
              variant="outline" 
              borderColor="syncly.primary"
              color="syncly.primary"
            >
              Login
            </Button>
            <Button 
              bg="syncly.primary" 
              color="white"
              _hover={{
                bg: 'syncly.secondary'
              }}
            >
              Get Started
            </Button>
          </HStack>
        </Flex>
      </Container>
    </Box>
  );
};

const FeatureCard = ({ icon, title, description }) => (
  <Box 
    bg="white" 
    p={6} 
    borderRadius="xl" 
    boxShadow="premium" 
    transition="all 0.3s ease"
    _hover={{
      transform: 'translateY(-10px)',
      boxShadow: '2xl'
    }}
  >
    <VStack spacing={4} align="start">
      <Icon 
        as={icon} 
        w={10} 
        h={10} 
        color="syncly.accent" 
      />
      <Heading size="md" color="syncly.primary">{title}</Heading>
      <Text color="syncly.muted">{description}</Text>
    </VStack>
  </Box>
);

// Footer Component
const Footer = () => {
  return (
    <Box 
      bg="syncly.primary" 
      color="white" 
      py={16}
    >
      <Container maxW="container.xl">
        <Grid 
          templateColumns={{ 
            base: '1fr', 
            md: 'repeat(4, 1fr)' 
          }} 
          gap={8}
        >
          {/* Logo and Description */}
          <GridItem>
            <VStack align="start" spacing={4}>
              <Image 
                src="/images/logodark.svg" 
                alt="Syncly Logo" 
                height="40px" 
                objectFit="contain"
              />
              <Text fontSize="sm" color="whiteAlpha.700">
                Syncly transforms your scheduling workflow with AI-powered precision 
                and seamless integrations.
              </Text>
              <HStack spacing={4}>
                <Link href="#" isExternal>
                  <Icon as={RiTwitterFill} w={6} h={6} color="whiteAlpha.800" _hover={{ color: 'white' }} />
                </Link>
                <Link href="#" isExternal>
                  <Icon as={RiLinkedinFill} w={6} h={6} color="whiteAlpha.800" _hover={{ color: 'white' }} />
                </Link>
                <Link href="#" isExternal>
                  <Icon as={RiGithubFill} w={6} h={6} color="whiteAlpha.800" _hover={{ color: 'white' }} />
                </Link>
                <Link href="#" isExternal>
                  <Icon as={RiFacebookFill} w={6} h={6} color="whiteAlpha.800" _hover={{ color: 'white' }} />
                </Link>
              </HStack>
            </VStack>
          </GridItem>

          {/* Product Links */}
          <GridItem>
            <VStack align="start" spacing={4}>
              <Heading size="sm" mb={2}>Product</Heading>
              <Link color="whiteAlpha.700" _hover={{ color: 'white' }}>Features</Link>
              <Link color="whiteAlpha.700" _hover={{ color: 'white' }}>Pricing</Link>
              <Link color="whiteAlpha.700" _hover={{ color: 'white' }}>Integrations</Link>
              <Link color="whiteAlpha.700" _hover={{ color: 'white' }}>Demo</Link>
            </VStack>
          </GridItem>

          {/* Company Links */}
          <GridItem>
            <VStack align="start" spacing={4}>
              <Heading size="sm" mb={2}>Company</Heading>
              <Link color="whiteAlpha.700" _hover={{ color: 'white' }}>About Us</Link>
              <Link color="whiteAlpha.700" _hover={{ color: 'white' }}>Careers</Link>
              <Link color="whiteAlpha.700" _hover={{ color: 'white' }}>Press</Link>
              <Link color="whiteAlpha.700" _hover={{ color: 'white' }}>Contact</Link>
            </VStack>
          </GridItem>

          {/* Legal Links */}
          <GridItem>
            <VStack align="start" spacing={4}>
              <Heading size="sm" mb={2}>Legal</Heading>
              <Link color="whiteAlpha.700" _hover={{ color: 'white' }}>Terms of Service</Link>
              <Link color="whiteAlpha.700" _hover={{ color: 'white' }}>Privacy Policy</Link>
              <Link color="whiteAlpha.700" _hover={{ color: 'white' }}>Cookie Policy</Link>
              <Link color="whiteAlpha.700" _hover={{ color: 'white' }}>GDPR</Link>
            </VStack>
          </GridItem>
        </Grid>

        {/* Copyright */}
        <Divider my={8} borderColor="whiteAlpha.300" />
        <Flex 
          direction={{ base: 'column', md: 'row' }} 
          align="center" 
          justify="space-between"
        >
          <Text fontSize="sm" color="whiteAlpha.700">
            {new Date().getFullYear()} Syncly. All rights reserved.
          </Text>
          <HStack spacing={4} mt={{ base: 4, md: 0 }}>
            <Link color="whiteAlpha.700" _hover={{ color: 'white' }} fontSize="sm">
              Privacy Policy
            </Link>
            <Link color="whiteAlpha.700" _hover={{ color: 'white' }} fontSize="sm">
              Terms of Service
            </Link>
          </HStack>
        </Flex>
      </Container>
    </Box>
  );
};

function HomePage() {
  return (
    <Box 
      bg="syncly.background" 
      minHeight="100vh" 
      position="relative" 
      overflow="hidden"
    >
      {/* Navbar */}
      <Navbar />

      {/* Gradient Background */}
      <Box
        position="absolute"
        top="0"
        left="0"
        right="0"
        bottom="0"
        className="animated-gradient"
        zIndex="0"
      />

      {/* Hero Section */}
      <Container maxW="container.xl" position="relative" zIndex="10" pt={20}>
        <Flex 
          direction={{ base: 'column', md: 'row' }}
          align="center" 
          justify="space-between" 
          minHeight="calc(100vh - 80px)"
          pt={20}
          pb={20}
          gap={12}
        >
          {/* Left Content */}
          <VStack 
            align="start" 
            spacing={6} 
            maxW="500px" 
            pr={{ md: 10 }}
          >
            {/* Trending Tag */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <Tag 
                size="lg" 
                colorScheme="blue" 
                borderRadius="full"
                mb={4}
              >
                <RiStarLine style={{ marginRight: '8px' }} />
                <TagLabel>Trending Scheduling Platform</TagLabel>
              </Tag>
            </motion.div>

            {/* Headline */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7 }}
              style={{ width: '100%' }}
            >
              <Heading 
                as="h1" 
                size="3xl" 
                lineHeight="shorter"
                fontWeight="bold"
                color="gray.800"
                mb={4}
              >
                Intelligent Scheduling 
                <Text 
                  as="span" 
                  display="block"
                  color="syncly.accent"
                >
                  Made Effortless
                </Text>
              </Heading>
            </motion.div>

            {/* Subtext */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.9 }}
            >
              <Text 
                fontSize="xl" 
                color="syncly.muted"
                lineHeight="tall"
                position="relative"
                _before={{
                  content: '""',
                  position: 'absolute',
                  bottom: '-8px',
                  left: 0,
                  width: '80px',
                  height: '4px',
                  bg: 'syncly.accent',
                  borderRadius: 'full'
                }}
                pb={4}
              >
                Syncly transforms your scheduling workflow with AI-powered precision, 
                seamless integrations, and an intuitive interface that adapts to your 
                professional rhythm.
              </Text>
            </motion.div>

            {/* CTA Buttons */}
            <HStack spacing={4}>
              <Button 
                size="lg" 
                variant="solid"
                rightIcon={<RiRocketLine />}
                fontWeight="bold"
              >
                Start Free Trial
              </Button>
              <Button 
                size="lg" 
                variant="outline"
              >
                Watch Demo
              </Button>
            </HStack>
          </VStack>

          {/* Right Content */}
          <VStack spacing={8} maxW="600px" width="100%">
            {/* Feature Grid */}
            <Grid 
              templateColumns={{ base: '1fr', md: 'repeat(2, 1fr)' }}
              gap={6} 
              width="100%"
            >
              <GridItem>
                <FeatureCard 
                  icon={RiCalendarCheckLine}
                  title="Smart Scheduling"
                  description="AI-driven calendar optimization that learns your preferences."
                />
              </GridItem>
              <GridItem>
                <FeatureCard 
                  icon={RiTeamLine}
                  title="Team Collaboration"
                  description="Seamless scheduling across multiple team members and time zones."
                />
              </GridItem>
              <GridItem>
                <FeatureCard 
                  icon={RiTimeLine}
                  title="Time Efficiency"
                  description="Reduce scheduling conflicts and maximize productive hours."
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
      </Container>
      
      {/* Footer */}
      <Footer />
    </Box>
  );
}

export default HomePage;

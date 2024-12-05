import React from 'react';
import { 
  Box, 
  Container, 
  VStack, 
  HStack, 
  Heading, 
  Text, 
  SimpleGrid,
  Button,
  Flex,
  Icon
} from '@chakra-ui/react';
import { 
  RiAiGenerate,
  RiTeamLine, 
  RiTimeLine, 
  RiCloudLine, 
  RiRobotLine,
  RiShieldCheckLine,
  RiBookmarkLine
} from 'react-icons/ri';

const FeatureSection = ({ icon, title, description, details }) => (
  <Box 
    bg="white" 
    p={8} 
    borderRadius="xl" 
    boxShadow="md"
    transition="all 0.3s ease"
    _hover={{
      transform: 'translateY(-10px)',
      boxShadow: 'xl'
    }}
  >
    <VStack align="start" spacing={4}>
      <Flex align="center" mb={4}>
        <Icon 
          as={icon} 
          w={10} 
          h={10} 
          color="syncly.primary" 
          mr={4} 
        />
        <Heading size="md" color="gray.800">
          {title}
        </Heading>
      </Flex>
      <Text color="gray.600" mb={4}>
        {description}
      </Text>
      <VStack align="start" spacing={2} w="full">
        {details.map((detail, index) => (
          <HStack key={index} spacing={3} w="full">
            <Icon 
              as={RiBookmarkLine} 
              color="syncly.primary" 
            />
            <Text color="gray.700">
              {detail}
            </Text>
          </HStack>
        ))}
      </VStack>
    </VStack>
  </Box>
);

function FeaturesPage() {
  const featureSections = [
    {
      icon: RiAiGenerate,
      title: "AI-Powered Scheduling",
      description: "Revolutionize your time management with intelligent scheduling algorithms.",
      details: [
        "Predictive meeting suggestions",
        "Automatic time block optimization",
        "Smart conflict resolution",
        "Learning from your scheduling patterns"
      ]
    },
    {
      icon: RiTeamLine,
      title: "Team Collaboration",
      description: "Seamless coordination across your entire organization.",
      details: [
        "Shared team calendars",
        "Real-time availability tracking",
        "Group scheduling workflows",
        "Cross-department synchronization"
      ]
    },
    {
      icon: RiTimeLine,
      title: "Time Optimization",
      description: "Maximize productivity with intelligent time management tools.",
      details: [
        "Automated time tracking",
        "Productivity insights",
        "Focus time recommendations",
        "Meeting efficiency scoring"
      ]
    },
    {
      icon: RiCloudLine,
      title: "Seamless Integration",
      description: "Connect with your favorite tools and platforms effortlessly.",
      details: [
        "Google Workspace integration",
        "Microsoft Office compatibility",
        "Zoom and Teams synchronization",
        "Custom API connections"
      ]
    }
  ];

  const advancedFeatures = [
    {
      icon: RiRobotLine,
      title: "Advanced AI Capabilities",
      description: "Machine learning that adapts to your unique workflow.",
      details: [
        "Personalized scheduling recommendations",
        "Predictive meeting insights",
        "Intelligent time allocation",
        "Continuous learning algorithms"
      ]
    },
    {
      icon: RiShieldCheckLine,
      title: "Enterprise-Grade Security",
      description: "Robust protection for your most sensitive scheduling data.",
      details: [
        "End-to-end encryption",
        "Multi-factor authentication",
        "Compliance with GDPR and CCPA",
        "Advanced access controls"
      ]
    }
  ];

  return (
    <Box 
      bg="gray.50" 
      minHeight="100vh" 
      position="relative" 
      overflow="hidden"
      pt={{ base: '120px', md: '140px' }}
    >
      {/* Background Blurs */}
      <Box
        position="absolute"
        top="10%"
        right="10%"
        width="250px"
        height="250px"
        background="rgba(70,204,107,0.05)"
        borderRadius="50%"
        filter="blur(80px)"
        zIndex="-2"
      />
      <Box
        position="absolute"
        bottom="10%"
        left="10%"
        width="300px"
        height="300px"
        background="rgba(23,156,95,0.05)"
        borderRadius="50%"
        filter="blur(80px)"
        zIndex="-2"
      />

      <Container maxW="container.xl" position="relative" zIndex="1">
        {/* Page Header */}
        <VStack 
          spacing={6} 
          textAlign="center" 
          mb={16}
          maxW="800px" 
          mx="auto"
        >
          <Heading 
            as="h1" 
            size="3xl" 
            lineHeight="1.2"
            bgGradient="linear(to-r, #179c5f, #46cc6b)"
            bgClip="text"
          >
            Reimagine Scheduling
          </Heading>
          <Text 
            fontSize="xl" 
            color="gray.600" 
            maxW="600px"
          >
            Syncly combines cutting-edge AI technology with intuitive design 
            to transform how teams manage time, collaborate, and achieve more.
          </Text>
          <Button 
            size="lg" 
            colorScheme="green"
            bgGradient="linear(to-r, #179c5f, #46cc6b)"
            _hover={{
              bgGradient: "linear(to-r, #46cc6b, #179c5f)"
            }}
          >
            Start Free Trial
          </Button>
        </VStack>

        {/* Core Features Grid */}
        <SimpleGrid 
          columns={{ base: 1, md: 2, lg: 4 }}
          spacing={6}
          mb={16}
        >
          {featureSections.map((feature, index) => (
            <FeatureSection 
              key={index}
              icon={feature.icon}
              title={feature.title}
              description={feature.description}
              details={feature.details}
            />
          ))}
        </SimpleGrid>

        {/* Advanced Features */}
        <Box mb={16}>
          <Heading 
            size="xl" 
            textAlign="center" 
            mb={10}
            color="gray.800"
          >
            Enterprise-Grade Capabilities
          </Heading>
          <SimpleGrid 
            columns={{ base: 1, md: 2 }}
            spacing={6}
          >
            {advancedFeatures.map((feature, index) => (
              <FeatureSection 
                key={index}
                icon={feature.icon}
                title={feature.title}
                description={feature.description}
                details={feature.details}
              />
            ))}
          </SimpleGrid>
        </Box>

        {/* Testimonial or CTA Section */}
        <Box 
          bg="white" 
          borderRadius="xl" 
          p={12} 
          textAlign="center" 
          boxShadow="md"
          mb={16}  // Add margin bottom to create spacing before footer
        >
          <Heading 
            size="xl" 
            mb={6}
            bgGradient="linear(to-r, #179c5f, #46cc6b)"
            bgClip="text"
          >
            Transform Your Team's Productivity
          </Heading>
          <Text 
            fontSize="lg" 
            color="gray.600" 
            mb={8}
            maxW="700px" 
            mx="auto"
          >
            Syncly is more than a scheduling tool. It's an intelligent platform 
            that learns, adapts, and helps your team achieve its full potential.
          </Text>
          <HStack spacing={4} justify="center">
            <Button 
              size="lg" 
              colorScheme="green"
              bgGradient="linear(to-r, #179c5f, #46cc6b)"
              _hover={{
                bgGradient: "linear(to-r, #46cc6b, #179c5f)"
              }}
            >
              Book a Demo
            </Button>
            <Button 
              size="lg" 
              variant="outline" 
              borderColor="syncly.primary"
              color="syncly.primary"
            >
              Learn More
            </Button>
          </HStack>
        </Box>
      </Container>
    </Box>
  );
}

export default FeaturesPage;

import React from 'react';
import { 
  Box, 
  Container, 
  VStack, 
  HStack, 
  Heading, 
  Text, 
  Avatar,
  Icon,
  SimpleGrid,
  Button
} from '@chakra-ui/react';
import { motion } from 'framer-motion';
import { 
  RiTeamLine, 
  RiLightbulbLine, 
  RiRocketLine,
  RiLinkedinBoxLine,
  RiTwitterLine,
  RiGithubLine
} from 'react-icons/ri';

// Framer Motion Variants
const cardVariants = {
  initial: { 
    opacity: 0, 
    y: 50 
  },
  animate: { 
    opacity: 1, 
    y: 0,
    transition: {
      duration: 0.6,
      ease: "easeOut"
    }
  },
  hover: {
    scale: 1.05,
    boxShadow: "0 15px 30px rgba(0,0,0,0.1)",
    transition: {
      duration: 0.3
    }
  }
};

const iconVariants = {
  initial: { 
    scale: 0.8, 
    opacity: 0 
  },
  animate: { 
    scale: 1, 
    opacity: 1,
    transition: {
      type: "spring",
      stiffness: 300,
      damping: 10
    }
  },
  hover: {
    rotate: [0, -10, 10, 0],
    transition: {
      duration: 0.4
    }
  }
};

const TeamMember = ({ name, role, bio, linkedin, twitter, github }) => (
  <motion.div
    variants={cardVariants}
    initial="initial"
    animate="animate"
    whileHover="hover"
  >
    <Box 
      as={motion.div}
      bg="white" 
      p={6} 
      borderRadius="xl" 
      boxShadow="md"
      position="relative"
      overflow="hidden"
    >
      {/* Subtle Background Gradient */}
      <Box
        position="absolute"
        top="0"
        left="0"
        right="0"
        bottom="0"
        bgGradient="linear(to-br, rgba(23,156,95,0.05), rgba(70,204,107,0.05))"
        opacity={0.5}
        zIndex={1}
      />

      <VStack 
        spacing={4} 
        align="center" 
        position="relative" 
        zIndex={2}
      >
        <motion.div
          variants={iconVariants}
          initial="initial"
          animate="animate"
          whileHover="hover"
        >
          <Avatar 
            size="xl" 
            name={name}
            src={`/images/team/${name.toLowerCase().replace(' ', '-')}.jpg`}
            border="3px solid"
            borderColor="syncly.primary"
            boxShadow="md"
          />
        </motion.div>

        <VStack spacing={2} textAlign="center">
          <Heading size="md" color="gray.800">
            {name}
          </Heading>
          <Text color="gray.600" fontWeight="medium">
            {role}
          </Text>
          <Text color="gray.500" textAlign="center">
            {bio}
          </Text>
        </VStack>

        <HStack spacing={4}>
          {linkedin && (
            <motion.div
              whileHover={{ 
                scale: 1.2,
                color: "#0077B5"
              }}
              whileTap={{ scale: 0.9 }}
            >
              <Icon 
                as={RiLinkedinBoxLine} 
                w={6} 
                h={6} 
                color="#0077B5"
                cursor="pointer"
                onClick={() => window.open(linkedin, '_blank')}
              />
            </motion.div>
          )}
          {twitter && (
            <motion.div
              whileHover={{ 
                scale: 1.2,
                color: "#1DA1F2"
              }}
              whileTap={{ scale: 0.9 }}
            >
              <Icon 
                as={RiTwitterLine} 
                w={6} 
                h={6} 
                color="#1DA1F2"
                cursor="pointer"
                onClick={() => window.open(twitter, '_blank')}
              />
            </motion.div>
          )}
          {github && (
            <motion.div
              whileHover={{ 
                scale: 1.2,
                color: "#333"
              }}
              whileTap={{ scale: 0.9 }}
            >
              <Icon 
                as={RiGithubLine} 
                w={6} 
                h={6} 
                color="#333"
                cursor="pointer"
                onClick={() => window.open(github, '_blank')}
              />
            </motion.div>
          )}
        </HStack>
      </VStack>
    </Box>
  </motion.div>
);

function AboutPage() {
  // Framer Motion Variants for Page Sections
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        delayChildren: 0.3,
        staggerChildren: 0.2
      }
    }
  };

  const teamMembers = [
    {
      name: "Alex Rodriguez",
      role: "CEO & Co-Founder",
      bio: "AI enthusiast with a passion for revolutionizing productivity.",
      linkedin: "https://linkedin.com/in/alexrodriguez",
      twitter: "https://twitter.com/alexrod",
      github: "https://github.com/alexrod"
    },
    {
      name: "Sarah Chen",
      role: "CTO & Co-Founder",
      bio: "Machine learning expert driving Syncly's AI innovations.",
      linkedin: "https://linkedin.com/in/sarahchen",
      twitter: "https://twitter.com/sarahchen",
      github: "https://github.com/sarahchen"
    },
    {
      name: "Michael Kim",
      role: "Head of Product",
      bio: "User experience guru transforming how teams collaborate.",
      linkedin: "https://linkedin.com/in/michaelkim",
      twitter: "https://twitter.com/mikekim",
      github: "https://github.com/mikekim"
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
        {/* Page Header with Animation */}
        <motion.div
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
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
              Our Mission
            </Heading>
            <Text 
              fontSize="xl" 
              color="gray.600" 
              maxW="600px"
            >
              Syncly is on a mission to transform how teams collaborate, 
              schedule, and achieve their goals through intelligent, 
              AI-powered scheduling solutions.
            </Text>
          </VStack>
        </motion.div>

        {/* Company Values Section */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <VStack spacing={10} mb={16}>
            <Heading 
              size="xl" 
              textAlign="center" 
              color="gray.800"
            >
              Our Values
            </Heading>
            <SimpleGrid 
              columns={{ base: 1, md: 3 }}
              spacing={8}
            >
              <Box 
                bg="white" 
                p={6} 
                borderRadius="xl" 
                boxShadow="md"
              >
                <Icon 
                  as={RiTeamLine} 
                  w={8} 
                  h={8} 
                  color="#46cc6b"
                  mb={4}
                />
                <Heading 
                  size="md" 
                  mb={2}
                  color="gray.800"
                >
                  Teamwork
                </Heading>
                <Text 
                  fontSize="lg" 
                  color="gray.600"
                >
                  We believe that together, we can achieve anything.
                </Text>
              </Box>
              <Box 
                bg="white" 
                p={6} 
                borderRadius="xl" 
                boxShadow="md"
              >
                <Icon 
                  as={RiLightbulbLine} 
                  w={8} 
                  h={8} 
                  color="#46cc6b"
                  mb={4}
                />
                <Heading 
                  size="md" 
                  mb={2}
                  color="gray.800"
                >
                  Innovation
                </Heading>
                <Text 
                  fontSize="lg" 
                  color="gray.600"
                >
                  We're always looking for new ways to improve and innovate.
                </Text>
              </Box>
              <Box 
                bg="white" 
                p={6} 
                borderRadius="xl" 
                boxShadow="md"
              >
                <Icon 
                  as={RiRocketLine} 
                  w={8} 
                  h={8} 
                  color="#46cc6b"
                  mb={4}
                />
                <Heading 
                  size="md" 
                  mb={2}
                  color="gray.800"
                >
                  Ambition
                </Heading>
                <Text 
                  fontSize="lg" 
                  color="gray.600"
                >
                  We're driven to succeed and make a real impact.
                </Text>
              </Box>
            </SimpleGrid>
          </VStack>
        </motion.div>

        {/* Team Section with Staggered Animation */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <VStack spacing={10} mb={16}>
            <Heading 
              size="xl" 
              textAlign="center" 
              color="gray.800"
            >
              Meet Our Team
            </Heading>
            
            <SimpleGrid 
              columns={{ base: 1, md: 3 }}
              spacing={8}
            >
              {teamMembers.map((member, index) => (
                <TeamMember 
                  key={index}
                  name={member.name}
                  role={member.role}
                  bio={member.bio}
                  linkedin={member.linkedin}
                  twitter={member.twitter}
                  github={member.github}
                />
              ))}
            </SimpleGrid>
          </VStack>
        </motion.div>

        {/* Call to Action with Animation */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <Box 
            bg="white" 
            borderRadius="xl" 
            p={12} 
            textAlign="center" 
            boxShadow="md"
            mb={16}
          >
            <Heading 
              size="xl" 
              mb={6}
              bgGradient="linear(to-r, #179c5f, #46cc6b)"
              bgClip="text"
            >
              Join Our Journey
            </Heading>
            <Text 
              fontSize="lg" 
              color="gray.600" 
              mb={8}
              maxW="700px" 
              mx="auto"
            >
              We're passionate about creating tools that help teams work smarter, 
              not harder. Interested in being part of our mission?
            </Text>
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Button 
                size="lg" 
                colorScheme="green"
                bgGradient="linear(to-r, #179c5f, #46cc6b)"
                _hover={{
                  bgGradient: "linear(to-r, #46cc6b, #179c5f)"
                }}
              >
                View Open Positions
              </Button>
            </motion.div>
          </Box>
        </motion.div>
      </Container>
    </Box>
  );
}

export default AboutPage;

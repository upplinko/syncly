import React from 'react';
import { 
  Box, 
  Container, 
  VStack, 
  HStack, 
  Text, 
  Link, 
  Icon,
  Flex,
  Image,
  Divider,
  Grid,
  GridItem
} from '@chakra-ui/react';
import { 
  FaTwitter, 
  FaLinkedin, 
  FaGithub,
  FaFacebook,
  FaEnvelope
} from 'react-icons/fa';
import { Link as RouterLink } from 'react-router-dom';

const Footer = () => {
  return (
    <Box 
      bg="gray.900" 
      color="white" 
      py={16}
    >
      <Container maxW="container.xl">
        <Grid 
          templateColumns={{ 
            base: "repeat(1, 1fr)", 
            md: "repeat(4, 1fr)" 
          }}
          gap={8}
        >
          {/* Company Info Column */}
          <GridItem>
            <VStack 
              align={{ base: "center", md: "start" }}
              spacing={6}
              mb={6}
            >
              <Image 
                src="/images/logowhite.svg" 
                alt="Syncly Logo" 
                height="40px" 
                mb={4}
              />
              <Text 
                color="whiteAlpha.700" 
                textAlign={{ base: "center", md: "left" }}
                maxWidth="250px"
              >
                Transforming scheduling with intelligent AI-powered solutions
              </Text>
              <HStack spacing={4}>
                {[
                  { icon: FaTwitter, link: "https://twitter.com/syncly" },
                  { icon: FaLinkedin, link: "https://linkedin.com/company/syncly" },
                  { icon: FaGithub, link: "https://github.com/syncly" },
                  { icon: FaFacebook, link: "https://facebook.com/syncly" },
                  { icon: FaEnvelope, link: "mailto:hello@syncly.com" }
                ].map((social, index) => (
                  <Link 
                    key={index} 
                    href={social.link} 
                    isExternal
                    color="whiteAlpha.600"
                    _hover={{ 
                      color: "white",
                      transform: "scale(1.2)"
                    }}
                    transition="all 0.2s"
                  >
                    <Icon as={social.icon} w={5} h={5} />
                  </Link>
                ))}
              </HStack>
            </VStack>
          </GridItem>

          {/* Product Links */}
          <GridItem>
            <VStack 
              align={{ base: "center", md: "start" }}
              spacing={3}
            >
              <Text 
                fontWeight="bold" 
                mb={4} 
                color="white"
                fontSize="lg"
              >
                Product
              </Text>
              {[
                { name: "Features", path: "/features" },
                { name: "Pricing", path: "/pricing" },
                { name: "Integrations", path: "/integrations" },
                { name: "Roadmap", path: "/roadmap" }
              ].map((item, index) => (
                <Link
                  key={index}
                  as={RouterLink}
                  to={item.path}
                  color="whiteAlpha.700"
                  _hover={{ 
                    color: "white",
                    transform: "translateX(5px)"
                  }}
                  transition="all 0.2s"
                >
                  {item.name}
                </Link>
              ))}
            </VStack>
          </GridItem>

          {/* Company Links */}
          <GridItem>
            <VStack 
              align={{ base: "center", md: "start" }}
              spacing={3}
            >
              <Text 
                fontWeight="bold" 
                mb={4} 
                color="white"
                fontSize="lg"
              >
                Company
              </Text>
              {[
                { name: "About", path: "/about" },
                { name: "Careers", path: "/careers" },
                { name: "Press", path: "/press" },
                { name: "Contact", path: "/contact" }
              ].map((item, index) => (
                <Link
                  key={index}
                  as={RouterLink}
                  to={item.path}
                  color="whiteAlpha.700"
                  _hover={{ 
                    color: "white",
                    transform: "translateX(5px)"
                  }}
                  transition="all 0.2s"
                >
                  {item.name}
                </Link>
              ))}
            </VStack>
          </GridItem>

          {/* Legal Links */}
          <GridItem>
            <VStack 
              align={{ base: "center", md: "start" }}
              spacing={3}
            >
              <Text 
                fontWeight="bold" 
                mb={4} 
                color="white"
                fontSize="lg"
              >
                Legal
              </Text>
              {[
                { name: "Privacy Policy", path: "/privacy" },
                { name: "Terms of Service", path: "/terms" },
                { name: "Cookie Policy", path: "/cookies" },
                { name: "GDPR", path: "/gdpr" }
              ].map((item, index) => (
                <Link
                  key={index}
                  as={RouterLink}
                  to={item.path}
                  color="whiteAlpha.700"
                  _hover={{ 
                    color: "white",
                    transform: "translateX(5px)"
                  }}
                  transition="all 0.2s"
                >
                  {item.name}
                </Link>
              ))}
            </VStack>
          </GridItem>
        </Grid>

        <Divider 
          borderColor="whiteAlpha.300" 
          my={8} 
        />

        <Flex 
          direction={{ base: "column", md: "row" }}
          justify="space-between"
          align="center"
          color="whiteAlpha.600"
        >
          <Text fontSize="sm">
            &copy; {new Date().getFullYear()} Syncly. All rights reserved.
          </Text>
          <HStack spacing={4} mt={{ base: 4, md: 0 }}>
            <Link 
              href="/privacy" 
              fontSize="sm"
              _hover={{ color: "white" }}
            >
              Privacy
            </Link>
            <Link 
              href="/terms" 
              fontSize="sm"
              _hover={{ color: "white" }}
            >
              Terms
            </Link>
          </HStack>
        </Flex>
      </Container>
    </Box>
  );
};

export default Footer;

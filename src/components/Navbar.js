import React, { useState, useEffect } from 'react';
import { 
  Box, 
  Container, 
  Flex, 
  HStack, 
  Image, 
  Button, 
  Text,
  Link as ChakraLink,
  VStack,
  Drawer,
  DrawerBody,
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  useDisclosure,
  IconButton
} from '@chakra-ui/react';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import { HamburgerIcon } from '@chakra-ui/icons';

function Navbar() {
  const navigate = useNavigate();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const btnRef = React.useRef();
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const offset = window.scrollY;
      if (offset > 50) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <Box 
      position="fixed" 
      top="0" 
      left="0" 
      right="0" 
      zIndex="100" 
      bg={scrolled ? "rgba(17, 24, 39, 0.9)" : "transparent"}
      backdropFilter={scrolled ? "blur(10px)" : "none"}
      transition="background 0.3s ease, backdrop-filter 0.3s ease"
      boxShadow={scrolled ? "0 4px 6px rgba(0, 0, 0, 0.1)" : "none"}
    >
      <Container maxW="container.xl">
        <Flex 
          align="center" 
          justify="space-between" 
          py={4}
        >
          {/* Logo */}
          <Image 
            src={scrolled ? "/images/logowhite.svg" : "/images/logodark.svg"}
            alt="Syncly Logo" 
            height="40px"
            onClick={() => navigate('/')}
            cursor="pointer"
            transition="all 0.3s ease"
          />

          {/* Desktop Navigation */}
          <HStack 
            spacing={6} 
            color={scrolled ? "white" : "gray.600"}
            display={{ base: 'none', md: 'flex' }}
            alignItems="center"
          >
            <ChakraLink 
              as={RouterLink} 
              to="/"
              _hover={{ 
                color: scrolled ? 'whiteAlpha.700' : 'gray.800',
                textDecoration: 'none',
                ...(scrolled ? {} : {
                  bgGradient: "linear(to-r, #179c5f, #46cc6b)",
                  bgClip: "text"
                })
              }}
            >
              <Text 
                fontWeight="medium" 
                color={scrolled ? "white" : "gray.600"}
                transition="color 0.3s ease"
                _hover={{ color: scrolled ? 'whiteAlpha.700' : 'gray.800' }}
              >
                Home
              </Text>
            </ChakraLink>
            <ChakraLink 
              as={RouterLink} 
              to="/features"
              _hover={{ 
                color: scrolled ? 'whiteAlpha.700' : 'gray.800',
                textDecoration: 'none',
                ...(scrolled ? {} : {
                  bgGradient: "linear(to-r, #179c5f, #46cc6b)",
                  bgClip: "text"
                })
              }}
            >
              <Text 
                fontWeight="medium" 
                color={scrolled ? "white" : "gray.600"}
                transition="color 0.3s ease"
                _hover={{ color: scrolled ? 'whiteAlpha.700' : 'gray.800' }}
              >
                Features
              </Text>
            </ChakraLink>
            <ChakraLink 
              as={RouterLink} 
              to="/pricing"
              _hover={{ 
                color: scrolled ? 'whiteAlpha.700' : 'gray.800',
                textDecoration: 'none',
                ...(scrolled ? {} : {
                  bgGradient: "linear(to-r, #179c5f, #46cc6b)",
                  bgClip: "text"
                })
              }}
            >
              <Text 
                fontWeight="medium" 
                color={scrolled ? "white" : "gray.600"}
                transition="color 0.3s ease"
                _hover={{ color: scrolled ? 'whiteAlpha.700' : 'gray.800' }}
              >
                Pricing
              </Text>
            </ChakraLink>
            <ChakraLink 
              as={RouterLink} 
              to="/about"
              _hover={{ 
                color: scrolled ? 'whiteAlpha.700' : 'gray.800',
                textDecoration: 'none',
                ...(scrolled ? {} : {
                  bgGradient: "linear(to-r, #179c5f, #46cc6b)",
                  bgClip: "text"
                })
              }}
            >
              <Text 
                fontWeight="medium" 
                color={scrolled ? "white" : "gray.600"}
                transition="color 0.3s ease"
                _hover={{ color: scrolled ? 'whiteAlpha.700' : 'gray.800' }}
              >
                About
              </Text>
            </ChakraLink>
            <ChakraLink 
              as={RouterLink} 
              to="/contact"
              _hover={{ 
                color: scrolled ? 'whiteAlpha.700' : 'gray.800',
                textDecoration: 'none',
                ...(scrolled ? {} : {
                  bgGradient: "linear(to-r, #179c5f, #46cc6b)",
                  bgClip: "text"
                })
              }}
            >
              <Text 
                fontWeight="medium" 
                color={scrolled ? "white" : "gray.600"}
                transition="color 0.3s ease"
                _hover={{ color: scrolled ? 'whiteAlpha.700' : 'gray.800' }}
              >
                Contact
              </Text>
            </ChakraLink>
          </HStack>

          {/* Mobile Hamburger Menu */}
          <IconButton
            ref={btnRef}
            onClick={onOpen}
            display={{ base: 'flex', md: 'none' }}
            icon={<HamburgerIcon />}
            variant="outline"
            aria-label="Open Menu"
            color={scrolled ? "white" : "gray.600"}
          />

          {/* Mobile Drawer Menu */}
          <Drawer
            isOpen={isOpen}
            placement="right"
            onClose={onClose}
            finalFocusRef={btnRef}
          >
            <DrawerOverlay />
            <DrawerContent>
              <DrawerCloseButton />
              <DrawerHeader>Menu</DrawerHeader>

              <DrawerBody>
                <VStack spacing={4} align="stretch">
                  <ChakraLink 
                    as={RouterLink} 
                    to="/"
                    onClick={onClose}
                    _hover={{ 
                      color: 'green.500',
                      textDecoration: 'none'
                    }}
                  >
                    Home
                  </ChakraLink>
                  <ChakraLink 
                    as={RouterLink} 
                    to="/features"
                    onClick={onClose}
                    _hover={{ 
                      color: 'green.500',
                      textDecoration: 'none'
                    }}
                  >
                    Features
                  </ChakraLink>
                  <ChakraLink 
                    as={RouterLink} 
                    to="/pricing"
                    onClick={onClose}
                    _hover={{ 
                      color: 'green.500',
                      textDecoration: 'none'
                    }}
                  >
                    Pricing
                  </ChakraLink>
                  <ChakraLink 
                    as={RouterLink} 
                    to="/about"
                    onClick={onClose}
                    _hover={{ 
                      color: 'green.500',
                      textDecoration: 'none'
                    }}
                  >
                    About
                  </ChakraLink>
                  <ChakraLink 
                    as={RouterLink} 
                    to="/contact"
                    onClick={onClose}
                    _hover={{ 
                      color: 'green.500',
                      textDecoration: 'none'
                    }}
                  >
                    Contact
                  </ChakraLink>
                </VStack>
              </DrawerBody>
            </DrawerContent>
          </Drawer>

          {/* CTA Buttons */}
          <HStack 
            spacing={4} 
            display={{ base: 'none', md: 'flex' }}
          >
            <Button 
              size="md"
              variant="outline"
              borderColor={scrolled ? "whiteAlpha.300" : "gray.300"}
              color={scrolled ? "white" : "gray.700"}
              _hover={{
                bg: scrolled ? 'whiteAlpha.100' : 'gray.100',
                borderColor: scrolled ? 'whiteAlpha.500' : 'gray.400'
              }}
              onClick={() => navigate('/login')}
            >
              Login
            </Button>
            <Button 
              size="md"
              bgGradient="linear(to-r, #179c5f, #46cc6b)"
              color="white"
              _hover={{
                bgGradient: "linear(to-r, #46cc6b, #179c5f)",
                transform: 'translateY(-2px)'
              }}
              onClick={() => navigate('/signup')}
            >
              Get Started
            </Button>
          </HStack>
        </Flex>
      </Container>
    </Box>
  );
}

export default Navbar;

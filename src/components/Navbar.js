import React from 'react';
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

  return (
    <Box 
      position="fixed" 
      top="0" 
      left="0" 
      right="0" 
      zIndex="100" 
      bg="transparent"
      boxShadow="none"
    >
      <Container maxW="container.xl">
        <Flex 
          align="center" 
          justify="space-between" 
          py={4}
        >
          {/* Logo */}
          <Image 
            src="/images/logodark.svg" 
            alt="Syncly Logo" 
            height="40px"
            onClick={() => navigate('/')}
            cursor="pointer"
          />

          {/* Desktop Navigation */}
          <HStack 
            spacing={6} 
            color="gray.600"
            display={{ base: 'none', md: 'flex' }}
          >
            <ChakraLink 
              as={RouterLink} 
              to="/"
              _hover={{ 
                color: 'gray.800',
                textDecoration: 'none',
                bgGradient: "linear(to-r, #179c5f, #46cc6b)",
                bgClip: "text"
              }}
            >
              Home
            </ChakraLink>
            <ChakraLink 
              as={RouterLink} 
              to="/pricing"
              _hover={{ 
                color: 'gray.800',
                textDecoration: 'none',
                bgGradient: "linear(to-r, #179c5f, #46cc6b)",
                bgClip: "text"
              }}
            >
              Pricing
            </ChakraLink>
            <Text 
              cursor="pointer" 
              _hover={{ 
                color: 'gray.800',
                bgGradient: "linear(to-r, #179c5f, #46cc6b)",
                bgClip: "text"
              }}
            >
              Features
            </Text>
            <Text 
              cursor="pointer" 
              _hover={{ 
                color: 'gray.800',
                bgGradient: "linear(to-r, #179c5f, #46cc6b)",
                bgClip: "text"
              }}
            >
              About
            </Text>
          </HStack>

          {/* Mobile Hamburger Menu */}
          <IconButton
            ref={btnRef}
            onClick={onOpen}
            display={{ base: 'flex', md: 'none' }}
            icon={<HamburgerIcon />}
            variant="outline"
            aria-label="Open Menu"
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
                    to="/pricing"
                    onClick={onClose}
                    _hover={{ 
                      color: 'green.500',
                      textDecoration: 'none'
                    }}
                  >
                    Pricing
                  </ChakraLink>
                  <Text 
                    cursor="pointer"
                    onClick={onClose}
                    _hover={{ 
                      color: 'green.500'
                    }}
                  >
                    Features
                  </Text>
                  <Text 
                    cursor="pointer"
                    onClick={onClose}
                    _hover={{ 
                      color: 'green.500'
                    }}
                  >
                    About
                  </Text>
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
              borderColor="gray.300"
              color="gray.700"
              _hover={{
                bg: 'gray.100',
                borderColor: 'gray.400'
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

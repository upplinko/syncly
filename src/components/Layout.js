import React, { useState } from 'react';
import { 
  Box, 
  Flex, 
  Container, 
  VStack, 
  HStack, 
  Text, 
  Link, 
  Icon,
  useColorModeValue,
  Image,
  Button,
  Drawer,
  DrawerBody,
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  useDisclosure,
  Tooltip
} from '@chakra-ui/react';
import { 
  RiMenuLine,
  RiCloseLine,
  RiArrowRightLine
} from 'react-icons/ri';
import { 
  RiTwitterFill, 
  RiLinkedinFill, 
  RiGithubFill, 
  RiFacebookFill 
} from 'react-icons/ri';
import { useNavigate } from 'react-router-dom';

const NavLinks = [
  { name: 'Home', path: '/' },
  { name: 'Features', path: '/features' },
  { name: 'Pricing', path: '/pricing' },
  { name: 'About', path: '/about' }
];

const Navbar = () => {
  const navigate = useNavigate();
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <Box 
      position="fixed" 
      top="0" 
      left="0" 
      right="0" 
      zIndex="1000" 
      bg="gray.900"
      backdropFilter="blur(10px)"
      boxShadow="none"
      borderBottom="1px solid"
      borderColor="transparent"
      height="72px"
    >
      <Container 
        maxW="container.xl" 
        px={0}
        bg="transparent"
        style={{ background: 'transparent' }}
      >
        <Flex 
          alignItems="center" 
          justifyContent="space-between" 
          height="72px"
          bg="transparent"
          style={{ background: 'transparent' }}
        >
          {/* Logo */}
          <Flex 
            alignItems="center" 
            bg="transparent"
          >
            <Image 
              src="/images/logodark.svg" 
              alt="Syncly Logo" 
              height="40px" 
              objectFit="contain"
              mr={2}
              onClick={() => navigate('/')}
              cursor="pointer"
            />
          </Flex>

          {/* Desktop Navigation */}
          <HStack 
            spacing={8} 
            display={{ base: 'none', md: 'flex' }}
            bg="transparent"
          >
            {NavLinks.map((link) => (
              <Tooltip 
                key={link.name}
                label={`Navigate to ${link.name}`} 
                aria-label={`${link.name} page`}
                hasArrow
              >
                <Text 
                  cursor="pointer"
                  color="white"  
                  fontWeight="medium"
                  transition="all 0.3s"
                  position="relative"
                  _hover={{ 
                    color: 'whiteAlpha.700',
                    _after: {
                      width: '100%'
                    }
                  }}
                  _after={{
                    content: '""',
                    position: 'absolute',
                    bottom: '-4px',
                    left: 0,
                    height: '2px',
                    bg: 'syncly.accent',
                    width: '0%',
                    transition: 'width 0.3s'
                  }}
                  onClick={() => navigate(link.path)}
                >
                  {link.name}
                </Text>
              </Tooltip>
            ))}
          </HStack>

          {/* CTA Buttons */}
          <HStack spacing={4} display={{ base: 'none', md: 'flex' }}>
            <Button 
              variant="outline"
              borderColor="whiteAlpha.500"
              color="white"
              onClick={() => navigate('/login')}
              leftIcon={<RiArrowRightLine />}
              bg="transparent"
              _hover={{
                bg: 'whiteAlpha.200',
                borderColor: 'white'
              }}
              transition="all 0.3s ease"
              borderWidth="2px"
              px={4}
              py={2}
            >
              Login
            </Button>
            <Button 
              bg="syncly.accent"
              color="gray.900"
              onClick={() => navigate('/signup')}
              rightIcon={<RiArrowRightLine />}
              _hover={{
                bg: 'syncly.primary',
                transform: 'translateY(-2px)'
              }}
              transition="all 0.3s ease"
              fontWeight="bold"
              px={6}
              py={2}
            >
              Get Started
            </Button>
          </HStack>

          {/* Mobile Menu Toggle */}
          <Flex 
            display={{ base: 'flex', md: 'none' }} 
            alignItems="center"
            bg="transparent"
          >
            <Button 
              onClick={onOpen} 
              variant="ghost"
              color="white"
              _hover={{
                bg: 'whiteAlpha.200'
              }}
              bg="transparent"
            >
              <Icon as={RiMenuLine} w={6} h={6} />
            </Button>
          </Flex>

          {/* Mobile Drawer Menu */}
          <Drawer 
            isOpen={isOpen} 
            placement="right" 
            onClose={onClose}
          >
            <DrawerOverlay />
            <DrawerContent 
              bg="gray.900" 
              maxWidth="300px"
            >
              <DrawerCloseButton color="white" />
              <DrawerHeader 
                borderBottomWidth="1px"
                borderColor="whiteAlpha.200"
                display="flex"
                alignItems="center"
                justifyContent="center"
                color="white"
              >
                <Image 
                  src="/images/logodark.svg" 
                  alt="Syncly Logo" 
                  height="30px" 
                  objectFit="contain"
                />
              </DrawerHeader>

              <DrawerBody>
                <VStack 
                  spacing={6} 
                  align="stretch" 
                  mt={6}
                >
                  {NavLinks.map((link) => (
                    <Button
                      key={link.name}
                      variant="ghost"
                      justifyContent="start"
                      color="white"
                      _hover={{
                        bg: 'whiteAlpha.200',
                        color: 'whiteAlpha.700'
                      }}
                      onClick={() => {
                        navigate(link.path);
                        onClose();
                      }}
                      rightIcon={<RiArrowRightLine />}
                    >
                      {link.name}
                    </Button>
                  ))}

                  <Box borderTop="1px solid" borderColor="whiteAlpha.200" pt={6} mt={4}>
                    <VStack spacing={4}>
                      <Button 
                        variant="outline" 
                        width="full"
                        borderColor="whiteAlpha.500"
                        color="white"
                        _hover={{
                          bg: 'whiteAlpha.200',
                          borderColor: 'white'
                        }}
                        onClick={() => {
                          navigate('/login');
                          onClose();
                        }}
                      >
                        Login
                      </Button>
                      <Button 
                        bg="syncly.accent" 
                        color="gray.900"
                        width="full"
                        _hover={{
                          bg: 'syncly.primary'
                        }}
                        onClick={() => {
                          navigate('/signup');
                          onClose();
                        }}
                      >
                        Get Started
                      </Button>
                    </VStack>
                  </Box>
                </VStack>
              </DrawerBody>
            </DrawerContent>
          </Drawer>
        </Flex>
      </Container>
    </Box>
  );
};

const Footer = () => {
  return (
    <Box 
      bg="gray.900" 
      color="white" 
      py={16}
    >
      <Container maxW="container.xl">
        <VStack spacing={8} align="stretch">
          <HStack 
            spacing={8} 
            justify="space-between" 
            direction={['column', 'row']}
            align="flex-start"
          >
            {/* Company Info */}
            <VStack align="start" spacing={4}>
              <Image 
                src="/images/logodark.svg" 
                alt="Syncly Logo" 
                height="40px" 
                objectFit="contain"
                mb={2}
              />
              <Text 
                fontSize="sm" 
                color="whiteAlpha.700"
                textAlign="left"
                lineHeight="tall"
                maxWidth="250px"
              >
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

            {/* Product Links */}
            <VStack align="start" spacing={2}>
              <Text fontWeight="bold" mb={2} color="white">Product</Text>
              <Link href="/pricing" color="whiteAlpha.700" _hover={{ color: 'white' }}>Pricing</Link>
              <Link href="#" color="whiteAlpha.700" _hover={{ color: 'white' }}>Features</Link>
              <Link href="#" color="whiteAlpha.700" _hover={{ color: 'white' }}>Integrations</Link>
              <Link href="#" color="whiteAlpha.700" _hover={{ color: 'white' }}>Demo</Link>
            </VStack>

            {/* Company Links */}
            <VStack align="start" spacing={2}>
              <Text fontWeight="bold" mb={2} color="white">Company</Text>
              <Link href="#" color="whiteAlpha.700" _hover={{ color: 'white' }}>About Us</Link>
              <Link href="#" color="whiteAlpha.700" _hover={{ color: 'white' }}>Careers</Link>
              <Link href="#" color="whiteAlpha.700" _hover={{ color: 'white' }}>Press</Link>
              <Link href="#" color="whiteAlpha.700" _hover={{ color: 'white' }}>Contact</Link>
            </VStack>

            {/* Legal Links */}
            <VStack align="start" spacing={2}>
              <Text fontWeight="bold" mb={2} color="white">Legal</Text>
              <Link href="#" color="whiteAlpha.700" _hover={{ color: 'white' }}>Privacy Policy</Link>
              <Link href="#" color="whiteAlpha.700" _hover={{ color: 'white' }}>Terms of Service</Link>
              <Link href="#" color="whiteAlpha.700" _hover={{ color: 'white' }}>Cookie Policy</Link>
              <Link href="#" color="whiteAlpha.700" _hover={{ color: 'white' }}>GDPR</Link>
            </VStack>
          </HStack>

          {/* Copyright */}
          <Box 
            borderTop="1px" 
            borderColor="whiteAlpha.200" 
            pt={6} 
            mt={8}
          >
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
          </Box>
        </VStack>
      </Container>
    </Box>
  );
};

const Layout = ({ children }) => {
  return (
    <Flex 
      direction="column" 
      minHeight="100vh"
    >
      <Navbar />
      <Box 
        as="main" 
        flex="1" 
        mt="72px"  
      >
        {children}
      </Box>
      <Footer />
    </Flex>
  );
};

export default Layout;

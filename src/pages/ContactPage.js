import React, { useState } from 'react';
import { 
  Box, 
  VStack, 
  Heading, 
  Text, 
  Input, 
  Textarea, 
  Button, 
  Flex, 
  FormControl, 
  FormLabel, 
  useToast,
  Container,
  Icon,
  HStack,
  Link
} from '@chakra-ui/react';
import { 
  RiMailLine, 
  RiPhoneLine, 
  RiMapPinLine, 
  RiLinkedinBoxLine, 
  RiTwitterLine, 
  RiGithubLine 
} from 'react-icons/ri';

function ContactPage() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const toast = useToast();

  const handleSubmit = (e) => {
    e.preventDefault();
    // Basic form validation
    if (!name || !email || !message) {
      toast({
        title: "Incomplete Form",
        description: "Please fill out all fields.",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
      return;
    }

    // Here you would typically send the form data to a backend service
    toast({
      title: "Message Sent",
      description: "We'll get back to you soon!",
      status: "success",
      duration: 3000,
      isClosable: true,
    });

    // Reset form
    setName('');
    setEmail('');
    setMessage('');
  };

  return (
    <Box 
      bg="gray.50" 
      minHeight="100vh" 
      py={16}
    >
      <Container maxW="container.xl">
        <Flex 
          direction={{ base: 'column', md: 'row' }}
          gap={12}
          alignItems="stretch"
        >
          {/* Contact Information */}
          <Box 
            flex={1} 
            bg="white" 
            p={8} 
            borderRadius="xl" 
            boxShadow="md"
          >
            <VStack spacing={6} align="start">
              <Heading 
                size="xl" 
                bgGradient="linear(to-r, #179c5f, #46cc6b)"
                bgClip="text"
              >
                Get in Touch
              </Heading>
              <Text color="gray.600">
                Have questions about Syncly? We're here to help! Fill out the form 
                or use our contact information below.
              </Text>

              {/* Contact Details */}
              <VStack spacing={4} align="start" width="full">
                <HStack>
                  <Icon as={RiMailLine} color="syncly.primary" />
                  <Text>support@syncly.com</Text>
                </HStack>
                <HStack>
                  <Icon as={RiPhoneLine} color="syncly.primary" />
                  <Text>+1 (555) 123-4567</Text>
                </HStack>
                <HStack>
                  <Icon as={RiMapPinLine} color="syncly.primary" />
                  <Text>123 Sync Street, Tech City, CA 94000</Text>
                </HStack>
              </VStack>

              {/* Social Links */}
              <HStack spacing={4} mt={4}>
                <Link href="https://linkedin.com" isExternal>
                  <Icon 
                    as={RiLinkedinBoxLine} 
                    w={8} 
                    h={8} 
                    color="gray.600" 
                    _hover={{ color: '#179c5f' }} 
                  />
                </Link>
                <Link href="https://twitter.com" isExternal>
                  <Icon 
                    as={RiTwitterLine} 
                    w={8} 
                    h={8} 
                    color="gray.600" 
                    _hover={{ color: '#179c5f' }} 
                  />
                </Link>
                <Link href="https://github.com" isExternal>
                  <Icon 
                    as={RiGithubLine} 
                    w={8} 
                    h={8} 
                    color="gray.600" 
                    _hover={{ color: '#179c5f' }} 
                  />
                </Link>
              </HStack>
            </VStack>
          </Box>

          {/* Contact Form */}
          <Box 
            flex={1} 
            bg="white" 
            p={8} 
            borderRadius="xl" 
            boxShadow="md"
          >
            <form onSubmit={handleSubmit}>
              <VStack spacing={6}>
                <FormControl>
                  <FormLabel>Name</FormLabel>
                  <Input 
                    placeholder="Your Name" 
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    borderColor="gray.300"
                    _hover={{ borderColor: 'syncly.primary' }}
                    focusBorderColor="syncly.primary"
                  />
                </FormControl>

                <FormControl>
                  <FormLabel>Email</FormLabel>
                  <Input 
                    type="email"
                    placeholder="your.email@example.com" 
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    borderColor="gray.300"
                    _hover={{ borderColor: 'syncly.primary' }}
                    focusBorderColor="syncly.primary"
                  />
                </FormControl>

                <FormControl>
                  <FormLabel>Message</FormLabel>
                  <Textarea 
                    placeholder="Your message..." 
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    rows={5}
                    borderColor="gray.300"
                    _hover={{ borderColor: 'syncly.primary' }}
                    focusBorderColor="syncly.primary"
                  />
                </FormControl>

                <Button 
                  type="submit"
                  size="lg"
                  width="full"
                  bgGradient="linear(to-r, #179c5f, #46cc6b)"
                  color="white"
                  _hover={{
                    bgGradient: "linear(to-r, #46cc6b, #179c5f)",
                  }}
                >
                  Send Message
                </Button>
              </VStack>
            </form>
          </Box>
        </Flex>
      </Container>
    </Box>
  );
}

export default ContactPage;

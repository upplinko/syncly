import React, { useState } from 'react';
import { 
  Box, 
  Container, 
  VStack, 
  HStack, 
  Heading, 
  Text, 
  Input, 
  Textarea, 
  Button, 
  FormControl, 
  FormLabel, 
  FormErrorMessage,
  Flex,
  Icon,
  Link,
  useToast
} from '@chakra-ui/react';
import { 
  RiMailLine, 
  RiPhoneLine, 
  RiMapPinLine,
  RiLinkedinBoxLine,
  RiTwitterLine,
  RiGithubLine,
  RiSendPlaneLine
} from 'react-icons/ri';

const ContactPage = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });
  const [errors, setErrors] = useState({});
  const toast = useToast();

  const socialLinks = [
    {
      icon: RiLinkedinBoxLine,
      url: 'https://linkedin.com/company/syncly',
      color: '#0077B5'
    },
    {
      icon: RiTwitterLine,
      url: 'https://twitter.com/synclyapp',
      color: '#1DA1F2'
    },
    {
      icon: RiGithubLine,
      url: 'https://github.com/syncly',
      color: '#333'
    }
  ];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.name.trim()) {
      newErrors.name = 'Name is required';
    }
    
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email is invalid';
    }
    
    if (!formData.message.trim()) {
      newErrors.message = 'Message is required';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (validateForm()) {
      // TODO: Implement actual form submission logic
      toast({
        title: "Message Sent",
        description: "We'll get back to you soon!",
        status: "success",
        duration: 5000,
        isClosable: true,
        position: "top"
      });
      
      // Reset form
      setFormData({
        name: '',
        email: '',
        message: ''
      });
    }
  };

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
            Get in Touch
          </Heading>
          <Text 
            fontSize="xl" 
            color="gray.600" 
            maxW="600px"
          >
            Have a question, suggestion, or just want to say hello? 
            We'd love to hear from you. Fill out the form below and 
            we'll get back to you as soon as possible.
          </Text>
        </VStack>

        <Flex 
          direction={{ base: 'column', md: 'row' }}
          gap={8}
        >
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
                <FormControl isInvalid={!!errors.name}>
                  <FormLabel>Name</FormLabel>
                  <Input 
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="Your Name"
                    borderColor="gray.300"
                    _hover={{ borderColor: 'syncly.primary' }}
                    focusBorderColor="syncly.primary"
                  />
                  <FormErrorMessage>{errors.name}</FormErrorMessage>
                </FormControl>

                <FormControl isInvalid={!!errors.email}>
                  <FormLabel>Email</FormLabel>
                  <Input 
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="your.email@example.com"
                    borderColor="gray.300"
                    _hover={{ borderColor: 'syncly.primary' }}
                    focusBorderColor="syncly.primary"
                  />
                  <FormErrorMessage>{errors.email}</FormErrorMessage>
                </FormControl>

                <FormControl isInvalid={!!errors.message}>
                  <FormLabel>Message</FormLabel>
                  <Textarea 
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    placeholder="Your message..."
                    rows={5}
                    borderColor="gray.300"
                    _hover={{ borderColor: 'syncly.primary' }}
                    focusBorderColor="syncly.primary"
                  />
                  <FormErrorMessage>{errors.message}</FormErrorMessage>
                </FormControl>

                <Button 
                  type="submit"
                  size="lg"
                  colorScheme="green"
                  bgGradient="linear(to-r, #179c5f, #46cc6b)"
                  width="full"
                  rightIcon={<RiSendPlaneLine />}
                  _hover={{
                    bgGradient: "linear(to-r, #46cc6b, #179c5f)"
                  }}
                >
                  Send Message
                </Button>
              </VStack>
            </form>
          </Box>

          {/* Contact Information */}
          <VStack 
            flex={1} 
            spacing={6} 
            align="stretch"
          >
            <Box 
              bg="white" 
              p={6} 
              borderRadius="xl" 
              boxShadow="md"
            >
              <Heading size="md" mb={4} color="gray.800">
                Contact Information
              </Heading>
              <VStack spacing={4} align="start">
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
                  <Text>123 Syncly Street, Tech Valley, CA 94000</Text>
                </HStack>
              </VStack>
            </Box>

            {/* Social Links */}
            <Box 
              bg="white" 
              p={6} 
              borderRadius="xl" 
              boxShadow="md"
            >
              <Heading size="md" mb={4} color="gray.800">
                Connect with Us
              </Heading>
              <HStack spacing={4}>
                {socialLinks.map((social, index) => (
                  <Link 
                    key={index} 
                    href={social.url} 
                    isExternal
                    _hover={{ transform: 'scale(1.1)' }}
                    transition="transform 0.2s ease"
                  >
                    <Icon 
                      as={social.icon} 
                      w={8} 
                      h={8} 
                      color={social.color}
                    />
                  </Link>
                ))}
              </HStack>
            </Box>
          </VStack>
        </Flex>
      </Container>
    </Box>
  );
};

export default ContactPage;

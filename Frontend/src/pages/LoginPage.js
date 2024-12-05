/* eslint-disable */
import React, { useState } from 'react';
import { 
  Box, 
  VStack, 
  Heading, 
  FormControl, 
  FormLabel, 
  Input, 
  Button, 
  Text, 
  Divider, 
  useToast,
  Container,
  Flex
} from '@chakra-ui/react';
import { FcGoogle } from 'react-icons/fc';
import { 
  auth, 
  signInWithEmailAndPassword, 
  signInWithPopup, 
  GoogleAuthProvider 
} from '../firebase/firebaseConfig';
import { useNavigate } from 'react-router-dom';

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const toast = useToast();
  const navigate = useNavigate();
  const googleProvider = new GoogleAuthProvider();

  const showErrorToast = (title, description) => {
    toast({
      title,
      description,
      status: "error",
      duration: 5000,
      isClosable: true,
      position: "top"
    });
  };

  const handleEmailLogin = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    // Basic validation
    if (!email || !password) {
      showErrorToast("Validation Error", "Please enter both email and password");
      setIsLoading(false);
      return;
    }

    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      
      toast({
        title: "Login Successful",
        description: `Welcome back, ${userCredential.user.email}!`,
        status: "success",
        duration: 3000,
        isClosable: true,
        position: "top"
      });

      navigate('/dashboard');
    } catch (error) {
      console.error("Login Error:", error);
      
      switch (error.code) {
        case 'auth/invalid-email':
          showErrorToast("Invalid Email", "The email address is not valid.");
          break;
        case 'auth/user-disabled':
          showErrorToast("Account Disabled", "This account has been disabled.");
          break;
        case 'auth/user-not-found':
          showErrorToast("User Not Found", "No user found with this email.");
          break;
        case 'auth/wrong-password':
          showErrorToast("Incorrect Password", "The password is incorrect.");
          break;
        default:
          showErrorToast("Login Failed", "An unexpected error occurred. Please try again.");
      }
    } finally {
      setIsLoading(false);
    }
  };

  const handleGoogleSignIn = async () => {
    setIsLoading(true);

    try {
      const result = await signInWithPopup(auth, googleProvider);
      const user = result.user;
      
      toast({
        title: "Google Login Successful",
        description: `Welcome, ${user.displayName || user.email}!`,
        status: "success",
        duration: 3000,
        isClosable: true,
        position: "top"
      });

      navigate('/dashboard');
    } catch (error) {
      console.error("Google Login Error:", error);
      
      switch (error.code) {
        case 'auth/account-exists-with-different-credential':
          showErrorToast("Account Exists", "An account already exists with a different credential.");
          break;
        case 'auth/popup-blocked':
          showErrorToast("Popup Blocked", "The login popup was blocked. Please enable popups.");
          break;
        case 'auth/popup-closed-by-user':
          showErrorToast("Login Cancelled", "Google login was cancelled.");
          break;
        default:
          showErrorToast("Google Login Failed", "An unexpected error occurred. Please try again.");
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Container maxW="container.sm" py={12}>
      <Box 
        bg="white" 
        p={8} 
        borderRadius="xl" 
        boxShadow="xl"
        border="1px solid"
        borderColor="gray.100"
      >
        <VStack spacing={6} align="stretch">
          <Heading 
            textAlign="center" 
            color="syncly.primary" 
            size="xl"
          >
            Login to Syncly
          </Heading>

          <Button 
            leftIcon={<FcGoogle />}
            variant="outline"
            colorScheme="gray"
            onClick={handleGoogleSignIn}
            size="lg"
            isLoading={isLoading}
          >
            Sign in with Google
          </Button>

          <Flex alignItems="center" my={4}>
            <Divider />
            <Text px={4} color="gray.500">or</Text>
            <Divider />
          </Flex>

          <form onSubmit={handleEmailLogin}>
            <VStack spacing={4}>
              <FormControl id="email" isRequired>
                <FormLabel>Email Address</FormLabel>
                <Input 
                  type="email" 
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email"
                  size="lg"
                />
              </FormControl>
              <FormControl id="password" isRequired>
                <FormLabel>Password</FormLabel>
                <Input 
                  type="password" 
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter your password"
                  size="lg"
                />
              </FormControl>
              <Button 
                type="submit" 
                colorScheme="blue" 
                size="lg" 
                width="full"
                isLoading={isLoading}
              >
                Login
              </Button>
            </VStack>
          </form>

          <Text 
            textAlign="center" 
            color="syncly.muted"
          >
            Don't have an account? 
            <Button 
              variant="link" 
              color="syncly.accent" 
              ml={2}
              onClick={() => navigate('/signup')}
              isDisabled={isLoading}
            >
              Sign Up
            </Button>
          </Text>
        </VStack>
      </Box>
    </Container>
  );
};

export default LoginPage;

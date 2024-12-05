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
  Flex,
  Checkbox
} from '@chakra-ui/react';
import { FcGoogle } from 'react-icons/fc';
import { 
  auth, 
  createUserWithEmailAndPassword, 
  signInWithPopup, 
  GoogleAuthProvider 
} from '../firebase/firebaseConfig';
import { useNavigate } from 'react-router-dom';

const SignUpPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [termsAccepted, setTermsAccepted] = useState(false);
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

  const validatePassword = (pass) => {
    // At least 8 characters, one uppercase, one lowercase, one number
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/;
    return passwordRegex.test(pass);
  };

  const handleEmailSignUp = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    
    // Validation
    if (!email) {
      showErrorToast("Email Required", "Please enter an email address");
      setIsLoading(false);
      return;
    }

    if (password !== confirmPassword) {
      showErrorToast("Password Mismatch", "Passwords do not match");
      setIsLoading(false);
      return;
    }

    if (!validatePassword(password)) {
      showErrorToast("Weak Password", "Password must be at least 8 characters long and contain uppercase, lowercase, and number");
      setIsLoading(false);
      return;
    }

    if (!termsAccepted) {
      showErrorToast("Terms Not Accepted", "Please accept the terms and conditions");
      setIsLoading(false);
      return;
    }

    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      toast({
        title: "Sign Up Successful",
        description: `Welcome, ${user.email}! Your account has been created.`,
        status: "success",
        duration: 3000,
        isClosable: true,
        position: "top"
      });

      navigate('/dashboard');
    } catch (error) {
      console.error("Sign Up Error:", error);
      
      switch (error.code) {
        case 'auth/email-already-in-use':
          showErrorToast("Email In Use", "An account already exists with this email.");
          break;
        case 'auth/invalid-email':
          showErrorToast("Invalid Email", "The email address is not valid.");
          break;
        case 'auth/operation-not-allowed':
          showErrorToast("Sign Up Disabled", "Email/password sign-up is currently disabled.");
          break;
        case 'auth/weak-password':
          showErrorToast("Weak Password", "The password is too weak.");
          break;
        default:
          showErrorToast("Sign Up Failed", "An unexpected error occurred. Please try again.");
      }
    } finally {
      setIsLoading(false);
    }
  };

  const handleGoogleSignUp = async () => {
    setIsLoading(true);

    try {
      const result = await signInWithPopup(auth, googleProvider);
      const user = result.user;
      
      toast({
        title: "Google Sign Up Successful",
        description: `Welcome, ${user.displayName || user.email}!`,
        status: "success",
        duration: 3000,
        isClosable: true,
        position: "top"
      });

      navigate('/dashboard');
    } catch (error) {
      console.error("Google Sign Up Error:", error);
      
      switch (error.code) {
        case 'auth/account-exists-with-different-credential':
          showErrorToast("Account Exists", "An account already exists with a different credential.");
          break;
        case 'auth/popup-blocked':
          showErrorToast("Popup Blocked", "The sign-up popup was blocked. Please enable popups.");
          break;
        case 'auth/popup-closed-by-user':
          showErrorToast("Sign Up Cancelled", "Google sign-up was cancelled.");
          break;
        default:
          showErrorToast("Google Sign Up Failed", "An unexpected error occurred. Please try again.");
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
            Create Your Syncly Account
          </Heading>

          <Button 
            leftIcon={<FcGoogle />}
            variant="outline"
            colorScheme="gray"
            onClick={handleGoogleSignUp}
            size="lg"
            isLoading={isLoading}
          >
            Sign up with Google
          </Button>

          <Flex alignItems="center" my={4}>
            <Divider />
            <Text px={4} color="gray.500">or</Text>
            <Divider />
          </Flex>

          <form onSubmit={handleEmailSignUp}>
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
                  placeholder="Create a password"
                  size="lg"
                />
              </FormControl>
              <FormControl id="confirm-password" isRequired>
                <FormLabel>Confirm Password</FormLabel>
                <Input 
                  type="password" 
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  placeholder="Confirm your password"
                  size="lg"
                />
              </FormControl>
              <FormControl>
                <Checkbox 
                  isChecked={termsAccepted}
                  onChange={(e) => setTermsAccepted(e.target.checked)}
                  colorScheme="blue"
                >
                  I accept the Terms and Conditions
                </Checkbox>
              </FormControl>
              <Button 
                type="submit" 
                colorScheme="blue" 
                size="lg" 
                width="full"
                isLoading={isLoading}
              >
                Create Account
              </Button>
            </VStack>
          </form>

          <Text 
            textAlign="center" 
            color="syncly.muted"
          >
            Already have an account? 
            <Button 
              variant="link" 
              color="syncly.accent" 
              ml={2}
              onClick={() => navigate('/login')}
              isDisabled={isLoading}
            >
              Log In
            </Button>
          </Text>
        </VStack>
      </Box>
    </Container>
  );
};

export default SignUpPage;

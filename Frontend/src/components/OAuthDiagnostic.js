import React, { useState } from 'react';
import { 
  Box, 
  VStack, 
  Text, 
  Button, 
  useToast,
  Code,
  Heading,
  Alert,
  AlertIcon,
  AlertTitle,
  AlertDescription
} from '@chakra-ui/react';
import { 
  auth, 
  signInWithPopup, 
  GoogleAuthProvider 
} from '../firebase/firebaseConfig';

const OAuthDiagnostic = () => {
  const [authResult, setAuthResult] = useState(null);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const toast = useToast();

  const runOAuthDiagnostics = async () => {
    setIsLoading(true);
    setAuthResult(null);
    setError(null);

    try {
      const googleProvider = new GoogleAuthProvider();
      
      // Add diagnostic scopes
      googleProvider.addScope('profile');
      googleProvider.addScope('email');

      // Configure provider for debugging
      googleProvider.setCustomParameters({
        'prompt': 'select_account'
      });

      // Attempt Google Sign-In
      const result = await signInWithPopup(auth, googleProvider);
      const user = result.user;

      // Detailed auth result
      const authDetails = {
        uid: user.uid,
        email: user.email,
        displayName: user.displayName,
        providerId: user.providerId,
        emailVerified: user.emailVerified,
        isAnonymous: user.isAnonymous,
        metadata: {
          creationTime: user.metadata.creationTime,
          lastSignInTime: user.metadata.lastSignInTime
        },
        providerData: user.providerData.map(profile => ({
          providerId: profile.providerId,
          uid: profile.uid,
          displayName: profile.displayName,
          email: profile.email
        }))
      };

      setAuthResult(authDetails);

      toast({
        title: "OAuth Diagnostic Success",
        description: "Successfully authenticated with Google",
        status: "success",
        duration: 5000,
        isClosable: true
      });
    } catch (err) {
      console.error("OAuth Diagnostic Error:", err);
      
      // Detailed error handling
      const errorDetails = {
        code: err.code,
        message: err.message,
        fullError: err
      };

      setError(errorDetails);

      toast({
        title: "OAuth Diagnostic Failed",
        description: err.message,
        status: "error",
        duration: 5000,
        isClosable: true
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Box 
      p={6} 
      borderWidth={1} 
      borderRadius="lg" 
      boxShadow="md"
      maxWidth="600px"
      margin="auto"
    >
      <VStack spacing={4} align="stretch">
        <Heading size="md" textAlign="center">
          OAuth Diagnostic Tool
        </Heading>
        
        <Button 
          colorScheme="blue" 
          onClick={runOAuthDiagnostics}
          isLoading={isLoading}
        >
          Run OAuth Diagnostics
        </Button>

        {error && (
          <Alert status="error">
            <AlertIcon />
            <Box>
              <AlertTitle>Authentication Error</AlertTitle>
              <AlertDescription>
                <Code p={2} width="100%" overflowX="auto" color="red.500">
                  {JSON.stringify(error, null, 2)}
                </Code>
              </AlertDescription>
            </Box>
          </Alert>
        )}

        {authResult && (
          <Box>
            <Heading size="sm" mb={2}>Authentication Result</Heading>
            <Code p={2} width="100%" overflowX="auto">
              {JSON.stringify(authResult, null, 2)}
            </Code>
          </Box>
        )}

        <Text fontSize="sm" color="gray.500" textAlign="center">
          This tool helps diagnose OAuth configuration issues
        </Text>
      </VStack>
    </Box>
  );
};

export default OAuthDiagnostic;

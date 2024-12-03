import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Box, 
  Flex, 
  VStack, 
  HStack, 
  Text, 
  Heading, 
  Avatar, 
  Icon, 
  Button,
  Container,
  SimpleGrid,
  Card,
  CardBody,
  CardHeader,
  Divider,
  Switch,
  FormControl,
  FormLabel,
  Input,
  Select,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
  useColorModeValue,
  Tabs,
  TabList,
  TabPanels,
  Tab,
  TabPanel,
  Stack,
  Checkbox
} from '@chakra-ui/react';
import { 
  RiDashboardLine,
  RiCalendar2Line, 
  RiTeamLine,
  RiSettingsLine,
  RiLockLine,
  RiMailLine,
  RiSmartphoneLine,
  RiGoogleLine,
  RiGithubLine,
  RiAppleLine,
  RiShieldCheckLine,
  RiKeyLine,
  RiUserLine,
  RiLockUnlockLine
} from 'react-icons/ri';

const SettingsPage = () => {
  const navigate = useNavigate();
  const { 
    isOpen: isPasswordModalOpen, 
    onOpen: onPasswordModalOpen, 
    onClose: onPasswordModalClose 
  } = useDisclosure();
  const { 
    isOpen: isTwoFactorModalOpen, 
    onOpen: onTwoFactorModalOpen, 
    onClose: onTwoFactorModalClose 
  } = useDisclosure();

  const [settings, setSettings] = useState({
    twoFactorAuth: false,
    emailNotifications: true,
    darkMode: false,
    connectedAccounts: {
      google: false,
      github: false,
      apple: false
    }
  });

  const SettingsSidebar = () => (
    <VStack 
      w="250px" 
      h="full" 
      bg="white" 
      boxShadow="md" 
      p={5} 
      spacing={4}
      borderRight="1px solid"
      borderColor="gray.100"
    >
      <Flex align="center" w="full" mb={6}>
        <Avatar 
          size="md" 
          name="Alex Rodriguez" 
          src="https://bit.ly/dan-abramov" 
          mr={3} 
        />
        <VStack align="start" spacing={0}>
          <Text fontWeight="bold">Alex Rodriguez</Text>
          <Text fontSize="sm" color="gray.500">Pro User</Text>
        </VStack>
      </Flex>

      <VStack w="full" spacing={2} align="stretch">
        {[
          { 
            icon: RiDashboardLine, 
            label: 'Dashboard', 
            color: 'teal.500',
            path: '/dashboard'
          },
          { 
            icon: RiCalendar2Line, 
            label: 'Scheduling', 
            color: 'cyan.500',
            path: '/scheduling'
          },
          { 
            icon: RiTeamLine, 
            label: 'Team', 
            color: 'indigo.500',
            path: '/team'
          },
          { 
            icon: RiSettingsLine, 
            label: 'Settings', 
            color: 'gray.500',
            active: true,
            path: '/settings'
          }
        ].map((item, index) => (
          <Button
            key={index}
            leftIcon={<Icon as={item.icon} />}
            justifyContent="start"
            variant={item.active ? 'solid' : 'ghost'}
            colorScheme={item.active ? 'gray' : 'gray'}
            onClick={() => navigate(item.path)}
          >
            {item.label}
          </Button>
        ))}
      </VStack>
    </VStack>
  );

  const PasswordChangeModal = () => (
    <Modal isOpen={isPasswordModalOpen} onClose={onPasswordModalClose} size="md">
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Change Password</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <VStack spacing={4}>
            <FormControl>
              <FormLabel>Current Password</FormLabel>
              <Input 
                type="password" 
                placeholder="Enter current password"
                leftIcon={<RiLockLine />}
              />
            </FormControl>
            <FormControl>
              <FormLabel>New Password</FormLabel>
              <Input 
                type="password" 
                placeholder="Enter new password"
                leftIcon={<RiLockUnlockLine />}
              />
            </FormControl>
            <FormControl>
              <FormLabel>Confirm New Password</FormLabel>
              <Input 
                type="password" 
                placeholder="Confirm new password"
                leftIcon={<RiShieldCheckLine />}
              />
            </FormControl>
          </VStack>
        </ModalBody>
        <ModalFooter>
          <Button colorScheme="teal" mr={3}>
            Change Password
          </Button>
          <Button variant="ghost" onClick={onPasswordModalClose}>
            Cancel
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );

  const TwoFactorAuthModal = () => (
    <Modal isOpen={isTwoFactorModalOpen} onClose={onTwoFactorModalClose} size="md">
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Two-Factor Authentication</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <VStack spacing={4}>
            <Text>
              Two-factor authentication adds an extra layer of security to your account. 
              When enabled, you'll need to enter a code from your mobile app in addition 
              to your password.
            </Text>
            <FormControl display="flex" alignItems="center">
              <FormLabel mb="0">
                Enable Two-Factor Authentication
              </FormLabel>
              <Switch 
                colorScheme="teal"
                isChecked={settings.twoFactorAuth}
                onChange={() => setSettings(prev => ({
                  ...prev, 
                  twoFactorAuth: !prev.twoFactorAuth
                }))}
              />
            </FormControl>
            {settings.twoFactorAuth && (
              <VStack w="full" spacing={3}>
                <FormControl>
                  <FormLabel>Authentication Method</FormLabel>
                  <Select placeholder="Select authentication method">
                    <option value="authenticator">Authenticator App</option>
                    <option value="sms">SMS</option>
                  </Select>
                </FormControl>
                <FormControl>
                  <FormLabel>Phone Number</FormLabel>
                  <Input 
                    type="tel" 
                    placeholder="Enter phone number"
                    leftIcon={<RiSmartphoneLine />}
                  />
                </FormControl>
              </VStack>
            )}
          </VStack>
        </ModalBody>
        <ModalFooter>
          <Button colorScheme="teal" mr={3}>
            Save Changes
          </Button>
          <Button variant="ghost" onClick={onTwoFactorModalClose}>
            Cancel
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );

  return (
    <Flex h="100vh" bg={useColorModeValue('gray.50', 'gray.800')}>
      {/* Sidebar */}
      <SettingsSidebar />

      {/* Main Content */}
      <Box flex={1} overflowY="auto" p={8}>
        <Container maxW="container.xl">
          <Heading mb={8}>Account Settings</Heading>

          <Tabs variant="soft-rounded" colorScheme="teal">
            <TabList mb={8}>
              <Tab>
                <Icon as={RiUserLine} mr={2} />
                Profile
              </Tab>
              <Tab>
                <RiLockLine mr={2} />
                Security
              </Tab>
              <Tab>
                <RiMailLine mr={2} />
                Notifications
              </Tab>
            </TabList>

            <TabPanels>
              {/* Profile Tab */}
              <TabPanel>
                <SimpleGrid columns={{ base: 1, md: 2 }} spacing={6}>
                  <Card>
                    <CardHeader>
                      <Heading size="md">Personal Information</Heading>
                    </CardHeader>
                    <CardBody>
                      <VStack spacing={4} align="stretch">
                        <FormControl>
                          <FormLabel>Full Name</FormLabel>
                          <Input placeholder="Enter your full name" />
                        </FormControl>
                        <FormControl>
                          <FormLabel>Email</FormLabel>
                          <Input placeholder="Enter your email" type="email" />
                        </FormControl>
                        <Button colorScheme="teal">Update Profile</Button>
                      </VStack>
                    </CardBody>
                  </Card>

                  <Card>
                    <CardHeader>
                      <Heading size="md">Connected Accounts</Heading>
                    </CardHeader>
                    <CardBody>
                      <VStack spacing={4}>
                        <HStack w="full" justify="space-between">
                          <HStack>
                            <Icon as={RiGoogleLine} color="red.500" />
                            <Text>Google</Text>
                          </HStack>
                          <Switch 
                            colorScheme="green"
                            isChecked={settings.connectedAccounts.google}
                            onChange={() => setSettings(prev => ({
                              ...prev,
                              connectedAccounts: {
                                ...prev.connectedAccounts,
                                google: !prev.connectedAccounts.google
                              }
                            }))}
                          />
                        </HStack>
                        <HStack w="full" justify="space-between">
                          <HStack>
                            <Icon as={RiGithubLine} color="gray.800" />
                            <Text>GitHub</Text>
                          </HStack>
                          <Switch 
                            colorScheme="purple"
                            isChecked={settings.connectedAccounts.github}
                            onChange={() => setSettings(prev => ({
                              ...prev,
                              connectedAccounts: {
                                ...prev.connectedAccounts,
                                github: !prev.connectedAccounts.github
                              }
                            }))}
                          />
                        </HStack>
                        <HStack w="full" justify="space-between">
                          <HStack>
                            <Icon as={RiAppleLine} color="gray.700" />
                            <Text>Apple</Text>
                          </HStack>
                          <Switch 
                            colorScheme="blue"
                            isChecked={settings.connectedAccounts.apple}
                            onChange={() => setSettings(prev => ({
                              ...prev,
                              connectedAccounts: {
                                ...prev.connectedAccounts,
                                apple: !prev.connectedAccounts.apple
                              }
                            }))}
                          />
                        </HStack>
                      </VStack>
                    </CardBody>
                  </Card>
                </SimpleGrid>
              </TabPanel>

              {/* Security Tab */}
              <TabPanel>
                <SimpleGrid columns={{ base: 1, md: 2 }} spacing={6}>
                  <Card>
                    <CardHeader>
                      <Heading size="md">Password Management</Heading>
                    </CardHeader>
                    <CardBody>
                      <VStack spacing={4} align="stretch">
                        <Button 
                          leftIcon={<RiKeyLine />}
                          colorScheme="teal"
                          onClick={onPasswordModalOpen}
                        >
                          Change Password
                        </Button>
                        <Button 
                          leftIcon={<RiLockLine />}
                          colorScheme="orange"
                          onClick={onTwoFactorModalOpen}
                        >
                          Two-Factor Authentication
                        </Button>
                      </VStack>
                    </CardBody>
                  </Card>

                  <Card>
                    <CardHeader>
                      <Heading size="md">Login History</Heading>
                    </CardHeader>
                    <CardBody>
                      <VStack spacing={3} divider={<Divider />}>
                        {[
                          { 
                            device: 'MacBook Pro', 
                            location: 'San Francisco, CA', 
                            time: '2 hours ago' 
                          },
                          { 
                            device: 'iPhone 12', 
                            location: 'New York, NY', 
                            time: 'Yesterday' 
                          }
                        ].map((login, index) => (
                          <HStack key={index} w="full" justify="space-between">
                            <VStack align="start" spacing={0}>
                              <Text fontWeight="medium">{login.device}</Text>
                              <Text fontSize="xs" color="gray.500">
                                {login.location} - {login.time}
                              </Text>
                            </VStack>
                          </HStack>
                        ))}
                      </VStack>
                    </CardBody>
                  </Card>
                </SimpleGrid>
              </TabPanel>

              {/* Notifications Tab */}
              <TabPanel>
                <Card>
                  <CardHeader>
                    <Heading size="md">Notification Preferences</Heading>
                  </CardHeader>
                  <CardBody>
                    <Stack spacing={4}>
                      <FormControl display="flex" alignItems="center">
                        <FormLabel mb="0">Email Notifications</FormLabel>
                        <Switch 
                          colorScheme="teal"
                          isChecked={settings.emailNotifications}
                          onChange={() => setSettings(prev => ({
                            ...prev, 
                            emailNotifications: !prev.emailNotifications
                          }))}
                        />
                      </FormControl>
                      <Checkbox colorScheme="teal">
                        Receive weekly summary
                      </Checkbox>
                      <Checkbox colorScheme="teal">
                        Notify me about team activities
                      </Checkbox>
                      <Checkbox colorScheme="teal">
                        Send reminders for upcoming meetings
                      </Checkbox>
                    </Stack>
                  </CardBody>
                </Card>
              </TabPanel>
            </TabPanels>
          </Tabs>

          {/* Modals */}
          <PasswordChangeModal />
          <TwoFactorAuthModal />
        </Container>
      </Box>
    </Flex>
  );
};

export default SettingsPage;

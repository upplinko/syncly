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
  CardHeader,
  CardBody,
  Tag,
  TagLabel,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  FormControl,
  FormLabel,
  Input,
  Select,
  Textarea,
  Tabs,
  TabList,
  TabPanels,
  Tab,
  TabPanel,
  Switch,
  useDisclosure,
  useColorModeValue
} from '@chakra-ui/react';
import { 
  RiAddLine,
  RiDashboardLine,
  RiCalendar2Line, 
  RiLinkM,
  RiShareLine,
  RiTeamLine,
  RiSettingsLine
} from 'react-icons/ri';

const EventTypes = () => {
  const navigate = useNavigate();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [eventType, setEventType] = useState('');
  const [eventDuration, setEventDuration] = useState(15);
  const [eventName, setEventName] = useState('');
  const [eventDescription, setEventDescription] = useState('');
  const [selectedMeetingPlatform, setSelectedMeetingPlatform] = useState(null);

  const bgColor = useColorModeValue('gray.50', 'gray.800');
  const cardBg = useColorModeValue('white', 'gray.700');

  const meetingPlatforms = [
    { 
      name: 'Google Meet', 
      color: 'green.500',
      textLogo: 'GM'
    },
    { 
      name: 'Zoom', 
      color: 'blue.500',
      textLogo: 'Z'
    },
    { 
      name: 'Microsoft Teams', 
      color: 'purple.500',
      textLogo: 'MT'
    },
    { 
      name: 'Webex', 
      color: 'orange.500',
      textLogo: 'WX'
    }
  ];

  const EventTypeCard = ({ title, duration, description, color }) => (
    <Card 
      bg={cardBg} 
      boxShadow="md" 
      borderTop="4px solid"
      borderTopColor={color}
      transition="all 0.3s"
      _hover={{
        transform: 'translateY(-5px)',
        boxShadow: 'lg'
      }}
    >
      <CardHeader>
        <HStack justify="space-between">
          <VStack align="start" spacing={2}>
            <Heading size="md" color={color}>{title}</Heading>
            <Text color="gray.500" fontSize="sm">{description}</Text>
          </VStack>
          <Tag size="md" variant="subtle" colorScheme={color.replace('syncly.', '')}>
            <TagLabel>{duration} min</TagLabel>
          </Tag>
        </HStack>
      </CardHeader>
      <CardBody>
        <HStack spacing={2}>
          <Button 
            leftIcon={<RiLinkM />} 
            variant="outline" 
            size="sm"
            colorScheme="blue"
          >
            Copy Link
          </Button>
          <Button 
            leftIcon={<RiShareLine />} 
            variant="solid" 
            size="sm" 
            colorScheme="blue"
          >
            Share
          </Button>
        </HStack>
      </CardBody>
    </Card>
  );

  const EventTypesSidebar = () => (
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
            color: 'gray.500',
            path: '/dashboard'
          },
          { 
            icon: RiCalendar2Line, 
            label: 'Scheduling', 
            color: 'syncly.accent', 
            active: true,
            path: '/scheduling'
          },
          { 
            icon: RiTeamLine, 
            label: 'Team', 
            color: 'purple.500',
            path: '/team'
          },
          { 
            icon: RiSettingsLine, 
            label: 'Settings', 
            color: 'gray.500',
            path: '/settings'
          }
        ].map((item, index) => (
          <Button
            key={index}
            leftIcon={<Icon as={item.icon} />}
            justifyContent="start"
            variant={item.active ? 'solid' : 'ghost'}
            colorScheme={item.active ? 'blue' : 'gray'}
            onClick={() => navigate(item.path)}
          >
            {item.label}
          </Button>
        ))}
      </VStack>

      <Box mt="auto">
        <Button 
          w="full" 
          colorScheme="blue" 
          leftIcon={<RiAddLine />}
          onClick={onOpen}
        >
          Create Event
        </Button>
      </Box>
    </VStack>
  );

  const CreateEventModal = () => (
    <Modal isOpen={isOpen} onClose={onClose} size="xl">
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Create New Event Type</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <Tabs variant="soft-rounded" colorScheme="blue">
            <TabList mb={4}>
              <Tab>Event Details</Tab>
              <Tab>Availability</Tab>
              <Tab>Customization</Tab>
            </TabList>
            <TabPanels>
              {/* Event Details Tab */}
              <TabPanel>
                <VStack spacing={4} align="stretch">
                  <FormControl>
                    <FormLabel>Event Name</FormLabel>
                    <Input 
                      placeholder="15 Minute Consultation" 
                      value={eventName}
                      onChange={(e) => setEventName(e.target.value)}
                    />
                  </FormControl>

                  <FormControl>
                    <FormLabel>Description</FormLabel>
                    <Textarea 
                      placeholder="A quick strategy call to discuss your needs" 
                      value={eventDescription}
                      onChange={(e) => setEventDescription(e.target.value)}
                    />
                  </FormControl>

                  <FormControl>
                    <FormLabel>Event Duration</FormLabel>
                    <Select 
                      value={eventDuration}
                      onChange={(e) => setEventDuration(parseInt(e.target.value))}
                    >
                      <option value={15}>15 Minutes</option>
                      <option value={30}>30 Minutes</option>
                      <option value={45}>45 Minutes</option>
                      <option value={60}>60 Minutes</option>
                    </Select>
                  </FormControl>
                </VStack>
              </TabPanel>

              {/* Availability Tab */}
              <TabPanel>
                <VStack spacing={4} align="stretch">
                  <FormControl display="flex" alignItems="center">
                    <FormLabel mb="0">Enable Buffering Time</FormLabel>
                    <Switch colorScheme="blue" />
                  </FormControl>

                  <FormControl>
                    <FormLabel>Buffer Before Meeting</FormLabel>
                    <Select>
                      <option value="0">No Buffer</option>
                      <option value="5">5 Minutes</option>
                      <option value="10">10 Minutes</option>
                      <option value="15">15 Minutes</option>
                    </Select>
                  </FormControl>

                  <FormControl>
                    <FormLabel>Available Days</FormLabel>
                    <HStack spacing={2}>
                      {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].map(day => (
                        <Button 
                          key={day} 
                          size="sm" 
                          variant="outline"
                          colorScheme="blue"
                        >
                          {day}
                        </Button>
                      ))}
                    </HStack>
                  </FormControl>
                </VStack>
              </TabPanel>

              {/* Customization Tab */}
              <TabPanel>
                <VStack spacing={4} align="stretch">
                  <FormControl>
                    <FormLabel>Meeting Platform</FormLabel>
                    <SimpleGrid columns={2} spacing={4}>
                      {meetingPlatforms.map((platform) => (
                        <Box
                          key={platform.name}
                          borderWidth={2}
                          borderRadius="lg"
                          p={4}
                          textAlign="center"
                          cursor="pointer"
                          transition="all 0.2s"
                          bg={selectedMeetingPlatform === platform.name ? `${platform.color}` : 'white'}
                          color={selectedMeetingPlatform === platform.name ? 'white' : 'black'}
                          borderColor={selectedMeetingPlatform === platform.name ? `${platform.color}` : 'gray.200'}
                          _hover={{
                            borderColor: `${platform.color}`,
                            boxShadow: 'md',
                            transform: 'scale(1.05)'
                          }}
                          onClick={() => setSelectedMeetingPlatform(platform.name)}
                        >
                          <VStack>
                            <Box
                              w="60px"
                              h="60px"
                              borderRadius="full"
                              bg={platform.color}
                              color="white"
                              display="flex"
                              alignItems="center"
                              justifyContent="center"
                              fontWeight="bold"
                              fontSize="2xl"
                              mb={2}
                            >
                              {platform.textLogo}
                            </Box>
                            <Text fontWeight="medium">{platform.name}</Text>
                          </VStack>
                        </Box>
                      ))}
                    </SimpleGrid>
                  </FormControl>

                  <FormControl>
                    <FormLabel>Booking Link Color</FormLabel>
                    <HStack>
                      {['blue', 'green', 'purple', 'teal', 'orange'].map(color => (
                        <Box 
                          key={color} 
                          w={8} 
                          h={8} 
                          bg={`${color}.500`} 
                          borderRadius="full"
                        />
                      ))}
                    </HStack>
                  </FormControl>

                  <FormControl display="flex" alignItems="center">
                    <FormLabel mb="0">Require Confirmation</FormLabel>
                    <Switch colorScheme="blue" />
                  </FormControl>
                </VStack>
              </TabPanel>
            </TabPanels>
          </Tabs>
        </ModalBody>

        <ModalFooter>
          <Button colorScheme="blue" mr={3} onClick={onClose}>
            Create Event Type
          </Button>
          <Button variant="ghost" onClick={onClose}>Cancel</Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );

  return (
    <Flex h="100vh" bg={bgColor}>
      {/* Sidebar */}
      <EventTypesSidebar />

      {/* Main Content */}
      <Box flex={1} overflowY="auto" p={8}>
        <Container maxW="container.xl">
          <Heading mb={8}>Event Types</Heading>

          <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} spacing={6}>
            <EventTypeCard 
              title="15 Min Consultation" 
              duration={15} 
              description="Quick strategy call"
              color="syncly.accent"
            />
            <EventTypeCard 
              title="30 Min Deep Dive" 
              duration={30} 
              description="Detailed project discussion"
              color="green.500"
            />
            <EventTypeCard 
              title="60 Min Workshop" 
              duration={60} 
              description="Comprehensive planning session"
              color="purple.500"
            />
          </SimpleGrid>
        </Container>
      </Box>

      {/* Create Event Modal */}
      <CreateEventModal />
    </Flex>
  );
};

export default EventTypes;

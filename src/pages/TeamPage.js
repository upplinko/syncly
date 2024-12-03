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
  Input,
  InputGroup,
  InputLeftElement,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  FormControl,
  FormLabel,
  Select,
  useDisclosure,
  useColorModeValue
} from '@chakra-ui/react';
import { 
  RiDashboardLine,
  RiCalendar2Line, 
  RiTeamLine,
  RiSettingsLine,
  RiSearchLine,
  RiAddLine,
  RiMailLine,
  RiUserAddLine,
  RiDeleteBinLine,
  RiEditLine,
  RiArrowRightLine
} from 'react-icons/ri';

const TeamPage = () => {
  const navigate = useNavigate();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [searchTerm, setSearchTerm] = useState('');
  const [teamMembers, setTeamMembers] = useState([
    {
      id: 1,
      name: 'Emily Rodriguez',
      role: 'Product Manager',
      email: 'emily@syncly.com',
      avatar: 'https://bit.ly/dan-abramov',
      status: 'Active'
    },
    {
      id: 2,
      name: 'Michael Chen',
      role: 'Senior Developer',
      email: 'michael@syncly.com',
      avatar: 'https://bit.ly/kent-c-dodds',
      status: 'Active'
    },
    {
      id: 3,
      name: 'Sarah Johnson',
      role: 'UX Designer',
      email: 'sarah@syncly.com',
      avatar: 'https://bit.ly/ryan-florence',
      status: 'Pending'
    }
  ]);

  const TeamSidebar = () => (
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
            active: true,
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
            colorScheme={item.active ? 'indigo' : 'gray'}
            onClick={() => navigate(item.path)}
          >
            {item.label}
          </Button>
        ))}
      </VStack>

      <Box mt="auto">
        <Button 
          w="full" 
          colorScheme="indigo" 
          leftIcon={<RiUserAddLine />}
          onClick={onOpen}
        >
          Invite Team Member
        </Button>
      </Box>
    </VStack>
  );

  const TeamMemberCard = ({ member, onEdit, onDelete }) => (
    <Card 
      bg={useColorModeValue('white', 'gray.700')} 
      boxShadow="md"
      borderLeft="4px solid"
      borderLeftColor={member.status === 'Active' ? 'teal.500' : 'orange.500'}
      transition="all 0.3s"
      _hover={{
        transform: 'translateX(5px)',
        boxShadow: 'lg'
      }}
    >
      <CardBody>
        <Flex align="center" justify="space-between">
          <HStack spacing={4}>
            <Avatar 
              size="md" 
              name={member.name} 
              src={member.avatar} 
            />
            <VStack align="start" spacing={0}>
              <Heading size="sm">{member.name}</Heading>
              <Text fontSize="xs" color="gray.500">{member.role}</Text>
              <HStack>
                <Icon as={RiMailLine} color="gray.400" />
                <Text fontSize="xs" color="gray.600">{member.email}</Text>
              </HStack>
            </VStack>
          </HStack>
          <HStack>
            <Button 
              size="sm" 
              variant="ghost" 
              colorScheme="teal"
              onClick={() => onEdit(member)}
            >
              <Icon as={RiEditLine} />
            </Button>
            <Button 
              size="sm" 
              variant="ghost" 
              colorScheme="red"
              onClick={() => onDelete(member.id)}
            >
              <Icon as={RiDeleteBinLine} />
            </Button>
          </HStack>
        </Flex>
      </CardBody>
    </Card>
  );

  const InviteMemberModal = () => (
    <Modal isOpen={isOpen} onClose={onClose} size="md">
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Invite Team Member</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <VStack spacing={4}>
            <FormControl>
              <FormLabel>Name</FormLabel>
              <Input placeholder="Enter team member's name" />
            </FormControl>
            <FormControl>
              <FormLabel>Email</FormLabel>
              <Input placeholder="Enter email address" type="email" />
            </FormControl>
            <FormControl>
              <FormLabel>Role</FormLabel>
              <Select placeholder="Select role">
                <option value="developer">Developer</option>
                <option value="designer">Designer</option>
                <option value="manager">Manager</option>
                <option value="sales">Sales</option>
              </Select>
            </FormControl>
          </VStack>
        </ModalBody>
        <ModalFooter>
          <Button colorScheme="indigo" mr={3}>
            Send Invite
          </Button>
          <Button variant="ghost" onClick={onClose}>
            Cancel
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );

  const handleDeleteMember = (id) => {
    setTeamMembers(teamMembers.filter(member => member.id !== id));
  };

  const handleEditMember = (member) => {
    // Placeholder for edit functionality
    console.log('Edit member:', member);
  };

  const filteredMembers = teamMembers.filter(member => 
    member.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    member.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <Flex h="100vh" bg={useColorModeValue('gray.50', 'gray.800')}>
      {/* Sidebar */}
      <TeamSidebar />

      {/* Main Content */}
      <Box flex={1} overflowY="auto" p={8}>
        <Container maxW="container.xl">
          <Flex justify="space-between" align="center" mb={8}>
            <Heading>Team Management</Heading>
            <HStack>
              <InputGroup>
                <InputLeftElement
                  pointerEvents="none"
                  children={<Icon as={RiSearchLine} color="gray.300" />}
                />
                <Input 
                  placeholder="Search team members" 
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </InputGroup>
              <Button 
                colorScheme="indigo" 
                leftIcon={<RiUserAddLine />}
                onClick={onOpen}
              >
                Invite Member
              </Button>
            </HStack>
          </Flex>

          {/* Team Members Grid */}
          <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} spacing={6}>
            {filteredMembers.map(member => (
              <TeamMemberCard 
                key={member.id}
                member={member}
                onEdit={handleEditMember}
                onDelete={handleDeleteMember}
              />
            ))}
          </SimpleGrid>

          {/* Invite Member Modal */}
          <InviteMemberModal />
        </Container>
      </Box>
    </Flex>
  );
};

export default TeamPage;

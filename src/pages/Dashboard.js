import React from 'react';
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
  Stat,
  StatLabel,
  StatNumber,
  StatHelpText,
  StatArrow,
  Divider,
  Progress,
  Tag,
  Tooltip,
  useColorModeValue
} from '@chakra-ui/react';
import { 
  RiDashboardLine,
  RiCalendar2Line, 
  RiTimeLine,
  RiTeamLine,
  RiSettingsLine,
  RiLineChartLine,
  RiUserLine,
  RiMailLine,
  RiCalendarCheckLine,
  RiArrowRightLine,
  RiPieChartLine,
  RiTimeFill,
  RiBookmarkLine
} from 'react-icons/ri';

const Dashboard = () => {
  const navigate = useNavigate();
  const bgColor = useColorModeValue('gray.50', 'gray.800');
  const cardBg = useColorModeValue('white', 'gray.700');

  const DashboardSidebar = () => (
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
            active: true,
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
            path: '/settings'
          }
        ].map((item, index) => (
          <Button
            key={index}
            leftIcon={<Icon as={item.icon} />}
            justifyContent="start"
            variant={item.active ? 'solid' : 'ghost'}
            colorScheme={item.active ? 'teal' : 'gray'}
            onClick={() => navigate(item.path)}
          >
            {item.label}
          </Button>
        ))}
      </VStack>
    </VStack>
  );

  const MetricCard = ({ icon, title, value, change, color, progress }) => (
    <Card 
      bg={cardBg} 
      boxShadow="lg"
      borderTop="4px solid"
      borderTopColor={color}
      transition="all 0.3s"
      _hover={{
        transform: 'translateY(-5px)',
        boxShadow: 'xl'
      }}
      h="full"
    >
      <CardBody>
        <Flex direction="column" h="full">
          <HStack justify="space-between" mb={4}>
            <HStack>
              <Icon as={icon} color={color} w={6} h={6} />
              <Text fontWeight="medium" color="gray.500">{title}</Text>
            </HStack>
            <Tooltip label="Performance Trend">
              <Tag colorScheme={change > 0 ? 'green' : 'red'} size="sm">
                {change > 0 ? '+' : ''}{change}%
              </Tag>
            </Tooltip>
          </HStack>
          <Heading size="lg" mb={2}>{value}</Heading>
          <Progress 
            value={progress} 
            colorScheme={color.split('.')[0]} 
            size="sm" 
            borderRadius="full"
            mt="auto"
          />
        </Flex>
      </CardBody>
    </Card>
  );

  const QuickActionCard = ({ icon, title, description, color, onClick }) => (
    <Card 
      bg={cardBg} 
      boxShadow="md"
      borderLeft="4px solid"
      borderLeftColor={color}
      transition="all 0.3s"
      _hover={{
        transform: 'translateX(10px)',
        boxShadow: 'lg',
        cursor: 'pointer'
      }}
      onClick={onClick}
      w="full"
      h="full"
    >
      <CardBody>
        <HStack spacing={4} align="center" h="full">
          <Box 
            bg={`${color.split('.')[0]}.50`} 
            p={3} 
            borderRadius="full"
          >
            <Icon as={icon} color={color} w={6} h={6} />
          </Box>
          <VStack align="start" spacing={1} flex={1}>
            <Heading size="sm" color={color}>{title}</Heading>
            <Text fontSize="xs" color="gray.500">{description}</Text>
          </VStack>
          <Icon as={RiArrowRightLine} color="gray.400" />
        </HStack>
      </CardBody>
    </Card>
  );

  return (
    <Flex h="100vh" bg={bgColor}>
      {/* Sidebar */}
      <DashboardSidebar />

      {/* Main Content */}
      <Box flex={1} overflowY="auto" p={8}>
        <Container maxW="container.xl">
          <Flex justify="space-between" align="center" mb={8}>
            <Heading>Dashboard</Heading>
            <HStack>
              <Button size="sm" variant="outline" colorScheme="teal">
                Export Report
              </Button>
              <Button size="sm" colorScheme="teal">
                New Project
              </Button>
            </HStack>
          </Flex>

          {/* Performance Metrics */}
          <SimpleGrid columns={{ base: 1, md: 3 }} spacing={6} mb={8}>
            <MetricCard 
              icon={RiCalendar2Line} 
              title="Total Meetings" 
              value="24" 
              change={23}
              color="teal.500"
              progress={75}
            />
            <MetricCard 
              icon={RiTimeLine} 
              title="Total Hours" 
              value="36h" 
              change={15}
              color="cyan.500"
              progress={60}
            />
            <MetricCard 
              icon={RiLineChartLine} 
              title="Productivity" 
              value="87%" 
              change={12}
              color="indigo.500"
              progress={87}
            />
          </SimpleGrid>

          {/* Quick Actions & Insights */}
          <Flex mb={8} gap={6}>
            {/* Quick Actions */}
            <Box flex={2}>
              <Heading size="md" mb={4}>Quick Actions</Heading>
              <SimpleGrid columns={1} spacing={4}>
                <QuickActionCard 
                  icon={RiUserLine}
                  title="Invite Team Members"
                  description="Expand your scheduling capabilities"
                  color="teal.500"
                  onClick={() => navigate('/team')}
                />
                <QuickActionCard 
                  icon={RiMailLine}
                  title="Email Integrations"
                  description="Connect your email for seamless scheduling"
                  color="cyan.500"
                  onClick={() => navigate('/settings')}
                />
                <QuickActionCard 
                  icon={RiCalendarCheckLine}
                  title="Set Up Availability"
                  description="Configure your working hours"
                  color="indigo.500"
                  onClick={() => navigate('/scheduling')}
                />
              </SimpleGrid>
            </Box>

            {/* Insights */}
            <Box flex={3} bg={cardBg} borderRadius="lg" p={6} boxShadow="md">
              <Flex justify="space-between" align="center" mb={4}>
                <Heading size="md">Recent Activity</Heading>
                <Button size="xs" variant="ghost" colorScheme="teal">
                  View All
                </Button>
              </Flex>
              <VStack spacing={3} divider={<Divider />}>
                {[
                  { 
                    icon: RiBookmarkLine, 
                    title: "30 Min Strategy Call", 
                    time: "Today at 2:00 PM",
                    color: "teal"
                  },
                  { 
                    icon: RiTimeFill, 
                    title: "Team Sync Meeting", 
                    time: "Yesterday at 10:30 AM",
                    color: "cyan"
                  },
                  { 
                    icon: RiPieChartLine, 
                    title: "Quarterly Review", 
                    time: "Last Week",
                    color: "indigo"
                  }
                ].map((activity, index) => (
                  <HStack key={index} w="full" justify="space-between">
                    <HStack>
                      <Box 
                        bg={`${activity.color}.50`} 
                        p={2} 
                        borderRadius="full"
                      >
                        <Icon as={activity.icon} color={`${activity.color}.500`} />
                      </Box>
                      <VStack align="start" spacing={0}>
                        <Text fontWeight="medium">{activity.title}</Text>
                        <Text fontSize="xs" color="gray.500">{activity.time}</Text>
                      </VStack>
                    </HStack>
                    <Icon as={RiArrowRightLine} color="gray.400" />
                  </HStack>
                ))}
              </VStack>
            </Box>
          </Flex>
        </Container>
      </Box>
    </Flex>
  );
};

export default Dashboard;

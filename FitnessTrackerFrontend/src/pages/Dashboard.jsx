import { Box, Flex, Text, Button, HStack, Spacer } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";

const DUMMY_USER = {
  id: 2,
  email: "john@example.com",
  username: "john_doe",
};

const Dashboard = () => {
  const navigate = useNavigate();
  const [workouts, setWorkouts] = useState([]);
  const [loading, setLoading] = useState(true);
  const handleLogout = () => {
    localStorage.removeItem("user");
    alert("Logged out successfully");
    navigate("/");
  };

  useEffect(() => {
    // GET workouts for user
    fetch(`http://localhost:8080/api/workouts/user/${DUMMY_USER.id}`)
      .then((res) => {
        if (!res.ok) throw new Error("Failed to fetch workouts");
        return res.json();
      })
      .then((data) => {
        console.log("Fetched workouts:", data); // debug log
        setWorkouts(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching workouts:", err); // debug log
        setLoading(false);
      });
  }, []);

  // Calculate workouts completed
  const workoutsCompleted = workouts.length;

  // Calculate total calories burned 
  const caloriesBurned = workouts.reduce((sum, workout) => {
    if (!workout.calories) return sum;

    const caloriesStr = workout.calories.toString();
    console.log("Calories raw:", caloriesStr); // Debug log

    // Remove all non-digits, parse to int
    const num = parseInt(caloriesStr.replace(/\D/g, ""), 10);
    if (!isNaN(num)) {
      return sum + num;
    }
    return sum;
  }, 0);

  if (loading) {
    return (
      <Flex minH="100vh" align="center" justify="center">
        <Text fontSize="xl" color="teal.600">
          Loading...
        </Text>
      </Flex>
    );
  }

  return (
    <Flex direction="column" minH="90vh" minW="90vw" bg="gray.100">
      {/* Top Navigation */}
      <Flex
        bg="white"
        px={8}
        py={4}
        alignItems="center"
        flexWrap="wrap"
        boxShadow="md"
      >
        <Text fontSize="xl" fontWeight="bold" color="teal.600" padding={5}>
          Fitness Tracker
        </Text>
        <Spacer />
        <HStack spacing={4} flexWrap="wrap">
          <Button
            variant="ghost"
            color="teal.600"
            _hover={{ bg: "teal.600", color: "black" }}
            onClick={() => navigate("/workouts")}
          >
            Workouts
          </Button>
          <Button
            variant="ghost"
            color="teal.600"
            _hover={{ bg: "teal.600", color: "black" }}
            onClick={() => navigate("/progress")}
          >
            Progress
          </Button>
          <Button
            variant="ghost"
            color="red.500"
            _hover={{ bg: "red.600", color: "black" }}
            onClick={handleLogout}
          >
            Logout
          </Button>
        </HStack>
      </Flex>

      {/* Main Content */}
      <Box flex="1" p={8}>
        <Text fontSize="2xl" fontWeight="semibold" mb={6} color="teal.600">
          Dashboard Overview
        </Text>

        <Flex gap={6} flexWrap="wrap">
          {/* Workouts Completed */}
          <Box
            bg="white"
            p={6}
            borderRadius="md"
            boxShadow="sm"
            flex="1"
            minW="250px"
          >
            <Text fontWeight="bold" mb={2} color="teal.500">
              Workouts Completed
            </Text>
            <Text fontSize="2xl" color="teal.500">
              {workoutsCompleted}
            </Text>
          </Box>

          {/* Calories Burned */}
          <Box
            bg="white"
            p={6}
            borderRadius="md"
            boxShadow="sm"
            flex="1"
            minW="250px"
          >
            <Text fontWeight="bold" mb={2} color="teal.500">
              Calories Burned
            </Text>
            <Text fontSize="2xl" color="teal.500">
              {caloriesBurned}
            </Text>
          </Box>
        </Flex>

        {/* Action Buttons */}
        <Flex justify="center" mt={8} gap={4}>
          <Button
            variant="ghost"
            color="teal.600"
            _hover={{ bg: "teal.600", color: "black" }}
            onClick={() => navigate("/workouts/add")}
          >
            ADD NEW WORKOUT
          </Button>
        </Flex>
      </Box>
    </Flex>
  );
};

export default Dashboard;

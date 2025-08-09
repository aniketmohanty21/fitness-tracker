import React, { useEffect, useState } from "react";
import { Box, Button, Flex, Text } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const WorkoutsPage = () => {
  const navigate = useNavigate();
  const userId = 2; // dummy user
  const [workouts, setWorkouts] = useState([]);

  // Fetch workouts from backend
  const fetchWorkouts = async () => {
    try {
      const response = await axios.get(
        `http://localhost:8080/api/workouts/user/${userId}`
      );
      setWorkouts(response.data);
    } catch (error) {
      alert("Failed to load workouts: " + error.message);
    }
  };

  useEffect(() => {
    fetchWorkouts();
  }, []);

  // ISO datetime format 
  const formatDate = (isoString) => {
    if (!isoString) return "No date";
    const date = new Date(isoString);
    return date.toLocaleString(undefined, {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  // Delete workout
  const deleteWorkout = async (id) => {
    try {
      await axios.delete(`http://localhost:8080/api/workouts/${id}`);
      alert("Workout deleted");
      fetchWorkouts();
    } catch (error) {
      alert("Delete failed: " + error.message);
    }
  };

  // Update workouts
  const updateWorkout = (id) => {
    navigate(`/workouts/update/${id}`);
  };

  return (
    <Box p={8} bg="gray.100" minH="90vh" minW="90vw">
      <Flex justify="space-between" mb={6}>
        <Text fontSize="2xl" fontWeight="semibold" color="teal.600">
          Your Workouts
        </Text>
        <Button
            variant="ghost"
            color="teal.600"
            _hover={{ bg: "teal.600", color: "black" }}
            onClick={() => navigate("/dashboard")}
          >
            Dashboard
          </Button>
        <Button
            variant="ghost"
            color="teal.600"
            _hover={{ bg: "teal.600", color: "black" }}
            onClick={() => navigate("/workouts/add")}
          >
            Add Workout
          </Button>
      </Flex>

      <Flex gap={6} flexWrap="wrap">
        {workouts.length === 0 && (
          <Text color="black">No workouts found. Add some to get started!</Text>
        )}

        {workouts.map((workout) => (
          <Box
            key={workout.id}
            bg="white"
            p={6}
            borderRadius="md"
            boxShadow="sm"
            minW="250px"
            flex="1"
            display="flex"
            flexDirection="column"
            justifyContent="space-between"
          >
            <Box>
              <Text fontWeight="bold" fontSize="lg" mb={2} color="teal.600">
                {workout.name || workout.type}
              </Text>
              <Text color="black">Description: {workout.description}</Text>
              <Text color="black">Duration: {workout.duration}</Text>
              <Text color="black">Calories Burned: {workout.calories}</Text>
              <Text mt={2} fontSize="sm" color="gray.500">
                Date: {formatDate(workout.workoutDate)}
              </Text>
            </Box>

            <Flex mt={4} justifyContent="space-between" alignItems="center">
            <Button
                variant="ghost"
                color="teal.600"
                _hover={{ bg: "teal.600", color: "black" }}
                onClick={() => updateWorkout(workout.id)}
             >
            UPDATE
              </Button>

               <Button
                variant="ghost"
                color="teal.600"
                _hover={{ bg: "teal.600", color: "black" }}
                onClick={() => deleteWorkout(workout.id)}
             >
            DELETE
              </Button>
            </Flex>
          </Box>
        ))}
      </Flex>
    </Box>
  );
};

export default WorkoutsPage;

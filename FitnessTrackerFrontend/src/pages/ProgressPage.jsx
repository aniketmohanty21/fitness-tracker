import { useEffect, useState } from "react";
import { Button, Box, Heading, VStack, Spinner } from "@chakra-ui/react";
import WorkoutTypePie from "../charts/WorkoutTypePie";
import CaloriesTrendChart from "../charts/CaloriesTrendChart";
import { useNavigate } from "react-router-dom";


const DUMMY_USER = { id: 2 };

const ProgressPage = () => {
  const [workouts, setWorkouts] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchWorkouts = async () => {
      try {
        const res = await fetch(
          `http://localhost:8080/api/workouts/user/${DUMMY_USER.id}`
        );
        const data = await res.json();

        // API data → { id, type, calories, date: DD-MM-YYYY }
        const formatted = data.map((w) => {
          const dateObj = new Date(w.workoutDate);
          const day = String(dateObj.getDate()).padStart(2, "0");
          const month = String(dateObj.getMonth() + 1).padStart(2, "0");
          const year = dateObj.getFullYear();
          return {
            id: w.id,
            type: w.type,
            calories: w.caloriesBurned, 
            date: `${day}-${month}-${year}`,
          };
        });

        setWorkouts(formatted);
      } catch (error) {
        console.error("Error fetching workouts:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchWorkouts();
  }, []);

  return (
    <Box p={6} bg="gray.100" minH="90vh" minW="90vw">
      <Heading mb={6} color="teal.600">
        Progress Overview
      </Heading>
      <Button
                  variant="ghost"
                  color="teal.600"
                  _hover={{ bg: "teal.600", color: "black" }}
                  onClick={() => navigate("/dashboard")}
                  padding="6px 12px"
                  margin="0 0 16px 0"
                >
                  Dashboard
                </Button>

      {loading ? (
        <Spinner size="xl" color="teal.500" />
      ) : (
        <VStack spacing={6} align="stretch">
          <WorkoutTypePie workouts={workouts} />
          <CaloriesTrendChart workouts={workouts} />
        </VStack>
      )}
    </Box>
  );
};

export default ProgressPage;

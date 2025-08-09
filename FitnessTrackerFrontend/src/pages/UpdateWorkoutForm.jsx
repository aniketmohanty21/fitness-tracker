import React, { useEffect, useState } from "react";
import {
  Button,
  Field,
  Fieldset,
  Input,
  Stack,
} from "@chakra-ui/react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";

const UpdateWorkoutForm = () => {
  const navigate = useNavigate();
  const { id } = useParams(); // workout id from URL
  const userId = 2; // dummy user

  const [formData, setFormData] = useState({
    type: "",
    description: "",
    duration: "",
    calories: "",
    workoutDate: "",
  });

  // Fetch existing workout details
  useEffect(() => {
    const fetchWorkout = async () => {
      try {
        const response = await axios.get(`http://localhost:8080/api/workouts/user/${userId}`);
        const workout = response.data.find((w) => w.id === parseInt(id));
        if (workout) {
          setFormData({
            type: workout.type,
            description: workout.description,
            duration: workout.duration,
            calories: workout.calories,
            workoutDate: workout.workoutDate.slice(0,16), // format for datetime-local input
          });
        }
      } catch (error) {
        alert("Failed to load workout: " + error.message);
      }
    };
    fetchWorkout();
  }, [id, userId]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async () => {
    if (!formData.type || !formData.duration || !formData.calories || !formData.workoutDate) {
      alert("Please fill all required fields.");
      return;
    }
    try {
      await axios.put(`http://localhost:8080/api/workouts/${id}`, {
        ...formData,
        duration: formData.duration.toString(),
        calories: formData.calories.toString(),
      });
      alert("Workout updated successfully!");
      navigate("/workouts");
    } catch (error) {
      alert("Failed to update workout: " + error.message);
    }
  };

  return (
    <Fieldset.Root
      size="lg"
      maxW="md"
      bg="#FFFFFF"
      p={6}
      borderRadius="md"
      boxShadow="md"
      minH="50vh"
      minW="50vw"
    >
      <Stack mb={4}>
        <Fieldset.Legend color="#319795" fontWeight="semibold" fontSize="xl">
          Update Workout
        </Fieldset.Legend>
      </Stack>

      <Fieldset.Content>
        <Field.Root mb={4}>
          <Field.Label color="#319795">Workout Type *</Field.Label>
          <Input
            name="type"
            placeholder="Cardio, Strength, Flexibility, etc."
            bg="#FFFFFF"
            color="#000000"
            value={formData.type}
            onChange={handleChange}
          />
        </Field.Root>

        <Field.Root mb={4}>
          <Field.Label color="#319795">Workout Description</Field.Label>
          <Input
            name="description"
            placeholder="Brief description of the workout"
            bg="#FFFFFF"
            color="#000000"
            value={formData.description}
            onChange={handleChange}
          />
        </Field.Root>

        <Field.Root mb={4}>
          <Field.Label color="#319795">Workout Duration (minutes) *</Field.Label>
          <Input
            name="duration"
            placeholder="Duration in minutes"
            bg="#FFFFFF"
            color="#000000"
            value={formData.duration}
            onChange={handleChange}
          />
        </Field.Root>

        <Field.Root mb={4}>
          <Field.Label color="#319795">Calories Burned *</Field.Label>
          <Input
            name="calories"
            placeholder="Estimated calories burned"
            bg="#FFFFFF"
            color="#000000"
            value={formData.calories}
            onChange={handleChange}
          />
        </Field.Root>

        <Field.Root mb={4}>
          <Field.Label color="#319795">Workout Date *</Field.Label>
          <Input
            name="workoutDate"
            type="datetime-local"
            bg="#FFFFFF"
            color="#000000"
            value={formData.workoutDate}
            onChange={handleChange}
          />
        </Field.Root>
      </Fieldset.Content>

      <Button
        variant="ghost"
        color="teal.600"
        _hover={{ bg: "teal.600", color: "black" }}
        onClick={handleSubmit}
      >
        UPDATE
      </Button>
    </Fieldset.Root>
  );
};

export default UpdateWorkoutForm;
import React, { useState } from "react";
import {
  Button,
  Field,
  Fieldset,
  Input,
  Stack,
  Text,
} from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const AddWorkoutForm = () => {
  const navigate = useNavigate();
  const userId = 2; // dummy user id, adjust if needed

  // Form state
  const [formData, setFormData] = useState({
    type: "",
    description: "",
    duration: "",
    calories: "",
    workoutDate: "",
  });

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Submit handler
  const handleSubmit = async () => {
    // Basic validation (you can enhance)
    if (
      !formData.type ||
      !formData.duration ||
      !formData.calories ||
      !formData.workoutDate
    ) {
      alert("Please fill all required fields.");
      return;
    }

    try {
      await axios.post(
        `http://localhost:8080/api/workouts/user/${userId}`,
        {
          ...formData,
          duration: formData.duration.toString(),
          calories: formData.calories.toString(),
        }
      );
      alert("Workout added successfully!");
      navigate("/workouts");
    } catch (error) {
      alert("Failed to add workout: " + error.message);
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
          Add Workout
        </Fieldset.Legend>
        <Fieldset.HelperText color="#718096">
          Please fill out the workout details below.
        </Fieldset.HelperText>
      </Stack>

      <Fieldset.Content>
        <Field.Root mb={4}>
          <Field.Label color="#319795">Workout Type *</Field.Label>
          <Input
            name="type"
            placeholder="Cardio, Strength, Flexibility, etc."
            bg="#FFFFFF"
            color="#000000"
            _placeholder={{ color: "#A0AEC0" }}
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
            _placeholder={{ color: "#A0AEC0" }}
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
            _placeholder={{ color: "#A0AEC0" }}
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
            _placeholder={{ color: "#A0AEC0" }}
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
            _placeholder={{ color: "#A0AEC0" }}
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
        SUBMIT
      </Button>
    </Fieldset.Root>
  );
};

export default AddWorkoutForm;

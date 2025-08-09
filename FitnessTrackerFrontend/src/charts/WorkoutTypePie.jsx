import { PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer } from "recharts";
import { Box, Heading } from "@chakra-ui/react";

const COLORS = ["#319795", "#38B2AC", "#81E6D9", "#E6FFFA", "#285E61"];

const WorkoutTypePie = ({ workouts }) => {
  // Group by type
  const typeCount = workouts.reduce((acc, workout) => {
    acc[workout.type] = (acc[workout.type] || 0) + 1;
    return acc;
  }, {});

  const pieData = Object.keys(typeCount).map((type) => ({
    name: type,
    value: typeCount[type],
  }));

  return (
    <Box bg="white" p={4} rounded="lg" shadow="md">
      <Heading size="md" mb={4}>
        Workout Types
      </Heading>
      <ResponsiveContainer width="100%" height={300}>
        <PieChart>
          <Pie
            data={pieData}
            cx="50%"
            cy="50%"
            labelLine={false}
            outerRadius={100}
            dataKey="value"
          >
            {pieData.map((entry, index) => (
              <Cell key={index} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>
          <Tooltip />
          <Legend />
        </PieChart>
      </ResponsiveContainer>
    </Box>
  );
};

export default WorkoutTypePie;

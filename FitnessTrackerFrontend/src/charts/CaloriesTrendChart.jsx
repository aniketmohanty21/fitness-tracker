import React, { useEffect, useState } from "react";
import { Line } from "react-chartjs-2";
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from "chart.js";
import dayjs from "dayjs";

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

const DUMMY_USER = { id: 2 };

const CaloriesTrendChart = () => {
  const [chartData, setChartData] = useState(null);

  useEffect(() => {
    fetch(`http://localhost:8080/api/workouts/user/${DUMMY_USER.id}`)
      .then((res) => res.json())
      .then((data) => {
        // Group by date
        const caloriesPerDay = {};

        data.forEach((workout) => {
          const dateKey = dayjs(workout.workoutDate).format("YYYY-MM-DD");
          const calories = Number(workout.calories) || 0; // ensure number
          if (!caloriesPerDay[dateKey]) {
            caloriesPerDay[dateKey] = 0;
          }
          caloriesPerDay[dateKey] += calories;
        });

        // Sort dates
        const labels = Object.keys(caloriesPerDay).sort();
        const caloriesValues = labels.map((date) => caloriesPerDay[date]);

        setChartData({
          labels,
          datasets: [
            {
              label: "Calories Burned",
              data: caloriesValues,
              fill: false,
              borderColor: "#319795",
              tension: 0.3,
            },
          ],
        });
      })
      .catch((err) => console.error(err));
  }, []);

  if (!chartData) return <p>Loading chart...</p>;

  return <Line data={chartData} />;
};

export default CaloriesTrendChart;

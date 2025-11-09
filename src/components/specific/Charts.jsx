import React from "react";
import { Line, Doughnut } from "react-chartjs-2";
import {
  Chart as ChartJS,
  Tooltip,
  Filler,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  ArcElement,
  Legend, // Fixed capitalization
} from "chart.js";
import {
  lightOrange,
  lightPurpleColor,
  orange,
  purpleColor,
} from "../constants/color";
import { getLast7Days } from "../../lib/features";

// Removed 'scales' as it's not a component
ChartJS.register(
  Tooltip,
  CategoryScale,
  LinearScale,
  LineElement,
  PointElement,
  Filler,
  ArcElement,
  Legend // Fixed capitalization
);

const labels = getLast7Days();

const LineChartOptions = {
  responsive: true,
  plugins: {
    legend: {
      display: false,
    },
    title: {
      display: false,
    },
  },
  scales: {
    x: {
      grid: {
        display: false,
      },
    },
    y: {
      beginAtZero: true,
      grid: {
        display: false,
      },
    },
  },
};

const LineChart = ({ value = [] }) => {
  const data = {
    labels,
    datasets: [
      {
        label: "Messages",
        data: value,
        borderColor: purpleColor,
        backgroundColor: lightPurpleColor,
        fill: true,
      },
    ],
  };

  return <Line data={data} options={LineChartOptions} />; // Added options
};

const DoughnutChart = ({ value = [], labels = [] }) => {
  const DoughnutChartOptions = {
    responsive: true,
    plugins: {
      legend: {
        display: false,
      },
      cutout: 120,
    },
  };

  const data = {
    labels,
    datasets: [
      {
        data: value,
        hoverBackgroundColor: [purpleColor, orange],
        backgroundColor: [lightPurpleColor, lightOrange],
        offset: 20,
      },
    ],
  };
  return (
    <Doughnut
      style={{ zIndex: 10 }}
      data={data}
      options={DoughnutChartOptions}
    />
  );
};

export { LineChart, DoughnutChart };

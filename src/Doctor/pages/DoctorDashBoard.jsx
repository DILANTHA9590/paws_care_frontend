import React from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  PieChart,
  Pie,
  Cell,
  BarChart,
  Bar,
  ResponsiveContainer,
} from "recharts";

const data = [
  { name: "Jan", patients: 20 },
  { name: "Feb", patients: 35 },
  { name: "Mar", patients: 45 },
  { name: "Apr", patients: 32 },
];

const animalPieData = [
  { name: "Dogs", value: 60 },
  { name: "Cats", value: 30 },
  { name: "Rabbits", value: 15 },
];

const reviewData = [
  { name: "5 Stars", value: 40 },
  { name: "4 Stars", value: 25 },
  { name: "3 Stars", value: 15 },
  { name: "2 Stars", value: 10 },
  { name: "1 Star", value: 10 },
];

const COLORS = ["#4CAF50", "#00C49F", "#FFBB28", "#FF8042", "#FF4444"];

export default function DoctorDashboard() {
  return (
    <div className="h-full overflow-hidden overflow-y-auto p-8 flex flex-col gap-8 bg bg-amber-100">
      {/* Top Row: Line + Bar */}
      <div className="flex flex-1 justify-around items-center">
        {/* Line Chart */}
        <div className="flex flex-col items-center">
          <h2 className="text-xl font-bold mb-2">Line Chart</h2>
          <ResponsiveContainer width={500} height={300}>
            <LineChart data={data}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line type="monotone" dataKey="patients" stroke="#8884d8" />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* Bar Chart */}
        <div className="flex flex-col items-center">
          <h2 className="text-xl font-bold mb-2">Bar Chart</h2>
          <ResponsiveContainer width={500} height={300}>
            <BarChart data={data}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="patients" fill="#82ca9d" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Bottom Row: Pie + Pie */}
      <div className="flex flex-1 justify-around items-center">
        {/* Animal Pie Chart */}
        <div className="flex flex-col items-center">
          <h2 className="text-xl font-bold mb-2">Animal Distribution</h2>
          <PieChart width={400} height={400}>
            <Pie
              data={animalPieData}
              cx="50%"
              cy="50%"
              labelLine={false}
              label={({ name, percent }) =>
                `${name}: ${(percent * 100).toFixed(0)}%`
              }
              outerRadius={150}
              dataKey="value"
            >
              {animalPieData.map((entry, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={COLORS[index % COLORS.length]}
                />
              ))}
            </Pie>
            <Tooltip />
            <Legend />
          </PieChart>
        </div>

        {/* Review Pie Chart */}
        <div className="flex flex-col items-center">
          <h2 className="text-xl font-bold mb-2">Review Ratings</h2>
          <PieChart width={400} height={400}>
            <Pie
              data={reviewData}
              cx="50%"
              cy="50%"
              labelLine={false}
              label={({ name, percent }) =>
                `${name}: ${(percent * 100).toFixed(0)}%`
              }
              outerRadius={150}
              dataKey="value"
            >
              {reviewData.map((entry, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={COLORS[index % COLORS.length]}
                />
              ))}
            </Pie>
            <Tooltip />
            <Legend />
          </PieChart>
        </div>
      </div>
    </div>
  );
}

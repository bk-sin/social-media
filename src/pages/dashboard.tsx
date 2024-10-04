"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  LineChart,
  CartesianGrid,
  Legend,
  Line,
} from "recharts";

const sentimentCounts = {
  positive: 10,
  neutral: 15,
  negative: 2,
};

const postsOverTime = [
  {
    id: 21,
    userId: 1,
    content: "toro y pampa",
    createdAt: "2024-10-04T04:19:45.696Z",
    sentimentAnalysis: [
      {
        id: 1,
        postId: 21,
        userId: 1,
        positive: 0,
        negative: 0,
        neutral: 1,
        createdAt: "2024-10-04T04:19:49.249Z",
      },
    ],
  },
  {
    id: 22,
    userId: 1,
    content: "odio esto",
    createdAt: "2024-10-04T04:36:54.252Z",
    sentimentAnalysis: [
      {
        id: 2,
        postId: 22,
        userId: 1,
        positive: 0,
        negative: 1,
        neutral: 0,
        createdAt: "2024-10-04T04:36:57.994Z",
      },
    ],
  },
  {
    id: 23,
    userId: 1,
    content: "me gusta pero mas o menos che",
    createdAt: "2024-10-04T04:39:20.254Z",
    sentimentAnalysis: [
      {
        id: 3,
        postId: 23,
        userId: 1,
        positive: 0.3,
        negative: 0.2,
        neutral: 0.5,
        createdAt: "2024-10-04T04:39:24.039Z",
      },
    ],
  },
];

const transformToPieData = (sentimentCounts: {
  positive: number;
  neutral: number;
  negative: number;
}) => [
  {
    name: "Positive",
    value: sentimentCounts.positive,
    color: "rgb(34 197 94)",
  },
  { name: "Neutral", value: sentimentCounts.neutral, color: "rgb(234 179 8)" },
  {
    name: "Negative",
    value: sentimentCounts.negative,
    color: "rgb(239 68 68)",
  },
];

interface PieChartData {
  name: string;
  value: number;
}

const TextWithPieData = ({
  selectedEmotion,
  pieData,
}: {
  selectedEmotion: string | undefined;
  pieData: PieChartData[];
}) => {
  const totalResponses = pieData.reduce((acc, data) => acc + data.value, 0);
  const emotionData = pieData.find((data) => data.name === selectedEmotion);
  const emotionPercentage = emotionData
    ? ((emotionData.value / totalResponses) * 100).toFixed(1)
    : 0;
  return (
    <p className="text-sm text-gray-600">
      {emotionData
        ? `The ${selectedEmotion} emotion is ${emotionPercentage}% of the total posts`
        : `No data available for ${selectedEmotion}`}
    </p>
  );
};

export default function Dashboard() {
  const [selectedEmotion, setSelectedEmotion] = useState<string>();
  const sentimentOverTime = postsOverTime.map((post) => {
    const sentiment = post.sentimentAnalysis[0];
    return {
      createdAt: new Date(post.createdAt).toLocaleString(),
      positive: sentiment?.positive,
      neutral: sentiment?.neutral,
      negative: sentiment?.negative,
    };
  });

  const pieData = transformToPieData(sentimentCounts);

  return (
    <div className="bg-gradient-to-br from-purple-100 to-blue-100 p-6 rounded-lg shadow-lg max-w-4xl mx-auto">
      <motion.h1
        className="text-3xl font-bold mb-6 text-center text-gray-800"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        Dashboard
      </motion.h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <motion.div
          className="bg-white p-4 rounded-lg shadow-lg"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
          whileHover={{ scale: 1.02 }}
        >
          <h2 className="text-xl font-semibold mb-4 text-center text-gray-700">
            Sentiments over time
          </h2>

          <ResponsiveContainer width="100%" height={300}>
            <LineChart
              data={sentimentOverTime}
              margin={{
                top: 5,
                right: 30,
                left: 20,
                bottom: 5,
              }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="createdAt" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line type="monotone" dataKey="positive" stroke="#82ca9d" />
              <Line type="monotone" dataKey="neutral" stroke="#8884d8" />
              <Line type="monotone" dataKey="negative" stroke="#ff0000" />
            </LineChart>
          </ResponsiveContainer>
        </motion.div>

        <motion.div
          className="bg-white p-4 rounded-lg shadow-lg"
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
          whileHover={{ scale: 1.02 }}
        >
          <h2 className="text-xl font-semibold mb-4 text-center text-gray-700">
            Emotion Analysis
          </h2>
          <ResponsiveContainer width="100%" height={250}>
            <PieChart>
              <Pie
                data={pieData}
                cx="50%"
                cy="50%"
                labelLine={false}
                outerRadius={80}
                fill="#8884d8"
                dataKey="value"
                onMouseEnter={(_, index) =>
                  setSelectedEmotion(pieData[index].name)
                }
                onMouseLeave={() => setSelectedEmotion("")}
              >
                {pieData.map((entry, index) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={entry.color}
                    opacity={selectedEmotion === entry.name ? 1 : 0.7}
                    stroke={
                      selectedEmotion === entry.name ? "#000" : entry.color
                    }
                    strokeWidth={selectedEmotion === entry.name ? 2 : 0}
                  />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
          <div className="flex justify-around mt-4">
            {pieData.map((emotion) => (
              <motion.div
                key={emotion.name}
                className="text-center cursor-pointer"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={() => setSelectedEmotion(emotion.name)}
              >
                <div
                  className="w-8 h-8 rounded-full mx-auto mb-1"
                  style={{ backgroundColor: emotion.color }}
                ></div>
                <p className="text-xs">{emotion.name}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>

      <motion.div
        className="mt-6 bg-white p-4 rounded-lg shadow-lg"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        whileHover={{ scale: 1.02 }}
      >
        <h2 className="text-xl font-semibold mb-4 text-center text-gray-700">
          Key Metrics
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {[
            {
              title: "Total Followers",
              value: "1,234,567",
              icon: "/placeholder.svg?height=48&width=48",
            },
            {
              title: "Positivity Rate",
              value: "3.7%",
              icon: "/placeholder.svg?height=48&width=48",
            },
            {
              title: "Total Posts",
              value: "5,678",
              icon: "/placeholder.svg?height=48&width=48",
            },
          ].map((item, index) => (
            <motion.div
              key={item.title}
              className="text-center bg-gray-50 p-4 rounded-lg cursor-pointer"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              whileHover={{
                scale: 1.05,
                boxShadow: "0px 5px 15px rgba(0,0,0,0.1)",
                backgroundColor: "#f0f0f0",
              }}
              whileTap={{ scale: 0.95 }}
            >
              <motion.img
                src={item.icon}
                alt={item.title}
                className="w-12 h-12 mx-auto mb-2"
                transition={{ duration: 0.5 }}
              />
              <h3 className="text-lg font-semibold text-gray-700">
                {item.title}
              </h3>
              <AnimatePresence>
                <motion.p
                  key={item.value}
                  className="text-2xl font-bold text-blue-600"
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 10 }}
                  transition={{ duration: 0.3 }}
                >
                  {item.value}
                </motion.p>
              </AnimatePresence>
            </motion.div>
          ))}
        </div>
      </motion.div>

      <AnimatePresence>
        {selectedEmotion && (
          <motion.div
            className="fixed bottom-4 right-4 bg-white p-4 rounded-lg shadow-lg"
            initial={{ opacity: 0, y: 20, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.9 }}
            transition={{ duration: 0.3 }}
          >
            <h3 className="text-lg font-semibold mb-2">
              {`${selectedEmotion} Emotions`}
            </h3>
            <TextWithPieData
              selectedEmotion={selectedEmotion}
              pieData={pieData}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

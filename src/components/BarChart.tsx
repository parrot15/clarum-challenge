'use client';

import { useState, useEffect } from 'react';

interface BarChartProps {
  data: { date: string; value: number }[];
}

export default function BarChart({ data }: BarChartProps) {
  const [chartData, setChartData] = useState(data);

  useEffect(() => {
    setChartData(data);
    console.log('Chart data:', data); // Keep this debug log
  }, [data]);

  if (chartData.length === 0) {
    return (
      <div className="w-full h-96 bg-gray-100 p-4 rounded-lg shadow-md flex items-center justify-center">
        No data available
      </div>
    );
  }

  const maxValue = Math.max(...chartData.map((item) => item.value));
  const minValue = Math.min(...chartData.map((item) => item.value));
  const range = maxValue - minValue;

  return (
    <div className="w-full h-96 bg-gray-100 p-4 rounded-lg shadow-md">
      <div className="w-full h-full flex items-end space-x-1 relative">
        {chartData.map((item, index) => {
          const barHeight = ((item.value - minValue) / range) * 100;
          return (
            <div
              key={item.date}
              className="flex-1 flex flex-col items-center justify-end group relative"
              style={{ height: '100%' }} // Ensure full height
            >
              <div
                className="w-full bg-blue-500 hover:bg-blue-600 transition-all duration-200 cursor-pointer"
                style={{ height: `${Math.max(barHeight, 1)}%` }}
              ></div>
              <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 bg-black text-white p-1 rounded text-xs opacity-0 group-hover:opacity-100 transition-opacity">
                {item.value.toFixed(2)}
              </div>
              <div className="absolute top-full left-1/2 transform -translate-x-1/2 text-xs text-gray-600 whitespace-nowrap mt-1 opacity-0 group-hover:opacity-100 transition-opacity">
                {item.date}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

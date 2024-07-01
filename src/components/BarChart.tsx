'use client';

import { useState, useRef, useCallback } from 'react';
import { useVirtualizer } from '@tanstack/react-virtual';
import { DataPoint } from '@/lib/types';

interface BarChartProps {
  data: DataPoint[];
  minValue: number;
  maxValue: number;
}

/**
 * Visualizes the stock data as a bar chart. Supports rendering lots of
 * data (5000+ data points). Supports visual feedback (expanding bars on
 * hover), deleting bars on click, and scrolling left/right.
 */
const BarChart = ({ data, minValue, maxValue }: BarChartProps) => {
  const [chartData, setChartData] = useState<DataPoint[]>(data);
  const parentRef = useRef<HTMLDivElement>(null);

  const range = maxValue - minValue;
  const barWidth = 10; // Set a fixed width for each bar.

  const virtualizer = useVirtualizer({
    count: chartData.length,
    getScrollElement: () => parentRef.current,
    estimateSize: () => barWidth, // width of each bar
    overscan: 5,
    horizontal: true,
  });

  const handleBarClick = useCallback((index: number) => {
    setChartData((prevData) => prevData.filter((_, i) => i !== index));
  }, []);

  const renderBar = useCallback(
    (item: DataPoint, index: number) => {
      const barHeight = ((item.value - minValue) / range) * 100;
      return (
        <div
          className="h-[calc(100%-20px)] flex flex-col items-center justify-end group relative"
          style={{ width: `${barWidth}px` }}
        >
          <div
            className="w-full bg-blue-500 hover:bg-blue-600 transition-all duration-200 cursor-pointer transform hover:scale-110 origin-bottom"
            style={{ height: `${Math.max(barHeight, 1)}%` }}
            onClick={() => handleBarClick(index)}
          >
            <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 bg-black text-white p-1 rounded text-xs opacity-0 group-hover:opacity-100 transition-opacity mb-1">
              {item.value.toFixed(2)}
            </div>
            <div className="absolute bottom-[-20px] left-1/2 transform -translate-x-1/2 text-xs text-gray-600 whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity">
              {item.date}
            </div>
          </div>
        </div>
      );
    },
    [minValue, range, handleBarClick],
  );

  return (
    <div className="w-full h-full bg-gray-100 p-4 rounded-lg shadow-md">
      <div ref={parentRef} className="w-full h-full overflow-x-auto">
        <div
          className="h-full relative"
          style={{ width: `${chartData.length * barWidth}px` }}
        >
          {virtualizer.getVirtualItems().map((virtualItem) => (
            <div
              key={virtualItem.key}
              className="absolute top-0 left-0 h-full"
              style={{ transform: `translateX(${virtualItem.start}px)` }}
            >
              {renderBar(chartData[virtualItem.index], virtualItem.index)}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
export default BarChart;

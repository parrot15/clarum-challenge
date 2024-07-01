'use client';

import { useState, useRef, useCallback } from 'react';
import Bar from './Bar';
import useChartVirtualizer from '@/hooks/useChartVirtualizer';
import { DataPoint } from '@/lib/types';

interface BarChartProps {
  data: DataPoint[];
  minValue: number;
  maxValue: number;
}

// Set a fixed width for each bar.
const BAR_WIDTH = 10;

/**
 * Visualizes the stock data as a bar chart. Supports rendering lots of
 * data (5000+ data points). Supports visual feedback (expanding bars on
 * hover), deleting bars on click, and scrolling left/right.
 *
 * As per the requirements, this does not use any chart libraries - the
 * bar chart is rendered using TailwindCSS and dynamic CSS. A virtualization
 * library (react-virtual) is used to make rendering large datasets (5000+
 * data points) very efficient.
 */
const BarChart = ({ data, minValue, maxValue }: BarChartProps) => {
  const [chartData, setChartData] = useState<DataPoint[]>(data);
  const scrollRef = useRef<HTMLDivElement>(null);
  const range = maxValue - minValue;

  // Set up virtualization for efficient rendering. Allows us to only have
  // to render visible bars.
  const virtualizer = useChartVirtualizer(
    chartData.length,
    scrollRef,
    BAR_WIDTH,
  );

  // Calculates the height of a bar.
  // useCallback ensures this will only be re-created if minValue or
  // range changes.
  const calculateBarHeight = useCallback(
    (value: number) => ((value - minValue) / range) * 100,
    [minValue, range],
  );

  // Removes the bar from the chart when that bar is clicked.
  // useCallback is used here for same reason as above.
  const handleBarClick = useCallback((index: number) => {
    setChartData((prevData) => prevData.filter((_, i) => i !== index));
  }, []);

  return (
    <div className="w-full h-full bg-gray-100 p-4 rounded-lg shadow-md">
      <div ref={scrollRef} className="w-full h-full overflow-x-auto">
        <div
          className="h-full relative"
          // Set the total width of the chart container.
          // total width = # of bars * width of each bar
          style={{ width: `${chartData.length * BAR_WIDTH}px` }}
        >
          {/* Render only the visible bars. */}
          {virtualizer.getVirtualItems().map((virtualItem) => (
            <div
              key={virtualItem.key}
              className="absolute top-0 left-0 h-full"
              // Position each bar horizontally based on its virtual position.
              // Ensures each bar is placed at correct spot according to
              // virtualization process.
              style={{ transform: `translateX(${virtualItem.start}px)` }}
            >
              <Bar
                item={chartData[virtualItem.index]}
                barWidth={BAR_WIDTH}
                // calculateBarHeight and handleBarClick have useCallback,
                // so even though they're passed as props here, they won't
                // trigger unnecessary re-renders of the bars.
                barHeight={calculateBarHeight(
                  chartData[virtualItem.index].value,
                )}
                onBarClick={() => handleBarClick(virtualItem.index)}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
export default BarChart;

'use client';

import { useState, useEffect, useMemo, useRef } from 'react';

interface BarChartProps {
  data: { date: string; value: number }[];
}

export default function BarChart({ data }: BarChartProps) {
  const [chartData, setChartData] = useState(data);
  const [visibleRange, setVisibleRange] = useState({ start: 0, end: 100 });
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setChartData(data);
    setVisibleRange({ start: 0, end: Math.min(100, data.length) });
  }, [data]);

  const { maxValue, minValue } = useMemo(() => {
    const values = chartData.map((item) => item.value);
    return { maxValue: Math.max(...values), minValue: Math.min(...values) };
  }, [chartData]);

  const range = maxValue - minValue;

  const handleBarClick = (index: number) => {
    setChartData((prevData) => prevData.filter((_, i) => i !== index));
  };

  const handleScroll = () => {
    if (scrollRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current;
      const scrollPercentage = scrollLeft / (scrollWidth - clientWidth);
      const dataLength = chartData.length;
      const newStart = Math.floor(scrollPercentage * (dataLength - 100));
      setVisibleRange({ start: newStart, end: newStart + 100 });
    }
  };

  return (
    <div className="w-full h-96 bg-gray-100 p-4 rounded-lg shadow-md">
      <div
        ref={scrollRef}
        className="w-full h-full overflow-x-auto"
        onScroll={handleScroll}
      >
        <div
          className="h-full flex items-end space-x-1"
          style={{ width: `${chartData.length * 10}px` }}
        >
          {chartData.map((item, index) => {
            const barHeight = ((item.value - minValue) / range) * 100;
            const isVisible =
              index >= visibleRange.start && index < visibleRange.end;
            return (
              <div
                key={item.date}
                className={`w-2 flex flex-col items-center justify-end group relative ${isVisible ? '' : 'invisible'}`}
                style={{ height: '100%' }}
              >
                <div
                  className="w-full bg-blue-500 hover:bg-blue-600 transition-all duration-200 cursor-pointer transform hover:scale-110 origin-bottom"
                  style={{ height: `${Math.max(barHeight, 1)}%` }}
                  onClick={() => handleBarClick(index)}
                >
                  {isVisible && (
                    <>
                      <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 bg-black text-white p-1 rounded text-xs opacity-0 group-hover:opacity-100 transition-opacity mb-1">
                        {item.value.toFixed(2)}
                      </div>
                      <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 text-xs text-gray-600 whitespace-nowrap mt-1 opacity-0 group-hover:opacity-100 transition-opacity">
                        {item.date}
                      </div>
                    </>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
      <div className="mt-2 h-2 bg-gray-200 rounded-full overflow-hidden">
        <div
          className="h-full bg-blue-500"
          style={{
            width: `${((visibleRange.end - visibleRange.start) / chartData.length) * 100}%`,
            marginLeft: `${(visibleRange.start / chartData.length) * 100}%`,
          }}
        ></div>
      </div>
    </div>
  );
}

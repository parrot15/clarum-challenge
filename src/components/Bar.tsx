import { memo } from 'react';
import { DataPoint } from '@/lib/types';

interface BarProps {
  // Datapoint represented by this bar.
  item: DataPoint;
  // Width of the bar in pixels.
  barWidth: number;
  // Height of the bar as percentage (0-100).
  barHeight: number;
  // Callback to handle bar click event.
  onBarClick: () => void;
}

/**
 * A bar for a single data point in the bar chart.
 * 
 * Optimizing performance by using memo to ensure that Bar component is only
 * re-rendered when its props change. Without memo, all Bar components would
 * re-render whenever BarChart re-renders, even if their props didn't actually
 * change.
 */
const Bar = memo(({ item, barWidth, barHeight, onBarClick }: BarProps) => (
  <div
    className={`h-[calc(100%-20px)] flex flex-col items-center justify-end group relative`}
    // Set the width of the bar.
    style={{ width: `${barWidth}px` }}
  >
    <div
      className="w-full bg-blue-500 hover:bg-blue-600 transition-all duration-200 cursor-pointer transform hover:scale-110 origin-bottom"
      // Set the height of the bar.
      style={{ height: `${Math.max(barHeight, 1)}%` }}
      onClick={() => onBarClick()}
    >
      <div className="absolute bottom-full left-1/2 -translate-x-1/2 bg-black text-white p-1 rounded text-xs opacity-0 group-hover:opacity-100 transition-opacity mb-1">
        ${item.value.toFixed(2)}
      </div>
      <div className="absolute -bottom-5 left-1/2 -translate-x-1/2 text-xs text-gray-600 whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity">
        {item.date}
      </div>
    </div>
  </div>
));
Bar.displayName = 'Bar';
export default Bar;

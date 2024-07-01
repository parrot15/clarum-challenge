import { Virtualizer, useVirtualizer } from '@tanstack/react-virtual';
import { RefObject } from 'react';

/**
 * Custom hook for managing virtualization of chart. Calculates which items
 * actually need to be rendered based on current scroll position and viewport
 * size.
 * When the dataset is very large, this provides massive optimization. Thanks
 * to this hook, rather than rendering all 5000+ datapoints, we only render
 * visible items. Since we don't create DOM elements for off-screen items,
 * this is called 'virtualization'.
 * @param totalBars Total number of bars in the chart.
 * @param scrollRef Ref to the scrollable container element.
 * @param barWidth Desired width of each bar (in pixels).
 * @returns Virtualizer instance for the chart.
 */
const useChartVirtualizer = (
  totalBars: number,
  scrollRef: RefObject<HTMLDivElement>,
  barWidth: number,
): Virtualizer<HTMLDivElement, Element> => {
  return useVirtualizer({
    count: totalBars,
    getScrollElement: () => scrollRef.current,
    estimateSize: () => barWidth,
    overscan: 5,  // Number of items to render outside of visible area.
    horizontal: true,  // Enable horizontal scrolling.
  });
};
export default useChartVirtualizer;

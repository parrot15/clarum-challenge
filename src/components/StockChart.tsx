import { fetchStockData } from '@/lib/utils';
import BarChart from './BarChart';
import { DataPoint } from '@/lib/types';

interface StockChartProps {
  stock: string;
}

/**
 * Given a stock symbol, fetches the relevant data, finds the
 * min and max prices in the data, and gives all of this to the
 * BarChart component to display the stock data.
 *
 * As per the requirements, this is a server component and we're
 * fetching the data, so this is SSR.
 */
const StockChart = async ({ stock }: StockChartProps) => {
  // Fetch stock data for given stock symbol.
  const data = await fetchStockData(stock);

  // Find min and max prices from fetched stock data.
  const { minValue, maxValue } = data.reduce(
    (acc, item: DataPoint) => ({
      minValue: Math.min(acc.minValue, item.value),
      maxValue: Math.max(acc.maxValue, item.value),
    }),
    { minValue: Infinity, maxValue: -Infinity },
  );

  return (
    <BarChart key={stock} data={data} minValue={minValue} maxValue={maxValue} />
  );
};
export default StockChart;

import { fetchStockData } from '@/lib/utils';
import BarChart from './BarChart';

interface StockChartProps {
  stock: string;
}

const StockChart = async ({ stock }: StockChartProps) => {
  const data = await fetchStockData(stock);

  const { minValue, maxValue } = data.reduce(
    (acc, item) => ({
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

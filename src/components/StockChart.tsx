import { fetchStockData } from '@/lib/utils';
import BarChart from './BarChart';

export default async function StockChart({ stock }: { stock: string }) {
  const data = await fetchStockData(stock);

  const minValue = Math.min(...data.map((item) => item.value));
  const maxValue = Math.max(...data.map((item) => item.value));

  return (
    <BarChart key={stock} data={data} minValue={minValue} maxValue={maxValue} />
  );
}

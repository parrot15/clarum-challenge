import { fetchStockData } from '@/lib/api';
import BarChart from './BarChart';

export default async function StockChart({
  searchParams,
}: {
  searchParams: { stock?: string };
}) {
  const stock = searchParams.stock || 'AAPL';
  const data = await fetchStockData(stock);

  return <BarChart data={data} />;
}

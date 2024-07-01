'use client';

import { useStockData } from '@/hooks/useStockData';
import BarChart from './BarChart';

export default function StockChart({ stock }: { stock: string }) {
  const { data, isLoading, error } = useStockData(stock);

  if (isLoading) return <div>Loading chart...</div>;
  if (error) return <div>Error loading chart: {error.message}</div>;
  if (!data) return null;

  return <BarChart data={data} />;
}

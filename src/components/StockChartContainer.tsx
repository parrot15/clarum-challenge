'use client';

import { useState, useEffect } from 'react';
import StockPicker from './StockPicker';
import BarChart from './BarChart';
import { fetchStockData } from '@/lib/api';

export default function StockChartContainer() {
  const [selectedStock, setSelectedStock] = useState('AAPL');
  const [stockData, setStockData] = useState<{ date: string; value: number }[]>(
    [],
  );
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function loadStockData() {
      setIsLoading(true);
      setError(null);
      try {
        const data = await fetchStockData(selectedStock);
        setStockData(data);
      } catch (err) {
        setError('Failed to fetch stock data');
        console.error(err);
      } finally {
        setIsLoading(false);
      }
    }

    loadStockData();
  }, [selectedStock]);

  return (
    <>
      <StockPicker onSelectStock={setSelectedStock} />
      {isLoading && <div>Loading...</div>}
      {error && <div className="text-red-500">{error}</div>}
      {!isLoading && !error && stockData.length > 0 && (
        <BarChart data={stockData} />
      )}
    </>
  );
}

import { useState, useEffect } from 'react';
import { fetchStockData } from '@/lib/api';

export function useStockData(symbol: string) {
  const [data, setData] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    setIsLoading(true);
    fetchStockData(symbol)
      .then((result) => {
        setData(result);
        setIsLoading(false);
      })
      .catch((err) => {
        setError(err);
        setIsLoading(false);
      });
  }, [symbol]);

  return { data, isLoading, error };
}

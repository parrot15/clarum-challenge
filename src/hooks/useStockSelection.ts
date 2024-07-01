import { useRouter, useSearchParams } from 'next/navigation';
import { STOCKS } from '@/lib/constants';

const useStockSelection = (
  defaultStock: string = STOCKS[0],
): [string, (newStock: string) => void] => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const stock = searchParams.get('stock');

  const selectedStock = stock && STOCKS.includes(stock) ? stock : defaultStock;

  const setSelectedStock = (newStock: string) => {
    router.push(`?stock=${newStock}`);
  };

  return [selectedStock, setSelectedStock];
};
export default useStockSelection;

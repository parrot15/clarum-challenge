import { useRouter, useSearchParams } from 'next/navigation';
import { STOCKS } from '@/lib/constants';

type StockSelectionHook = [
  selectedStock: string,
  setSelectedStock: (newStock: string) => void,
];

/**
 * Custom hook for managing stock selection state.
 * @param defaultStock Default stock to use if not selected.
 * @returns Tuple containing currently selected stock, and a
 *          function to update the current stock.
 */
const useStockSelection = (
  defaultStock: string = STOCKS[0],
): StockSelectionHook => {
  const router = useRouter();
  const searchParams = useSearchParams();

  // Get the current stock from the URL params.
  const stock = searchParams.get('stock');

  // Use the stock from the URL if valid, otherwise use the default stock.
  const selectedStock = stock && STOCKS.includes(stock) ? stock : defaultStock;

  // Provide function that updates the selected stock by pushing to router.
  const setSelectedStock = (newStock: string) => {
    router.push(`?stock=${newStock}`);
  };

  return [selectedStock, setSelectedStock];
};
export default useStockSelection;

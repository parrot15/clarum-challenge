'use client';

import useStockSelection from '@/hooks/useStockSelection';
import { STOCKS } from '@/lib/constants';

/**
 * Allows user to select which stock to display through a drop-down menu.
 */
const StockPicker = () => {
  const [selectedStock, setSelectedStock] = useStockSelection();

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedStock(e.target.value);
  };

  return (
    <div className="mb-4">
      <select
        value={selectedStock}
        onChange={handleChange}
        className="w-full px-4 py-2 text-gray-700 bg-white border border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 focus:outline-none"
      >
        {STOCKS.map((stock) => (
          <option key={stock} value={stock}>
            {stock}
          </option>
        ))}
      </select>
    </div>
  );
};

export default StockPicker;

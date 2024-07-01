'use client';

import { useState, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';

const stocks = [
  'AAPL',
  'GOOGL',
  'MSFT',
  'AMZN',
  'META',
  'TSLA',
  'NVDA',
  'JPM',
  'JNJ',
  'V',
  'PG',
  'UNH',
  'HD',
  'MA',
  'DIS',
  'ADBE',
  'CRM',
  'NFLX',
  'PYPL',
  'INTC',
];

export default function StockPicker() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [selectedStock, setSelectedStock] = useState(
    searchParams.get('stock') || 'AAPL',
  );

  useEffect(() => {
    const stock = searchParams.get('stock');
    if (stock && stocks.includes(stock)) {
      setSelectedStock(stock);
    }
  }, [searchParams]);

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const stock = e.target.value;
    setSelectedStock(stock);
    router.push(`?stock=${stock}`);
  };

  return (
    <div className="mb-4">
      <select
        value={selectedStock}
        onChange={handleChange}
        className="block w-full px-4 py-2 text-gray-700 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
      >
        {stocks.map((stock) => (
          <option key={stock} value={stock}>
            {stock}
          </option>
        ))}
      </select>
    </div>
  );
}

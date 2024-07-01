'use client';

import { useState } from 'react';

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

interface StockPickerProps {
  onSelectStock: (stock: string) => void;
}

export default function StockPicker({ onSelectStock }: StockPickerProps) {
  const [selectedStock, setSelectedStock] = useState('AAPL');

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const stock = e.target.value;
    setSelectedStock(stock);
    onSelectStock(stock);
  };

  return (
    <div className="mb-4">
      <select
        value={selectedStock}
        onChange={handleChange}
        className="block w-full px-4 py-2 text-gray-700 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
      >
        <option value="">Select a stock</option>
        {stocks.map((stock) => (
          <option key={stock} value={stock}>
            {stock}
          </option>
        ))}
      </select>
    </div>
  );
}

'use client';

import { useState } from 'react';
import StockPicker from './StockPicker';
import StockChart from './StockChart';

const initialStock = 'AAPL';

export default function StockChartContainer() {
  const [selectedStock, setSelectedStock] = useState(initialStock);

  return (
    <>
      <StockPicker
        initialStock={initialStock}
        onStockChange={setSelectedStock}
      />
      <StockChart stock={selectedStock} />
    </>
  );
}

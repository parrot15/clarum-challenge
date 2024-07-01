import StockChartContainer from '@/components/StockChartContainer';
import { Suspense } from 'react';

export default function Home() {
  return (
    <main className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Stock Price Chart</h1>
      <Suspense fallback={<div>Loading...</div>}>
        <StockChartContainer />
      </Suspense>
    </main>
  );
}

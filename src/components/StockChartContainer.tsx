import { Suspense } from 'react';
import StockPicker from './StockPicker';
import StockChart from './StockChart';

export default function StockChartContainer({
  searchParams,
}: {
  searchParams: { stock?: string };
}) {
  const stock = searchParams.stock || 'AAPL';

  return (
    <>
      <StockPicker />
      <Suspense fallback={<LoadingMessage />}>
        <StockChart key={stock} searchParams={searchParams} />
      </Suspense>
    </>
  );
}

function LoadingMessage() {
  return <div>Loading chart...</div>;
}

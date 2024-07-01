import { Suspense } from 'react';
import { redirect } from 'next/navigation';
import StockPicker from '@/components/StockPicker';
import StockChart from '@/components/StockChart';
import Loading from '@/components/Loading';
import { STOCKS } from '@/lib/constants';

export default async function Home({
  searchParams,
}: {
  searchParams: { stock?: string };
}) {
  if (!searchParams.stock) {
    redirect(`?stock=${STOCKS[0]}`);
  }

  const stock = searchParams.stock || STOCKS[0];

  return (
    <main className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Stock Price Chart</h1>
      <StockPicker />
      <div className="h-96">
        <Suspense fallback={<Loading size="small" />}>
          <StockChart key={stock} stock={stock} />
        </Suspense>
      </div>
    </main>
  );
}

import { Suspense } from 'react';
import { redirect } from 'next/navigation';
import StockPicker from '@/components/StockPicker';
import StockChart from '@/components/StockChart';
import Spinner from '@/components/Spinner';
import { STOCKS } from '@/lib/constants';

interface PageProps {
  searchParams: { stock?: string };
}

/**
 * Home page component for the stock price chart application. Displays
 * the title, stock picker component to select between different stocks,
 * and stock chart component for displaying the bar chart of the stock's
 * prices over time.
 */
const Page = async ({ searchParams }: PageProps) => {
  // Redirect to the first stock if no stock is selected.
  if (!searchParams.stock) {
    redirect(`?stock=${STOCKS[0]}`);
  }

  // Use the selected stock from the URL params, or default to the first stock.
  const stock = searchParams.stock || STOCKS[0];

  return (
    <main className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Stock Price Chart</h1>
      <StockPicker />
      <div className="h-96">
        <Suspense fallback={<Spinner size="small" />}>
          <StockChart key={stock} stock={stock} />
        </Suspense>
      </div>
    </main>
  );
};
export default Page;

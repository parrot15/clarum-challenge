import api from './api';
import { DataPoint } from './types';

/**
 * Fetches 6000 data points of stock data for a given stock symbol.
 * @param symbol The stock symbol to fetch the data for.
 * @returns Promise of list of all data points for stock price data.
 */
export const fetchStockData = async (symbol: string): Promise<DataPoint[]> => {
  // Make API call to fetch stock data.
  const response = await api.get('', {
    params: {
      // Stock price at every business day (Mon-Fri).
      function: 'TIME_SERIES_DAILY',
      symbol: symbol,
      // Full-length time series of 20+ years of historical data.
      outputsize: 'full',
    },
  });

  // Extract the stock price time series from the response.
  const timeSeries = response.data['Time Series (Daily)'];
  // Convert the time series into a DataPoint array.
  return (
    Object.entries(timeSeries)
      .map(([date, values]: [string, any]) => ({
        date,
        // Extract closing stock price at this date.
        value: parseFloat(values['4. close']),
      }))
      // Reverse order to get chronological order from oldest to newest.
      .reverse()
      // Limit to 6000 data points.
      .slice(0, 6000)
  );
};

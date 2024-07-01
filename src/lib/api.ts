import appConfig from '@/config/config.json';

export async function fetchStockData(symbol: string) {
  const API_KEY = appConfig.stockApi.apiKey;
  const url = `https://www.alphavantage.co/query?function=TIME_SERIES_DAILY&symbol=${symbol}&apikey=${API_KEY}`;

  const response = await fetch(url);
  if (!response.ok) {
    throw new Error('Failed to fetch stock data');
  }

  const data = await response.json();
  const timeSeries = data['Time Series (Daily)'];

  return Object.entries(timeSeries)
    .slice(0, 30)
    .map(([date, values]: [string, any]) => ({
      date,
      value: parseFloat(values['4. close']),
    }))
    .reverse();
}

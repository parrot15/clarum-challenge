import api from './api';

export const fetchStockData = async (symbol: string) => {
  const response = await api.get('', {
    params: {
      function: 'TIME_SERIES_DAILY',
      symbol: symbol,
      outputsize: 'full',
    },
  });

  const timeSeries = response.data['Time Series (Daily)'];
  return Object.entries(timeSeries)
    .map(([date, values]: [string, any]) => ({
      date,
      value: parseFloat(values['4. close']),
    }))
    .reverse()
    .slice(0, 6000);
};

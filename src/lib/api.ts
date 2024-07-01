import axios from 'axios';
import appConfig from '@/config/config.json';

/**
 * Preconfigured Axios object to easily make API calls to
 * Alpha Vantage stock data API service.
 */
const api = axios.create({
  baseURL: appConfig.stockApi.baseUrl,
  timeout: appConfig.stockApi.timeout,
  params: {
    apikey: appConfig.stockApi.apiKey,
  },
});
export default api;

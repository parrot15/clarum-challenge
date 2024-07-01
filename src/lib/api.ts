import axios from 'axios';
import appConfig from '@/config/config.json';

const api = axios.create({
  baseURL: appConfig.stockApi.baseUrl,
  timeout: appConfig.stockApi.timeout,
  params: {
    apikey: appConfig.stockApi.apiKey,
  },
});
export default api;

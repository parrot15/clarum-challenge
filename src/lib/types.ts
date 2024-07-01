/**
 * Represents a single data point for stock price data.
 */
export interface DataPoint {
  // Date of the stock price.
  date: string;
  // Closing price of the stock in USD.
  value: number;
}

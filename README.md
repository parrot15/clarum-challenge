# Clarum Challenge

**Author:** Eashan Soni

## Introduction

This is a stock chart visualizer. There is a dropdown where you can select between 20 stocks. Then, 5000+ data points worth of stock price data will be displayed as a bar chart for that stock. Since this bar chart is huge, it will not fit within the window, so you can scroll left/right. When hovering over a bar in the chart, the bar will scale up for visual feedback and display the stock price and date.

## Usage

This project uses Next.js 14+ and React.js 18. You must have [Node](https://nodejs.org/en) setup on your machine.

1. Create a config file `./src/app/config/config.json`. You can simply copy the `config.example.json`, and replace `YOUR API KEY` with your API key for the [Alpha Vantage](https://www.alphavantage.co/) stock data API.
2. To start the development server, run the command `npm run dev`.
3. Go to the URL `http://localhost:3000` on your browser to use the app.
4. [Optional] To format the code, run `npm run format`.

## Overview of Code

The home page `page.tsx` renders the `StockPicker` and `StockChart` components. At the page level, loading and error states are handled through `loading.tsx` and `error.tsx`, following the recommended [app routing](https://nextjs.org/docs/app/building-your-application/routing/error-handling) of Next.js 14. `page.tsx` also wraps a React `Suspense` around the `StockChart` component to display an individual loading state just for the stock chart.

The stock to display the data for is based on URL parameters. When navigating to `http://localhost:3000`, the server will automatically redirect to `http://localhost:3000/?stock=AAPL`, since the `stock` parameter doesn't exist. Then, when selecting different stocks, this URL parameter is merely changed. This is a nice design because it allows directly navigating to stock pages straight from the URL too, and allows an easy implementation for server-side rendering.

The `StockPicker` component handles selecting between different stocks. It merely pushes URL parameters based on the selected stock (e.g. `?stock=TSLA`, `?stock=NVDA`, etc.) using the `useStockSelection` custom hook.

The selected stock is passed to the `StockChart` component, which is a server component that fetches the data from the stock data API, finds the min and max prices of the data, and passes all of this to the `BarChart` component for rendering. This meets the requirement of having the data be server-side loaded (SSR).

The bar chart uses the min and max values to calculate a range, which it uses to determine the height of each bar, while the width of each bar is a constant value. In order to render the 5000+ data points, several performance optimizations are done:

- **Virtualization:** Uses the `useChartVirtualizer` custom hook which uses the `react-virtual` library to calculate which bars actually need to be rendered based on current scroll position and viewport size. Allows us to render only visible bars, rather than all 5000+ bars.
- **Memoization of bars:** The `Bar` component is memoized using React's `memo` to ensure it is only re-rendered when its props change, rather than always re-rendering whenever the parent component `BarChart` re-renders.
- **useCallback:** The bar height calculation and bar click handling are passed as props to the `Bar` component. They are wrapped in `useCallback` to ensure they don't unnecessarily trigger re-renders of bars.

With all of these optimizations, the bar chart effortlessly renders all 5000+ data points and allows deleting bars on click, in essentially real-time.

As per the requirements, the bar chart does not use any chart libraries, and everything is rendered using pure TailwindCSS and dynamic in-line CSS. `react-virtual` is an external library, but it is only used to calculate virtualization of DOM nodes.

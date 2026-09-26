export type PortfolioAsset = {
  symbol: string;
  name: string;
  shares: number;
  averageCost: string;
  price: string;
  marketValue: string;
  dayChange: string;
  dayChangePercent: string;
  totalReturn: string;
  totalReturnPercent: string;
  allocation: string;
  sector: string;
  positive: boolean;
};

export const portfolioAssets: PortfolioAsset[] = [
  {
    symbol: "NVDA",
    name: "NVIDIA Corporation",
    shares: 24,
    averageCost: "$136.55",
    price: "$141.82",
    marketValue: "$3,403.68",
    dayChange: "+$126.48",
    dayChangePercent: "+3.84%",
    totalReturn: "+$486.48",
    totalReturnPercent: "+16.67%",
    allocation: "18.5%",
    sector: "Technology",
    positive: true,
  },
  {
    symbol: "AAPL",
    name: "Apple Inc.",
    shares: 10,
    averageCost: "$226.65",
    price: "$228.07",
    marketValue: "$2,280.70",
    dayChange: "+$14.20",
    dayChangePercent: "+0.62%",
    totalReturn: "+$14.20",
    totalReturnPercent: "+0.62%",
    allocation: "12.4%",
    sector: "Technology",
    positive: true,
  },
  {
    symbol: "VOO",
    name: "Vanguard S&P 500 ETF",
    shares: 8,
    averageCost: "$519.52",
    price: "$523.60",
    marketValue: "$4,188.80",
    dayChange: "+$32.64",
    dayChangePercent: "+0.78%",
    totalReturn: "+$32.64",
    totalReturnPercent: "+0.78%",
    allocation: "22.7%",
    sector: "Index fund",
    positive: true,
  },
  {
    symbol: "MSFT",
    name: "Microsoft Corporation",
    shares: 8,
    averageCost: "$402.12",
    price: "$415.56",
    marketValue: "$3,324.48",
    dayChange: "+$83.20",
    dayChangePercent: "+1.04%",
    totalReturn: "+$107.52",
    totalReturnPercent: "+3.34%",
    allocation: "18.0%",
    sector: "Technology",
    positive: true,
  },
  {
    symbol: "TSLA",
    name: "Tesla, Inc.",
    shares: 8,
    averageCost: "$343.18",
    price: "$338.74",
    marketValue: "$2,709.92",
    dayChange: "-$31.52",
    dayChangePercent: "-1.15%",
    totalReturn: "-$35.52",
    totalReturnPercent: "-1.29%",
    allocation: "14.7%",
    sector: "Consumer Cyclical",
    positive: false,
  },
];

export const portfolioSummary = {
  value: "$18,436.72",
  dayChange: "+$286.14",
  dayChangePercent: "+1.58%",
  totalReturn: "+$2,840.22",
  totalReturnPercent: "+18.22%",
  cash: "$4,280.45",
};

export const performanceDrivers = [
  { symbol: "NVDA", label: "NVIDIA led the move", detail: "AI and semiconductor stocks rallied broadly today.", impact: "+$126.48", percent: "+3.84%", positive: true },
  { symbol: "MSFT", label: "Microsoft added momentum", detail: "Cloud and software names moved higher with the tech sector.", impact: "+$83.20", percent: "+1.04%", positive: true },
  { symbol: "TSLA", label: "Tesla trimmed gains", detail: "Consumer cyclical names lagged the broader market session.", impact: "-$31.52", percent: "-1.15%", positive: false },
];
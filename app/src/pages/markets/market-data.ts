export type MarketAsset = {
  symbol: string;
  name: string;
  exchange: string;
  price: string;
  change: string;
  changePercent: string;
  positive: boolean;
  sector: string;
  marketCap: string;
  volume: string;
  peRatio: string;
  dividendYield: string;
  description: string;
  chart: { time: string; open: number; high: number; low: number; close: number }[];
};

const chart = (values: number[]) =>
  values.map((close, index) => {
    const open = index === 0 ? close - 1 : values[index - 1];
    const range = Math.max(1.25, close * 0.012);

    return {
      time: `2024-11-${String(index + 1).padStart(2, "0")}`,
      open,
      high: Math.max(open, close) + range,
      low: Math.min(open, close) - range,
      close,
    };
  });

export const marketAssets: MarketAsset[] = [
  {
    symbol: "NVDA",
    name: "NVIDIA Corporation",
    exchange: "NASDAQ",
    price: "$141.82",
    change: "+$5.24",
    changePercent: "+3.84%",
    positive: true,
    sector: "Technology",
    marketCap: "$3.47T",
    volume: "186.4M",
    peRatio: "55.82",
    dividendYield: "0.03%",
    description: "NVIDIA designs accelerated computing platforms and chips used across gaming, data centers, and artificial intelligence.",
    chart: chart([128, 130, 127, 132, 134, 131, 136, 135, 139, 137, 141, 140, 142]),
  },
  {
    symbol: "AAPL",
    name: "Apple Inc.",
    exchange: "NASDAQ",
    price: "$228.07",
    change: "+$1.40",
    changePercent: "+0.62%",
    positive: true,
    sector: "Technology",
    marketCap: "$3.45T",
    volume: "41.8M",
    peRatio: "37.14",
    dividendYield: "0.42%",
    description: "Apple designs and sells consumer technology, software, and services through an integrated global ecosystem.",
    chart: chart([218, 220, 219, 222, 221, 224, 223, 225, 224, 227, 226, 229, 228]),
  },
  {
    symbol: "MSFT",
    name: "Microsoft Corporation",
    exchange: "NASDAQ",
    price: "$415.56",
    change: "+$4.27",
    changePercent: "+1.04%",
    positive: true,
    sector: "Technology",
    marketCap: "$3.09T",
    volume: "18.9M",
    peRatio: "35.61",
    dividendYield: "0.79%",
    description: "Microsoft develops productivity software, cloud infrastructure, operating systems, and enterprise services.",
    chart: chart([400, 402, 398, 405, 407, 404, 410, 412, 409, 414, 413, 417, 416]),
  },
  {
    symbol: "TSLA",
    name: "Tesla, Inc.",
    exchange: "NASDAQ",
    price: "$338.74",
    change: "-$3.94",
    changePercent: "-1.15%",
    positive: false,
    sector: "Consumer Cyclical",
    marketCap: "$1.09T",
    volume: "92.2M",
    peRatio: "92.47",
    dividendYield: "—",
    description: "Tesla designs electric vehicles, energy storage systems, and solar products supported by a direct sales model.",
    chart: chart([351, 348, 352, 345, 347, 342, 344, 339, 343, 340, 342, 337, 339]),
  },
  {
    symbol: "AMZN",
    name: "Amazon.com, Inc.",
    exchange: "NASDAQ",
    price: "$227.03",
    change: "+$5.13",
    changePercent: "+2.31%",
    positive: true,
    sector: "Consumer Cyclical",
    marketCap: "$2.39T",
    volume: "35.7M",
    peRatio: "48.31",
    dividendYield: "—",
    description: "Amazon operates online retail, cloud computing, digital streaming, and logistics businesses around the world.",
    chart: chart([214, 216, 215, 219, 221, 220, 223, 222, 225, 224, 226, 228, 227]),
  },
];

export const marketIndices = [
  { symbol: "S&P 500", value: "5,893.62", change: "+0.42%", positive: true },
  { symbol: "NASDAQ", value: "18,791.81", change: "+0.88%", positive: true },
  { symbol: "DOW JONES", value: "43,408.47", change: "-0.13%", positive: false },
  { symbol: "RUSSELL 2000", value: "2,344.81", change: "+0.19%", positive: true },
];

export const findAsset = (symbol: string) =>
  marketAssets.find((asset) => asset.symbol === symbol.toUpperCase());
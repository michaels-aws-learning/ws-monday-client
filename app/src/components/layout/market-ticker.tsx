import { ArrowDownRight, ArrowUpRight } from "lucide-react";

const marketItems = [
  { symbol: "S&P 500", value: "5,893.62", change: "+0.42%", positive: true },
  { symbol: "NASDAQ", value: "18,791.81", change: "+0.88%", positive: true },
  { symbol: "DOW JONES", value: "43,408.47", change: "-0.13%", positive: false },
  { symbol: "BTC/USD", value: "$91,842", change: "+2.14%", positive: true },
  { symbol: "10Y TREASURY", value: "4.39%", change: "-0.04%", positive: false },
];

const tickerItems = [...marketItems, ...marketItems];

export const MarketTicker = () => (
  <aside className="market-ticker" aria-label="Market ticker">
    <div className="ticker-track">
      {tickerItems.map((item, index) => {
        const ChangeIcon = item.positive ? ArrowUpRight : ArrowDownRight;

        return (
          <div className="ticker-item" key={`${item.symbol}-${index}`}>
            <span className="ticker-symbol">{item.symbol}</span>
            <strong>{item.value}</strong>
            <span className={item.positive ? "ticker-positive" : "ticker-negative"}>
              <ChangeIcon /> {item.change}
            </span>
          </div>
        );
      })}
    </div>
  </aside>
);
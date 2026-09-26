import { ChevronRight, MoreHorizontal } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "../../ui/button";

const positions = [
  ["NVDA", "24 shares", "$3,403.68", "+$126.48"],
  ["AAPL", "10 shares", "$2,280.70", "+$14.20"],
  ["VOO", "8 shares", "$4,188.80", "+$32.64"],
];

export const PortfolioCard = () => (
  <section className="panel positions-panel">
    <div className="panel-heading">
      <div>
        <p className="eyebrow">Your investments</p>
        <h2>Portfolio</h2>
      </div>
      <Button className="view-all" render={<Link to="/portfolio" />}>
        View all <ChevronRight />
      </Button>
    </div>
    <div className="position-list">
      {positions.map(([ticker, shares, value, change]) => (
        <div className="position-row" key={ticker}>
          <div className="ticker-icon">{ticker[0]}</div>
          <div className="position-name">
            <strong>{ticker}</strong>
            <span>{shares}</span>
          </div>
          <div className="sparkline" aria-hidden="true">
            ↗
          </div>
          <div className="position-value">
            <strong>{value}</strong>
            <span className="positive-text">{change}</span>
          </div>
          <Button className="row-menu" aria-label={`${ticker} options`}>
            <MoreHorizontal />
          </Button>
        </div>
      ))}
    </div>
    <div className="cash-row">
      <div className="ticker-icon cash-icon">$</div>
      <div className="position-name">
        <strong>Cash</strong>
        <span>Available to invest</span>
      </div>
      <div className="position-value">
        <strong>$4,280.45</strong>
        <span>22.4% of portfolio</span>
      </div>
    </div>
  </section>
);
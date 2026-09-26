import { ArrowDownRight, ArrowUpRight, Info, TrendingUp } from "lucide-react";
import { Button } from "../ui/button";
import { portfolioSummary, performanceDrivers } from "../../pages/portfolio/portfolio-data";

export type PortfolioPerformanceProps = {
  compact?: boolean;
};

export function PortfolioPerformance({ compact = false }: PortfolioPerformanceProps) {
  return (
    <section className={compact ? "portfolio-performance compact" : "portfolio-performance"} aria-labelledby="portfolio-performance-title">
      <div className="portfolio-performance-header">
        <div>
          <p className="eyebrow">Portfolio performance</p>
          <h2 id="portfolio-performance-title">Why did my portfolio move?</h2>
        </div>
        <Button variant="ghost" size="icon-xs" aria-label="About portfolio attribution"><Info /></Button>
      </div>

      <div className="performance-total">
        <div>
          <span className="performance-label">Today&apos;s change</span>
          <strong>{portfolioSummary.dayChange}</strong>
          <span className="market-positive"><ArrowUpRight /> {portfolioSummary.dayChangePercent}</span>
        </div>
        <div className="performance-total-return">
          <span className="performance-label">Total return</span>
          <strong>{portfolioSummary.totalReturn}</strong>
          <span className="market-positive">{portfolioSummary.totalReturnPercent}</span>
        </div>
      </div>

      <div className="performance-explanation">
        <div className="performance-explanation-icon"><TrendingUp /></div>
        <div>
          <strong>Technology was the main driver today.</strong>
          <p>Three of your five holdings gained as technology outpaced the broader market. The move was concentrated in NVIDIA and Microsoft.</p>
        </div>
      </div>

      {!compact && <div className="performance-drivers">
        <div className="performance-drivers-heading"><span>What contributed</span><span>Impact</span></div>
        {performanceDrivers.map((driver) => {
          const ChangeIcon = driver.positive ? ArrowUpRight : ArrowDownRight;
          return (
            <div className="performance-driver" key={driver.symbol}>
              <div className="driver-symbol">{driver.symbol.slice(0, 1)}</div>
              <div className="driver-copy"><strong>{driver.label}</strong><span>{driver.detail}</span></div>
              <div className={driver.positive ? "driver-impact market-positive" : "driver-impact market-negative"}><strong>{driver.impact}</strong><span><ChangeIcon /> {driver.percent}</span></div>
            </div>
          );
        })}
      </div>}

      <div className="performance-footnote"><span>Attribution based on today&apos;s price movement and your current positions.</span><Button variant="link" size="xs">View activity</Button></div>
    </section>
  );
}
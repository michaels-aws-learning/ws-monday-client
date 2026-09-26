import { MoreHorizontal } from "lucide-react";
import { Button } from "../../ui/button";

export const SummaryCards = () => (
  <section className="summary-grid">
    <div className="balance-card">
      <div className="card-topline">
        <span>Total portfolio value</span>
        <Button className="tiny-icon" aria-label="Portfolio options">
          <MoreHorizontal />
        </Button>
      </div>
      <div className="balance">$18,436.72</div>
      <div className="balance-change">
        <span>↗</span> $286.14 <span>+1.58% today</span>
      </div>
      <div className="balance-chart">
        <div className="chart-labels">
          <span>Portfolio performance</span>
          <span>
            1D <b>1W</b> 1M 1Y ALL
          </span>
        </div>
        <svg
          viewBox="0 0 600 116"
          preserveAspectRatio="none"
          aria-hidden="true"
        >
          <defs>
            <linearGradient id="area" x1="0" x2="0" y1="0" y2="1">
              <stop offset="0" stopColor="#d4f25f" stopOpacity=".32" />
              <stop offset="1" stopColor="#d4f25f" stopOpacity="0" />
            </linearGradient>
          </defs>
          <path
            className="chart-area"
            d="M0 95 C35 91, 43 70, 76 77 S122 98, 151 72 S201 56, 224 68 S270 45, 300 52 S343 74, 366 45 S411 20, 439 34 S473 60, 500 33 S554 43, 600 8 V116 H0 Z"
          />
          <path
            className="chart-line"
            d="M0 95 C35 91, 43 70, 76 77 S122 98, 151 72 S201 56, 224 68 S270 45, 300 52 S343 74, 366 45 S411 20, 439 34 S473 60, 500 33 S554 43, 600 8"
          />
        </svg>
      </div>
    </div>
    <div className="metric-card">
      <span>Today&apos;s return</span>
      <strong className="positive-text">+$286.14</strong>
      <small>+1.58%</small>
      <div className="metric-rule" />
      <span>All-time return</span>
      <strong className="positive-text">+$2,840.22</strong>
      <small>+18.22%</small>
    </div>
    <div className="allocation-card">
      <div className="card-topline">
        <span>Portfolio allocation</span>
        <Button className="tiny-icon" aria-label="Allocation options">
          <MoreHorizontal />
        </Button>
      </div>
      <div className="donut-wrap">
        <div className="donut">
          <div>
            <strong>5</strong>
            <span>assets</span>
          </div>
        </div>
        <div className="legend">
          <span>
            <i className="legend-stock" /> Stocks <b>61%</b>
          </span>
          <span>
            <i className="legend-etf" /> ETFs <b>32%</b>
          </span>
          <span>
            <i className="legend-cash" /> Cash <b>7%</b>
          </span>
        </div>
      </div>
    </div>
  </section>
);
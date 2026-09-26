import { useAuth0 } from "@auth0/auth0-react";
import {
  ArrowUpRight,
  CalendarDays,
  ChevronDown,
  PieChart,
  WalletCards,
} from "lucide-react";
import { Button } from "../../components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../../components/ui/select";
import NotAuthenticated from "../no-auth/not-authenticated";
import { PortfolioAssetsTable } from "../../components/portfolio/portfolio-assets-table";
import { PortfolioPerformance } from "../../components/portfolio/portfolio-performance";
import { portfolioSummary } from "./portfolio-data";
import "./portfolio.css";
import "./portfolio-table.css";
import "./portfolio-asset-link.css";

const summaryMetrics = [
  {
    label: "Total portfolio value",
    value: portfolioSummary.value,
    detail: "+$286.14 today",
    icon: WalletCards,
  },
  {
    label: "Invested capital",
    value: "$14,156.27",
    detail: "76.8% of portfolio",
    icon: PieChart,
  },
  {
    label: "Cash available",
    value: portfolioSummary.cash,
    detail: "Ready to invest",
    icon: CalendarDays,
  },
];

export default function Portfolio() {
  const { isLoading, isAuthenticated, error } = useAuth0();

  if (isLoading)
    return <div className="auth-loading">Loading your workspace...</div>;
  if (!isAuthenticated) return <NotAuthenticated />;
  if (error)
    return <div className="auth-loading error-message">{error.message}</div>;

  return (
    <main className="portfolio-page">
      <div className="portfolio-heading">
        <div>
          <p className="eyebrow">Your investments</p>
          <h1>Portfolio</h1>
          <p className="portfolio-subheading">
            Track your holdings and understand what is moving your money.
          </p>
        </div>
        <div className="portfolio-heading-actions">
          <Select defaultValue="1D">
            <SelectTrigger className="portfolio-period-select" size="sm">
              <CalendarDays />
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="1D">Today</SelectItem>
              <SelectItem value="1W">This week</SelectItem>
              <SelectItem value="1M">This month</SelectItem>
              <SelectItem value="1Y">This year</SelectItem>
            </SelectContent>
          </Select>
          <Button variant="outline" className="portfolio-date">
            <CalendarDays /> Nov 19, 2024 <ChevronDown />
          </Button>
        </div>
      </div>
      <section
        className="portfolio-summary-grid"
        aria-label="Portfolio summary"
      >
        {summaryMetrics.map(({ label, value, detail, icon: Icon }) => (
          <div className="portfolio-summary-card" key={label}>
            <div className="summary-card-icon">
              <Icon />
            </div>
            <span>{label}</span>
            <strong>{value}</strong>
            <small
              className={
                label === "Cash available" ? "summary-muted" : "market-positive"
              }
            >
              {label === "Cash available" ? (
                detail
              ) : (
                <>
                  <ArrowUpRight /> {detail}
                </>
              )}
            </small>
          </div>
        ))}
      </section>
      <div className="portfolio-content-grid">
        <PortfolioPerformance />
        <section className="allocation-panel panel">
          <div className="portfolio-section-heading">
            <div>
              <p className="eyebrow">Diversification</p>
              <h2>Allocation</h2>
            </div>
          </div>
          <div className="allocation-visual">
            <div className="allocation-donut">
              <div>
                <strong>5</strong>
                <span>assets</span>
              </div>
            </div>
            <div className="allocation-legend">
              <span>
                <i className="allocation-stock" /> Technology <b>48.9%</b>
              </span>
              <span>
                <i className="allocation-index" /> Index funds <b>22.7%</b>
              </span>
              <span>
                <i className="allocation-cyclical" /> Consumer cyclical{" "}
                <b>14.7%</b>
              </span>
              <span>
                <i className="allocation-cash" /> Cash <b>23.2%</b>
              </span>
            </div>
          </div>
          <div className="allocation-note">
            Your portfolio is concentrated in technology. Consider whether that
            matches your long-term plan.
          </div>
        </section>
      </div>
      <PortfolioAssetsTable />
    </main>
  );
}
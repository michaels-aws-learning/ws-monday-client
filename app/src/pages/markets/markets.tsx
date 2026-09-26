import { useAuth0 } from "@auth0/auth0-react";
import {
  ArrowDownRight,
  ArrowUpRight,
  ChevronRight,
  Search,
  TrendingUp,
} from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "../../components/ui/button";
import NotAuthenticated from "../no-auth/not-authenticated";
import { marketAssets, marketIndices } from "./market-data";
import "./markets.css";

export default function Markets() {
  const { isLoading, isAuthenticated, error,  } = useAuth0();

  if (isLoading)
    return <div className="auth-loading">Loading your workspace...</div>;
  if (!isAuthenticated) return <NotAuthenticated />;
  if (error)
    return <div className="auth-loading error-message">{error.message}</div>;

  return (
    <main className="markets-page">
      <div className="markets-heading">
        <div>
          <p className="eyebrow">Market intelligence</p>
          <h1>Markets</h1>
          <p className="markets-subheading">
            A clear view of what is moving across the market today.
          </p>
        </div>
        <div className="markets-open">
          <span /> Market open <small>Closes in 4h 18m</small>
        </div>
      </div>

      <section className="index-grid" aria-label="Market indices">
        {marketIndices.map((index) => {
          const ChangeIcon = index.positive ? ArrowUpRight : ArrowDownRight;
          return (
            <div className="index-card" key={index.symbol}>
              <span>{index.symbol}</span>
              <strong>{index.value}</strong>
              <small
                className={
                  index.positive ? "market-positive" : "market-negative"
                }
              >
                <ChangeIcon /> {index.change}
              </small>
            </div>
          );
        })}
      </section>

      <div className="markets-toolbar">
        <div className="section-title">
          <p className="eyebrow">Explore assets</p>
          <h2>Popular stocks</h2>
        </div>
        <label className="market-search">
          <Search />
          <input
            placeholder="Search stocks or symbols"
            aria-label="Search stocks or symbols"
          />
        </label>
      </div>
      <section className="asset-table" aria-label="Popular stocks">
        <div className="asset-table-header">
          <span>Asset</span>
          <span>Last price</span>
          <span>Day change</span>
          <span>Market cap</span>
          <span>Sector</span>
          <span />
        </div>
        {marketAssets.map((asset) => {
          const ChangeIcon = asset.positive ? ArrowUpRight : ArrowDownRight;

          return (
            <Link
              className="asset-row"
              to={`/markets/${asset.symbol}`}
              key={asset.symbol}
            >
              <span className="asset-identity">
                <span className="asset-logo">{asset.symbol.slice(0, 1)}</span>
                <span>
                  <strong>{asset.symbol}</strong>
                  <small>{asset.name}</small>
                </span>
              </span>
              <strong>{asset.price}</strong>
              <span
                className={
                  asset.positive ? "market-positive" : "market-negative"
                }
              >
                <ChangeIcon /> {asset.changePercent}
              </span>
              <span>{asset.marketCap}</span>
              <span className="asset-sector">{asset.sector}</span>
              <ChevronRight />
            </Link>
          );
        })}
      </section>

      <section className="market-note">
        <div className="note-icon">
          <TrendingUp />
        </div>
        <div>
          <p className="eyebrow">Market pulse</p>
          <strong>Technology continues to lead the session</strong>
          <p>
            Semiconductors and cloud infrastructure are driving the broad rally,
            while small caps remain mixed.
          </p>
        </div>
        <Button variant="outline" size="sm">
          View themes <ChevronRight />
        </Button>
      </section>
    </main>
  );
}
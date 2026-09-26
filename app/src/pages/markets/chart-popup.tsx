import { useAuth0 } from "@auth0/auth0-react";
import { ArrowLeft, ArrowDownRight, ArrowUpRight } from "lucide-react";
import { useState } from "react";
import { Link, useParams, useSearchParams } from "react-router-dom";
import { ChartTimeRangeControls, PriceChart, type ChartTimeRange, type ChartType } from "../../components/markets/price-chart";
import NotAuthenticated from "../no-auth/not-authenticated";
import { findAsset } from "./market-data";
import "./markets.css";
import "./chart-features.css";
import "./chart-type-picker.css";
import "./chart-range.css";
import "./chart-height.css";

const chartTypes: ChartType[] = ["candlestick", "bar", "line", "area", "baseline", "histogram"];

export default function ChartPopup() {
  const { symbol = "NVDA" } = useParams();
  const [searchParams] = useSearchParams();
  const { isLoading, isAuthenticated } = useAuth0();
  const asset = findAsset(symbol);
  const requestedType = searchParams.get("type");
  const chartType = chartTypes.includes(requestedType as ChartType) ? requestedType as ChartType : "candlestick";
  const [timeRange, setTimeRange] = useState<ChartTimeRange>("1M");

  if (isLoading) return <div className="auth-loading">Loading your workspace...</div>;
  if (!isAuthenticated) return <NotAuthenticated />;
  if (!asset) return <div className="auth-loading">Asset not found.</div>;

  const ChangeIcon = asset.positive ? ArrowUpRight : ArrowDownRight;

  return (
    <main className="chart-popup-page">
      <header className="chart-popup-header">
        <Link className="back-link" to={`/markets/${asset.symbol}`}><ArrowLeft /> Return to {asset.symbol}</Link>
        <div><p className="eyebrow">{asset.exchange} / Candlestick chart</p><h1>{asset.name} <span>{asset.symbol}</span></h1></div>
        <span className={asset.positive ? "market-positive asset-change" : "market-negative asset-change"}><ChangeIcon /> {asset.changePercent} today</span>
      </header>
      <section className="chart-popup-surface"><PriceChart asset={asset} chartType={chartType} timeRange={timeRange} /><ChartTimeRangeControls value={timeRange} onChange={setTimeRange} /></section>
    </main>
  );
}
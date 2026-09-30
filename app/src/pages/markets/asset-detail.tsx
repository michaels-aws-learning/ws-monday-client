import { useAuth0 } from "@auth0/auth0-react";
import {
  ArrowDownRight,
  ArrowUpRight,
  ChevronDown,
  Maximize2,
  Minimize2,
  PencilRuler,
  Plus,
  Search,
  ShieldCheck,
  Star,
  X,
} from "lucide-react";
import { useEffect, useRef, useState } from "react";
import type { FormEvent } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Button } from "../../components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../../components/ui/select";
import {
  ChartTimeRangeControls,
  PriceChart,
  comparisonColors,
  type ChartTimeRange,
  type ChartType,
} from "../../components/markets/price-chart";
import {
  BuySellModal,
  type TradeOrder,
  type TradeOrderType,
  type TradeSide,
} from "../../components/trading/buy-sell-modal";
import { PreviousNav } from "../../components/previous/previous-nav";
import NotAuthenticated from "../no-auth/not-authenticated";
import { findAsset, marketAssets, type MarketAsset } from "./market-data";
import "./markets.css";
import "./chart-features.css";
import "./chart-type-picker.css";
import "./chart-range.css";
import "./chart-height.css";
import "../../components/previous/previous-nav.css";

const financials = [
  ["Revenue", "$35.08B", "+94.2%"],
  ["Net income", "$19.31B", "+168.0%"],
  ["EPS", "$0.78", "+111.1%"],
  ["Free cash flow", "$16.89B", "+70.4%"],
];

const chartTypes: { value: ChartType; label: string }[] = [
  { value: "candlestick", label: "Candle" },
  { value: "bar", label: "Bar" },
  { value: "line", label: "Line" },
  { value: "area", label: "Area" },
  { value: "baseline", label: "Baseline" },
  { value: "histogram", label: "Line + volume" },
];

export default function AssetDetail() {
  const { symbol = "NVDA" } = useParams();
  const { isLoading, isAuthenticated } = useAuth0();
  const navigate = useNavigate();
  const chartPanelRef = useRef<HTMLElement>(null);
  const [search, setSearch] = useState("");
  const [drawingMode, setDrawingMode] = useState(false);
  const [clearDrawingSignal, setClearDrawingSignal] = useState(0);
  const [tradeSide, setTradeSide] = useState<TradeSide | null>(null);
  const [quantity, setQuantity] = useState("1");
  const [orderType, setOrderType] = useState<TradeOrderType>("market");
  const [limitPrice, setLimitPrice] = useState("");
  const [orderSheetOpen, setOrderSheetOpen] = useState(false);
  const [tradeNotice, setTradeNotice] = useState("");
  const [isChartFullscreen, setIsChartFullscreen] = useState(false);
  const [fullscreenError, setFullscreenError] = useState("");
  const [chartType, setChartType] = useState<ChartType>("candlestick");
  const [timeRange, setTimeRange] = useState<ChartTimeRange>("1M");
  const [comparisonAssets, setComparisonAssets] = useState<MarketAsset[]>([]);
  const asset = findAsset(symbol);
  const ChangeIcon = asset?.positive ? ArrowUpRight : ArrowDownRight;

  useEffect(() => {
    const syncFullscreenState = () => {
      setIsChartFullscreen(document.fullscreenElement === chartPanelRef.current);
    };

    document.addEventListener("fullscreenchange", syncFullscreenState);
    return () =>
      document.removeEventListener("fullscreenchange", syncFullscreenState);
  }, []);

  if (isLoading)
    return <div className="auth-loading">Loading your workspace...</div>;
  if (!isAuthenticated) return <NotAuthenticated />;
  if (!asset) return <div className="auth-loading">Asset not found.</div>;

  const handleAssetSearch = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const nextAsset = marketAssets.find(
      (item) => item.symbol === search.trim().toUpperCase(),
    );
    if (nextAsset) {
      navigate(`/markets/${nextAsset.symbol}`);
      setSearch("");
    }
  };

  const toggleChartFullscreen = async () => {
    const chartPanel = chartPanelRef.current;
    if (!chartPanel) return;

    try {
      if (document.fullscreenElement === chartPanel) {
        await document.exitFullscreen();
      } else {
        await chartPanel.requestFullscreen();
      }
      setFullscreenError("");
    } catch {
      setFullscreenError("Fullscreen is unavailable in this browser.");
    }
  };

  const openTradeTicket = (side: TradeSide) => {
    setTradeSide(side);
    setQuantity("1");
    setOrderType("market");
    setLimitPrice("");
    setTradeNotice("");
    setOrderSheetOpen(true);
  };

  const handleTradeConfirmation = (order: TradeOrder) => {
    setTradeSide(null);
    setTradeNotice(
      `Demo ${order.side} order for ${order.quantity} ${order.symbol} confirmed. No live order was sent.`,
    );
  };

  const activeComparisonAssets = comparisonAssets.filter(
    (comparisonAsset) => comparisonAsset.symbol !== asset.symbol,
  );

  const addComparisonAsset = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const comparisonAsset = findAsset(event.target.value);
    event.target.value = "";
    if (!comparisonAsset || comparisonAsset.symbol === asset.symbol) return;

    setComparisonAssets((current) =>
      current.some((item) => item.symbol === comparisonAsset.symbol)
        ? current
        : [...current, comparisonAsset],
    );
  };

  return (
    <main className="markets-page asset-detail-page">
      <PreviousNav fallback="/markets" label="Back to markets" />
      <div className="asset-detail-heading">
        <div className="asset-detail-title">
          <span className="asset-logo large">{asset.symbol.slice(0, 1)}</span>
          <div>
            <p className="eyebrow">
              {asset.exchange} / {asset.sector}
            </p>
            <h1>
              {asset.name} <span>{asset.symbol}</span>
            </h1>
          </div>
        </div>
        <div className="asset-actions">
          <Button
            variant="outline"
            size="icon-sm"
            aria-label="Add to watchlist"
          >
            <Star />
          </Button>
          <Button onClick={() => openTradeTicket("buy")}>
            <Plus /> Trade {asset.symbol}
          </Button>
        </div>
      </div>
      <section className="asset-overview">
        <div>
          <span className="asset-price-label">{asset.symbol} price</span>
          <strong className="asset-price">{asset.price}</strong>
          <span
            className={
              asset.positive
                ? "market-positive asset-change"
                : "market-negative asset-change"
            }
          >
            <ChangeIcon /> {asset.change} ({asset.changePercent}) today
          </span>
        </div>
        <div className="chart-range">
          <Button variant="ghost" size="xs">
            1D
          </Button>
          <Button variant="ghost" size="xs">
            1W
          </Button>
          <Button size="xs">1M</Button>
          <Button variant="ghost" size="xs">
            1Y
          </Button>
          <Button variant="ghost" size="xs">
            ALL
          </Button>
        </div>
      </section>
      <section className="detail-chart-panel" ref={chartPanelRef}>
        <div className="chart-toolbar">
          <form className="chart-asset-search" onSubmit={handleAssetSearch}>
            <Search />
            <input
              value={search}
              onChange={(event) => setSearch(event.target.value)}
              placeholder="Search another asset"
              aria-label="Search another asset"
            />
          </form>
          <div className="chart-tools">
            <Select
              value={chartType}
              onValueChange={(value) =>
                value && setChartType(value as ChartType)
              }
            >
              <SelectTrigger
                className="chart-type-select"
                size="sm"
                aria-label="Chart type"
              >
                <SelectValue />
              </SelectTrigger>
              <SelectContent className="chart-type-menu">
                {chartTypes.map((type) => (
                  <SelectItem key={type.value} value={type.value}>
                    {type.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <label className="chart-compare-select">
              <span className="sr-only">Compare with another asset</span>
              <select value="" onChange={addComparisonAsset}>
                <option value="">Compare asset</option>
                {marketAssets.map((comparisonAsset) => (
                  <option
                    key={comparisonAsset.symbol}
                    value={comparisonAsset.symbol}
                    disabled={
                      comparisonAsset.symbol === asset.symbol ||
                      activeComparisonAssets.some(
                        (item) => item.symbol === comparisonAsset.symbol,
                      )
                    }
                  >
                    {comparisonAsset.symbol} · {comparisonAsset.name}
                  </option>
                ))}
              </select>
            </label>
            <Button
              className="trade-buy"
              size="xs"
              onClick={() => openTradeTicket("buy")}
            >
              <Plus /> Buy
            </Button>
            <Button
              className="trade-sell"
              size="xs"
              onClick={() => openTradeTicket("sell")}
            >
              Sell
            </Button>
            <Button
              className={drawingMode ? "chart-tool active" : "chart-tool"}
              variant="ghost"
              size="xs"
              onClick={() => setDrawingMode((active) => !active)}
            >
              <PencilRuler /> {drawingMode ? "Drawing" : "Draw level"}
            </Button>
            <Button
              className="chart-tool"
              variant="ghost"
              size="xs"
              onClick={() => setClearDrawingSignal((signal) => signal + 1)}
            >
              Clear levels
            </Button>
            <Button
              className="chart-tool"
              variant="ghost"
              size="xs"
              onClick={() => void toggleChartFullscreen()}
              aria-label={isChartFullscreen ? "Exit chart fullscreen" : "View chart fullscreen"}
              aria-pressed={isChartFullscreen}
              title={isChartFullscreen ? "Exit fullscreen" : "Fullscreen"}
            >
              {isChartFullscreen ? <Minimize2 /> : <Maximize2 />}
              {isChartFullscreen ? "Exit fullscreen" : "Fullscreen"}
            </Button>
          </div>
        </div>
        {fullscreenError && (
          <p className="chart-hint" role="status">
            {fullscreenError}
          </p>
        )}
        {activeComparisonAssets.length > 0 && (
          <div className="chart-comparison-legend" aria-label="Compared assets">
            {activeComparisonAssets.map((comparisonAsset) => {
              const colorIndex = comparisonAssets.findIndex(
                (item) => item.symbol === comparisonAsset.symbol,
              );
              const color = comparisonColors[colorIndex % comparisonColors.length];

              return (
                <span className="chart-comparison-item" key={comparisonAsset.symbol}>
                  <span
                    className="chart-comparison-swatch"
                    style={{ backgroundColor: color }}
                    aria-hidden="true"
                  />
                  {comparisonAsset.symbol}
                  <button
                    type="button"
                    aria-label={`Remove ${comparisonAsset.symbol} comparison`}
                    onClick={() =>
                      setComparisonAssets((current) =>
                        current.filter((item) => item.symbol !== comparisonAsset.symbol),
                      )
                    }
                  >
                    <X />
                  </button>
                </span>
              );
            })}
          </div>
        )}
        {drawingMode && (
          <p className="chart-hint">
            Click the chart to place a horizontal price level.
          </p>
        )}
        <PriceChart
          asset={asset}
          comparisonAssets={comparisonAssets}
          chartType={chartType}
          timeRange={timeRange}
          drawingMode={drawingMode}
          clearDrawingSignal={clearDrawingSignal}
        />
        <ChartTimeRangeControls value={timeRange} onChange={setTimeRange} />
      </section>
      {tradeNotice && (
        <p className="trade-status" role="status">
          {tradeNotice}
        </p>
      )}
      {tradeSide && (
        <BuySellModal
          open={orderSheetOpen}
          onOpenChange={(open) => {
            setOrderSheetOpen(open);
            if (!open) setTradeSide(null);
          }}
          asset={asset}
          side={tradeSide}
          quantity={quantity}
          onQuantityChange={setQuantity}
          orderType={orderType}
          onOrderTypeChange={setOrderType}
          limitPrice={limitPrice}
          onLimitPriceChange={setLimitPrice}
          onConfirm={handleTradeConfirmation}
        />
      )}
      <div className="asset-detail-grid">
        <section className="detail-panel">
          <div className="section-title">
            <p className="eyebrow">Company overview</p>
            <h2>About {asset.symbol}</h2>
          </div>
          <p className="asset-description">{asset.description}</p>
          <div className="company-meta">
            <span>
              <small>Exchange</small>
              <strong>{asset.exchange}</strong>
            </span>
            <span>
              <small>Sector</small>
              <strong>{asset.sector}</strong>
            </span>
            <span>
              <small>Dividend yield</small>
              <strong>{asset.dividendYield}</strong>
            </span>
          </div>
        </section>
        <section className="detail-panel">
          <div className="section-title">
            <p className="eyebrow">Key statistics</p>
            <h2>Financial snapshot</h2>
          </div>
          <div className="stats-grid">
            <span>
              <small>Market cap</small>
              <strong>{asset.marketCap}</strong>
            </span>
            <span>
              <small>P/E ratio</small>
              <strong>{asset.peRatio}</strong>
            </span>
            <span>
              <small>Volume</small>
              <strong>{asset.volume}</strong>
            </span>
            <span>
              <small>Day range</small>
              <strong>$138.40–$143.25</strong>
            </span>
          </div>
        </section>
      </div>
      <section className="detail-panel financial-panel">
        <div className="section-title">
          <p className="eyebrow">Fundamentals</p>
          <h2>Latest financials</h2>
          <Button variant="ghost" size="xs">
            Quarterly <ChevronDown />
          </Button>
        </div>
        <div className="financial-grid">
          {financials.map(([label, value, change]) => (
            <div key={label}>
              <small>{label}</small>
              <strong>{value}</strong>
              <span className="market-positive">{change}</span>
            </div>
          ))}
        </div>
        <div className="secure-note">
          <ShieldCheck /> Data shown is for research and informational purposes.
        </div>
      </section>
    </main>
  );
}

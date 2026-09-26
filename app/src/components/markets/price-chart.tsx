import { useEffect, useRef } from "react";
import { AreaSeries, BarSeries, BaselineSeries, CandlestickSeries, ColorType, HistogramSeries, LineSeries, createChart, type IChartApi, type ISeriesApi, type MouseEventParams, type SeriesType, type Time } from "lightweight-charts";
import { Button } from "../ui/button";
import type { MarketAsset } from "../../pages/markets/market-data";

export type ChartType = "candlestick" | "bar" | "line" | "area" | "baseline" | "histogram";
export type ChartTimeRange = "1D" | "5D" | "1M" | "3M" | "6M" | "YTD" | "1Y" | "5Y" | "ALL";

const chartTimeRanges: ChartTimeRange[] = ["1D", "5D", "1M", "3M", "6M", "YTD", "1Y", "5Y", "ALL"];

type PriceChartProps = {
  asset: MarketAsset;
  chartType?: ChartType;
  timeRange?: ChartTimeRange;
  drawingMode?: boolean;
  clearDrawingSignal?: number;
};

export const PriceChart = ({ asset, chartType = "candlestick", timeRange = "1M", drawingMode = false, clearDrawingSignal = 0 }: PriceChartProps) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const chartRef = useRef<IChartApi | null>(null);
  const seriesRef = useRef<ISeriesApi<SeriesType> | null>(null);
  const priceLinesRef = useRef<ReturnType<ISeriesApi<SeriesType>["createPriceLine"]>[]>([]);

  useEffect(() => {
    if (!containerRef.current) return;

    const container = containerRef.current;
    const chart = createChart(container, {
      autoSize: true,
      layout: {
        background: { type: ColorType.Solid, color: "#fbfcf8" },
        textColor: "#7a8277",
        fontFamily: "Inter, sans-serif",
        attributionLogo: false,
      },
      grid: {
        vertLines: { color: "#eef1eb" },
        horzLines: { color: "#eef1eb" },
      },
      rightPriceScale: { borderColor: "#e0e4da" },
      timeScale: { borderColor: "#e0e4da", timeVisible: false },
      crosshair: { vertLine: { color: "#b7c696" }, horzLine: { color: "#b7c696" } },
    });

    const closes = asset.chart.map(({ time, close }) => ({ time, value: close }));
    const baseline = asset.chart.reduce((total, candle) => total + candle.close, 0) / asset.chart.length;
    const volumes = asset.chart.map(({ time, open, close }, index) => ({
      time,
      value: 80 + Math.abs(close - open) * 35 + index * 3,
      color: close >= open ? "rgba(94, 143, 97, .65)" : "rgba(182, 87, 90, .65)",
    }));

    let series: ISeriesApi<SeriesType>;
    if (chartType === "bar") {
      series = chart.addSeries(BarSeries, { upColor: "#5e8f61", downColor: "#b6575a" });
      series.setData(asset.chart as never);
    } else if (chartType === "line") {
      series = chart.addSeries(LineSeries, { color: "#5e8f61", lineWidth: 2 });
      series.setData(closes as never);
    } else if (chartType === "area") {
      series = chart.addSeries(AreaSeries, { lineColor: "#5e8f61", topColor: "rgba(214, 244, 93, .36)", bottomColor: "rgba(251, 252, 248, 0)", lineWidth: 2 });
      series.setData(closes as never);
    } else if (chartType === "baseline") {
      series = chart.addSeries(BaselineSeries, { baseValue: { type: "price", price: baseline }, topLineColor: "#5e8f61", topFillColor1: "rgba(214, 244, 93, .35)", topFillColor2: "rgba(214, 244, 93, .05)", bottomLineColor: "#b6575a", bottomFillColor1: "rgba(182, 87, 90, .05)", bottomFillColor2: "rgba(182, 87, 90, .2)" });
      series.setData(closes as never);
    } else if (chartType === "histogram") {
      series = chart.addSeries(HistogramSeries, { color: "rgba(94, 143, 97, .65)", priceFormat: { type: "volume" }, priceScaleId: "" });
      series.setData(volumes as never);
      chart.priceScale("").applyOptions({ scaleMargins: { top: 0.78, bottom: 0 } });
    } else {
      series = chart.addSeries(CandlestickSeries, { upColor: "#6f9b62", downColor: "#c77979", borderUpColor: "#5e8f61", borderDownColor: "#b6575a", wickUpColor: "#5e8f61", wickDownColor: "#b6575a" });
      series.setData(asset.chart as never);
    }

    chart.timeScale().fitContent();
    chartRef.current = chart;
    seriesRef.current = series;

    return () => {
      priceLinesRef.current = [];
      seriesRef.current = null;
      chart.remove();
      chartRef.current = null;
    };
  }, [asset, chartType]);

  useEffect(() => {
    const chart = chartRef.current;
    if (!chart) return;

    const visibleCandles: Record<ChartTimeRange, number> = {
      "1D": 1,
      "5D": 5,
      "1M": 22,
      "3M": 66,
      "6M": 132,
      YTD: 252,
      "1Y": 252,
      "5Y": 1260,
      ALL: asset.chart.length,
    };
    const candleCount = Math.min(visibleCandles[timeRange], asset.chart.length);
    const lastIndex = asset.chart.length - 1;

    chart.timeScale().setVisibleLogicalRange({
      from: Math.max(0, lastIndex - candleCount + 1),
      to: lastIndex,
    });
  }, [asset, timeRange, chartType]);

  useEffect(() => {
    const chart = chartRef.current;
    const series = seriesRef.current;
    if (!chart || !series) return;

    const handleChartClick = (param: MouseEventParams<Time>) => {
      if (!drawingMode || !param.point) return;

      const price = series.coordinateToPrice(param.point.y);
      if (price === null) return;

      const line = series.createPriceLine({
        price,
        color: "#7b9258",
        lineWidth: 1,
        lineStyle: 2,
        axisLabelVisible: true,
        title: "LEVEL",
      });
      priceLinesRef.current.push(line);
    };

    chart.subscribeClick(handleChartClick);
    return () => chart.unsubscribeClick(handleChartClick);
  }, [drawingMode]);

  useEffect(() => {
    if (!seriesRef.current || clearDrawingSignal === 0) return;

    priceLinesRef.current.forEach((line) => seriesRef.current?.removePriceLine(line));
    priceLinesRef.current = [];
  }, [clearDrawingSignal]);

  return <div className="price-chart" ref={containerRef} aria-label={`${asset.symbol} price chart`} />;
};

type ChartTimeRangeControlsProps = {
  value: ChartTimeRange;
  onChange: (value: ChartTimeRange) => void;
};

export const ChartTimeRangeControls = ({ value, onChange }: ChartTimeRangeControlsProps) => (
  <div className="chart-time-range" aria-label="Chart time range">
    {chartTimeRanges.map((range) => (
      <Button key={range} className={value === range ? "active" : ""} variant="ghost" size="xs" onClick={() => onChange(range)}>
        {range === "ALL" ? "All time" : range}
      </Button>
    ))}
  </div>
);
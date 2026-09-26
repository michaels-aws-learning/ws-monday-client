import { ArrowDownRight, ArrowUpRight, MoreHorizontal } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "../ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "../ui/table";
import { portfolioAssets } from "../../pages/portfolio/portfolio-data";

export function PortfolioAssetsTable() {
  return (
    <section className="portfolio-assets panel" aria-labelledby="portfolio-assets-title">
      <div className="portfolio-section-heading">
        <div><p className="eyebrow">Holdings</p><h2 id="portfolio-assets-title">Your assets</h2></div>
        <Button variant="outline" size="sm">Export data</Button>
      </div>
      <Table>
        <TableHeader><TableRow><TableHead>Asset</TableHead><TableHead>Shares</TableHead><TableHead>Price</TableHead><TableHead>Market value</TableHead><TableHead>Today</TableHead><TableHead>Total return</TableHead><TableHead>Allocation</TableHead><TableHead /></TableRow></TableHeader>
        <TableBody>
          {portfolioAssets.map((asset) => {
            const ChangeIcon = asset.positive ? ArrowUpRight : ArrowDownRight;
            return <TableRow key={asset.symbol}>
              <TableCell><Link className="portfolio-asset-identity" to={`/markets/${asset.symbol}`} aria-label={`View ${asset.symbol} market details`}><span className="portfolio-asset-logo">{asset.symbol.slice(0, 1)}</span><span><strong>{asset.symbol}</strong><small>{asset.name}</small></span></Link></TableCell>
              <TableCell>{asset.shares}</TableCell>
              <TableCell><strong>{asset.price}</strong><small className="table-subvalue">Avg. {asset.averageCost}</small></TableCell>
              <TableCell><strong>{asset.marketValue}</strong></TableCell>
              <TableCell><span className={asset.positive ? "market-positive" : "market-negative"}><ChangeIcon /> {asset.dayChangePercent}</span><small className="table-subvalue">{asset.dayChange}</small></TableCell>
              <TableCell><span className={asset.positive ? "market-positive" : "market-negative"}>{asset.totalReturnPercent}</span><small className="table-subvalue">{asset.totalReturn}</small></TableCell>
              <TableCell>{asset.allocation}</TableCell>
              <TableCell><Button variant="ghost" size="icon-xs" aria-label={`${asset.symbol} options`}><MoreHorizontal /></Button></TableCell>
            </TableRow>;
          })}
        </TableBody>
      </Table>
      <div className="portfolio-cash-row"><span>Cash</span><strong>$4,280.45</strong><small>23.2% of portfolio</small></div>
    </section>
  );
}
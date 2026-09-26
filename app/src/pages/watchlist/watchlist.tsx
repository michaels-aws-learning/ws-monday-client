import { useAuth0 } from "@auth0/auth0-react";
import { ArrowDownRight, ArrowUpRight, Plus, Search, Star, X } from "lucide-react";
import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "../../components/ui/button";
import { Input } from "../../components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "../../components/ui/table";
import NotAuthenticated from "../no-auth/not-authenticated";
import { marketAssets } from "../markets/market-data";
import "./watchlist.css";

export default function Watchlist() {
    const { isLoading, isAuthenticated, error } = useAuth0();
    const [query, setQuery] = useState("");
    const [watchedSymbols, setWatchedSymbols] = useState(() => marketAssets.map((asset) => asset.symbol));
    const watchedAssets = useMemo(() => marketAssets.filter((asset) => watchedSymbols.includes(asset.symbol)), [watchedSymbols]);
    const filteredAssets = watchedAssets.filter((asset) => `${asset.symbol} ${asset.name} ${asset.sector}`.toLowerCase().includes(query.trim().toLowerCase()));
    const removeAsset = (symbol: string) => setWatchedSymbols((symbols) => symbols.filter((item) => item !== symbol));

    if (isLoading) return <div className="auth-loading">Loading your workspace...</div>;
    if (!isAuthenticated) return <NotAuthenticated />;
    if (error) return <div className="auth-loading error-message">{error.message}</div>;

    return (
        <main className="watchlist-page">
            <div className="watchlist-heading"><div><p className="eyebrow">Keep an eye on</p><h1>Watchlist</h1><p className="watchlist-subheading">Track the assets you are considering and spot the next move.</p></div><Button><Plus /> Add asset</Button></div>
            <section className="watchlist-overview"><div><span>Watching</span><strong>{watchedAssets.length} assets</strong><small>Across technology and consumer markets</small></div><div><span>Gainers today</span><strong className="market-positive">{watchedAssets.filter((asset) => asset.positive).length}</strong><small>Assets moving higher</small></div><div><span>Watchlist move</span><strong className="market-positive">+$155.00</strong><small>Combined daily change</small></div></section>
            <section className="watchlist-panel-large panel"><div className="watchlist-toolbar"><div><p className="eyebrow">Your assets</p><h2>Watched securities</h2></div><label className="watchlist-search"><Search /><Input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Search watchlist" aria-label="Search watchlist" /></label></div>
                {filteredAssets.length > 0 ? <Table><TableHeader><TableRow><TableHead>Asset</TableHead><TableHead>Last price</TableHead><TableHead>Day change</TableHead><TableHead>Market cap</TableHead><TableHead>Sector</TableHead><TableHead /></TableRow></TableHeader><TableBody>{filteredAssets.map((asset) => { const ChangeIcon = asset.positive ? ArrowUpRight : ArrowDownRight; return <TableRow key={asset.symbol}><TableCell><Link className="watchlist-asset" to={`/markets/${asset.symbol}`}><span className="watchlist-logo"><Star /></span><span><strong>{asset.symbol}</strong><small>{asset.name}</small></span></Link></TableCell><TableCell><strong>{asset.price}</strong><small className="watchlist-subvalue">{asset.exchange}</small></TableCell><TableCell><span className={asset.positive ? "market-positive" : "market-negative"}><ChangeIcon /> {asset.changePercent}</span><small className="watchlist-subvalue">{asset.change}</small></TableCell><TableCell>{asset.marketCap}</TableCell><TableCell><span className="watchlist-sector">{asset.sector}</span></TableCell><TableCell><Button variant="ghost" size="icon-xs" aria-label={`Remove ${asset.symbol} from watchlist`} onClick={() => removeAsset(asset.symbol)}><X /></Button></TableCell></TableRow>; })}</TableBody></Table> : <div className="watchlist-empty"><Star /><strong>{query ? "No matching assets" : "Your watchlist is empty"}</strong><p>{query ? "Try another symbol or company name." : "Add assets from the markets page to start tracking them."}</p></div>}
            </section>
        </main>
    );
}
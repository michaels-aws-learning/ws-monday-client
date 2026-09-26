import { MarketBrief } from "../../components/cards/market-cards/market-brief";
import { TradeCard } from "../../components/cards/market-cards/trade-card";
import { WatchlistCard } from "../../components/cards/market-cards/watchlist-card";
import { PortfolioCard } from "../../components/cards/portfolio-cards/portfolio-card";
import { SummaryCards } from "../../components/cards/portfolio-cards/summary-card";
import { useAuth0 } from "@auth0/auth0-react";
import NotAuthenticated from "../no-auth/not-authenticated";
import { Button } from "../../components/ui/button";

export default function Dashboard() {
  const {
    user,
    isAuthenticated,
  } = useAuth0();

  if (!isAuthenticated) {
    return <NotAuthenticated />;
  }

  return (
    <>
      <div className="page-wrap">
        <div className="page-heading">
          <div>
            <p className="eyebrow">Tuesday, November 19, 2024</p>
            <h1>
              Good morning, {user?.name} <span>✦</span>
            </h1>
            <p className="subheading">Here&apos;s your financial pulse.</p>
          </div>
          <Button className="deposit-button">
            <span aria-hidden="true">+</span> Add funds
          </Button>
        </div>
        <SummaryCards />
        <div className="content-grid">
          <PortfolioCard />
          <WatchlistCard />
          <TradeCard />
        </div>
        <MarketBrief />
      </div>
    </>
  );
}
import { ChevronDown, ChevronRight, ShieldCheck } from "lucide-react";
import { Button } from "../../ui/button";

export const TradeCard = () => (
  <section className="panel order-panel">
    <div className="panel-heading">
      <div>
        <p className="eyebrow">Make a move</p>
        <h2>Trade</h2>
      </div>
      <Button className="asset-selector">
        NVDA <ChevronDown />
      </Button>
    </div>
    <div className="trade-tabs">
      <Button className="trade-tab active">Buy</Button>
      <Button className="trade-tab">Sell</Button>
    </div>
    <div className="order-field">
      <label>Order type</label>
      <Button>
        Market order <ChevronDown />
      </Button>
    </div>
    <div className="order-field">
      <label>Amount</label>
      <div className="amount-input">
        <span>$</span>
        <input defaultValue="500.00" aria-label="Amount" />
      </div>
    </div>
    <div className="order-estimate">
      <span>Estimated shares</span>
      <strong>3.52 shares</strong>
    </div>
    <Button className="review-button">
      Review order <ChevronRight />
    </Button>
    <div className="secure-note">
      <ShieldCheck /> Fractional shares available
    </div>
  </section>
);
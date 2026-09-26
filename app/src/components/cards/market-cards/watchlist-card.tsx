import { Button } from "../../ui/button";

export const WatchlistCard = () => (
  <section className="panel watchlist-panel">
    <div className="panel-heading">
      <div>
        <p className="eyebrow">Keep an eye on</p>
        <h2>Watchlist</h2>
      </div>
      <Button className="plus-icon" aria-label="Add to watchlist">
        +
      </Button>
    </div>
    <div className="watchlist">
      <div className="watch-row">
        <span className="star-icon">*</span>
        <div className="watch-name">
          <strong>NVDA</strong>
          <span>NVIDIA Corporation</span>
        </div>
        <div className="watch-price">
          <strong>$141.82</strong>
          <span className="positive-text">+3.84%</span>
        </div>
      </div>
      <div className="watch-row">
        <span className="star-icon">*</span>
        <div className="watch-name">
          <strong>AAPL</strong>
          <span>Apple Inc.</span>
        </div>
        <div className="watch-price">
          <strong>$228.07</strong>
          <span className="positive-text">+0.62%</span>
        </div>
      </div>
    </div>
  </section>
);
import { ChevronRight, X } from "lucide-react";
import { Button } from "../../ui/button";

export const MarketBrief = () => (
  <section className="news-strip">
    <div className="news-title">
      <span className="eyebrow">Market brief</span>
      <strong>What&apos;s moving</strong>
    </div>
    <div className="news-item">
      <span className="news-tag">EARNINGS</span>
      <p>NVIDIA reports record revenue, stock jumps in pre-market</p>
      <ChevronRight />
    </div>
    <div className="news-item">
      <span className="news-tag green">MARKETS</span>
      <p>Tech leads a broad rally as investors await Fed minutes</p>
      <ChevronRight />
    </div>
    <Button className="news-close" aria-label="Close market brief">
      <X />
    </Button>
  </section>
);
import { ArrowDownRight, ArrowUpRight, X } from "lucide-react";
import type { FormEvent } from "react";
import type { MarketAsset } from "../../pages/markets/market-data";
import { Button } from "../ui/button";
import {
    Sheet,
    SheetContent,
    SheetDescription,
    SheetTitle,
} from "../ui/sheet";

export type TradeSide = "buy" | "sell";
export type TradeOrderType = "market" | "limit";

export type TradeOrder = {
    side: TradeSide;
    symbol: string;
    assetName: string;
    quantity: number;
    orderType: TradeOrderType;
    pricePerShare: number;
    estimatedTotal: number;
};

type BuySellModalProps = {
    open: boolean;
    onOpenChange: (open: boolean) => void;
    asset: MarketAsset;
    side: TradeSide;
    quantity: string;
    onQuantityChange: (quantity: string) => void;
    orderType: TradeOrderType;
    onOrderTypeChange: (orderType: TradeOrderType) => void;
    limitPrice: string;
    onLimitPriceChange: (limitPrice: string) => void;
    onConfirm: (order: TradeOrder) => void;
};

const currency = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
});

export const BuySellModal = ({
    open,
    onOpenChange,
    asset,
    side,
    quantity,
    onQuantityChange,
    orderType,
    onOrderTypeChange,
    limitPrice,
    onLimitPriceChange,
    onConfirm,
}: BuySellModalProps) => {
    const marketPrice = Number(asset.price.replace(/[^\d.]/g, ""));
    const pricePerShare =
        orderType === "limit" && Number(limitPrice) > 0
            ? Number(limitPrice)
            : marketPrice;
    const numericQuantity = Number(quantity);
    const estimatedTotal = numericQuantity * pricePerShare;
    const validQuantity = Number.isFinite(numericQuantity) && numericQuantity > 0;
    const validLimitPrice =
        orderType === "market" ||
        (Number.isFinite(Number(limitPrice)) && Number(limitPrice) > 0);
    const SideIcon = side === "buy" ? ArrowUpRight : ArrowDownRight;

    const confirmOrder = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        if (!validQuantity || !validLimitPrice) return;

        onConfirm({
            side,
            symbol: asset.symbol,
            assetName: asset.name,
            quantity: numericQuantity,
            orderType,
            pricePerShare,
            estimatedTotal,
        });
        onOpenChange(false);
    };

    return (
        <Sheet open={open} onOpenChange={onOpenChange}>
            <SheetContent
                className="trade-confirmation"
                side="right"
                showCloseButton={false}
            >
                <header className="trade-confirmation-header">
                    <div>
                        <p className="eyebrow">Place order</p>
                        <SheetTitle className="trade-confirmation-title">
                            Place {side} order
                        </SheetTitle>
                        <SheetDescription>
                            Set the order details for {asset.name}.
                        </SheetDescription>
                    </div>
                    <Button
                        variant="ghost"
                        size="icon-sm"
                        aria-label="Close order review"
                        onClick={() => onOpenChange(false)}
                    >
                        <X />
                    </Button>
                </header>

                <div className={`trade-confirmation-side ${side}`}>
                    <SideIcon />
                    <span>{side === "buy" ? "Buy" : "Sell"}</span>
                    <strong>{asset.symbol}</strong>
                </div>

                <form className="trade-order-form" onSubmit={confirmOrder}>
                    <div className="trade-ticket-fields trade-sheet-fields">
                        <label>
                            Shares
                            <input
                                value={quantity}
                                onChange={(event) => onQuantityChange(event.target.value)}
                                type="number"
                                min="0.01"
                                step="0.01"
                                required
                            />
                        </label>
                        <label>
                            Order type
                            <select
                                value={orderType}
                                onChange={(event) => {
                                    const nextOrderType = event.target.value as TradeOrderType;
                                    onOrderTypeChange(nextOrderType);
                                    if (nextOrderType === "limit" && !limitPrice) {
                                        onLimitPriceChange(marketPrice.toFixed(2));
                                    }
                                }}
                            >
                                <option value="market">Market order</option>
                                <option value="limit">Limit order</option>
                            </select>
                        </label>
                        {orderType === "limit" && (
                            <label>
                                Limit price
                                <input
                                    value={limitPrice}
                                    onChange={(event) => onLimitPriceChange(event.target.value)}
                                    type="number"
                                    min="0.01"
                                    step="0.01"
                                    required
                                />
                            </label>
                        )}
                    </div>

                    <dl className="trade-confirmation-details">
                        <div>
                            <dt>Price per share</dt>
                            <dd>{currency.format(pricePerShare)}</dd>
                        </div>
                        <div className="trade-confirmation-total">
                            <dt>Estimated total</dt>
                            <dd>{currency.format(estimatedTotal)}</dd>
                        </div>
                    </dl>

                    <p className="trade-demo-notice">
                        Demo mode: placing this order does not send it to a broker.
                    </p>

                    <footer className="trade-confirmation-actions">
                        <Button
                            type="button"
                            variant="outline"
                            onClick={() => onOpenChange(false)}
                        >
                            Cancel
                        </Button>
                        <Button
                            type="submit"
                            className={`trade-${side}`}
                            disabled={!validQuantity || !validLimitPrice}
                        >
                            Place {side} order
                        </Button>
                    </footer>
                </form>
            </SheetContent>
        </Sheet>
    );
};
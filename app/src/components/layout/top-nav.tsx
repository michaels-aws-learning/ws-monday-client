import { Bell, Command, Menu, Search } from "lucide-react";
import { Button } from "../ui/button";

export const TopNav = () => {
    return (
        <header className="topbar">
            <div className="mobile-brand">
                <div className="brand-mark"><span>NS</span><strong>northstar</strong></div>
            </div>
            <Button className="search-bar">
                <Search /><span>Search markets, stocks, ETFs...</span>
                <kbd><Command /> K</kbd>
            </Button>
            <div className="top-actions">
                <Button className="icon-button" aria-label="Notifications"><Bell /><i /></Button>
                <Button className="market-status"><span /> Market open</Button>
                <Button className="mobile-menu" aria-label="Open menu"><Menu /></Button>
            </div>
        </header>
    );
}
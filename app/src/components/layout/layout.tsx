import type { ReactNode } from "react";
import { SideNav } from "./side-nav";
import { TopNav } from "./top-nav";

type LayoutProps = { children: ReactNode; user?: { email?: string; name?: string }; onLogout: () => void };

export const Layout = ({ children, user, onLogout }: LayoutProps) => (
  <div className="app-shell"><SideNav user={user} onLogout={onLogout} /><main className="main-content"><TopNav />{children}</main></div>
);
import "./App.css";
import { MarketTicker } from "./components/layout/market-ticker";
import { ThemeProvider } from "./context/theme-provider";
import { BrowserRouter } from "react-router-dom";
import { Routing } from "./routing/routing";
import { useAuth0 } from "@auth0/auth0-react";
import NotAuthenticated from "./pages/no-auth/not-authenticated";
import { Layout } from "./components/layout/layout";
import { PreviousNavigationProvider } from "./components/previous/previous-navigation";

function App() {
  const { isLoading, isAuthenticated, logout, user } = useAuth0();

  if (isLoading)
    return <div className="auth-loading">Loading your workspace...</div>;
  if (!isAuthenticated) return <NotAuthenticated />;

  return (
    <ThemeProvider defaultTheme="system" storageKey="ws-monday-ui-theme">
      <BrowserRouter>
        <MarketTicker />
        <PreviousNavigationProvider>
          <Layout
            user={user}
            onLogout={() =>
              logout({ logoutParams: { returnTo: window.location.origin } })
            }
          >
            <Routing />
          </Layout>
        </PreviousNavigationProvider>
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;
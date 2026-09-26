import UserProtectedRoute from "../context/use-route-context";
import Dashboard from "../pages/dashboard/dashboard";
import Markets from "../pages/markets/markets";
import AssetDetail from "../pages/markets/asset-detail";
import ChartPopup from "../pages/markets/chart-popup";
import { Route, Routes } from "react-router-dom";
import Portfolio from "../pages/portfolio/portfolio";
import Watchlist from "../pages/watchlist/watchlist";

export const Routing = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/markets" element={<Markets />} />
        <Route path="/markets/:symbol/chart" element={<ChartPopup />} />
        <Route path="/markets/:symbol" element={<AssetDetail />} />
        <Route path="/watchlist" element={<UserProtectedRoute><Watchlist /></UserProtectedRoute>} />
        <Route
          path="/settings"
          element={
            <UserProtectedRoute>
              <div className="page-content">
                <h1>Settings</h1>
              </div>
            </UserProtectedRoute>
          }
        />
        <Route
          path="/profile"
          element={
            <UserProtectedRoute>
              <div className="page-content">
                <h1>Profile</h1>
              </div>
            </UserProtectedRoute>
          }
        />
        <Route
          path="/portfolio"
          element={
            <UserProtectedRoute>
                <Portfolio />
            </UserProtectedRoute>
          }
        />
      </Routes>
    </>
  );
};
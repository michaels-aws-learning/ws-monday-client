/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { useAuth0 } from "@auth0/auth0-react";
import { useEffect, type ReactNode } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { history } from "../lib/history";

type Props = {
  children: ReactNode;
  requiresAccount?: boolean;
};

const UserProtectedRoute = ({ children, requiresAccount }: Props) => {
  const { isAuthenticated, isLoading, loginWithRedirect } = useAuth0();

  history.navigate = useNavigate();
  history.location = useLocation();

  useEffect(() => {
    if (!isAuthenticated && !isLoading) {
      loginWithRedirect();
    }
    else if (requiresAccount) {
      // If the route requires an account and the user has none, redirect to dashboard
      history.navigate("/");
    }
  }, [isAuthenticated, isLoading, loginWithRedirect, requiresAccount]);

  return children;
};

export default UserProtectedRoute;
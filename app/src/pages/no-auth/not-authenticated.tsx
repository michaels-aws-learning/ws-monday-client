import { Button } from "../../components/ui/button";
import { useAuth0 } from "@auth0/auth0-react";
import { ChevronRight } from "lucide-react";

export default function NotAuthenticated() {
  const {
    //isLoading, // Loading state, the SDK needs to reach Auth0 on load
    //isAuthenticated,
    error,
    loginWithRedirect: login, // Starts the login flow
  } = useAuth0();


  const signup = () =>
    login({ authorizationParams: { screen_hint: "signup" } });

  return (
    <main className="auth-shell">
      <div className="auth-art">
        <span className="eyebrow">Wall Street Monday / INVEST</span>
        <h1>
          Put your money
          <br />
          <em>in motion.</em>
        </h1>
        <p>A clearer way to build, track, and understand your portfolio.</p>
        <div className="auth-market">
          <span>MARKET OPEN</span>
          <strong>+1.24%</strong>
          <small>S&amp;P 500 today</small>
        </div>
      </div>
      <section className="auth-panel">
        <div className="brand-mark">
          <span>NS</span>
          <strong>northstar</strong>
        </div>
        <div className="auth-copy">
          <span className="eyebrow">YOUR FINANCIAL HQ</span>
          <h2>Welcome back.</h2>
          <p>Sign in to see what your money is doing today.</p>
        </div>
        {error && <div className="error-message">{error.message}</div>}
        <Button className="auth-button" onClick={() => login()}>
          Log in to Northstar <ChevronRight />
        </Button>
        <Button className="auth-signup" variant="outline" onClick={signup}>
          Create an account
        </Button>
        <p className="auth-legal">
          By continuing, you agree to our Terms and Privacy Policy.
        </p>
      </section>
    </main>
  );
}
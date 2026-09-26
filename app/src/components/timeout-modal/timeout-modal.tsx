import { Button } from "../../components/ui/button";
import { startSessionTimer } from "../../lib/sessionTimer";
import { useAuth0 } from "@auth0/auth0-react";
import { useEffect, useState } from "react";
import { useTheme } from "../../theme/theme-provider";
import { cn } from "../../lib/utils";
import { Clock, LogOut } from "lucide-react";
import { Card } from "../../components/ui/card";

export default function SessionTimeoutModal() {
  const { getAccessTokenSilently, logout, isAuthenticated } = useAuth0();
  const { resolvedTheme } = useTheme();
  const [show, setShow] = useState(false);
  const [timeLeft, setTimeLeft] = useState<number>(0);

  useEffect(() => {
    if (!isAuthenticated) {
      // Don’t start session timers until authenticated
      setShow(false);
      return;
    }

    const cleanup = startSessionTimer({
      idleMinutes: 60,
      warningMinutes: 1,
      onTimeoutWarning: () => setShow(true),
      onSessionExpired: () => {
        sessionStorage.clear();
        logout({
          logoutParams: { returnTo: `${window.location.origin}/signed-out` },
        });
      },

      onTick: (ms) => setTimeLeft(ms),
    });

    return cleanup;
  }, [logout, isAuthenticated]);

  const refreshSession = async () => {
    try {
      const t = await getAccessTokenSilently();
      console.log("Refreshed session with token:", t);
      setShow(false);
    } catch (err) {
      console.error("Error refreshing session:", err);
      logout({
        logoutParams: { returnTo: `${window.location.origin}/signed-out` },
      });
    }
  };

  if (!show || !isAuthenticated) return null;

  // Format MM:SS
  const minutes = Math.floor(timeLeft / 60000);
  const seconds = Math.floor((timeLeft % 60000) / 1000);
  const formatted = `${minutes}:${seconds.toString().padStart(2, "0")}`;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/80 backdrop-blur-sm z-50">
      <Card className={cn(
        "rounded-lg shadow-lg p-8 text-center max-w-md border-0 transition-all",
        resolvedTheme === "dark" ? "bg-zinc-900/95" : "bg-white"
      )}>
        <div className="flex items-center justify-center mb-4">
          <div className={cn(
            "p-3 rounded-lg",
            resolvedTheme === "dark" ? "bg-white/5" : "bg-black/5"
          )}>
            <Clock className={cn(
              "h-8 w-8",
              resolvedTheme === "dark" ? "text-white/40" : "text-black/40"
            )} />
          </div>
        </div>
        
        <h2 className={cn(
          "text-xl font-light uppercase tracking-[0.2em] mb-3",
          resolvedTheme === "dark" ? "text-white" : "text-black"
        )}>
          Session Expiring
        </h2>
        
        <p className={cn(
          "text-sm font-light mb-4",
          resolvedTheme === "dark" ? "text-white/60" : "text-black/60"
        )}>
          Your session will expire soon for security reasons.
        </p>
        
        <div className={cn(
          "text-3xl font-light tracking-tight mb-6 p-4 rounded-none",
          resolvedTheme === "dark" ? "bg-white/5 text-white" : "bg-black/5 text-black"
        )}>
          {formatted}
        </div>
        
        <div className="flex flex-col gap-3">
          <Button
            onClick={refreshSession}
            className="font-light tracking-wide w-full hover:bg-zinc-600 hover:scale-[1.02] transition-transform"
          >
            Stay Signed In
          </Button>
          <Button
            onClick={() =>
              logout({
                logoutParams: {
                  returnTo: `${window.location.origin}/signed-out`,
                },
              })
            }
            variant="outline"
            className="font-light tracking-wide w-full"
          >
            <LogOut className="h-4 w-4" />
            Log Out
          </Button>
        </div>
      </Card>
    </div>
  );
}
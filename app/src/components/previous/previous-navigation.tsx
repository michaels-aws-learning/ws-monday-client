import { PreviousNavigationContext } from "../../context/previous-navigation-context";
import { useEffect, useRef, useState, type ReactNode } from "react";
import { useLocation } from "react-router-dom";

import type { Location } from "react-router-dom";

export function PreviousNavigationProvider({ children }: { children: ReactNode }) {
  const location = useLocation();
  const [previousLocation, setPreviousLocation] = useState<Location | null>(null);
  const previousLocationRef = useRef<Location | null>(null);
  const currentLocationRef = useRef(location);

  useEffect(() => {
    if (currentLocationRef.current.key !== location.key) {
      previousLocationRef.current = currentLocationRef.current;
      currentLocationRef.current = location;
      setPreviousLocation(previousLocationRef.current);
    }
  }, [location]);

  return (
    <PreviousNavigationContext.Provider value={{ previousLocation }}>
      {children}
    </PreviousNavigationContext.Provider>
  );
}

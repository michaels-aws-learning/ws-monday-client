import { createContext, useContext } from "react";
import type { Location } from "react-router-dom";

export type PreviousNavigationContextValue = {
  previousLocation: Location | null;
};

export const PreviousNavigationContext = createContext<PreviousNavigationContextValue>({
  previousLocation: null,
});

export function usePreviousNavigation() {
  return useContext(PreviousNavigationContext);
}
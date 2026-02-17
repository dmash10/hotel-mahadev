import { useNavigate } from "react-router-dom";
import { useCallback } from "react";
import { flushSync } from "react-dom";

type NavigateOptions = {
  replace?: boolean;
  state?: unknown;
};

export const useViewTransition = () => {
  const navigate = useNavigate();

  const navigateWithTransition = useCallback(
    (to: string, options?: NavigateOptions) => {
      // View Transitions need a synchronous DOM commit for stable snapshots
      if (document.startViewTransition) {
        document.startViewTransition(() => {
          flushSync(() => {
            navigate(to, options);
          });
        }).finished.then(() => {
          // Scroll to top after transition completes
          window.scrollTo(0, 0);
        });
      } else {
        navigate(to, options);
        // Scroll to top after navigation
        setTimeout(() => window.scrollTo(0, 0), 0);
      }
    },
    [navigate]
  );

  return { navigateWithTransition };
};

// Utility to wrap any callback with view transition
export const withViewTransition = (callback: () => void) => {
  if (document.startViewTransition) {
    document.startViewTransition(() => {
      flushSync(() => {
        callback();
      });
    });
  } else {
    callback();
  }
};

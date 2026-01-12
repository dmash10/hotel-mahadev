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
        });
      } else {
        navigate(to, options);
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

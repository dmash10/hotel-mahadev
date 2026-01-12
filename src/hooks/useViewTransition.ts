import { useNavigate } from "react-router-dom";
import { useCallback } from "react";

type NavigateOptions = {
  replace?: boolean;
  state?: unknown;
};

export const useViewTransition = () => {
  const navigate = useNavigate();

  const navigateWithTransition = useCallback(
    (to: string, options?: NavigateOptions) => {
      // Check if View Transitions API is supported
      if (document.startViewTransition) {
        document.startViewTransition(() => {
          navigate(to, options);
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
    document.startViewTransition(callback);
  } else {
    callback();
  }
};

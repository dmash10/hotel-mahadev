import { useViewTransition } from "@/hooks/useViewTransition";
import { cn } from "@/lib/utils";
import { ReactNode, MouseEvent } from "react";
import { useLocation } from "react-router-dom";

interface TransitionLinkProps {
  to: string;
  children: ReactNode;
  className?: string;
  activeClassName?: string;
  onClick?: () => void;
  viewTransitionName?: string;
}

const TransitionLink = ({
  to,
  children,
  className,
  activeClassName,
  onClick,
  viewTransitionName,
}: TransitionLinkProps) => {
  const { navigateWithTransition } = useViewTransition();
  const location = useLocation();

  const isActive = to === "/" ? location.pathname === "/" : location.pathname.startsWith(to);

  const handleClick = (e: MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    onClick?.();
    navigateWithTransition(to);
  };

  return (
    <a
      href={to}
      onClick={handleClick}
      className={cn(className, isActive && activeClassName)}
      style={viewTransitionName ? { viewTransitionName } : undefined}
    >
      {children}
    </a>
  );
};

export default TransitionLink;

import { useViewTransition } from "@/hooks/useViewTransition";
import { cn } from "@/lib/utils";
import { ReactNode, MouseEvent, CSSProperties } from "react";
import { useLocation } from "react-router-dom";

interface TransitionLinkProps {
  to: string;
  children: ReactNode;
  className?: string;
  activeClassName?: string;
  onClick?: () => void;
  viewTransitionName?: string;
  style?: CSSProperties;
}

const TransitionLink = ({
  to,
  children,
  className,
  activeClassName,
  onClick,
  viewTransitionName,
  style,
}: TransitionLinkProps) => {
  const { navigateWithTransition } = useViewTransition();
  const location = useLocation();

  const isActive = to === "/" ? location.pathname === "/" : location.pathname.startsWith(to);

  const handleClick = (e: MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    onClick?.();
    navigateWithTransition(to);
  };

  const combinedStyle: CSSProperties = {
    ...style,
    ...(viewTransitionName ? { viewTransitionName } : {}),
  };

  return (
    <a
      href={to}
      onClick={handleClick}
      className={cn(className, isActive && activeClassName)}
      style={Object.keys(combinedStyle).length > 0 ? combinedStyle : undefined}
    >
      {children}
    </a>
  );
};

export default TransitionLink;


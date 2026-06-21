import { cn } from "@/lib/utils";
import { forwardRef } from "react";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "outline" | "ghost";
  size?: "sm" | "md" | "lg";
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = "primary", size = "md", children, ...props }, ref) => {
    const base =
      "inline-flex items-center justify-center font-semibold tracking-wide transition-all duration-200 rounded-full focus:outline-none focus-visible:ring-2 focus-visible:ring-deep-blue";

    const variants = {
      primary:
        "bg-deep-blue text-white hover:bg-deep-blue/90 hover:shadow-blue-sm active:scale-[0.98]",
      secondary:
        "bg-electric-blue text-pce-dark hover:brightness-105 active:scale-[0.98]",
      ghost:
        "bg-transparent text-pce-dark border border-pce-border hover:border-deep-blue hover:text-deep-blue",
      outline:
        "border border-deep-blue text-deep-blue hover:bg-deep-blue hover:text-white",
    };

    const sizes = {
      sm: "px-4 py-2 text-[13px] gap-1.5",
      md: "px-6 py-3 text-sm gap-2",
      lg: "px-8 py-4 text-base gap-2",
    };

    return (
      <button
        ref={ref}
        className={cn(base, variants[variant], sizes[size], className)}
        {...props}
      >
        {children}
      </button>
    );
  }
);

Button.displayName = "Button";

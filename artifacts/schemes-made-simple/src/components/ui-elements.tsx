import React from "react";
import { cn } from "@/lib/utils";

export const Button = React.forwardRef<
  HTMLButtonElement,
  React.ButtonHTMLAttributes<HTMLButtonElement> & { variant?: 'primary' | 'secondary' | 'outline' | 'ghost', size?: 'sm' | 'md' | 'lg' }
>(({ className, variant = 'primary', size = 'md', ...props }, ref) => {
  const variants = {
    primary: "bg-gradient-to-b from-primary to-primary/90 text-primary-foreground shadow-lg shadow-primary/20 hover:shadow-xl hover:shadow-primary/30 hover:-translate-y-0.5 border border-primary/20",
    secondary: "bg-gradient-to-b from-secondary to-secondary/90 text-secondary-foreground shadow-lg shadow-secondary/20 hover:shadow-xl hover:shadow-secondary/30 hover:-translate-y-0.5 border border-secondary/20",
    outline: "bg-transparent border-2 border-border text-foreground hover:border-primary hover:bg-primary/5 hover:text-primary",
    ghost: "bg-transparent text-foreground hover:bg-muted hover:text-primary",
  };
  const sizes = {
    sm: "px-4 py-2 text-sm",
    md: "px-6 py-3 text-base",
    lg: "px-8 py-4 text-lg",
  };

  return (
    <button
      ref={ref}
      className={cn(
        "inline-flex items-center justify-center rounded-xl font-semibold transition-all duration-200 ease-out active:translate-y-0 active:shadow-sm disabled:opacity-50 disabled:pointer-events-none disabled:transform-none",
        variants[variant],
        sizes[size],
        className
      )}
      {...props}
    />
  );
});
Button.displayName = "Button";

export const Card = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div
      ref={ref}
      className={cn(
        "bg-card text-card-foreground rounded-2xl border border-border/60 shadow-lg shadow-black/5 overflow-hidden",
        className
      )}
      {...props}
    />
  )
);
Card.displayName = "Card";

export const Input = React.forwardRef<HTMLInputElement, React.InputHTMLAttributes<HTMLInputElement>>(
  ({ className, ...props }, ref) => (
    <input
      ref={ref}
      className={cn(
        "flex w-full rounded-xl border-2 border-border bg-background px-4 py-3 text-sm text-foreground transition-all duration-200",
        "placeholder:text-muted-foreground focus:outline-none focus:border-primary focus:ring-4 focus:ring-primary/10",
        "disabled:cursor-not-allowed disabled:opacity-50",
        className
      )}
      {...props}
    />
  )
);
Input.displayName = "Input";

export const Badge = ({ children, className, variant = 'default' }: { children: React.ReactNode, className?: string, variant?: 'default' | 'success' | 'warning' }) => {
  const variants = {
    default: "bg-primary/10 text-primary border-primary/20",
    success: "bg-secondary/10 text-secondary border-secondary/20",
    warning: "bg-accent/10 text-accent border-accent/20",
  };
  return (
    <span className={cn("inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold border", variants[variant], className)}>
      {children}
    </span>
  );
};

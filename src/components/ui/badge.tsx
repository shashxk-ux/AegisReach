import * as React from "react";
import { cn } from "../../lib/utils";

export interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?:
    | "default"
    | "secondary"
    | "destructive"
    | "outline"
    | "cyan"
    | "emerald"
    | "amber"
    | "purple"
    | "red";
}

const badgeVariants = {
  default: "border-transparent bg-primary text-primary-foreground",
  secondary: "border-transparent bg-secondary text-secondary-foreground",
  destructive: "border-transparent bg-destructive text-destructive-foreground",
  outline: "text-foreground border-border",
  cyan: "border-brand/30 bg-brand/10 text-brand",
  emerald: "border-success/30 bg-success/10 text-success",
  amber: "border-warning/30 bg-warning/10 text-warning",
  purple: "border-steel/30 bg-steel/10 text-steel",
  red: "border-danger/30 bg-danger/10 text-danger",
};

export function Badge({
  className,
  variant = "default",
  ...props
}: BadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1 rounded-md border px-2 py-0.5 text-xs font-medium leading-5 tracking-tight",
        badgeVariants[variant],
        className
      )}
      {...props}
    />
  );
}

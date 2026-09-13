import * as React from "react";
import { cn } from "../../lib/utils";

export interface BadgeProps extends React.HTMLAttributes<HTMLDivElement> {
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
  default:
    "border-transparent bg-primary text-primary-foreground shadow-sm",
  secondary:
    "border-transparent bg-secondary text-secondary-foreground",
  destructive:
    "border-transparent bg-red-600 text-white shadow-sm",
  outline: "text-foreground border-border",
  cyan: "border-cyan-500/30 bg-cyan-50 text-cyan-700 dark:bg-cyan-950/40 dark:text-cyan-300 dark:border-cyan-500/30",
  emerald:
    "border-emerald-500/30 bg-emerald-50 text-emerald-700 dark:bg-emerald-950/40 dark:text-emerald-300 dark:border-emerald-500/30",
  amber:
    "border-amber-500/30 bg-amber-50 text-amber-700 dark:bg-amber-950/40 dark:text-amber-300 dark:border-amber-500/30",
  purple:
    "border-purple-500/30 bg-purple-50 text-purple-700 dark:bg-purple-950/40 dark:text-purple-300 dark:border-purple-500/30",
  red: "border-red-500/30 bg-red-50 text-red-700 dark:bg-red-950/40 dark:text-red-300 dark:border-red-500/30",
};

export function Badge({
  className,
  variant = "default",
  ...props
}: BadgeProps) {
  return (
    <div
      className={cn(
        "inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2",
        badgeVariants[variant],
        className
      )}
      {...props}
    />
  );
}

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
    "border-transparent bg-primary text-primary-foreground",
  secondary:
    "border-transparent bg-secondary text-secondary-foreground",
  destructive:
    "border-transparent bg-red-600 text-white shadow-sm",
  outline: "text-foreground border-border",
  cyan: "border-cyan-500/25 bg-cyan-500/10 text-cyan-700 dark:text-cyan-300",
  emerald:
    "border-emerald-500/25 bg-emerald-500/10 text-emerald-700 dark:text-emerald-300",
  amber:
    "border-amber-500/25 bg-amber-500/10 text-amber-700 dark:text-amber-300",
  purple:
    "border-purple-500/25 bg-purple-500/10 text-purple-700 dark:text-purple-300",
  red: "border-red-500/25 bg-red-500/10 text-red-700 dark:text-red-300",
};

export function Badge({
  className,
  variant = "default",
  ...props
}: BadgeProps) {
  return (
    <div
      className={cn(
        "inline-flex items-center rounded-md border px-2 py-0.5 text-[11px] font-medium leading-4 tracking-tight transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2",
        badgeVariants[variant],
        className
      )}
      {...props}
    />
  );
}

import * as React from "react";
import { cn } from "../../lib/utils";

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?:
    | "default"
    | "destructive"
    | "outline"
    | "secondary"
    | "ghost"
    | "link"
    | "cyan";
  size?: "default" | "sm" | "lg" | "icon";
  asChild?: boolean;
}

const buttonVariants = {
  variant: {
    default:
      "bg-primary text-primary-foreground shadow-sm hover:bg-primary/90 focus-visible:ring-ring",
    destructive:
      "bg-red-600 text-white shadow-sm hover:bg-red-700 focus-visible:ring-red-500",
    outline:
      "border border-input bg-background shadow-sm hover:bg-accent hover:text-accent-foreground focus-visible:ring-ring",
    secondary:
      "bg-secondary text-secondary-foreground shadow-sm hover:bg-secondary/80 focus-visible:ring-ring",
    ghost:
      "hover:bg-accent hover:text-accent-foreground focus-visible:ring-ring",
    link: "text-primary underline-offset-4 hover:underline focus-visible:ring-ring",
    cyan: "bg-gradient-to-r from-cyan-500 to-cyan-400 hover:from-cyan-400 hover:to-cyan-300 text-slate-950 font-bold shadow-md shadow-cyan-500/25 active:scale-[0.98] border border-cyan-300/40",
  },
  size: {
    default: "h-9 px-4 py-2 text-sm",
    sm: "h-8 rounded-md px-3 text-xs",
    lg: "h-10 rounded-md px-6 text-sm",
    icon: "h-9 w-9 p-0 inline-flex items-center justify-center",
  },
};

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      className,
      variant = "default",
      size = "default",
      type = "button",
      ...props
    },
    ref
  ) => {
    return (
      <button
        ref={ref}
        type={type}
        className={cn(
          "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md font-medium transition-all duration-150 outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 select-none cursor-pointer",
          buttonVariants.variant[variant],
          buttonVariants.size[size],
          className
        )}
        {...props}
      />
    );
  }
);
Button.displayName = "Button";

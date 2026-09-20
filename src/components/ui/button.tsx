import * as React from "react";
import { motion, type HTMLMotionProps } from "motion/react";
import { cn } from "../../lib/utils";
import { springSnappy } from "./springs";

export interface ButtonProps extends Omit<HTMLMotionProps<"button">, "ref"> {
  variant?:
    | "default"
    | "destructive"
    | "outline"
    | "secondary"
    | "ghost"
    | "link"
    | "cyan";
  size?: "default" | "sm" | "lg" | "icon";
}

const buttonVariants = {
  variant: {
    default:
      "bg-primary text-primary-foreground hover:bg-primary/90",
    destructive:
      "bg-destructive text-destructive-foreground hover:bg-destructive/90",
    outline:
      "border border-border bg-card text-card-foreground hover:bg-accent hover:text-accent-foreground hover:border-input",
    secondary:
      "bg-secondary text-secondary-foreground hover:bg-secondary/70",
    ghost: "hover:bg-accent hover:text-accent-foreground",
    link: "text-brand underline underline-offset-4 hover:no-underline",
    cyan: "bg-brand text-brand-foreground font-semibold hover:bg-brand/90 shadow-[inset_0_1px_0_rgba(255,255,255,0.2)]",
  },
  size: {
    default: "h-10 px-4 py-2 text-sm",
    sm: "h-9 px-3.5 text-sm",
    lg: "h-12 px-6 text-base",
    icon: "h-10 w-10 p-0",
  },
};

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      className,
      variant = "default",
      size = "default",
      type = "button",
      disabled,
      ...props
    },
    ref
  ) => {
    return (
      <motion.button
        ref={ref}
        type={type}
        disabled={disabled}
        whileHover={disabled ? undefined : { y: -1 }}
        whileTap={disabled ? undefined : { scale: 0.96, y: 0 }}
        transition={springSnappy}
        className={cn(
          "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-xl font-medium transition-colors duration-200 disabled:pointer-events-none disabled:opacity-50 select-none",
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

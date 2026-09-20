import * as React from "react";
import { ChevronDown } from "lucide-react";
import { cn } from "../../lib/utils";
import { AutoHeight } from "./motion";

export type InputProps = React.InputHTMLAttributes<HTMLInputElement>;

/* border-input keeps the field boundary at >=3:1 against the surface (WCAG 1.4.11) */
export const fieldClasses =
  "w-full rounded-xl border border-input bg-card px-3.5 text-sm text-foreground shadow-none transition-colors placeholder:text-muted-foreground hover:border-foreground/60 disabled:cursor-not-allowed disabled:opacity-50 aria-[invalid=true]:border-danger";

export const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, ...props }, ref) => {
    return (
      <input
        type={type}
        className={cn(fieldClasses, "flex h-10 py-2 file:border-0 file:bg-transparent file:text-sm file:font-medium", className)}
        ref={ref}
        {...props}
      />
    );
  }
);
Input.displayName = "Input";

export const Select = React.forwardRef<
  HTMLSelectElement,
  React.SelectHTMLAttributes<HTMLSelectElement>
>(({ className, children, ...props }, ref) => (
  <div className="relative">
    <select
      ref={ref}
      className={cn(fieldClasses, "h-10 cursor-pointer appearance-none py-2 pl-3.5 pr-11", className)}
      {...props}
    >
      {children}
    </select>
    <ChevronDown
      className="pointer-events-none absolute right-4 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground"
      aria-hidden="true"
    />
  </div>
));
Select.displayName = "Select";

export const Textarea = React.forwardRef<
  HTMLTextAreaElement,
  React.TextareaHTMLAttributes<HTMLTextAreaElement>
>(({ className, ...props }, ref) => (
  <textarea ref={ref} className={cn(fieldClasses, "py-2.5 leading-relaxed", className)} {...props} />
));
Textarea.displayName = "Textarea";

interface FieldProps {
  label: React.ReactNode;
  htmlFor: string;
  helper?: React.ReactNode;
  error?: React.ReactNode;
  className?: string;
  children: React.ReactNode;
}

/* Label above the control, helper and error below, wired with ids (WCAG 1.3.1 / 3.3.1 / 3.3.2) */
export const Field: React.FC<FieldProps> = ({ label, htmlFor, helper, error, className, children }) => (
  <div className={cn("flex flex-col", className)}>
    <label htmlFor={htmlFor} className="mb-2 text-sm font-medium text-foreground">
      {label}
    </label>
    {children}
    <AutoHeight>
      {helper && !error && (
        <p id={`${htmlFor}-help`} className="mt-2 text-xs text-muted-foreground">
          {helper}
        </p>
      )}
      {error && (
        <p id={`${htmlFor}-error`} role="alert" className="mt-2 text-xs font-medium text-danger">
          {error}
        </p>
      )}
    </AutoHeight>
  </div>
);

import * as React from "react";
import { cn } from "../../lib/utils";

interface PageHeaderProps {
  /** Small step/section label above the title, e.g. "Step 1 of 6" */
  eyebrow?: React.ReactNode;
  title: string;
  description?: React.ReactNode;
  actions?: React.ReactNode;
  className?: string;
  children?: React.ReactNode;
}

/** One consistent, single-h1 page opener: where am I, what is this, what can I do. */
export const PageHeader: React.FC<PageHeaderProps> = ({
  eyebrow,
  title,
  description,
  actions,
  className,
  children,
}) => (
  <header className={cn("space-y-6", className)}>
    <div className="flex flex-col gap-5 md:flex-row md:items-end md:justify-between">
      <div className="max-w-2xl space-y-2">
        {eyebrow && (
          <p className="text-xs font-medium uppercase tracking-[0.14em] text-muted-foreground">
            {eyebrow}
          </p>
        )}
        <h1
          tabIndex={-1}
          className="text-2xl font-semibold tracking-tight text-foreground md:text-3xl focus-visible:outline-none"
        >
          {title}
        </h1>
        {description && (
          <p className="max-w-[65ch] text-sm leading-relaxed text-muted-foreground md:text-base">
            {description}
          </p>
        )}
      </div>
      {actions && <div className="flex flex-wrap items-center gap-2">{actions}</div>}
    </div>
    {children}
  </header>
);

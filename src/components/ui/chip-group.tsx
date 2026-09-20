import * as React from "react";
import { Check, type LucideIcon } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { Badge } from "./badge";
import { Button } from "./button";
import { AnimatedNumber } from "./motion";
import { spring, springSnappy } from "./springs";

interface ChipProps {
  label: string;
  selected: boolean;
  onToggle: () => void;
}

/**
 * One selectable option. The native checkbox stays the source of truth (keyboard, screen readers);
 * Motion only animates the visuals: a fill that blooms from the centre, a check that springs in
 * while the chip widens to make room, a lift on hover and a squish on press.
 */
const Chip: React.FC<ChipProps> = ({ label, selected, onToggle }) => (
  <label className="cursor-pointer">
    <input type="checkbox" checked={selected} onChange={onToggle} className="peer sr-only" />
    <motion.span
      whileHover={{ y: -1 }}
      whileTap={{ scale: 0.94 }}
      transition={springSnappy}
      className={`relative inline-flex min-h-10 items-center overflow-hidden rounded-full border px-4 text-sm font-medium transition-colors duration-300 peer-focus-visible:outline peer-focus-visible:outline-[3px] peer-focus-visible:outline-offset-2 peer-focus-visible:outline-ring ${
        selected
          ? "border-brand text-brand-foreground"
          : "border-border bg-card text-foreground hover:border-input hover:bg-muted"
      }`}
    >
      <AnimatePresence initial={false}>
        {selected && (
          <motion.span
            key="fill"
            aria-hidden="true"
            className="absolute inset-0 rounded-full bg-brand"
            initial={{ scale: 0.35, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.85, opacity: 0, transition: { duration: 0.16 } }}
            transition={{ type: "spring", stiffness: 260, damping: 26 }}
          />
        )}
      </AnimatePresence>

      <AnimatePresence initial={false}>
        {selected && (
          <motion.span
            key="check"
            aria-hidden="true"
            className="relative inline-flex overflow-hidden"
            initial={{ width: 0, marginRight: 0, opacity: 0, scale: 0.3 }}
            animate={{ width: 16, marginRight: 6, opacity: 1, scale: 1 }}
            exit={{ width: 0, marginRight: 0, opacity: 0, scale: 0.3, transition: { duration: 0.14 } }}
            transition={spring}
          >
            <Check className="h-4 w-4 shrink-0" />
          </motion.span>
        )}
      </AnimatePresence>

      <span className="relative">{label}</span>
    </motion.span>
  </label>
);

export interface ChipGroupProps {
  className?: string;
  id: string;
  title: string;
  icon: LucideIcon;
  iconClass: string;
  description?: string;
  items: string[];
  selected: string[];
  onToggle: (item: string) => void;
  onSelectAll?: () => void;
  onClear?: () => void;
  searching: boolean;
}

/** A multi-select rendered as native checkboxes: one tab stop per option, Space toggles, state is announced. */
export const ChipGroup: React.FC<ChipGroupProps> = ({
  className,
  id,
  title,
  icon: Icon,
  iconClass,
  description,
  items,
  selected,
  onToggle,
  onSelectAll,
  onClear,
  searching,
}) => (
  <section aria-labelledby={`${id}-title`} className={className ?? "space-y-4 p-6 md:p-7"}>
    <div className="flex flex-wrap items-center justify-between gap-x-4 gap-y-2">
      <h2 id={`${id}-title`} className="flex items-center gap-2.5 text-base font-semibold text-foreground">
        <Icon className={`h-5 w-5 ${iconClass}`} aria-hidden="true" />
        {title}
      </h2>
      <div className="flex items-center gap-1.5">
        <Badge variant="secondary" className="gap-1 font-mono">
          <AnimatedNumber value={selected.length} /> selected
        </Badge>
        {onSelectAll && (
          <Button variant="ghost" size="sm" onClick={onSelectAll} aria-label={`Select all: ${title}`} className="text-brand">
            Select all
          </Button>
        )}
        {onClear && (
          <Button variant="ghost" size="sm" onClick={onClear} aria-label={`Clear: ${title}`} className="text-muted-foreground">
            Clear
          </Button>
        )}
      </div>
    </div>
    {description && <p className="text-sm text-muted-foreground">{description}</p>}
    {items.length === 0 ? (
      <p className="text-sm text-muted-foreground">
        {searching ? "No options here match your filter." : "No options available."}
      </p>
    ) : (
      <div role="group" aria-labelledby={`${id}-title`} className="flex flex-wrap gap-2">
        {items.map(item => (
          <Chip key={item} label={item} selected={selected.includes(item)} onToggle={() => onToggle(item)} />
        ))}
      </div>
    )}
  </section>
);

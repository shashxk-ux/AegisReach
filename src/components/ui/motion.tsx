import * as React from "react";
import { animate, stagger } from "motion";
import { AnimatePresence, motion, useMotionValue, useReducedMotion, useTransform } from "motion/react";
import { springSoft } from "./springs";

/**
 * Cascades the first-level sections of a page in on mount. Uses useLayoutEffect so the
 * hidden start state is applied before first paint (no flash), and animate() clears its
 * transform when finished so sticky / fixed descendants are never left in a new stacking context.
 */
export const PageTransition: React.FC<{ className?: string; children: React.ReactNode }> = ({
  className,
  children,
}) => {
  const ref = React.useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();

  React.useLayoutEffect(() => {
    const root = ref.current?.firstElementChild;
    if (!root || reduce) return;
    const targets = Array.from(root.children) as HTMLElement[];
    if (targets.length === 0) return;
    const controls = animate(
      targets,
      { opacity: [0, 1], y: [16, 0] },
      { type: "spring", stiffness: 240, damping: 26, delay: stagger(0.055) }
    );
    return () => controls.stop();
  }, [reduce]);

  return (
    <div ref={ref} className={className}>
      {children}
    </div>
  );
};

interface AnimatedNumberProps {
  value: number;
  decimals?: number;
  className?: string;
}

/**
 * Counts to its value with a spring. The visible digits are aria-hidden and a static
 * sr-only copy carries the real value, so assistive tech never hears the tween.
 */
export const AnimatedNumber: React.FC<AnimatedNumberProps> = ({ value, decimals = 0, className }) => {
  const reduce = useReducedMotion();
  const motionValue = useMotionValue(value);
  const text = useTransform(motionValue, latest =>
    latest.toLocaleString(undefined, { minimumFractionDigits: decimals, maximumFractionDigits: decimals })
  );

  React.useEffect(() => {
    if (reduce) {
      motionValue.set(value);
      return;
    }
    const controls = animate(motionValue, value, { type: "spring", stiffness: 110, damping: 22 });
    return () => controls.stop();
  }, [value, reduce, motionValue]);

  return (
    <>
      <motion.span aria-hidden="true" className={className}>
        {text}
      </motion.span>
      <span className="sr-only">
        {value.toLocaleString(undefined, { minimumFractionDigits: decimals, maximumFractionDigits: decimals })}
      </span>
    </>
  );
};

interface BarProps {
  percent: number;
  className?: string;
  delay?: number;
}

/** A progress fill that springs to its width. Width, not scale, so rounded ends stay round. */
export const Bar: React.FC<BarProps> = ({ percent, className, delay = 0 }) => (
  <motion.div
    className={className}
    initial={{ width: 0 }}
    animate={{ width: `${Math.max(0, Math.min(100, percent))}%` }}
    transition={{ ...springSoft, delay }}
  />
);

/**
 * Animates its own height whenever its content grows or shrinks (text that wraps to another line,
 * a message that appears, a list that gains a row). Wrap the content, not the spacing around it.
 * Overflow is only clipped while the height is moving, so focus rings and shadows are never cut off.
 */
export const AutoHeight: React.FC<{ className?: string; children: React.ReactNode }> = ({ className, children }) => {
  const outer = React.useRef<HTMLDivElement>(null);
  const inner = React.useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();

  React.useLayoutEffect(() => {
    const outerEl = outer.current;
    const innerEl = inner.current;
    if (!outerEl || !innerEl) return;
    let first = true;
    let controls: ReturnType<typeof animate> | undefined;

    const observer = new ResizeObserver(() => {
      const next = innerEl.getBoundingClientRect().height;
      if (first || reduce) {
        first = false;
        outerEl.style.height = `${next}px`;
        return;
      }
      controls?.stop();
      outerEl.style.overflow = "hidden";
      controls = animate(outerEl, { height: next }, { type: "spring", stiffness: 260, damping: 30 });
      controls.finished.then(
        () => {
          outerEl.style.overflow = "";
        },
        () => undefined
      );
    });
    observer.observe(innerEl);
    return () => {
      observer.disconnect();
      controls?.stop();
    };
  }, [reduce]);

  return (
    <div ref={outer} className={className}>
      <div ref={inner}>{children}</div>
    </div>
  );
};

/** Content that fades and rises in whenever swapKey changes (tab panels, before/after states). */
export const FadeSwap: React.FC<{ swapKey: React.Key; className?: string; children: React.ReactNode }> = ({
  swapKey,
  className,
  children,
}) => (
  <motion.div
    key={swapKey}
    initial={{ opacity: 0, y: 8 }}
    animate={{ opacity: 1, y: 0 }}
    transition={springSoft}
    className={className}
  >
    {children}
  </motion.div>
);

/** A disclosure body that eases open and shut instead of snapping. */
export const Collapse: React.FC<{ open: boolean; className?: string; children: React.ReactNode }> = ({
  open,
  className,
  children,
}) => (
  <AnimatePresence initial={false}>
    {open && (
      <motion.div
        key="collapse"
        initial={{ height: 0, opacity: 0 }}
        animate={{ height: "auto", opacity: 1 }}
        exit={{ height: 0, opacity: 0 }}
        transition={springSoft}
        style={{ overflow: "hidden" }}
        className={className}
      >
        {children}
      </motion.div>
    )}
  </AnimatePresence>
);

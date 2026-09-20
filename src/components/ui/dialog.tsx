import * as React from "react";
import { animate } from "motion";
import { useReducedMotion } from "motion/react";
import { cn } from "../../lib/utils";

interface DialogProps {
  open: boolean;
  onClose: () => void;
  /** Accessible name announced when the dialog opens */
  label: string;
  variant?: "drawer" | "modal" | "palette";
  className?: string;
  children: React.ReactNode;
}

const variantClasses = {
  drawer:
    "fixed inset-y-0 right-0 left-auto m-0 h-dvh w-full max-w-2xl border-l border-border bg-card text-card-foreground shadow-diffuse",
  modal:
    "m-auto w-[min(94vw,56rem)] max-h-[90dvh] overflow-y-auto rounded-3xl border border-border bg-card text-card-foreground shadow-diffuse",
  palette:
    "mx-auto mt-[12vh] mb-auto w-[min(94vw,40rem)] overflow-hidden rounded-3xl border border-border bg-popover text-popover-foreground shadow-diffuse",
};

/**
 * Native <dialog> + showModal(): the browser supplies the focus trap, Escape to
 * close, an inert background and focus return to the trigger (WCAG 2.1.2, 2.4.3, 4.1.2).
 * Motion adds the spring enter and a quick exit; content stays mounted until the exit ends.
 */
export const Dialog: React.FC<DialogProps> = ({
  open,
  onClose,
  label,
  variant = "modal",
  className,
  children,
}) => {
  const ref = React.useRef<HTMLDialogElement>(null);
  const reduce = useReducedMotion();
  const [rendered, setRendered] = React.useState(open);

  if (open && !rendered) setRendered(true);

  const fromLeft = Boolean(className?.includes("dialog-drawer-left"));
  const edge = fromLeft ? "-100%" : "100%";

  React.useEffect(() => {
    const dialog = ref.current;
    if (!dialog) return;

    if (open) {
      if (!dialog.open) dialog.showModal();
      dialog.classList.remove("closing");
      if (reduce) return;
      const target = variant === "drawer" ? { x: [edge, "0%"] } : { opacity: [0, 1], y: [14, 0], scale: [0.97, 1] };
      const controls = animate(dialog, target, { type: "spring", stiffness: variant === "drawer" ? 300 : 380, damping: 34 });
      return () => controls.stop();
    }

    if (dialog.open) {
      dialog.classList.add("closing");
      const finish = () => {
        if (dialog.open) dialog.close();
        setRendered(false);
      };
      if (reduce) {
        finish();
        return;
      }
      const exit = variant === "drawer" ? { x: edge } : { opacity: 0, y: 8, scale: 0.98 };
      const controls = animate(dialog, exit, { duration: 0.22, ease: [0.4, 0, 1, 1] });
      // Closing must never depend on the animation completing (a backgrounded tab pauses it)
      const fallback = window.setTimeout(finish, 350);
      controls.finished.then(
        () => {
          window.clearTimeout(fallback);
          finish();
        },
        () => undefined
      );
      return () => {
        window.clearTimeout(fallback);
        controls.stop();
      };
    }
  }, [open, reduce, variant, edge]);

  return (
    <dialog
      ref={ref}
      aria-label={label}
      onCancel={event => {
        event.preventDefault();
        onClose();
      }}
      onClose={onClose}
      onClick={event => {
        if (event.target === ref.current) onClose();
      }}
      className={cn(variantClasses[variant], className)}
    >
      {rendered ? children : null}
    </dialog>
  );
};

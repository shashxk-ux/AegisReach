import React, { useEffect, useRef, useState } from 'react';
import { useApp } from '../../context/AppContext';
import { CheckCircle2, AlertTriangle, Info, X } from 'lucide-react';
import { AnimatePresence, motion } from 'motion/react';
import { springSnappy } from './springs';

const TOAST_DURATION_MS = 10000;

const tones = {
  success: { icon: CheckCircle2, color: 'text-success', bar: 'bg-success', border: 'border-success/40', label: 'Success' },
  warning: { icon: AlertTriangle, color: 'text-warning', bar: 'bg-warning', border: 'border-warning/40', label: 'Warning' },
  info: { icon: Info, color: 'text-brand', bar: 'bg-brand', border: 'border-brand/40', label: 'Info' },
} as const;

interface ToastItemProps {
  toast: { id: string; type: keyof typeof tones; title: string; description: string };
  onDismiss: (id: string) => void;
}

const ToastItem: React.FC<ToastItemProps> = ({ toast, onDismiss }) => {
  const tone = tones[toast.type];
  const Icon = tone.icon;
  const [paused, setPaused] = useState(false);

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 28, scale: 0.94 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, x: 56, scale: 0.96, transition: { duration: 0.18 } }}
      transition={springSnappy}
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocus={() => setPaused(true)}
      onBlur={() => setPaused(false)}
      className={`pointer-events-auto relative flex items-start gap-3 overflow-hidden rounded-2xl border bg-popover p-4 pb-5 text-popover-foreground shadow-diffuse ${tone.border}`}
    >
      <Icon className={`mt-0.5 h-5 w-5 shrink-0 ${tone.color}`} aria-hidden="true" />
      <div className="min-w-0 flex-1">
        <p className="text-sm font-semibold text-foreground">{toast.title}</p>
        <p className="mt-0.5 text-sm leading-relaxed text-muted-foreground">{toast.description}</p>
      </div>
      <button
        type="button"
        onClick={() => onDismiss(toast.id)}
        aria-label={`Dismiss notification: ${toast.title}`}
        className="-mr-1 -mt-1 flex h-8 w-8 shrink-0 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
      >
        <X className="h-4 w-4" aria-hidden="true" />
      </button>

      {/* Countdown: when this bar empties the toast leaves. Hover or keyboard focus pauses it. */}
      <span aria-hidden="true" className="absolute inset-x-0 bottom-0 h-1 bg-muted">
        <span
          className={`toast-bar block h-full w-full ${tone.bar}`}
          style={
            {
              '--toast-ms': `${TOAST_DURATION_MS}ms`,
              animationDuration: `${TOAST_DURATION_MS}ms`,
              animationPlayState: paused ? 'paused' : 'running',
            } as React.CSSProperties
          }
          onAnimationEnd={() => onDismiss(toast.id)}
        />
      </span>
    </motion.div>
  );
};

export const ToastContainer: React.FC = () => {
  const { toasts, removeToast } = useApp();
  const popoverRef = useRef<HTMLDivElement>(null);

  // A popover lives in the browser top layer, so toasts still appear above an open modal dialog
  const countRef = useRef(toasts.length);
  useEffect(() => {
    countRef.current = toasts.length;
  }, [toasts.length]);

  useEffect(() => {
    const el = popoverRef.current as (HTMLDivElement & { showPopover?: () => void; hidePopover?: () => void }) | null;
    if (!el?.showPopover || toasts.length === 0) return;
    try {
      el.hidePopover?.();
      el.showPopover();
    } catch {
      /* popover unsupported: fall back to normal stacking */
    }
  }, [toasts.length]);

  // Hide the popover only after the last toast has finished its exit animation
  const hideWhenEmpty = () => {
    if (countRef.current > 0) return;
    const el = popoverRef.current as (HTMLDivElement & { hidePopover?: () => void }) | null;
    try {
      el?.hidePopover?.();
    } catch {
      /* already hidden */
    }
  };

  const latest = toasts[toasts.length - 1];

  return (
    <>
      {/* Always-mounted live region so every announcement is reliably read (WCAG 4.1.3) */}
      <div role="status" aria-live="polite" aria-atomic="true" className="sr-only-live">
        {latest ? `${tones[latest.type].label}: ${latest.title}. ${latest.description}` : ''}
      </div>

      <div
        ref={popoverRef}
        {...({ popover: 'manual' } as Record<string, string>)}
        aria-label="Notifications"
        role="region"
        className="pointer-events-none fixed inset-auto bottom-4 right-4 m-0 flex w-[calc(100%-2rem)] flex-col gap-2.5 overflow-visible border-0 bg-transparent p-0 sm:w-full sm:max-w-md"
      >
        <AnimatePresence initial={false} mode="popLayout" onExitComplete={hideWhenEmpty}>
        {toasts.map(toast => (
          <ToastItem key={toast.id} toast={toast} onDismiss={removeToast} />
        ))}
        </AnimatePresence>
      </div>
    </>
  );
};

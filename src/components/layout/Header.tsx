import React, { useLayoutEffect, useRef } from 'react';
import { useApp } from '../../context/AppContext';
import { Button } from '../ui';
import { AnimatedNumber } from '../ui/motion';
import { spring } from '../ui/springs';
import { motion } from 'motion/react';
import { Coins, Eye, Zap, Mail, Sun, Moon, Menu, Search } from 'lucide-react';

const LogoMark: React.FC = () => (
  <svg viewBox="0 0 32 32" className="h-8 w-8 shrink-0" aria-hidden="true">
    <path
      d="M16 3.2 4.6 7.4v8.1c0 6.3 4.5 11.2 11.4 13.3 6.9-2.1 11.4-7 11.4-13.3V7.4L16 3.2Z"
      className="fill-foreground"
    />
    <path
      d="M16 8.4v15.2M9.6 14.2h12.8"
      className="stroke-background"
      strokeWidth="1.8"
      strokeLinecap="round"
      fill="none"
    />
    <circle cx="16" cy="14.2" r="3.1" className="fill-brand stroke-background" strokeWidth="1.8" />
  </svg>
);

interface HeaderProps {
  onOpenNav: () => void;
  onOpenPalette: () => void;
}

export const Header: React.FC<HeaderProps> = ({ onOpenNav, onOpenPalette }) => {
  const { mode, setMode, credits, showToast, theme, toggleTheme } = useApp();
  const headerRef = useRef<HTMLElement>(null);

  // Publish the real header height so sticky elements below it never overlap, however it wraps
  useLayoutEffect(() => {
    const el = headerRef.current;
    if (!el) return;
    const publish = () => document.documentElement.style.setProperty('--header-h', `${el.offsetHeight}px`);
    publish();
    const observer = new ResizeObserver(publish);
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  const handleToggleMode = (newMode: 'observer' | 'autopilot') => {
    if (mode === newMode) return;
    setMode(newMode);
    if (newMode === 'observer') {
      showToast(
        'info',
        'Observer Mode Activated',
        'Outreach generated as Gmail drafts only. Human review required before sending.'
      );
    } else {
      showToast(
        'warning',
        'Autopilot Mode Activated',
        'Outreach will be scheduled and dispatched automatically based on persona triggers & warmup pacing.'
      );
    }
  };

  const handleAddCredits = () => {
    showToast('success', 'Credits Replenished', '+500 Apollo/ZoomInfo prospecting credits added to balance.');
  };

  const isObserver = mode === 'observer';
  const nextTheme = theme === 'dark' ? 'light' : 'dark';

  return (
    <header
      ref={headerRef}
      className="sticky top-0 z-40 flex flex-wrap items-center gap-x-3 gap-y-2 border-b border-border bg-background/80 px-4 py-2.5 backdrop-blur-xl md:px-6"
    >
      <Button
        variant="ghost"
        size="icon"
        onClick={onOpenNav}
        aria-label="Open navigation"
        aria-haspopup="dialog"
        className="lg:hidden"
      >
        <Menu className="h-5 w-5" aria-hidden="true" />
      </Button>

      <div className="flex min-w-0 items-center gap-3">
        <LogoMark />
        <div className="min-w-0 leading-tight">
          <p className="text-base font-semibold tracking-tight text-foreground">
            Aegis<span className="text-brand">Reach</span>
          </p>
          <p className="hidden items-center gap-1.5 text-xs text-muted-foreground sm:flex">
            <span className="relative flex h-1.5 w-1.5" aria-hidden="true">
              <span className="absolute inset-0 animate-pulse rounded-full bg-success" />
              <span className="relative h-1.5 w-1.5 rounded-full bg-success" />
            </span>
            MISP &amp; CISA KEV feeds live
          </p>
        </div>
      </div>

      <div
        role="group"
        aria-label="Dispatch mode"
        className="relative order-last grid w-full grid-cols-2 items-center rounded-2xl border border-border bg-muted p-1 md:order-none md:mx-auto md:w-auto"
      >
        <button
          type="button"
          onClick={() => handleToggleMode('observer')}
          aria-pressed={isObserver}
          className={`relative flex min-h-9 items-center justify-center gap-2 rounded-xl px-4 py-1.5 text-sm font-medium transition-colors duration-200 ${
            isObserver ? 'text-foreground' : 'text-muted-foreground hover:text-foreground'
          }`}
        >
          {isObserver && (
            <motion.span
              layoutId="mode-pill"
              aria-hidden="true"
              transition={spring}
              className="absolute inset-0 rounded-xl border border-brand/40 bg-card shadow-diffuse"
            />
          )}
          <Eye className={`relative h-4 w-4 ${isObserver ? 'text-brand' : ''}`} aria-hidden="true" />
          <span className="relative">Observer</span>
          <span className="relative hidden font-mono text-xs text-muted-foreground xl:inline">Drafts only</span>
        </button>
        <button
          type="button"
          onClick={() => handleToggleMode('autopilot')}
          aria-pressed={!isObserver}
          className={`relative flex min-h-9 items-center justify-center gap-2 rounded-xl px-4 py-1.5 text-sm font-medium transition-colors duration-200 ${
            !isObserver ? 'text-foreground' : 'text-muted-foreground hover:text-foreground'
          }`}
        >
          {!isObserver && (
            <motion.span
              layoutId="mode-pill"
              aria-hidden="true"
              transition={spring}
              className="absolute inset-0 rounded-xl border border-warning/40 bg-card shadow-diffuse"
            />
          )}
          <Zap className={`relative h-4 w-4 ${!isObserver ? 'text-warning' : ''}`} aria-hidden="true" />
          <span className="relative">Autopilot</span>
          <span className="relative hidden font-mono text-xs text-muted-foreground xl:inline">Auto-send</span>
        </button>
      </div>

      <div className="ml-auto flex items-center gap-2">
        <Button
          variant="outline"
          size="sm"
          onClick={onOpenPalette}
          aria-label="Open command palette"
          aria-haspopup="dialog"
          aria-keyshortcuts="Control+K Meta+K"
          className="gap-2 text-muted-foreground"
        >
          <Search className="h-4 w-4" aria-hidden="true" />
          <span className="hidden lg:inline">Jump to</span>
          <kbd className="hidden rounded border border-border bg-muted px-1.5 font-mono text-xs lg:inline">Ctrl K</kbd>
        </Button>

        <Button variant="outline" size="sm" onClick={handleAddCredits} className="gap-2 font-normal">
          <Coins className="h-4 w-4 text-muted-foreground" aria-hidden="true" />
          <AnimatedNumber value={credits} className="font-mono font-semibold text-foreground" />
          <span className="hidden text-muted-foreground xl:inline">credits</span>
          <span className="sr-only"> credits, add 500</span>
        </Button>

        <div className="hidden h-9 items-center gap-2 rounded-xl border border-border bg-card px-3 text-sm xl:flex">
          <Mail className="h-4 w-4 text-muted-foreground" aria-hidden="true" />
          <span className="text-foreground">shashank@aegisreach.ai</span>
          <span className="flex items-center gap-1 font-mono text-xs text-success">
            <span className="h-1.5 w-1.5 rounded-full bg-success" aria-hidden="true" />
            OAuth
          </span>
        </div>

        <Button
          variant="outline"
          size="icon"
          onClick={toggleTheme}
          aria-label={`Switch to ${nextTheme} mode`}
          className="h-9 w-9"
        >
          {theme === 'dark' ? (
            <Sun className="h-4 w-4" aria-hidden="true" />
          ) : (
            <Moon className="h-4 w-4" aria-hidden="true" />
          )}
        </Button>
      </div>

    </header>
  );
};

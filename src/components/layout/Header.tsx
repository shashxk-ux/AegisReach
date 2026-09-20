import React from 'react';
import { useApp } from '../../context/AppContext';
import { Button } from '../ui';
import { Coins, Eye, Zap, Mail, Sun, Moon } from 'lucide-react';

const LogoMark: React.FC = () => (
  <svg viewBox="0 0 32 32" className="w-8 h-8 shrink-0" aria-hidden="true">
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
    <circle cx="16" cy="14.2" r="3.1" className="fill-cyan-400 stroke-background" strokeWidth="1.8" />
  </svg>
);

export const Header: React.FC = () => {
  const { mode, setMode, credits, showToast, theme, toggleTheme } = useApp();

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

  return (
    <header className="h-16 border-b border-border bg-background/80 backdrop-blur-xl px-4 md:px-6 grid grid-cols-[1fr_auto_1fr] items-center gap-4 sticky top-0 z-40 transition-colors duration-200">
      {/* Left: brand */}
      <div className="flex items-center gap-3 min-w-0">
        <LogoMark />
        <div className="min-w-0 leading-tight">
          <h1 className="text-[15px] font-semibold tracking-tight text-foreground">
            Aegis<span className="text-cyan-600 dark:text-cyan-400">Reach</span>
          </h1>
          <div className="flex items-center gap-1.5 text-[11px] text-muted-foreground">
            <span className="relative flex w-1.5 h-1.5">
              <span className="absolute inset-0 rounded-full bg-emerald-500 animate-pulse" />
              <span className="relative w-1.5 h-1.5 rounded-full bg-emerald-500" />
            </span>
            <span className="truncate hidden sm:inline">MISP &amp; CISA KEV feeds live</span>
          </div>
        </div>
      </div>

      {/* Center: dispatch mode, sliding segmented control */}
      <nav
        aria-label="Dispatch Mode"
        className="relative grid grid-cols-2 items-center rounded-xl border border-border bg-muted p-1"
      >
        <span
          aria-hidden="true"
          className={`absolute inset-y-1 left-1 w-[calc(50%-0.25rem)] rounded-lg border bg-card shadow-diffuse transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] ${
            isObserver ? 'translate-x-0 border-cyan-500/30' : 'translate-x-full border-amber-500/30'
          }`}
        />
        <button
          type="button"
          onClick={() => handleToggleMode('observer')}
          aria-pressed={isObserver}
          className={`relative z-10 flex items-center justify-center gap-2 px-3.5 py-1.5 rounded-lg text-xs font-medium transition-colors duration-200 cursor-pointer ${
            isObserver ? 'text-foreground' : 'text-muted-foreground hover:text-foreground'
          }`}
        >
          <Eye className={`w-3.5 h-3.5 ${isObserver ? 'text-cyan-600 dark:text-cyan-400' : ''}`} />
          <span>Observer Mode</span>
          <span className="hidden xl:inline font-mono text-[10px] text-muted-foreground">Drafts only</span>
        </button>

        <button
          type="button"
          onClick={() => handleToggleMode('autopilot')}
          aria-pressed={!isObserver}
          className={`relative z-10 flex items-center justify-center gap-2 px-3.5 py-1.5 rounded-lg text-xs font-medium transition-colors duration-200 cursor-pointer ${
            !isObserver ? 'text-foreground' : 'text-muted-foreground hover:text-foreground'
          }`}
        >
          <Zap className={`w-3.5 h-3.5 ${!isObserver ? 'text-amber-600 dark:text-amber-400' : ''}`} />
          <span>Autopilot</span>
          <span className="hidden xl:inline font-mono text-[10px] text-muted-foreground">Auto-send</span>
        </button>
      </nav>

      {/* Right: credits, mailbox, theme */}
      <div className="flex items-center justify-end gap-2">
        <Button
          variant="outline"
          size="sm"
          onClick={handleAddCredits}
          title="Click to simulate adding +500 credits"
          className="gap-2 font-normal text-foreground"
        >
          <Coins className="w-3.5 h-3.5 text-muted-foreground" />
          <span className="font-semibold font-mono text-foreground">{credits.toLocaleString()}</span>
          <span className="text-muted-foreground text-[11px] hidden lg:inline">credits</span>
        </Button>

        <div className="hidden md:flex items-center gap-2 h-8 px-3 rounded-lg border border-border bg-card text-xs">
          <Mail className="w-3.5 h-3.5 text-muted-foreground" />
          <span className="text-foreground hidden lg:inline">shashank@aegisreach.ai</span>
          <span className="flex items-center gap-1 font-mono text-[10px] text-emerald-600 dark:text-emerald-400">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
            OAuth
          </span>
        </div>

        <Button
          variant="outline"
          size="icon"
          onClick={toggleTheme}
          aria-label={theme === 'dark' ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
          title={theme === 'dark' ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
          className="h-8 w-8"
        >
          {theme === 'dark' ? (
            <Sun className="w-4 h-4 text-muted-foreground" />
          ) : (
            <Moon className="w-4 h-4 text-muted-foreground" />
          )}
        </Button>
      </div>
    </header>
  );
};

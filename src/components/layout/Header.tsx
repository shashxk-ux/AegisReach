import React from 'react';
import { useApp } from '../../context/AppContext';
import { Button, Badge } from '../ui';
import { 
  Coins, 
  Eye, 
  Zap, 
  Mail,
  Sun,
  Moon,
  Radio
} from 'lucide-react';

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

  return (
    <header className="h-16 border-b border-border bg-card/95 backdrop-blur-xl px-6 flex items-center justify-between sticky top-0 z-40 transition-colors duration-200 shadow-xs">
      {/* Left: Brand & Threat Engine Status */}
      <div className="flex items-center gap-3.5">
        {/* Circular Placeholder */}
        <div 
          className="w-9 h-9 rounded-full bg-muted border border-border flex items-center justify-center shrink-0 shadow-2xs"
          title="AegisReach"
        >
          <div className="w-3.5 h-3.5 rounded-full bg-muted-foreground/25" />
        </div>
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-base font-bold tracking-tight text-foreground flex items-center">
              Aegis<span className="text-cyan-600 dark:text-cyan-400">Reach</span>
            </h1>
            <Badge variant="cyan" className="text-[10px] font-bold tracking-wide uppercase px-2 py-0.5">
              CISO Intelligence
            </Badge>
          </div>
          <div className="flex items-center gap-1.5 text-[11px] text-muted-foreground font-medium">
            <Radio className="w-3 h-3 text-emerald-500 animate-pulse" />
            <span>Open Threat Feeds Active (MISP & KEV)</span>
          </div>
        </div>
      </div>

      {/* Middle: Mode Switcher (Observer Mode vs Autopilot) */}
      <nav aria-label="Dispatch Mode" className="flex items-center bg-muted/60 border border-border p-1 rounded-xl shadow-2xs">
        <button
          type="button"
          onClick={() => handleToggleMode('observer')}
          aria-pressed={mode === 'observer'}
          className={`flex items-center gap-2 px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-all duration-150 cursor-pointer ${
            mode === 'observer'
              ? 'bg-card text-cyan-700 dark:text-cyan-300 shadow-xs border border-border'
              : 'text-muted-foreground hover:text-foreground'
          }`}
        >
          <Eye className={`w-3.5 h-3.5 ${mode === 'observer' ? 'text-cyan-600 dark:text-cyan-400' : 'text-muted-foreground'}`} />
          <span>Observer Mode</span>
          <Badge
            variant={mode === 'observer' ? 'cyan' : 'secondary'}
            className="text-[10px] px-1.5 py-0 font-mono font-medium"
          >
            Drafts Only
          </Badge>
        </button>

        <button
          type="button"
          onClick={() => handleToggleMode('autopilot')}
          aria-pressed={mode === 'autopilot'}
          className={`flex items-center gap-2 px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-all duration-150 cursor-pointer ${
            mode === 'autopilot'
              ? 'bg-card text-purple-700 dark:text-purple-300 shadow-xs border border-border'
              : 'text-muted-foreground hover:text-foreground'
          }`}
        >
          <Zap className={`w-3.5 h-3.5 ${mode === 'autopilot' ? 'text-purple-600 dark:text-purple-400' : 'text-muted-foreground'}`} />
          <span>Autopilot</span>
          <Badge
            variant={mode === 'autopilot' ? 'purple' : 'secondary'}
            className="text-[10px] px-1.5 py-0 font-mono font-medium"
          >
            Auto-Send
          </Badge>
        </button>
      </nav>

      {/* Right: Credits, Connected Gmail, and Theme Toggle */}
      <div className="flex items-center gap-2.5">
        {/* Tier-2 Credits Badge */}
        <Button
          variant="outline"
          size="sm"
          onClick={handleAddCredits}
          title="Click to simulate adding +500 credits"
          className="gap-2 font-normal text-foreground hover:border-amber-500/50 hover:text-amber-600 dark:hover:text-amber-300 group"
        >
          <Coins className="w-3.5 h-3.5 text-amber-500 group-hover:rotate-12 transition-transform" />
          <span className="font-bold font-mono text-foreground">{credits.toLocaleString()}</span>
          <span className="text-muted-foreground text-[11px] font-medium hidden sm:inline">Credits</span>
        </Button>

        {/* Gmail Account Status */}
        <div className="flex items-center gap-2 px-3 py-1.5 rounded-md border border-border bg-card text-xs shadow-2xs">
          <div className="relative">
            <Mail className="w-3.5 h-3.5 text-rose-500" />
            <span className="absolute -top-0.5 -right-0.5 w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping" />
            <span className="absolute -top-0.5 -right-0.5 w-1.5 h-1.5 rounded-full bg-emerald-500" />
          </div>
          <span className="text-foreground font-medium hidden md:inline">shashank@aegisreach.ai</span>
          <Badge variant="emerald" className="text-[10px] px-1.5 py-0 font-mono font-semibold">
            OAuth
          </Badge>
        </div>

        {/* Dark / Light Mode Toggle Button */}
        <Button
          variant="outline"
          size="icon"
          onClick={toggleTheme}
          aria-label={theme === 'dark' ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
          title={theme === 'dark' ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
          className="rounded-lg"
        >
          {theme === 'dark' ? (
            <Sun className="w-4 h-4 text-amber-400 hover:rotate-45 transition-transform" />
          ) : (
            <Moon className="w-4 h-4 text-indigo-500 hover:-rotate-12 transition-transform" />
          )}
        </Button>
      </div>
    </header>
  );
};

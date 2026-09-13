import React from 'react';
import { useApp } from '../../context/AppContext';
import { 
  ShieldAlert, 
  Coins, 
  Eye, 
  Zap, 
  Mail,
  Sun,
  Moon
} from 'lucide-react';

export const Header: React.FC = () => {
  const { mode, setMode, credits, showToast, theme, toggleTheme } = useApp();

  const handleToggleMode = () => {
    const nextMode = mode === 'observer' ? 'autopilot' : 'observer';
    setMode(nextMode);
    if (nextMode === 'observer') {
      showToast(
        'info',
        'Observer Mode Activated',
        'Outreach will be generated as Gmail drafts only. Human review is required before sending.'
      );
    } else {
      showToast(
        'warning',
        'Autopilot Mode Activated',
        'Emails will be scheduled and dispatched automatically based on persona triggers & warmup pacing.'
      );
    }
  };

  const handleAddCredits = () => {
    showToast('success', 'Credits Replenished', '+500 Apollo/ZoomInfo prospecting credits added to balance.');
  };

  return (
    <header className="h-16 border-b border-slate-800/80 bg-slate-950/70 backdrop-blur-xl px-6 flex items-center justify-between sticky top-0 z-40 transition-colors">
      {/* Left: Brand & Radar */}
      <div className="flex items-center gap-3.5">
        <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-cyan-600 via-indigo-600 to-purple-500 p-0.5 shadow-lg shadow-cyan-500/20 flex items-center justify-center">
          <div className="w-full h-full bg-slate-950 rounded-[10px] flex items-center justify-center">
            <ShieldAlert className="w-5 h-5 text-cyan-400 animate-pulse" />
          </div>
        </div>
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-base font-bold tracking-tight text-white flex items-center gap-1.5">
              AEGIS<span className="text-cyan-400 font-extrabold">REACH</span>
            </h1>
            <span className="text-[10px] uppercase font-semibold px-2 py-0.5 rounded-full bg-cyan-500/10 text-cyan-400 border border-cyan-500/20">
              CISO Decision Engine
            </span>
          </div>
          <p className="text-[11px] text-slate-400 font-medium">Threat-driven prospecting & persona-based sequencing</p>
        </div>
      </div>

      {/* Middle: Mode Switcher (Observer Mode vs Autopilot) */}
      <div className="flex items-center bg-slate-900/90 border border-slate-800 p-1 rounded-xl shadow-inner">
        <button
          onClick={() => mode !== 'observer' && handleToggleMode()}
          className={`flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
            mode === 'observer'
              ? 'bg-gradient-to-r from-cyan-500/20 to-blue-500/20 text-cyan-300 border border-cyan-500/30 shadow-sm'
              : 'text-slate-400 hover:text-slate-200'
          }`}
        >
          <Eye className="w-3.5 h-3.5 text-cyan-400" />
          <span>Observer Mode</span>
          <span className="text-[10px] px-1.5 py-0.2 rounded bg-cyan-950 text-cyan-300 border border-cyan-800/40">Drafts Only</span>
        </button>

        <button
          onClick={() => mode !== 'autopilot' && handleToggleMode()}
          className={`flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
            mode === 'autopilot'
              ? 'bg-gradient-to-r from-purple-500/20 to-pink-500/20 text-purple-300 border border-purple-500/30 shadow-sm'
              : 'text-slate-400 hover:text-slate-200'
          }`}
        >
          <Zap className="w-3.5 h-3.5 text-purple-400" />
          <span>Autopilot</span>
          <span className="text-[10px] px-1.5 py-0.2 rounded bg-purple-950 text-purple-300 border border-purple-800/40">Auto-Send</span>
        </button>
      </div>

      {/* Right: Credits, Connected Gmail, and Theme Toggle */}
      <div className="flex items-center gap-3">
        {/* Tier-2 Credits Badge */}
        <button
          onClick={handleAddCredits}
          title="Click to simulate adding credits"
          className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-slate-900/80 border border-slate-800 hover:border-amber-500/40 text-xs text-slate-300 hover:text-amber-300 transition-all group"
        >
          <Coins className="w-3.5 h-3.5 text-amber-400 group-hover:rotate-12 transition-transform" />
          <span className="font-semibold text-white">{credits.toLocaleString()}</span>
          <span className="text-slate-500 text-[11px]">Enrich Credits</span>
        </button>

        {/* Gmail Account Status */}
        <div className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-slate-900/80 border border-slate-800 text-xs">
          <div className="relative">
            <Mail className="w-3.5 h-3.5 text-red-400" />
            <span className="absolute -top-0.5 -right-0.5 w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping" />
            <span className="absolute -top-0.5 -right-0.5 w-1.5 h-1.5 rounded-full bg-emerald-500" />
          </div>
          <span className="text-slate-300 font-medium hidden sm:inline">shashank@aegisreach.ai</span>
          <span className="text-[10px] px-1.5 py-0.5 rounded bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 font-mono">
            OAuth 2.0
          </span>
        </div>

        {/* Dark / Light Mode Toggle Button */}
        <button
          onClick={toggleTheme}
          title={theme === 'dark' ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
          className="p-2 rounded-xl bg-slate-900/80 border border-slate-800 hover:border-slate-700 text-slate-300 hover:text-white transition-all flex items-center justify-center shadow-sm"
        >
          {theme === 'dark' ? (
            <Sun className="w-4 h-4 text-amber-400 hover:rotate-45 transition-transform" />
          ) : (
            <Moon className="w-4 h-4 text-indigo-400 hover:-rotate-12 transition-transform" />
          )}
        </button>
      </div>
    </header>
  );
};

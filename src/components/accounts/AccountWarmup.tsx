import React from 'react';
import { useApp } from '../../context/AppContext';
import { 
  Flame, 
  ShieldCheck, 
  RotateCw, 
  Plus, 
  Mail, 
  CheckCircle2, 
  AlertCircle, 
  TrendingUp,
  Cpu,
  Clock
} from 'lucide-react';

export const AccountWarmup: React.FC = () => {
  const { accounts, showToast } = useApp();

  const handleConnectNewAccount = () => {
    showToast(
      'info',
      'Google Workspace OAuth Flow Initiated',
      'Select a Google account with Gmail API compose/send scopes enabled to join the sender pool.'
    );
  };

  return (
    <div className="space-y-6 max-w-6xl mx-auto">
      {/* Top Banner */}
      <div className="p-6 rounded-2xl bg-gradient-to-r from-slate-900 via-slate-900/90 to-amber-950/30 border border-slate-800 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-400 text-xs font-semibold mb-2">
            <Flame className="w-3.5 h-3.5" />
            <span>Deliverability & Inbox Infrastructure</span>
          </div>
          <h2 className="text-xl font-bold text-white tracking-tight">Email Warming & Multi-Account Rotation</h2>
          <p className="text-xs text-slate-400 mt-1 max-w-2xl leading-relaxed">
            Protect domain reputation and ensure 99%+ inbox placement. AegisReach balances daily volume limits across connected Google Workspace inboxes with algorithmic sending jitter.
          </p>
        </div>

        <button
          onClick={handleConnectNewAccount}
          className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-500 hover:to-blue-500 text-white font-semibold text-xs shadow-lg shadow-cyan-600/20 transition-all shrink-0"
        >
          <Plus className="w-4 h-4" />
          <span>Connect Gmail Inbox</span>
        </button>
      </div>

      {/* Overview Stat Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="p-4 rounded-2xl bg-slate-900/40 border border-slate-800 space-y-1">
          <div className="text-xs font-medium text-slate-400">Connected Accounts</div>
          <div className="text-2xl font-bold text-white font-mono">{accounts.length} Inboxes</div>
          <div className="text-[11px] text-emerald-400 flex items-center gap-1">
            <CheckCircle2 className="w-3 h-3" />
            <span>All OAuth tokens authenticated</span>
          </div>
        </div>

        <div className="p-4 rounded-2xl bg-slate-900/40 border border-slate-800 space-y-1">
          <div className="text-xs font-medium text-slate-400">Combined Daily Quota</div>
          <div className="text-2xl font-bold text-cyan-400 font-mono">125 / day</div>
          <div className="text-[11px] text-slate-500">50 sent today (40% capacity)</div>
        </div>

        <div className="p-4 rounded-2xl bg-slate-900/40 border border-slate-800 space-y-1">
          <div className="text-xs font-medium text-slate-400">Domain Reputation Score</div>
          <div className="text-2xl font-bold text-emerald-400 font-mono">98.2%</div>
          <div className="text-[11px] text-emerald-400">0 spam complaints recorded</div>
        </div>

        <div className="p-4 rounded-2xl bg-slate-900/40 border border-slate-800 space-y-1">
          <div className="text-xs font-medium text-slate-400">Algorithmic Sending Jitter</div>
          <div className="text-2xl font-bold text-purple-400 font-mono">3 - 7 min</div>
          <div className="text-[11px] text-slate-500">Simulating natural human cadence</div>
        </div>
      </div>

      {/* Connected Inboxes Cards */}
      <div className="space-y-4">
        <h3 className="text-sm font-bold text-slate-300 uppercase tracking-wider flex items-center gap-2">
          <Mail className="w-4 h-4 text-cyan-400" />
          <span>Active Inboxes in Rotation Pool ({accounts.length})</span>
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {accounts.map(acc => {
            const usagePercent = Math.round((acc.sentToday / acc.dailyQuota) * 100);

            return (
              <div
                key={acc.id}
                className="p-5 rounded-2xl bg-slate-900/50 border border-slate-800 space-y-4 flex flex-col justify-between"
              >
                <div className="space-y-3">
                  <div className="flex items-start justify-between">
                    <div className="flex items-center gap-3">
                      <img
                        src={acc.avatar}
                        alt={acc.displayName}
                        className="w-10 h-10 rounded-full object-cover border border-slate-700"
                      />
                      <div className="min-w-0">
                        <div className="font-semibold text-white text-xs truncate">{acc.displayName}</div>
                        <div className="text-[11px] text-slate-400 font-mono truncate">{acc.email}</div>
                      </div>
                    </div>

                    <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                      {acc.healthScore}% Health
                    </span>
                  </div>

                  <div className="space-y-1.5 pt-2">
                    <div className="flex items-center justify-between text-xs">
                      <span className="text-slate-400">Daily Quota Utilization</span>
                      <span className="font-mono text-slate-200">
                        {acc.sentToday} / {acc.dailyQuota} ({usagePercent}%)
                      </span>
                    </div>
                    <div className="w-full bg-slate-950 rounded-full h-2 overflow-hidden border border-slate-800">
                      <div
                        className="bg-gradient-to-r from-cyan-500 to-blue-500 h-full rounded-full transition-all duration-500"
                        style={{ width: `${usagePercent}%` }}
                      />
                    </div>
                  </div>
                </div>

                <div className="pt-3 border-t border-slate-800/80 space-y-2 text-xs">
                  <div className="flex items-center justify-between">
                    <span className="text-slate-400 flex items-center gap-1.5">
                      <Flame className="w-3.5 h-3.5 text-amber-400" />
                      <span>Warmup Status:</span>
                    </span>
                    <span className="text-amber-300 font-medium text-[11px]">{acc.warmupStage}</span>
                  </div>

                  <div className="flex items-center justify-between text-[11px] text-slate-500 font-mono">
                    <span>Provider: {acc.provider}</span>
                    <span>Connected: {acc.connectedSince}</span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Rotation Logic Architecture Blueprint */}
      <div className="p-6 rounded-2xl bg-slate-900/40 border border-slate-800 space-y-4">
        <h4 className="text-xs font-bold text-slate-300 uppercase tracking-wider flex items-center gap-2">
          <RotateCw className="w-4 h-4 text-purple-400" />
          <span>Intelligent Multi-Account Rotation Logic</span>
        </h4>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
          <div className="p-4 rounded-xl bg-slate-950/70 border border-slate-800/80 space-y-1.5">
            <div className="font-semibold text-cyan-300 flex items-center gap-1.5">
              <Cpu className="w-3.5 h-3.5 text-cyan-400" />
              <span>Round-Robin Load Balancing</span>
            </div>
            <p className="text-slate-400 text-[11px] leading-relaxed">
              Dispatches are distributed evenly across the inbox pool to prevent exceeding Google Workspace sending rate-limits.
            </p>
          </div>

          <div className="p-4 rounded-xl bg-slate-950/70 border border-slate-800/80 space-y-1.5">
            <div className="font-semibold text-emerald-300 flex items-center gap-1.5">
              <Clock className="w-3.5 h-3.5 text-emerald-400" />
              <span>Human Emulation Jitter</span>
            </div>
            <p className="text-slate-400 text-[11px] leading-relaxed">
              Randomized delays (180 to 420 seconds) between email dispatches mimic organic human executive sending patterns.
            </p>
          </div>

          <div className="p-4 rounded-xl bg-slate-950/70 border border-slate-800/80 space-y-1.5">
            <div className="font-semibold text-amber-300 flex items-center gap-1.5">
              <ShieldCheck className="w-3.5 h-3.5 text-amber-400" />
              <span>Automatic Cool-down Circuit</span>
            </div>
            <p className="text-slate-400 text-[11px] leading-relaxed">
              If an inbox receives an SPF/DKIM warning or temporary bounce, the router automatically pauses it for 24 hours.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

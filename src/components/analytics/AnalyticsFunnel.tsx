import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { 
  BarChart3, 
  ArrowDown, 
  Mail, 
  Eye, 
  MousePointerClick, 
  MessageSquare, 
  ShieldBan, 
  CheckCircle2, 
  Sparkles, 
  Plus, 
  Trash2,
  ThumbsUp,
  AlertCircle
} from 'lucide-react';

interface DncEntry {
  id: string;
  domainOrEmail: string;
  reason: string;
  addedAt: string;
}

export const AnalyticsFunnel: React.FC = () => {
  const { funnelStats, showToast } = useApp();

  const [dncList, setDncList] = useState<DncEntry[]>([
    { id: 'dnc-1', domainOrEmail: '@stealth-defense.gov', reason: 'Explicit Unsubscribe request', addedAt: '2026-09-10' },
    { id: 'dnc-2', domainOrEmail: 'ciso-office@meridian-bank.com', reason: 'Internal vendor freeze', addedAt: '2026-09-11' },
    { id: 'dnc-3', domainOrEmail: '@legacy-retail-systems.org', reason: 'Domain hard bounce suppression', addedAt: '2026-09-12' }
  ]);

  const [newDncInput, setNewDncInput] = useState('');

  const handleAddDnc = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newDncInput.trim()) return;

    const entry: DncEntry = {
      id: Math.random().toString(36).substring(2, 9),
      domainOrEmail: newDncInput.trim(),
      reason: 'Manual user suppression entry',
      addedAt: 'Today'
    };

    setDncList(prev => [entry, ...prev]);
    setNewDncInput('');
    showToast('info', 'Added to Suppression / DNC List', `${entry.domainOrEmail} will be excluded from all future sequences.`);
  };

  const handleRemoveDnc = (id: string) => {
    setDncList(prev => prev.filter(item => item.id !== id));
    showToast('info', 'Removed from Suppression', 'Contact or domain re-enabled for future sequencing.');
  };

  const funnelSteps = [
    { label: 'Sourced Leads', count: funnelStats.totalSourced, rate: '100%', icon: Mail, color: 'text-slate-300', bg: 'bg-slate-800' },
    { label: 'Tier-1 Cheap Pass', count: funnelStats.tier1Validated, rate: '97.2%', icon: CheckCircle2, color: 'text-emerald-400', bg: 'bg-emerald-950/40' },
    { label: 'Tier-2 Unlocked', count: funnelStats.tier2Unlocked, rate: '24.1%', icon: Sparkles, color: 'text-amber-400', bg: 'bg-amber-950/40' },
    { label: 'Human Approved', count: funnelStats.draftsApproved, rate: '12.9%', icon: Eye, color: 'text-cyan-400', bg: 'bg-cyan-950/40' },
    { label: 'Delivered (Gmail)', count: funnelStats.emailsSent, rate: '99.4%', icon: Mail, color: 'text-blue-400', bg: 'bg-blue-950/40' },
    { label: 'Opened', count: Math.round(funnelStats.emailsSent * 0.682), rate: '68.2%', icon: Eye, color: 'text-purple-400', bg: 'bg-purple-950/40' },
    { label: 'Clicked Link / Brief', count: Math.round(funnelStats.emailsSent * 0.246), rate: '24.6%', icon: MousePointerClick, color: 'text-indigo-400', bg: 'bg-indigo-950/40' },
    { label: 'Direct CISO Replies', count: Math.round(funnelStats.emailsSent * 0.182), rate: '18.2%', icon: MessageSquare, color: 'text-emerald-400', bg: 'bg-emerald-950/60' }
  ];

  return (
    <div className="space-y-6 max-w-6xl mx-auto">
      {/* Top Banner */}
      <div className="p-6 rounded-2xl bg-white dark:bg-gradient-to-r dark:from-slate-900 dark:via-slate-900/90 dark:to-blue-950/30 border border-slate-200 dark:border-slate-800 shadow-sm flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded-full bg-blue-50 dark:bg-blue-500/10 border border-blue-200 dark:border-blue-500/20 text-blue-700 dark:text-blue-400 text-xs font-semibold mb-2">
            <BarChart3 className="w-3.5 h-3.5" />
            <span>Workflow Step 7: Telemetry & Inbound Intelligence</span>
          </div>
          <h2 className="text-xl font-bold text-slate-900 dark:text-white tracking-tight">Telemetry Funnel & AI Reply Intelligence</h2>
          <p className="text-xs text-slate-600 dark:text-slate-400 mt-1 max-w-2xl leading-relaxed">
            Real-time tracking of opens, clicks, and incoming CISO replies. Incoming messages are automatically parsed by an AI intent classifier into Positive, Objection, or Suppression categories.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <span className="text-xs px-3 py-1.5 rounded-xl bg-emerald-50 dark:bg-emerald-950/60 border border-emerald-200 dark:border-emerald-800 text-emerald-800 dark:text-emerald-300 font-mono font-semibold">
            68.2% Open Rate (Industry Benchmark: 22%)
          </span>
        </div>
      </div>

      {/* Outbound Funnel Pipeline */}
      <div className="p-6 rounded-2xl bg-white dark:bg-slate-900/40 border border-slate-200 dark:border-slate-800 space-y-4 shadow-sm">
        <h3 className="text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider">
          End-to-End Campaign Conversion Funnel
        </h3>

        <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-2.5">
          {funnelSteps.map((step, idx) => {
            const Icon = step.icon;
            return (
              <div
                key={idx}
                className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-950/80 border border-slate-200/90 dark:border-slate-800 flex flex-col justify-between space-y-2 hover:bg-slate-100/80 dark:hover:bg-slate-900/80 transition-all shadow-2xs"
              >
                <div className="flex items-center justify-between">
                  <Icon className={`w-4 h-4 ${step.color}`} />
                  <span className="text-[10px] font-mono text-slate-500 dark:text-slate-400 font-semibold">{step.rate}</span>
                </div>
                <div>
                  <div className="text-lg font-bold text-slate-900 dark:text-white font-mono">{step.count.toLocaleString()}</div>
                  <div className="text-[11px] text-slate-600 dark:text-slate-400 truncate mt-0.5 font-medium">{step.label}</div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Middle Grid: AI Reply Intent Classifier & Real Samples */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Left: AI Inbound Reply Sentiment */}
        <div className="p-6 rounded-2xl bg-white dark:bg-slate-900/40 border border-slate-200 dark:border-slate-800 space-y-4 shadow-sm">
          <div className="flex items-center justify-between">
            <h3 className="text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-purple-600 dark:text-purple-400" />
              <span>AI Reply Intent Classifier</span>
            </h3>
            <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-purple-50 dark:bg-purple-950 text-purple-700 dark:text-purple-300 border border-purple-200 dark:border-purple-800 font-semibold">
              Autonomous Parsing
            </span>
          </div>

          <div className="space-y-3">
            {/* Positive Interest Sample */}
            <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-950 border border-emerald-500/30 space-y-2 shadow-2xs">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-slate-900 dark:text-white">Elena Vance (Apex Global FinTech)</span>
                <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-emerald-100 dark:bg-emerald-500/10 text-emerald-800 dark:text-emerald-400 border border-emerald-200 dark:border-emerald-500/30 flex items-center gap-1">
                  <ThumbsUp className="w-3 h-3" />
                  <span>Positive Meeting Request</span>
                </span>
              </div>
              <p className="text-xs text-slate-700 dark:text-slate-300 italic bg-white dark:bg-slate-900/50 p-2.5 rounded-lg border border-slate-200 dark:border-slate-800/80">
                "Interesting point on DORA crosswalk and Citrix token isolation. Please send your 1-pager and loop in my Deputy CISO (alex.m@apexfintech.com) to calendar 20 mins."
              </p>
              <div className="text-[10px] text-emerald-700 dark:text-emerald-400/90 font-mono font-semibold">
                AI Next Action: Pre-generated calendar link response draft ready.
              </div>
            </div>

            {/* Technical Request Sample */}
            <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-950 border border-purple-500/30 space-y-2 shadow-2xs">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-slate-900 dark:text-white">Sarah Jenkins (Vanguard Defense)</span>
                <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-purple-100 dark:bg-purple-500/10 text-purple-800 dark:text-purple-400 border border-purple-200 dark:border-purple-500/30">
                  Technical Artifact Request
                </span>
              </div>
              <p className="text-xs text-slate-700 dark:text-slate-300 italic bg-white dark:bg-slate-900/50 p-2.5 rounded-lg border border-slate-200 dark:border-slate-800/80">
                "Send over the GitHub repo and the Docker harness. I want our senior kernel engineer to inspect your eBPF socket filter."
              </p>
              <div className="text-[10px] text-purple-700 dark:text-purple-400/90 font-mono font-semibold">
                AI Next Action: Whitepaper & technical repo link queued for approval.
              </div>
            </div>

            {/* Soft Objection Sample */}
            <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-950 border border-amber-500/30 space-y-2 shadow-2xs">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-slate-900 dark:text-white">Marcus Sterling (Helix Health)</span>
                <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-amber-100 dark:bg-amber-500/10 text-amber-800 dark:text-amber-400 border border-amber-200 dark:border-amber-500/30 flex items-center gap-1">
                  <AlertCircle className="w-3 h-3" />
                  <span>Timing / Q4 Follow-Up</span>
                </span>
              </div>
              <p className="text-xs text-slate-700 dark:text-slate-300 italic bg-white dark:bg-slate-900/50 p-2.5 rounded-lg border border-slate-200 dark:border-slate-800/80">
                "We are in the middle of our annual hospital clinical network audit. Ping me back in late November."
              </p>
              <div className="text-[10px] text-amber-700 dark:text-amber-400/90 font-mono font-semibold">
                AI Next Action: Auto-scheduled snooze until November 15, 2026.
              </div>
            </div>
          </div>
        </div>

        {/* Right: Suppression & DNC (Do Not Contact) Management */}
        <div className="p-6 rounded-2xl bg-white dark:bg-slate-900/40 border border-slate-200 dark:border-slate-800 space-y-4 shadow-sm">
          <div className="flex items-center justify-between">
            <h3 className="text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider flex items-center gap-2">
              <ShieldBan className="w-4 h-4 text-red-600 dark:text-red-400" />
              <span>Domain Suppression & DNC Registry</span>
            </h3>
            <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-red-100 dark:bg-red-950 text-red-700 dark:text-red-300 border border-red-200 dark:border-red-800 font-semibold">
              {dncList.length} Protected
            </span>
          </div>

          {/* Add DNC Form */}
          <form onSubmit={handleAddDnc} className="flex gap-2">
            <input
              type="text"
              placeholder="Enter email or entire domain (e.g. @company.com)"
              value={newDncInput}
              onChange={e => setNewDncInput(e.target.value)}
              className="flex-1 px-3.5 py-2 bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl text-xs text-slate-900 dark:text-slate-200 focus:outline-none focus:border-red-500 focus:bg-white placeholder:text-slate-400 shadow-2xs font-medium"
            />
            <button
              type="submit"
              className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-red-600 hover:bg-red-500 text-white font-semibold text-xs transition-colors shrink-0 shadow-sm cursor-pointer"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>Suppress</span>
            </button>
          </form>

          {/* DNC Entries Table */}
          <div className="space-y-2">
            {dncList.map(item => (
              <div
                key={item.id}
                className="p-3 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200/80 dark:border-slate-800/80 flex items-center justify-between text-xs shadow-2xs"
              >
                <div>
                  <div className="font-mono font-semibold text-slate-800 dark:text-slate-200">{item.domainOrEmail}</div>
                  <div className="text-[10px] text-slate-500">{item.reason} • Added: {item.addedAt}</div>
                </div>
                <button
                  onClick={() => handleRemoveDnc(item.id)}
                  className="p-1.5 rounded-lg text-slate-400 hover:text-red-600 dark:hover:text-red-400 hover:bg-slate-200/60 dark:hover:bg-slate-900 transition-colors cursor-pointer"
                  title="Remove from suppression list"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              </div>
            ))}
          </div>

          <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-950/60 border border-slate-200 dark:border-slate-800 text-[11px] text-slate-600 dark:text-slate-400 space-y-1">
            <span className="font-bold text-slate-800 dark:text-slate-300">Regulatory Compliance:</span>
            <p className="leading-relaxed">
              Suppressed domains are permanently blacklisted across all connected Google Workspace accounts to ensure CAN-SPAM and GDPR compliance.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

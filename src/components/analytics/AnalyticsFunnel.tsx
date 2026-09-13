import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { Card, Badge, Button, Input } from '../ui';
import { 
  BarChart3, 
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
    { label: 'Sourced Leads', count: funnelStats.totalSourced, rate: '100%', icon: Mail, color: 'text-muted-foreground' },
    { label: 'Tier-1 Cheap Pass', count: funnelStats.tier1Validated, rate: '97.2%', icon: CheckCircle2, color: 'text-emerald-500' },
    { label: 'Tier-2 Unlocked', count: funnelStats.tier2Unlocked, rate: '24.1%', icon: Sparkles, color: 'text-amber-500' },
    { label: 'Human Approved', count: funnelStats.draftsApproved, rate: '12.9%', icon: Eye, color: 'text-cyan-500' },
    { label: 'Delivered (Gmail)', count: funnelStats.emailsSent, rate: '99.4%', icon: Mail, color: 'text-blue-500' },
    { label: 'Opened', count: Math.round(funnelStats.emailsSent * 0.682), rate: '68.2%', icon: Eye, color: 'text-purple-500' },
    { label: 'Clicked Link / Brief', count: Math.round(funnelStats.emailsSent * 0.246), rate: '24.6%', icon: MousePointerClick, color: 'text-indigo-500' },
    { label: 'Direct CISO Replies', count: Math.round(funnelStats.emailsSent * 0.182), rate: '18.2%', icon: MessageSquare, color: 'text-emerald-500' }
  ];

  return (
    <div className="space-y-6 max-w-6xl mx-auto">
      {/* Top Banner */}
      <Card className="p-6 bg-gradient-to-r from-card via-cyan-500/5 to-card">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div>
            <Badge variant="cyan" className="gap-2 mb-2">
              <BarChart3 className="w-3.5 h-3.5" />
              <span>Workflow Step 7: Telemetry & Inbound Intelligence</span>
            </Badge>
            <h2 className="text-xl font-bold text-foreground tracking-tight">Telemetry Funnel & AI Reply Intelligence</h2>
            <p className="text-xs text-muted-foreground mt-1 max-w-2xl leading-relaxed">
              Real-time tracking of opens, clicks, and incoming CISO replies. Incoming messages are automatically parsed by an AI intent classifier into Positive, Objection, or Suppression categories.
            </p>
          </div>

          <Badge variant="emerald" className="font-mono text-xs px-3 py-1.5">
            68.2% Open Rate (Industry Benchmark: 22%)
          </Badge>
        </div>
      </Card>

      {/* Outbound Funnel Pipeline */}
      <Card className="p-6 space-y-4">
        <h3 className="text-xs font-bold text-muted-foreground uppercase tracking-wider">
          End-to-End Campaign Conversion Funnel
        </h3>

        <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-2.5">
          {funnelSteps.map((step, idx) => {
            const Icon = step.icon;
            return (
              <div
                key={idx}
                className="p-3.5 rounded-xl bg-card border border-border flex flex-col justify-between space-y-2 hover:bg-muted/40 transition-all"
              >
                <div className="flex items-center justify-between">
                  <Icon className={`w-4 h-4 ${step.color}`} />
                  <span className="text-[10px] font-mono text-muted-foreground font-semibold">{step.rate}</span>
                </div>
                <div>
                  <div className="text-lg font-bold text-foreground font-mono">{step.count.toLocaleString()}</div>
                  <div className="text-[11px] text-muted-foreground truncate mt-0.5 font-medium">{step.label}</div>
                </div>
              </div>
            );
          })}
        </div>
      </Card>

      {/* Middle Grid: AI Reply Intent Classifier & Real Samples */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Left: AI Inbound Reply Sentiment */}
        <Card className="p-6 space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-xs font-bold text-foreground uppercase tracking-wider flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-purple-600 dark:text-purple-400" />
              <span>AI Reply Intent Classifier</span>
            </h3>
            <Badge variant="purple" className="font-mono text-[10px]">
              Autonomous Parsing
            </Badge>
          </div>

          <div className="space-y-3">
            {/* Positive Interest Sample */}
            <div className="p-4 rounded-xl bg-muted/40 border border-emerald-500/30 space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-foreground">Elena Vance (Apex Global FinTech)</span>
                <Badge variant="emerald" className="gap-1 font-semibold">
                  <ThumbsUp className="w-3 h-3" />
                  <span>Positive Meeting Request</span>
                </Badge>
              </div>
              <p className="text-xs text-muted-foreground italic bg-card p-2.5 rounded-lg border border-border">
                "Interesting point on DORA crosswalk and Citrix token isolation. Please send your 1-pager and loop in my Deputy CISO (alex.m@apexfintech.com) to calendar 20 mins."
              </p>
              <div className="text-[10px] text-emerald-600 dark:text-emerald-400 font-mono font-semibold">
                AI Next Action: Pre-generated calendar link response draft ready.
              </div>
            </div>

            {/* Technical Request Sample */}
            <div className="p-4 rounded-xl bg-muted/40 border border-purple-500/30 space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-foreground">Sarah Jenkins (Vanguard Defense)</span>
                <Badge variant="purple" className="font-semibold">
                  Technical Artifact Request
                </Badge>
              </div>
              <p className="text-xs text-muted-foreground italic bg-card p-2.5 rounded-lg border border-border">
                "Send over the GitHub repo and the Docker harness. I want our senior kernel engineer to inspect your eBPF socket filter."
              </p>
              <div className="text-[10px] text-purple-600 dark:text-purple-400 font-mono font-semibold">
                AI Next Action: Whitepaper & technical repo link queued for approval.
              </div>
            </div>

            {/* Soft Objection Sample */}
            <div className="p-4 rounded-xl bg-muted/40 border border-amber-500/30 space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-foreground">Marcus Sterling (Helix Health)</span>
                <Badge variant="amber" className="gap-1 font-semibold">
                  <AlertCircle className="w-3 h-3" />
                  <span>Timing / Q4 Follow-Up</span>
                </Badge>
              </div>
              <p className="text-xs text-muted-foreground italic bg-card p-2.5 rounded-lg border border-border">
                "We are in the middle of our annual hospital clinical network audit. Ping me back in late November."
              </p>
              <div className="text-[10px] text-amber-600 dark:text-amber-400 font-mono font-semibold">
                AI Next Action: Auto-scheduled snooze until November 15, 2026.
              </div>
            </div>
          </div>
        </Card>

        {/* Right: Suppression & DNC (Do Not Contact) Management */}
        <Card className="p-6 space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-xs font-bold text-foreground uppercase tracking-wider flex items-center gap-2">
              <ShieldBan className="w-4 h-4 text-red-600 dark:text-red-400" />
              <span>Domain Suppression & DNC Registry</span>
            </h3>
            <Badge variant="destructive" className="font-mono text-[10px]">
              {dncList.length} Protected
            </Badge>
          </div>

          {/* Add DNC Form */}
          <form onSubmit={handleAddDnc} className="flex gap-2">
            <Input
              type="text"
              placeholder="Enter email or entire domain (e.g. @company.com)"
              value={newDncInput}
              onChange={e => setNewDncInput(e.target.value)}
              className="flex-1 text-xs"
            />
            <Button
              type="submit"
              variant="destructive"
              size="sm"
              className="gap-1.5 shrink-0 font-semibold"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>Suppress</span>
            </Button>
          </form>

          {/* DNC Entries Table */}
          <div className="space-y-2">
            {dncList.map(item => (
              <div
                key={item.id}
                className="p-3 rounded-xl bg-muted/40 border border-border flex items-center justify-between text-xs"
              >
                <div>
                  <div className="font-mono font-semibold text-foreground">{item.domainOrEmail}</div>
                  <div className="text-[10px] text-muted-foreground">{item.reason} • Added: {item.addedAt}</div>
                </div>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => handleRemoveDnc(item.id)}
                  aria-label={`Remove ${item.domainOrEmail} from suppression list`}
                  className="h-7 w-7 text-muted-foreground hover:text-red-600 dark:hover:text-red-400"
                  title="Remove from suppression list"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </Button>
              </div>
            ))}
          </div>

          <div className="p-3.5 rounded-xl bg-card border border-border text-[11px] text-muted-foreground space-y-1">
            <span className="font-bold text-foreground">Regulatory Compliance:</span>
            <p className="leading-relaxed">
              Suppressed domains are permanently blacklisted across all connected Google Workspace accounts to ensure CAN-SPAM and GDPR compliance.
            </p>
          </div>
        </Card>
      </div>
    </div>
  );
};

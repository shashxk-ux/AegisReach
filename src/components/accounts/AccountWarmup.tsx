import React from 'react';
import { useApp } from '../../context/AppContext';
import { Card, Badge, Button } from '../ui';
import { 
  Flame, 
  ShieldCheck, 
  RotateCw, 
  Plus, 
  Mail, 
  CheckCircle2, 
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
      <Card className="p-6 bg-card">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div>
            <Badge variant="amber" className="gap-2 mb-2">
              <Flame className="w-3.5 h-3.5" />
              <span>Deliverability & Inbox Infrastructure</span>
            </Badge>
            <h2 className="text-xl font-bold text-foreground tracking-tight">Email Warming & Multi-Account Rotation</h2>
            <p className="text-xs text-muted-foreground mt-1 max-w-2xl leading-relaxed">
              Protect domain reputation and ensure 99%+ inbox placement. AegisReach balances daily volume limits across connected Google Workspace inboxes with algorithmic sending jitter.
            </p>
          </div>

          <Button
            variant="cyan"
            onClick={handleConnectNewAccount}
            className="gap-2 font-semibold shrink-0"
          >
            <Plus className="w-4 h-4" />
            <span>Connect Gmail Inbox</span>
          </Button>
        </div>
      </Card>

      {/* Overview Stat Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="p-4 space-y-1">
          <div className="text-xs font-bold text-muted-foreground uppercase tracking-wider">Connected Accounts</div>
          <div className="text-2xl font-extrabold text-foreground font-mono">{accounts.length} Inboxes</div>
          <div className="text-[11px] text-emerald-600 dark:text-emerald-400 flex items-center gap-1 font-semibold">
            <CheckCircle2 className="w-3.5 h-3.5" />
            <span>All OAuth tokens authenticated</span>
          </div>
        </Card>

        <Card className="p-4 space-y-1">
          <div className="text-xs font-bold text-muted-foreground uppercase tracking-wider">Combined Quota</div>
          <div className="text-2xl font-extrabold text-cyan-600 dark:text-cyan-400 font-mono">125 / day</div>
          <div className="text-[11px] text-muted-foreground font-medium">50 sent today (40% capacity)</div>
        </Card>

        <Card className="p-4 space-y-1">
          <div className="text-xs font-bold text-muted-foreground uppercase tracking-wider">Reputation Score</div>
          <div className="text-2xl font-extrabold text-emerald-600 dark:text-emerald-400 font-mono">98.2%</div>
          <div className="text-[11px] text-emerald-600 dark:text-emerald-400 font-semibold">0 spam complaints recorded</div>
        </Card>

        <Card className="p-4 space-y-1">
          <div className="text-xs font-bold text-muted-foreground uppercase tracking-wider">Sending Jitter</div>
          <div className="text-2xl font-extrabold text-purple-600 dark:text-purple-400 font-mono">3 - 7 min</div>
          <div className="text-[11px] text-muted-foreground font-medium">Simulating human cadence</div>
        </Card>
      </div>

      {/* Connected Inboxes Cards */}
      <div className="space-y-4">
        <h3 className="text-xs font-extrabold text-foreground uppercase tracking-wider flex items-center gap-2">
          <Mail className="w-4 h-4 text-cyan-600 dark:text-cyan-400" />
          <span>Active Inboxes in Rotation Pool ({accounts.length})</span>
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {accounts.map(acc => {
            const usagePercent = Math.round((acc.sentToday / acc.dailyQuota) * 100);

            return (
              <Card
                key={acc.id}
                className="p-5 space-y-4 flex flex-col justify-between"
              >
                <div className="space-y-3">
                  <div className="flex items-start justify-between">
                    <div className="flex items-center gap-3">
                      <img
                        src={acc.avatar}
                        alt={acc.displayName}
                        className="w-10 h-10 rounded-full object-cover border border-border shadow-2xs"
                      />
                      <div className="min-w-0">
                        <div className="font-bold text-foreground text-xs truncate">{acc.displayName}</div>
                        <div className="text-[11px] text-muted-foreground font-mono truncate font-medium">{acc.email}</div>
                      </div>
                    </div>

                    <Badge variant="emerald" className="font-mono font-bold">
                      {acc.healthScore}% Health
                    </Badge>
                  </div>

                  <div className="space-y-1.5 pt-2">
                    <div className="flex items-center justify-between text-xs">
                      <span className="text-muted-foreground font-medium">Daily Quota Utilization</span>
                      <span className="font-mono text-foreground font-bold">
                        {acc.sentToday} / {acc.dailyQuota} ({usagePercent}%)
                      </span>
                    </div>
                    <div className="w-full bg-muted rounded-full h-2 overflow-hidden border border-border">
                      <div
                        className="bg-cyan-500 h-full rounded-full transition-all duration-500"
                        style={{ width: `${usagePercent}%` }}
                      />
                    </div>
                  </div>
                </div>

                <div className="pt-3 border-t border-border space-y-2 text-xs">
                  <div className="flex items-center justify-between">
                    <span className="text-muted-foreground flex items-center gap-1.5 font-medium">
                      <Flame className="w-3.5 h-3.5 text-amber-500" />
                      <span>Warmup Status:</span>
                    </span>
                    <span className="text-amber-600 dark:text-amber-400 font-bold text-[11px]">{acc.warmupStage}</span>
                  </div>

                  <div className="flex items-center justify-between text-[11px] text-muted-foreground font-mono">
                    <span>Provider: {acc.provider}</span>
                    <span>Connected: {acc.connectedSince}</span>
                  </div>
                </div>
              </Card>
            );
          })}
        </div>
      </div>

      {/* Rotation Logic Architecture Blueprint */}
      <Card className="p-6 space-y-4">
        <h4 className="text-xs font-extrabold text-foreground uppercase tracking-wider flex items-center gap-2">
          <RotateCw className="w-4 h-4 text-purple-600 dark:text-purple-400" />
          <span>Intelligent Multi-Account Rotation Logic</span>
        </h4>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
          <div className="p-4 rounded-xl bg-muted/40 border border-border space-y-1.5">
            <div className="font-bold text-cyan-600 dark:text-cyan-400 flex items-center gap-1.5">
              <Cpu className="w-3.5 h-3.5" />
              <span>Round-Robin Load Balancing</span>
            </div>
            <p className="text-muted-foreground text-[11px] leading-relaxed">
              Dispatches are distributed evenly across the inbox pool to prevent exceeding Google Workspace sending rate-limits.
            </p>
          </div>

          <div className="p-4 rounded-xl bg-muted/40 border border-border space-y-1.5">
            <div className="font-bold text-emerald-600 dark:text-emerald-400 flex items-center gap-1.5">
              <Clock className="w-3.5 h-3.5" />
              <span>Human Emulation Jitter</span>
            </div>
            <p className="text-muted-foreground text-[11px] leading-relaxed">
              Randomized delays (180 to 420 seconds) between email dispatches mimic organic human executive sending patterns.
            </p>
          </div>

          <div className="p-4 rounded-xl bg-muted/40 border border-border space-y-1.5">
            <div className="font-bold text-amber-600 dark:text-amber-400 flex items-center gap-1.5">
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>Automatic Cool-down Circuit</span>
            </div>
            <p className="text-muted-foreground text-[11px] leading-relaxed">
              If an inbox receives an SPF/DKIM warning or temporary bounce, the router automatically pauses it for 24 hours.
            </p>
          </div>
        </div>
      </Card>
    </div>
  );
};

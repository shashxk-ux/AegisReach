import React from 'react';
import { useApp } from '../../context/AppContext';
import { stepLabel } from '../layout/nav';
import { Bar } from '../ui/motion';
import { Card, Badge, Button, PageHeader } from '../ui';
import { Flame, ShieldCheck, RotateCw, Plus, Mail, CheckCircle2, Cpu, Clock } from 'lucide-react';

const rotationSteps = [
  {
    icon: Cpu,
    color: 'text-brand',
    title: 'Round-robin load balancing',
    body: 'Dispatches are spread evenly across the inbox pool so no single Google Workspace account exceeds its sending rate limit.',
  },
  {
    icon: Clock,
    color: 'text-success',
    title: 'Human-emulation jitter',
    body: 'Randomized delays of 180 to 420 seconds between sends mimic how an executive actually writes and sends email.',
  },
  {
    icon: ShieldCheck,
    color: 'text-warning',
    title: 'Automatic cool-down circuit',
    body: 'If an inbox gets an SPF or DKIM warning or a temporary bounce, the router pauses it for 24 hours.',
  },
];

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
    <div className="space-y-10">
      <PageHeader
        eyebrow={stepLabel('accounts')}
        title="Email Warming & Inbox Rotation"
        description="Protect domain reputation and keep inbox placement high. AegisReach balances daily volume across connected Google Workspace inboxes and adds human-like sending jitter."
        actions={
          <Button variant="cyan" onClick={handleConnectNewAccount}>
            <Plus className="h-4 w-4" aria-hidden="true" />
            Connect Gmail inbox
          </Button>
        }
      />

      <Card>
        <dl className="grid grid-cols-2 divide-border md:grid-cols-4 md:divide-x">
          <div className="space-y-1.5 border-b border-border p-6 md:border-b-0">
            <dt className="text-sm text-muted-foreground">Connected accounts</dt>
            <dd className="font-mono text-3xl font-semibold text-foreground">{accounts.length}</dd>
            <dd className="flex items-center gap-1.5 text-sm text-success">
              <CheckCircle2 className="h-4 w-4 shrink-0" aria-hidden="true" />
              All tokens authenticated
            </dd>
          </div>
          <div className="space-y-1.5 border-b border-l border-border p-6 md:border-b-0 md:border-l-0">
            <dt className="text-sm text-muted-foreground">Combined daily quota</dt>
            <dd className="font-mono text-3xl font-semibold text-foreground">125</dd>
            <dd className="text-sm text-muted-foreground">50 sent today (40% capacity)</dd>
          </div>
          <div className="space-y-1.5 p-6">
            <dt className="text-sm text-muted-foreground">Reputation score</dt>
            <dd className="font-mono text-3xl font-semibold text-success">98.2%</dd>
            <dd className="text-sm text-muted-foreground">0 spam complaints recorded</dd>
          </div>
          <div className="space-y-1.5 border-l border-border p-6 md:border-l-0">
            <dt className="text-sm text-muted-foreground">Sending jitter</dt>
            <dd className="font-mono text-3xl font-semibold text-foreground">3-7 min</dd>
            <dd className="text-sm text-muted-foreground">Simulates human cadence</dd>
          </div>
        </dl>
      </Card>

      <section aria-labelledby="pool-heading" className="space-y-4">
        <h2 id="pool-heading" className="flex items-center gap-2 border-b border-border pb-4 text-lg font-semibold text-foreground">
          <Mail className="h-5 w-5 text-brand" aria-hidden="true" />
          Inboxes in the rotation pool
          <span className="font-mono text-base font-normal text-muted-foreground">({accounts.length})</span>
        </h2>

        <Card>
          <ul className="divide-y divide-border">
            {accounts.map(acc => {
              const usagePercent = Math.round((acc.sentToday / acc.dailyQuota) * 100);
              return (
                <li key={acc.id} className="grid gap-5 p-6 md:grid-cols-[minmax(0,1.1fr)_minmax(0,1fr)_minmax(0,0.9fr)] md:items-center">
                  <div className="flex items-center gap-4">
                    <img src={acc.avatar} alt="" className="h-12 w-12 rounded-full border border-border object-cover" />
                    <div className="min-w-0">
                      <p className="truncate text-base font-semibold text-foreground">{acc.displayName}</p>
                      <p className="truncate font-mono text-sm text-muted-foreground" title={acc.email}>{acc.email}</p>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <div className="flex items-baseline justify-between gap-3 text-sm">
                      <span id={`quota-${acc.id}`} className="text-muted-foreground">
                        Daily quota used
                      </span>
                      <span className="font-mono font-medium text-foreground">
                        {acc.sentToday} / {acc.dailyQuota} ({usagePercent}%)
                      </span>
                    </div>
                    <div
                      role="progressbar"
                      aria-labelledby={`quota-${acc.id}`}
                      aria-valuemin={0}
                      aria-valuemax={acc.dailyQuota}
                      aria-valuenow={acc.sentToday}
                      aria-valuetext={`${acc.sentToday} of ${acc.dailyQuota} sent, ${usagePercent} percent`}
                      className="h-2.5 w-full overflow-hidden rounded-full border border-border bg-muted"
                    >
                      <Bar percent={usagePercent} delay={0.2} className="h-full rounded-full bg-brand" />
                    </div>
                  </div>

                  <div className="space-y-2 md:text-right">
                    <Badge variant="emerald" className="font-mono">
                      {acc.healthScore}% health
                    </Badge>
                    <p className="flex items-center gap-1.5 text-sm text-warning md:justify-end">
                      <Flame className="h-4 w-4 shrink-0" aria-hidden="true" />
                      {acc.warmupStage}
                    </p>
                    <p className="font-mono text-xs text-muted-foreground">
                      {acc.provider} &middot; since {acc.connectedSince}
                    </p>
                  </div>
                </li>
              );
            })}
          </ul>
        </Card>
      </section>

      <section aria-labelledby="rotation-heading" className="space-y-5">
        <div className="flex flex-wrap items-baseline justify-between gap-x-6 gap-y-1 border-b border-border pb-4">
          <h2 id="rotation-heading" className="flex items-center gap-2 text-lg font-semibold text-foreground">
            <RotateCw className="h-5 w-5 text-steel" aria-hidden="true" />
            How rotation protects you
          </h2>
          <p className="text-sm text-muted-foreground">Three safeguards run on every send, in this order, with no configuration.</p>
        </div>
        <ol className="grid divide-y divide-border md:grid-cols-3 md:divide-x md:divide-y-0">
          {rotationSteps.map((step, index) => {
            const Icon = step.icon;
            return (
              <li key={step.title} className="flex gap-4 py-5 first:pt-0 md:px-6 md:py-0 md:first:pl-0 md:last:pr-0">
                <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg border border-border bg-muted font-mono text-sm font-semibold text-foreground">
                  {index + 1}
                </span>
                <div className="min-w-0 space-y-1">
                  <h3 className={`flex items-center gap-2 text-sm font-semibold ${step.color}`}>
                    <Icon className="h-4 w-4 shrink-0" aria-hidden="true" />
                    {step.title}
                  </h3>
                  <p className="text-sm leading-relaxed text-muted-foreground">{step.body}</p>
                </div>
              </li>
            );
          })}
        </ol>
      </section>
    </div>
  );
};

import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { stepLabel } from '../layout/nav';
import { AnimatedNumber, AutoHeight, Bar } from '../ui/motion';
import { AnimatePresence, motion } from 'motion/react';
import { springSoft } from '../ui/springs';
import { Card, Badge, Button, Input, Field, PageHeader } from '../ui';
import { Sparkles, ShieldBan, Plus, Trash2, ThumbsUp, AlertCircle, FileCode2 } from 'lucide-react';

interface DncEntry {
  id: string;
  domainOrEmail: string;
  reason: string;
  addedAt: string;
}

const replySamples = [
  {
    who: 'Elena Vance (Apex Global FinTech)',
    label: 'Positive meeting request',
    variant: 'emerald' as const,
    icon: ThumbsUp,
    quote:
      'Interesting point on DORA crosswalk and Citrix token isolation. Please send your 1-pager and loop in my Deputy CISO (alex.m@apexfintech.com) to calendar 20 mins.',
    next: 'Pre-generated calendar link response draft ready.',
  },
  {
    who: 'Sarah Jenkins (Vanguard Defense)',
    label: 'Technical artifact request',
    variant: 'purple' as const,
    icon: FileCode2,
    quote:
      'Send over the GitHub repo and the Docker harness. I want our senior kernel engineer to inspect your eBPF socket filter.',
    next: 'Whitepaper and technical repo link queued for approval.',
  },
  {
    who: 'Marcus Sterling (Helix Health)',
    label: 'Timing objection',
    variant: 'amber' as const,
    icon: AlertCircle,
    quote: 'We are in the middle of our annual hospital clinical network audit. Ping me back in late November.',
    next: 'Auto-scheduled snooze until November 15, 2026.',
  },
];

export const AnalyticsFunnel: React.FC = () => {
  const { funnelStats, showToast } = useApp();

  const [dncList, setDncList] = useState<DncEntry[]>([
    { id: 'dnc-1', domainOrEmail: '@stealth-defense.gov', reason: 'Explicit unsubscribe request', addedAt: '2026-09-10' },
    { id: 'dnc-2', domainOrEmail: 'ciso-office@meridian-bank.com', reason: 'Internal vendor freeze', addedAt: '2026-09-11' },
    { id: 'dnc-3', domainOrEmail: '@legacy-retail-systems.org', reason: 'Domain hard bounce suppression', addedAt: '2026-09-12' },
  ]);

  const [newDncInput, setNewDncInput] = useState('');
  const [dncError, setDncError] = useState('');

  const handleAddDnc = (e: React.FormEvent) => {
    e.preventDefault();
    const value = newDncInput.trim();
    if (!value) {
      setDncError('Enter an email address or a domain to suppress.');
      return;
    }
    if (!value.includes('@') && !value.includes('.')) {
      setDncError('That does not look like an email or domain. Try name@company.com or @company.com.');
      return;
    }
    if (dncList.some(item => item.domainOrEmail.toLowerCase() === value.toLowerCase())) {
      setDncError(`${value} is already on the suppression list.`);
      return;
    }

    const entry: DncEntry = {
      id: Math.random().toString(36).substring(2, 9),
      domainOrEmail: value,
      reason: 'Manual user suppression entry',
      addedAt: 'Today',
    };

    setDncList(prev => [entry, ...prev]);
    setNewDncInput('');
    setDncError('');
    showToast('info', 'Added to suppression list', `${entry.domainOrEmail} will be excluded from all future sequences.`);
  };

  const handleRemoveDnc = (id: string) => {
    setDncList(prev => prev.filter(item => item.id !== id));
    showToast('info', 'Removed from suppression', 'Contact or domain re-enabled for future sequencing.');
  };

  const funnelSteps = [
    { label: 'Sourced leads', count: funnelStats.totalSourced, rate: '100%' },
    { label: 'Tier-1 cheap pass', count: funnelStats.tier1Validated, rate: '97.2%' },
    { label: 'Tier-2 unlocked', count: funnelStats.tier2Unlocked, rate: '24.1%' },
    { label: 'Human approved', count: funnelStats.draftsApproved, rate: '12.9%' },
    { label: 'Delivered (Gmail)', count: funnelStats.emailsSent, rate: '99.4%' },
    { label: 'Opened', count: Math.round(funnelStats.emailsSent * 0.682), rate: '68.2%' },
    { label: 'Clicked link or brief', count: Math.round(funnelStats.emailsSent * 0.246), rate: '24.6%' },
    { label: 'Direct CISO replies', count: Math.round(funnelStats.emailsSent * 0.182), rate: '18.2%' },
  ];
  const top = Math.max(funnelSteps[0].count, 1);

  return (
    <div className="space-y-10">
      <PageHeader
        eyebrow={stepLabel('analytics')}
        title="Telemetry Funnel & Reply Intelligence"
        description="Opens, clicks and incoming CISO replies in one place. Replies are read by an AI intent classifier and sorted into positive, objection or suppression."
      />

      <div className="grid items-start gap-8 lg:grid-cols-[minmax(0,1.7fr)_minmax(0,1fr)]">
        <Card className="space-y-6 p-6 md:p-8">
          <h2 className="text-lg font-semibold text-foreground">End-to-end conversion funnel</h2>
          <ol className="space-y-4">
            {funnelSteps.map((step, index) => {
              const width = Math.max(2, Math.min(100, (step.count / top) * 100));
              return (
                <li key={step.label} className="space-y-1.5">
                  <div className="flex items-baseline justify-between gap-3 text-sm">
                    <span className="font-medium text-foreground">{step.label}</span>
                    <span className="font-mono text-muted-foreground">
                      <AnimatedNumber value={step.count} className="font-semibold text-foreground" /> &middot; {step.rate}
                    </span>
                  </div>
                  <div className="h-2.5 overflow-hidden rounded-full bg-muted" aria-hidden="true">
                    <Bar percent={width} delay={0.25 + index * 0.06} className="h-full rounded-full bg-brand" />
                  </div>
                </li>
              );
            })}
          </ol>
        </Card>

        <div className="space-y-8">
          <Card className="space-y-2 p-6 md:p-8">
            <p className="text-sm text-muted-foreground">Open rate</p>
            <p className="font-mono text-5xl font-semibold tracking-tight text-success">
              <AnimatedNumber value={68.2} decimals={1} />%
            </p>
            <p className="text-sm text-muted-foreground">
              Industry benchmark is <span className="font-mono font-medium text-foreground">22%</span>, so this campaign opens
              roughly three times as often.
            </p>
          </Card>
          <Card className="space-y-2 p-6 md:p-8">
            <p className="text-sm text-muted-foreground">Direct CISO reply rate</p>
            <p className="font-mono text-5xl font-semibold tracking-tight text-foreground">
              <AnimatedNumber value={18.2} decimals={1} />%
            </p>
            <p className="text-sm text-muted-foreground">Every reply is classified and paired with a suggested next action.</p>
          </Card>
        </div>
      </div>

      <div className="grid items-start gap-8 lg:grid-cols-[minmax(0,1.3fr)_minmax(0,1fr)]">
        <section aria-labelledby="intent-heading" className="space-y-4">
          <div className="flex flex-wrap items-center justify-between gap-2">
            <h2 id="intent-heading" className="flex items-center gap-2 text-lg font-semibold text-foreground">
              <Sparkles className="h-5 w-5 text-steel" aria-hidden="true" />
              AI reply intent classifier
            </h2>
            <Badge variant="purple" className="font-mono">
              Autonomous parsing
            </Badge>
          </div>
          <ul className="space-y-4">
            {replySamples.map(sample => {
              const Icon = sample.icon;
              return (
                <li key={sample.who}>
                  <Card className="space-y-3 p-5">
                    <div className="flex flex-wrap items-center justify-between gap-2">
                      <p className="text-sm font-semibold text-foreground">{sample.who}</p>
                      <Badge variant={sample.variant} className="gap-1.5">
                        <Icon className="h-3.5 w-3.5" aria-hidden="true" />
                        {sample.label}
                      </Badge>
                    </div>
                    <blockquote className="rounded-xl border border-border bg-muted/50 p-3.5 text-sm italic leading-relaxed text-muted-foreground">
                      &ldquo;{sample.quote}&rdquo;
                    </blockquote>
                    <p className="text-sm text-foreground">
                      <span className="font-semibold">Next action </span>
                      <span className="text-muted-foreground">{sample.next}</span>
                    </p>
                  </Card>
                </li>
              );
            })}
          </ul>
        </section>

        <section aria-labelledby="dnc-heading" className="space-y-4">
          <div className="flex flex-wrap items-center justify-between gap-2">
            <h2 id="dnc-heading" className="flex items-center gap-2 text-lg font-semibold text-foreground">
              <ShieldBan className="h-5 w-5 text-danger" aria-hidden="true" />
              Suppression registry
            </h2>
            <Badge variant="destructive" className="font-mono">
              {dncList.length} protected
            </Badge>
          </div>

          <Card className="space-y-6 p-5 md:p-6">
            <form onSubmit={handleAddDnc} noValidate className="space-y-3">
              <Field
                label="Email or domain to suppress"
                htmlFor="dnc-input"
                helper="Use a full address, or start with @ to block a whole domain."
                error={dncError}
              >
                <div className="flex gap-2">
                  <Input
                    id="dnc-input"
                    type="text"
                    placeholder="name@company.com or @company.com"
                    value={newDncInput}
                    onChange={e => {
                      setNewDncInput(e.target.value);
                      if (dncError) setDncError('');
                    }}
                    aria-invalid={dncError ? true : undefined}
                    aria-describedby={dncError ? 'dnc-input-error' : 'dnc-input-help'}
                    className="flex-1"
                  />
                  <Button type="submit" variant="destructive" className="shrink-0">
                    <Plus className="h-4 w-4" aria-hidden="true" />
                    Suppress
                  </Button>
                </div>
              </Field>
            </form>

            <AutoHeight>
            {dncList.length === 0 ? (
              <p className="rounded-xl border border-dashed border-border p-6 text-center text-sm text-muted-foreground">
                Nothing suppressed yet. Add a contact or domain above and it will be skipped in every future sequence.
              </p>
            ) : (
              <ul className="divide-y divide-border rounded-xl border border-border">
                <AnimatePresence initial={false}>
                {dncList.map(item => (
                  <motion.li
                    key={item.id}
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={springSoft}
                    className="overflow-hidden"
                  >
                  <div className="flex items-center justify-between gap-3 p-3.5">
                    <div className="min-w-0">
                      <p className="truncate font-mono text-sm font-medium text-foreground" title={item.domainOrEmail}>{item.domainOrEmail}</p>
                      <p className="text-xs text-muted-foreground">
                        {item.reason} &middot; added {item.addedAt}
                      </p>
                    </div>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => handleRemoveDnc(item.id)}
                      aria-label={`Remove ${item.domainOrEmail} from suppression list`}
                      className="shrink-0 text-muted-foreground hover:text-danger"
                    >
                      <Trash2 className="h-4 w-4" aria-hidden="true" />
                    </Button>
                  </div>
                  </motion.li>
                ))}
                </AnimatePresence>
              </ul>
            )}
            </AutoHeight>

            <p className="border-t border-border pt-4 text-sm leading-relaxed text-muted-foreground">
              <span className="font-semibold text-foreground">Regulatory compliance. </span>
              Suppressed domains are blocked across every connected Google Workspace account to keep you within CAN-SPAM and GDPR.
            </p>
          </Card>
        </section>
      </div>
    </div>
  );
};

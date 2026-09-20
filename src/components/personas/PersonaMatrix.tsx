import React, { useRef, useState } from 'react';
import { useApp } from '../../context/AppContext';
import { PERSONA_STRATEGIES } from '../../data/mockData';
import { PersonaType } from '../../types';
import { stepLabel } from '../layout/nav';
import { spring } from '../ui/springs';
import { AutoHeight, FadeSwap } from '../ui/motion';
import { motion } from 'motion/react';
import { Card, Badge, Button, Field, Select, PageHeader } from '../ui';
import {
  ShieldCheck,
  Activity,
  AlertTriangle,
  Cpu,
  Sparkles,
  ArrowRight,
  Code2,
  FileText,
  Layers,
  Wand2,
  type LucideIcon,
} from 'lucide-react';

const strategyMeta: Record<string, { icon: LucideIcon; variant: 'emerald' | 'cyan' | 'amber' | 'purple' }> = {
  compliance: { icon: ShieldCheck, variant: 'emerald' },
  soc_ops: { icon: Activity, variant: 'cyan' },
  vulnerability_mgmt: { icon: AlertTriangle, variant: 'amber' },
  technical: { icon: Cpu, variant: 'purple' },
};

export const PersonaMatrix: React.FC = () => {
  const { prospects, switchPersona, setSelectedProspectId, setActiveTab } = useApp();

  const [activeStrategyId, setActiveStrategyId] = useState<PersonaType>('compliance');
  const [sandboxProspectId, setSandboxProspectId] = useState<string>(prospects[0]?.id || 'pr-101');
  const tabRefs = useRef<Array<HTMLButtonElement | null>>([]);

  const selectedStrategy = PERSONA_STRATEGIES.find(s => s.id === activeStrategyId) || PERSONA_STRATEGIES[0];
  const sandboxProspect = prospects.find(p => p.id === sandboxProspectId) || prospects[0];

  const handleApplyPersonaToProspect = (personaType: PersonaType) => {
    switchPersona(sandboxProspect.id, personaType);
    setActiveStrategyId(personaType);
  };

  const handleJumpToReview = () => {
    setSelectedProspectId(sandboxProspect.id);
    setActiveTab('review');
  };

  const onTabKeyDown = (event: React.KeyboardEvent, index: number) => {
    const last = PERSONA_STRATEGIES.length - 1;
    let next = index;
    if (event.key === 'ArrowDown' || event.key === 'ArrowRight') next = index === last ? 0 : index + 1;
    else if (event.key === 'ArrowUp' || event.key === 'ArrowLeft') next = index === 0 ? last : index - 1;
    else if (event.key === 'Home') next = 0;
    else if (event.key === 'End') next = last;
    else return;
    event.preventDefault();
    setActiveStrategyId(PERSONA_STRATEGIES[next].id);
    tabRefs.current[next]?.focus();
  };

  return (
    <div className="space-y-10">
      <PageHeader
        eyebrow={stepLabel('personas')}
        title="CISO Persona Decision Matrix"
        description="Instead of one generic template, AegisReach decides whether a security leader is driven by compliance, SecOps, vulnerability management or architecture, then reshapes the message angle and CVE story to match."
        actions={
          <Badge variant="purple" className="px-3 py-1 font-mono text-sm">
            4 active archetypes
          </Badge>
        }
      />

      <div className="grid gap-8 lg:grid-cols-[minmax(0,21rem)_minmax(0,1fr)]">
        <div>
          <h2 id="archetype-heading" className="mb-3 text-sm font-medium text-muted-foreground">
            Choose an archetype to explore
          </h2>
          <div
            role="tablist"
            aria-orientation="vertical"
            aria-labelledby="archetype-heading"
            className="flex flex-col gap-2"
          >
            {PERSONA_STRATEGIES.map((strategy, index) => {
              const isSelected = activeStrategyId === strategy.id;
              const meta = strategyMeta[strategy.id] ?? strategyMeta.compliance;
              const Icon = meta.icon;
              return (
                <button
                  key={strategy.id}
                  ref={el => {
                    tabRefs.current[index] = el;
                  }}
                  type="button"
                  role="tab"
                  id={`persona-tab-${strategy.id}`}
                  aria-selected={isSelected}
                  aria-controls="persona-panel"
                  tabIndex={isSelected ? 0 : -1}
                  onClick={() => setActiveStrategyId(strategy.id)}
                  onKeyDown={event => onTabKeyDown(event, index)}
                  className={`relative flex w-full items-start gap-3.5 rounded-2xl border p-4 text-left transition-colors duration-200 ${
                    isSelected ? 'border-transparent' : 'border-border bg-card hover:border-input hover:bg-muted'
                  }`}
                >
                  {isSelected && (
                    <motion.span
                      layoutId="persona-pill"
                      aria-hidden="true"
                      transition={spring}
                      className="absolute inset-0 rounded-2xl border border-brand bg-accent"
                    />
                  )}
                  <Badge variant={meta.variant} className="relative mt-0.5 rounded-xl p-2">
                    <Icon className="h-4 w-4" aria-hidden="true" />
                  </Badge>
                  <span className="relative min-w-0 flex-1 space-y-1">
                    <span className="block text-sm font-semibold text-foreground">{strategy.title}</span>
                    <span className="line-clamp-2 block text-sm text-muted-foreground">{strategy.messagingHook}</span>
                    <span className="block pt-1 font-mono text-xs text-foreground">
                      {strategy.certifications.slice(0, 2).join(' · ')}
                    </span>
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        <Card
          role="tabpanel"
          id="persona-panel"
          aria-labelledby={`persona-tab-${activeStrategyId}`}
          tabIndex={0}
          className="p-6 md:p-8"
        >
          <AutoHeight>
          <FadeSwap swapKey={activeStrategyId} className="space-y-8">
          <div className="flex flex-col justify-between gap-4 border-b border-border pb-6 md:flex-row md:items-center">
            <div className="space-y-1">
              <p className="text-xs font-medium uppercase tracking-[0.14em] text-muted-foreground">Strategy deep dive</p>
              <h2 className="flex flex-wrap items-center gap-2 text-2xl font-semibold tracking-tight text-foreground">
                {selectedStrategy.title}
                <Badge variant="purple">System archetype</Badge>
              </h2>
            </div>
            <p className="text-sm text-muted-foreground">
              Triggered by role
              <span className="ml-2 rounded-md border border-border bg-muted px-2.5 py-1 font-mono text-foreground">
                {selectedStrategy.targetTitles[0]}
              </span>
            </p>
          </div>

          <div className="grid gap-8 2xl:grid-cols-2">
            <section aria-labelledby="pain-heading" className="space-y-4">
              <h3 id="pain-heading" className="flex items-center gap-2 text-sm font-semibold text-foreground">
                <Layers className="h-4 w-4 text-brand" aria-hidden="true" />
                Core drivers and fiduciary pressures
              </h3>
              <ul className="space-y-2">
                {selectedStrategy.corePainPoints.map(pain => (
                  <li
                    key={pain}
                    className="flex items-start gap-3 rounded-xl border border-border bg-muted/50 p-3.5 text-sm text-foreground"
                  >
                    <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-brand" aria-hidden="true" />
                    <span>{pain}</span>
                  </li>
                ))}
              </ul>
              <div className="space-y-2 rounded-xl border border-warning/30 bg-warning/10 p-4">
                <h4 className="flex items-center gap-2 text-sm font-semibold text-warning">
                  <AlertTriangle className="h-4 w-4" aria-hidden="true" />
                  CVE and vulnerability narrative
                </h4>
                <p className="text-sm leading-relaxed text-foreground">{selectedStrategy.cvePitchAngle}</p>
              </div>
            </section>

            <section aria-labelledby="prompt-heading" className="space-y-4">
              <h3 id="prompt-heading" className="flex items-center gap-2 text-sm font-semibold text-foreground">
                <Code2 className="h-4 w-4 text-steel" aria-hidden="true" />
                Decision engine prompt
              </h3>
              <div className="space-y-3 rounded-xl border border-border bg-muted/50 p-4 font-mono text-sm">
                <p className="font-semibold text-steel">// AegisReach dynamic prompt template</p>
                <p className="leading-relaxed text-muted-foreground">{selectedStrategy.systemPromptSnippet}</p>
                <div className="space-y-2 border-t border-border pt-3 text-xs text-muted-foreground">
                  <p>Variables injected</p>
                  <ul className="flex flex-wrap gap-1.5">
                    {['{{CISO_NAME}}', '{{COMPANY}}', '{{TECH_STACK_ITEM}}', '{{CVE_ID}}', '{{EPSS}}'].map(v => (
                      <li key={v}>
                        <code className="rounded border border-steel/30 bg-steel/10 px-1.5 py-0.5 font-semibold text-steel">
                          {v}
                        </code>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
              <div className="space-y-2 rounded-xl border border-border bg-card p-4">
                <h4 className="text-sm font-medium text-foreground">Target certifications</h4>
                <ul className="flex flex-wrap gap-1.5">
                  {selectedStrategy.certifications.map(cert => (
                    <li key={cert}>
                      <Badge variant="outline" className="font-mono">
                        {cert}
                      </Badge>
                    </li>
                  ))}
                </ul>
              </div>
            </section>
          </div>
          </FadeSwap>
          </AutoHeight>
        </Card>
      </div>

      <Card className="space-y-8 p-6 md:p-8" aria-labelledby="sandbox-heading" role="region">
        <div className="flex flex-col justify-between gap-5 lg:flex-row lg:items-end">
          <div className="max-w-xl space-y-1.5">
            <p className="flex items-center gap-2 text-xs font-medium uppercase tracking-[0.14em] text-brand">
              <Wand2 className="h-4 w-4" aria-hidden="true" />
              Interactive sandbox
            </p>
            <h2 id="sandbox-heading" className="text-xl font-semibold tracking-tight text-foreground">
              Live messaging simulator
            </h2>
            <p className="text-sm text-muted-foreground">
              Pick a prospect, then switch personas to watch the hook and tone recalibrate instantly.
            </p>
          </div>

          <Field label="Target prospect" htmlFor="sandbox-prospect" className="w-full lg:w-96">
            <Select id="sandbox-prospect" value={sandboxProspectId} onChange={e => setSandboxProspectId(e.target.value)}>
              {prospects.map(p => (
                <option key={p.id} value={p.id}>
                  {p.name} · {p.company} ({p.persona.label})
                </option>
              ))}
            </Select>
          </Field>
        </div>

        <fieldset className="space-y-3">
          <legend className="text-sm font-medium text-foreground">Messaging persona for {sandboxProspect.name}</legend>
          <div className="flex flex-wrap gap-2">
            {PERSONA_STRATEGIES.map(strat => {
              const isApplied = sandboxProspect.persona.type === strat.id;
              return (
                <label key={strat.id} className="cursor-pointer">
                  <input
                    type="radio"
                    name="sandbox-persona"
                    value={strat.id}
                    checked={isApplied}
                    onChange={() => handleApplyPersonaToProspect(strat.id)}
                    className="peer sr-only"
                  />
                  <span className="inline-flex min-h-10 items-center gap-2 rounded-xl border border-border bg-card px-4 text-sm font-medium text-foreground transition-colors hover:border-input hover:bg-muted peer-checked:border-brand peer-checked:bg-brand peer-checked:text-brand-foreground peer-focus-visible:outline peer-focus-visible:outline-[3px] peer-focus-visible:outline-offset-2 peer-focus-visible:outline-ring">
                    {isApplied && <Sparkles className="h-4 w-4" aria-hidden="true" />}
                    {strat.title}
                  </span>
                </label>
              );
            })}
          </div>
        </fieldset>

        <p role="status" className="sr-only-live">
          Persona for {sandboxProspect.name} set to {sandboxProspect.persona.label}. Preview updated.
        </p>

        <AutoHeight>
        <div className="grid gap-6 rounded-2xl border border-border bg-muted/40 p-5 lg:grid-cols-3 md:p-6">
          <section aria-labelledby="context-heading" className="space-y-3">
            <h3 id="context-heading" className="text-sm font-medium text-muted-foreground">
              AI decision context
            </h3>
            <dl className="space-y-3 rounded-xl border border-border bg-card p-4 text-sm">
              <div className="flex items-center justify-between gap-3">
                <dt className="text-muted-foreground">Prospect</dt>
                <dd className="font-semibold text-foreground">{sandboxProspect.name}</dd>
              </div>
              <div className="flex items-center justify-between gap-3">
                <dt className="text-muted-foreground">Company</dt>
                <dd className="font-medium text-brand">{sandboxProspect.company}</dd>
              </div>
              <div className="flex items-center justify-between gap-3">
                <dt className="text-muted-foreground">Tech anchor</dt>
                <dd className="font-mono text-foreground">{sandboxProspect.techStack[0]?.name}</dd>
              </div>
              <div className="flex items-center justify-between gap-3">
                <dt className="text-muted-foreground">Matched CVE</dt>
                <dd className="font-mono font-semibold text-danger">{sandboxProspect.matchedVulnerability.cveId}</dd>
              </div>
              <div className="border-t border-border pt-3">
                <dt className="sr-only">Rationale</dt>
                <dd className="text-muted-foreground">{sandboxProspect.persona.rationale}</dd>
              </div>
            </dl>
          </section>

          <section aria-labelledby="preview-heading" className="space-y-3 lg:col-span-2">
            <div className="flex flex-wrap items-center justify-between gap-2">
              <h3 id="preview-heading" className="flex items-center gap-2 text-sm font-medium text-muted-foreground">
                <FileText className="h-4 w-4 text-brand" aria-hidden="true" />
                Synthesized outreach
              </h3>
              <Badge variant="purple" className="font-mono">
                Persona: {sandboxProspect.persona.label}
              </Badge>
            </div>
            <FadeSwap
              swapKey={`${sandboxProspect.id}-${sandboxProspect.persona.type}`}
              className="space-y-3 rounded-xl border border-border bg-card p-5 text-sm"
            >
              <p className="border-b border-border pb-3">
                <span className="text-muted-foreground">Subject </span>
                <span className="font-semibold text-foreground">{sandboxProspect.outreachDraft.subject}</span>
              </p>
              <p className="whitespace-pre-line leading-relaxed text-muted-foreground">{sandboxProspect.outreachDraft.body}</p>
            </FadeSwap>
            <div className="flex justify-end">
              <Button variant="cyan" onClick={handleJumpToReview}>
                Open in Observer Review
                <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </Button>
            </div>
          </section>
        </div>
        </AutoHeight>
      </Card>
    </div>
  );
};

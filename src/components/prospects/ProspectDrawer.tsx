import React from 'react';
import { useApp } from '../../context/AppContext';
import { Button, Badge, Card, Dialog } from '../ui';
import {
  X,
  ShieldAlert,
  Sparkles,
  Mail,
  Phone,
  Coins,
  Cpu,
  Award,
  FileText,
  Radio,
  ArrowRight,
  Lock,
} from 'lucide-react';

const personaVariant = {
  compliance: 'emerald',
  soc_ops: 'cyan',
  vulnerability_mgmt: 'amber',
  technical: 'purple',
} as const;

export const ProspectDrawer: React.FC = () => {
  const { isDrawerOpen, closeDossier, selectedProspect, unlockTier2, setActiveTab, setSelectedProspectId } = useApp();

  const handleReviewClick = () => {
    if (!selectedProspect) return;
    setSelectedProspectId(selectedProspect.id);
    closeDossier();
    setActiveTab('review');
  };

  const open = isDrawerOpen && !!selectedProspect;
  const p = selectedProspect;

  return (
    <Dialog open={open} onClose={closeDossier} label={p ? `Research dossier for ${p.name}` : 'Research dossier'} variant="drawer">
      {p && (
        <div className="flex h-full flex-col">
          <div className="flex shrink-0 items-start justify-between gap-4 border-b border-border p-6">
            <div className="flex items-center gap-4">
              <img src={p.avatar} alt="" className="h-16 w-16 rounded-2xl border border-border object-cover" />
              <div className="min-w-0">
                <div className="flex flex-wrap items-center gap-2">
                  <h2 className="text-xl font-semibold tracking-tight text-foreground">{p.name}</h2>
                  <Badge variant="secondary">{p.source}</Badge>
                </div>
                <p className="mt-0.5 text-sm text-muted-foreground">{p.title}</p>
                <p className="mt-1 text-sm text-muted-foreground">
                  <span className="font-medium text-brand">{p.company}</span> &middot; {p.location} &middot; {p.companySize}
                </p>
              </div>
            </div>
            <Button variant="ghost" size="icon" onClick={closeDossier} aria-label="Close dossier" className="shrink-0">
              <X className="h-5 w-5" aria-hidden="true" />
            </Button>
          </div>

          <div
            role="region"
            aria-label="Dossier details"
            tabIndex={0}
            className="flex-1 space-y-8 overflow-y-auto p-6"
          >
            <Card className="space-y-4 p-5">
              <div className="flex flex-wrap items-center justify-between gap-2">
                <h3 className="text-sm font-semibold text-foreground">Contact enrichment</h3>
                <Badge variant="emerald" className="font-mono">
                  Tier-1 cheap pass ($0) active
                </Badge>
              </div>

              {p.tier2Enriched.unlocked ? (
                <dl className="grid gap-3 sm:grid-cols-2">
                  <div className="min-w-0 space-y-1 rounded-xl border border-border bg-muted/50 p-3">
                    <dt className="flex items-center gap-2 text-xs text-muted-foreground">
                      <Mail className="h-4 w-4 shrink-0 text-brand" aria-hidden="true" />
                      Verified direct email
                    </dt>
                    <dd className="truncate font-mono text-sm font-medium text-foreground" title={p.tier2Enriched.workEmail}>
                      {p.tier2Enriched.workEmail}
                    </dd>
                  </div>
                  <div className="min-w-0 space-y-1 rounded-xl border border-border bg-muted/50 p-3">
                    <dt className="flex items-center gap-2 text-xs text-muted-foreground">
                      <Phone className="h-4 w-4 shrink-0 text-success" aria-hidden="true" />
                      Direct phone line
                    </dt>
                    <dd className="font-mono text-sm font-medium text-foreground">{p.tier2Enriched.directPhone}</dd>
                  </div>
                </dl>
              ) : (
                <div className="flex flex-wrap items-center justify-between gap-3 rounded-xl border border-warning/30 bg-warning/10 p-3.5">
                  <p className="flex items-center gap-2.5 text-sm text-foreground">
                    <Lock className="h-4 w-4 shrink-0 text-warning" aria-hidden="true" />
                    Direct email and phone are locked. Syntax and MX records are verified.
                  </p>
                  <Button variant="cyan" size="sm" onClick={() => unlockTier2(p.id)}>
                    <Coins className="h-4 w-4" aria-hidden="true" />
                    Unlock (1 credit)
                  </Button>
                </div>
              )}
            </Card>

            <Card className="space-y-4 p-5">
              <div className="flex flex-wrap items-center justify-between gap-2">
                <h3 className="flex items-center gap-2 text-sm font-semibold text-foreground">
                  <Sparkles className="h-4 w-4 text-brand" aria-hidden="true" />
                  AI persona classification
                </h3>
                <Badge variant={personaVariant[p.persona.type as keyof typeof personaVariant] ?? 'purple'} className="font-mono">
                  {p.persona.confidence}% confidence
                </Badge>
              </div>
              <p className="text-lg font-semibold tracking-tight text-foreground">{p.persona.label}</p>
              <p className="text-sm leading-relaxed text-muted-foreground">{p.persona.rationale}</p>
              <div className="space-y-2 border-t border-border pt-4">
                <h4 className="text-sm font-medium text-foreground">Trigger signals detected</h4>
                <ul className="space-y-1.5">
                  {p.persona.triggerSignals.map(signal => (
                    <li key={signal} className="flex items-start gap-2.5 text-sm text-muted-foreground">
                      <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-brand" aria-hidden="true" />
                      <span>{signal}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </Card>

            <section className="space-y-3" aria-labelledby="dossier-stack">
              <h3 id="dossier-stack" className="flex items-center gap-2 text-sm font-semibold text-foreground">
                <Cpu className="h-4 w-4 text-brand" aria-hidden="true" />
                Detected tech stack ({p.techStack.length})
              </h3>
              <ul className="grid gap-2.5 sm:grid-cols-2">
                {p.techStack.map(tech => (
                  <li key={tech.name} className="rounded-xl border border-border bg-card p-3">
                    <p className="text-sm font-medium text-foreground">{tech.name}</p>
                    <p className="mt-1 flex items-center justify-between gap-2 text-xs text-muted-foreground">
                      <span>{tech.category}</span>
                      <span className="font-mono font-medium text-brand">{tech.detectedVia}</span>
                    </p>
                  </li>
                ))}
              </ul>
            </section>

            <section
              aria-labelledby="dossier-threat"
              className="space-y-4 rounded-2xl border border-danger/30 bg-danger/5 p-5"
            >
              <div className="flex flex-wrap items-center justify-between gap-2">
                <h3 id="dossier-threat" className="flex items-center gap-2 text-sm font-semibold text-danger">
                  <ShieldAlert className="h-4 w-4" aria-hidden="true" />
                  Matched threat advisory
                </h3>
                <Badge variant="outline" className="border-danger/40 font-mono text-danger">
                  {p.matchedVulnerability.advisorySource}
                </Badge>
              </div>
              <div className="flex flex-wrap items-start justify-between gap-3">
                <div>
                  <p className="font-mono text-base font-semibold text-foreground">{p.matchedVulnerability.cveId}</p>
                  <p className="text-sm font-medium text-danger">{p.matchedVulnerability.name}</p>
                </div>
                <div className="flex items-center gap-2">
                  <Badge variant="destructive" className="font-mono">
                    CVSS {p.matchedVulnerability.cvss}
                  </Badge>
                  <Badge variant="outline" className="border-danger/40 font-mono text-danger">
                    EPSS {p.matchedVulnerability.epssScore}
                  </Badge>
                </div>
              </div>
              <p className="text-sm leading-relaxed text-muted-foreground">{p.matchedVulnerability.summary}</p>
              <div className="rounded-xl border border-danger/30 bg-card p-4">
                <h4 className="mb-1 text-xs font-semibold uppercase tracking-wider text-danger">Executive impact</h4>
                <p className="text-sm leading-relaxed text-muted-foreground">{p.matchedVulnerability.businessImpact}</p>
              </div>
            </section>

            <section className="space-y-3" aria-labelledby="dossier-signals">
              <h3 id="dossier-signals" className="flex items-center gap-2 text-sm font-semibold text-foreground">
                <FileText className="h-4 w-4 text-steel" aria-hidden="true" />
                Recent talks, papers and accolades
              </h3>
              <ul className="space-y-2">
                {p.researchSignals.recentPublications.map(pub => (
                  <li key={pub} className="flex items-center gap-2.5 rounded-xl border border-border bg-card p-3 text-sm text-foreground">
                    <Award className="h-4 w-4 shrink-0 text-warning" aria-hidden="true" />
                    <span>{pub}</span>
                  </li>
                ))}
                {p.researchSignals.recentTalks.map(talk => (
                  <li key={talk} className="flex items-center gap-2.5 rounded-xl border border-border bg-card p-3 text-sm text-foreground">
                    <Radio className="h-4 w-4 shrink-0 text-brand" aria-hidden="true" />
                    <span>{talk}</span>
                  </li>
                ))}
              </ul>
            </section>
          </div>

          <div className="flex shrink-0 flex-wrap items-center justify-between gap-3 border-t border-border p-5">
            <p className="text-sm text-muted-foreground">Observer mode: the email is created as a Gmail draft.</p>
            <Button variant="cyan" onClick={handleReviewClick}>
              Review outreach draft
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </Button>
          </div>
        </div>
      )}
    </Dialog>
  );
};

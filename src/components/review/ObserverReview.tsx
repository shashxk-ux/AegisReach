import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { stepLabel } from '../layout/nav';
import { Card, Badge, Button, Input, Textarea, Select, Field, Dialog, PageHeader } from '../ui';
import {
  Eye,
  Send,
  ShieldAlert,
  Mail,
  CheckCircle2,
  RefreshCw,
  Check,
  Lock,
  Coins,
  AlertCircle,
} from 'lucide-react';
import { PERSONA_STRATEGIES } from '../../data/mockData';
import { AutoHeight, FadeSwap } from '../ui/motion';

const personaVariant = {
  compliance: 'emerald',
  soc_ops: 'cyan',
  vulnerability_mgmt: 'amber',
  technical: 'purple',
} as const;

export const ObserverReview: React.FC = () => {
  const {
    prospects,
    selectedProspect,
    setSelectedProspectId,
    syncToGmailDraft,
    approveAndSendEmail,
    updateDraft,
    switchPersona,
    unlockTier2,
  } = useApp();

  const [isSyncing, setIsSyncing] = useState(false);
  const [isSending, setIsSending] = useState(false);
  const [confirmOpen, setConfirmOpen] = useState(false);
  const [prevProspectId, setPrevProspectId] = useState(selectedProspect?.id);
  const [subjectText, setSubjectText] = useState(selectedProspect?.outreachDraft.subject || '');
  const [bodyText, setBodyText] = useState(selectedProspect?.outreachDraft.body || '');

  // Keep editor state in sync when selected prospect changes without synchronous effect setState
  if (selectedProspect && selectedProspect.id !== prevProspectId) {
    setPrevProspectId(selectedProspect.id);
    setSubjectText(selectedProspect.outreachDraft.subject);
    setBodyText(selectedProspect.outreachDraft.body);
  }

  if (!selectedProspect) return null;
  const p = selectedProspect;

  const handleSubjectChange = (val: string) => {
    setSubjectText(val);
    updateDraft(p.id, val, bodyText);
  };

  const handleBodyChange = (val: string) => {
    setBodyText(val);
    updateDraft(p.id, subjectText, val);
  };

  const handleSyncToGmail = async () => {
    setIsSyncing(true);
    await new Promise(r => setTimeout(r, 600));
    await syncToGmailDraft(p.id);
    setIsSyncing(false);
  };

  const handleSendNow = async () => {
    setConfirmOpen(false);
    setIsSending(true);
    await new Promise(r => setTimeout(r, 700));
    await approveAndSendEmail(p.id);
    setIsSending(false);
  };

  const status = p.outreachDraft.status;
  const alreadySent = status === 'sent';

  return (
    <div className="space-y-10">
      <PageHeader
        eyebrow={stepLabel('review')}
        title="Observer Review Console"
        description="Read the AI research and the draft it wrote, edit anything, then push it to your Gmail Drafts folder. Nothing sends until you approve."
        actions={
          <Field label="Target prospect" htmlFor="review-target" className="w-full sm:w-80">
            <Select id="review-target" value={p.id} onChange={e => setSelectedProspectId(e.target.value)}>
              {prospects.map(pr => (
                <option key={pr.id} value={pr.id}>
                  {pr.name} ({pr.company})
                </option>
              ))}
            </Select>
          </Field>
        }
      />

      <div className="grid items-start gap-8 lg:grid-cols-12">
        <Card className="lg:col-span-5">
          <AutoHeight>
          <div className="divide-y divide-border">
          <section aria-labelledby="dossier-h" className="space-y-4 p-6">
            <div className="flex items-center justify-between">
              <h2 id="dossier-h" className="text-sm font-semibold text-foreground">
                Prospect dossier
              </h2>
              <Badge variant="secondary" className="font-mono">
                {p.source}
              </Badge>
            </div>
            <div className="flex items-center gap-4">
              <img src={p.avatar} alt="" className="h-14 w-14 rounded-2xl border border-border object-cover" />
              <div className="min-w-0">
                <p className="text-base font-semibold text-foreground">{p.name}</p>
                <p className="text-sm text-muted-foreground">{p.title}</p>
                <p className="text-sm font-medium text-brand">{p.company}</p>
              </div>
            </div>

            <div className="rounded-xl border border-border bg-muted/50 p-4">
              {p.tier2Enriched.unlocked ? (
                <dl className="space-y-2 text-sm">
                  <div className="flex items-center justify-between gap-3">
                    <dt className="text-muted-foreground">Work email</dt>
                    <dd className="min-w-0 truncate font-mono font-medium text-brand" title={p.tier2Enriched.workEmail}>{p.tier2Enriched.workEmail}</dd>
                  </div>
                  <div className="flex items-center justify-between gap-3">
                    <dt className="text-muted-foreground">Direct phone</dt>
                    <dd className="font-mono text-foreground">{p.tier2Enriched.directPhone}</dd>
                  </div>
                </dl>
              ) : (
                <div className="flex flex-wrap items-center justify-between gap-3">
                  <p className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Lock className="h-4 w-4 text-warning" aria-hidden="true" />
                    Direct contacts are locked
                  </p>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => unlockTier2(p.id)}
                    className="gap-2 border-warning/40 text-warning hover:bg-warning/10"
                  >
                    <Coins className="h-4 w-4" aria-hidden="true" />
                    Unlock (1 credit)
                  </Button>
                </div>
              )}
            </div>
          </section>

          <section aria-labelledby="persona-h" className="space-y-4 p-6">
            <div className="flex items-center justify-between gap-2">
              <h2 id="persona-h" className="text-sm font-semibold text-foreground">
                Persona decision
              </h2>
              <Badge variant={personaVariant[p.persona.type as keyof typeof personaVariant] ?? 'purple'}>
                {p.persona.confidence}% confidence
              </Badge>
            </div>
            <FadeSwap swapKey={`${p.id}-${p.persona.type}`} className="space-y-1.5">
              <p className="text-base font-semibold text-foreground">{p.persona.label}</p>
              <p className="text-sm leading-relaxed text-muted-foreground">{p.persona.rationale}</p>
            </FadeSwap>

            <div className="border-t border-border pt-4">
            <fieldset className="space-y-2.5">
              <legend className="mb-2.5 text-sm font-medium text-foreground">Re-tune the persona</legend>
              <div className="grid grid-cols-2 gap-2">
                {PERSONA_STRATEGIES.map(strat => {
                  const isCurrent = p.persona.type === strat.id;
                  return (
                    <label key={strat.id} className="cursor-pointer">
                      <input
                        type="radio"
                        name="review-persona"
                        value={strat.id}
                        checked={isCurrent}
                        onChange={() => switchPersona(p.id, strat.id)}
                        className="peer sr-only"
                      />
                      <span className="flex min-h-10 items-center justify-center rounded-xl border border-border bg-card px-3 text-center text-sm font-medium text-foreground transition-colors hover:border-input hover:bg-muted peer-checked:border-brand peer-checked:bg-brand peer-checked:text-brand-foreground peer-focus-visible:outline peer-focus-visible:outline-[3px] peer-focus-visible:outline-offset-2 peer-focus-visible:outline-ring">
                        {strat.title.split(' ')[0]} focus
                      </span>
                    </label>
                  );
                })}
              </div>
            </fieldset>
            </div>
          </section>

          <section aria-labelledby="threat-h" className="space-y-4 bg-danger/5 p-6">
            <div className="flex items-center justify-between gap-2">
              <h2 id="threat-h" className="flex items-center gap-2 text-sm font-semibold text-danger">
                <ShieldAlert className="h-4 w-4" aria-hidden="true" />
                Weaponized threat anchor
              </h2>
              <Badge variant="outline" className="border-danger/40 font-mono text-danger">
                {p.matchedVulnerability.cveId}
              </Badge>
            </div>
            <div className="space-y-2">
              <p className="text-base font-semibold text-foreground">{p.matchedVulnerability.name}</p>
              <div className="flex flex-wrap items-center gap-2">
                <Badge variant="destructive" className="font-mono">
                  CVSS {p.matchedVulnerability.cvss}
                </Badge>
                <Badge variant="outline" className="border-danger/40 font-mono text-danger">
                  EPSS {p.matchedVulnerability.epssScore}
                </Badge>
                <span className="text-xs font-medium text-muted-foreground">CISA KEV exploited</span>
              </div>
            </div>
            <p className="text-sm leading-relaxed text-muted-foreground">{p.matchedVulnerability.summary}</p>
            <p className="border-t border-danger/20 pt-3 text-sm text-muted-foreground">
              <span className="font-medium text-danger">Detected asset </span>
              <span className="font-mono font-medium text-foreground">{p.techStack[0]?.name}</span>
            </p>
          </section>
          </div>
          </AutoHeight>
        </Card>

        <Card className="space-y-6 p-6 md:p-8 lg:col-span-7">
          <div className="flex flex-col justify-between gap-3 border-b border-border pb-5 sm:flex-row sm:items-center">
            <div className="space-y-1">
              <h2 className="flex items-center gap-2 text-lg font-semibold text-foreground">
                <Mail className="h-5 w-5 text-brand" aria-hidden="true" />
                Outreach workbench
              </h2>
              <p className="text-sm text-muted-foreground">
                Sender <span className="font-medium text-foreground">shashank@aegisreach.ai</span> via Gmail OAuth 2.0
              </p>
            </div>

            <div role="status" aria-live="polite">
              {status === 'gmail_draft' ? (
                <Badge variant="emerald" className="gap-1.5 py-1 font-mono">
                  <CheckCircle2 className="h-4 w-4" aria-hidden="true" />
                  Gmail draft {p.outreachDraft.gmailDraftId}
                </Badge>
              ) : status === 'sent' ? (
                <Badge variant="cyan" className="gap-1.5 py-1">
                  <Check className="h-4 w-4" aria-hidden="true" />
                  Sent, telemetry active
                </Badge>
              ) : (
                <Badge variant="amber" className="gap-1.5 py-1">
                  <AlertCircle className="h-4 w-4" aria-hidden="true" />
                  Pending human review
                </Badge>
              )}
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-2 rounded-xl border border-border bg-muted/50 p-3 text-sm">
            <span className="font-medium text-muted-foreground">Injected tokens</span>
            {['{{Name}}', '{{Company}}', '{{TechStackItem}}', '{{CVE_ID}}'].map(token => (
              <code key={token} className="rounded-md border border-border bg-card px-2 py-0.5 font-mono text-xs text-foreground">
                {token}
              </code>
            ))}
          </div>

          <Field label="Email subject" htmlFor="draft-subject">
            <Input
              id="draft-subject"
              type="text"
              value={subjectText}
              onChange={e => handleSubjectChange(e.target.value)}
              className="font-medium"
              disabled={alreadySent}
            />
          </Field>

          <div className="flex flex-col gap-2">
            <div className="flex items-baseline justify-between gap-3">
              <label htmlFor="draft-body" className="text-sm font-medium text-foreground">
                Personalized outreach copy
              </label>
              <span id="draft-body-count" className="font-mono text-xs text-muted-foreground">
                {bodyText.length} characters
              </span>
            </div>
            <Textarea
              id="draft-body"
              rows={12}
              value={bodyText}
              onChange={e => handleBodyChange(e.target.value)}
              aria-describedby="draft-body-count"
              className="resize-y"
              disabled={alreadySent}
            />
          </div>

          <div className="rounded-xl border border-border bg-muted/50 p-4 text-sm">
            <p className="flex items-start gap-2.5 text-muted-foreground">
              <Eye className="mt-0.5 h-4 w-4 shrink-0 text-brand" aria-hidden="true" />
              <span>
                <strong className="font-semibold text-foreground">Observer protection.</strong> Saving a draft fills your Gmail Drafts
                folder without dispatching anything.
              </span>
            </p>
          </div>

          <div className="flex flex-wrap items-center justify-between gap-3 border-t border-border pt-6">
            <Button variant="ghost" onClick={() => switchPersona(p.id, p.persona.type)} className="text-muted-foreground">
              <RefreshCw className="h-4 w-4" aria-hidden="true" />
              Regenerate with AI
            </Button>

            <div className="flex flex-wrap items-center gap-2.5">
              <Button variant="outline" disabled={isSyncing || alreadySent} aria-busy={isSyncing} onClick={handleSyncToGmail}>
                {isSyncing ? (
                  <RefreshCw className="h-4 w-4 animate-spin text-brand" aria-hidden="true" />
                ) : (
                  <Mail className="h-4 w-4 text-muted-foreground" aria-hidden="true" />
                )}
                {isSyncing ? 'Pushing to Gmail…' : 'Push to Gmail Drafts'}
              </Button>

              <Button variant="cyan" disabled={isSending || alreadySent} aria-busy={isSending} onClick={() => setConfirmOpen(true)}>
                {isSending ? (
                  <RefreshCw className="h-4 w-4 animate-spin" aria-hidden="true" />
                ) : (
                  <Send className="h-4 w-4" aria-hidden="true" />
                )}
                {isSending ? 'Dispatching…' : alreadySent ? 'Already sent' : 'Approve & dispatch'}
              </Button>
            </div>
          </div>
        </Card>
      </div>

      <Dialog open={confirmOpen} onClose={() => setConfirmOpen(false)} label="Confirm dispatch" variant="modal" className="max-w-md">
        <div className="space-y-5 p-6">
          <div className="space-y-2">
            <h2 className="text-lg font-semibold text-foreground">Send this email to {p.name}?</h2>
            <p className="text-sm leading-relaxed text-muted-foreground">
              It will be dispatched from <span className="font-medium text-foreground">shashank@aegisreach.ai</span> right away and
              cannot be recalled. To keep it as a draft instead, choose Cancel and use Push to Gmail Drafts.
            </p>
          </div>
          <div className="rounded-xl border border-border bg-muted/50 p-3 text-sm">
            <p className="text-muted-foreground">Subject</p>
            <p className="font-medium text-foreground">{subjectText}</p>
          </div>
          <div className="flex justify-end gap-2.5">
            <Button variant="outline" onClick={() => setConfirmOpen(false)}>
              Cancel
            </Button>
            <Button variant="cyan" onClick={handleSendNow}>
              <Send className="h-4 w-4" aria-hidden="true" />
              Send now
            </Button>
          </div>
        </div>
      </Dialog>
    </div>
  );
};

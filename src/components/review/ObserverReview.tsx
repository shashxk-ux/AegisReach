import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { Card, Badge, Button, Input } from '../ui';
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
  AlertCircle
} from 'lucide-react';
import { PERSONA_STRATEGIES } from '../../data/mockData';

export const ObserverReview: React.FC = () => {
  const { 
    prospects, 
    selectedProspect, 
    setSelectedProspectId, 
    syncToGmailDraft, 
    approveAndSendEmail, 
    updateDraft, 
    switchPersona, 
    unlockTier2
  } = useApp();

  const [isSyncing, setIsSyncing] = useState(false);
  const [isSending, setIsSending] = useState(false);
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

  const handleSubjectChange = (val: string) => {
    setSubjectText(val);
    updateDraft(selectedProspect.id, val, bodyText);
  };

  const handleBodyChange = (val: string) => {
    setBodyText(val);
    updateDraft(selectedProspect.id, subjectText, val);
  };

  const handleSyncToGmail = async () => {
    setIsSyncing(true);
    await new Promise(r => setTimeout(r, 600));
    await syncToGmailDraft(selectedProspect.id);
    setIsSyncing(false);
  };

  const handleSendNow = async () => {
    setIsSending(true);
    await new Promise(r => setTimeout(r, 700));
    await approveAndSendEmail(selectedProspect.id);
    setIsSending(false);
  };

  const personaBadgeVariant = 
    selectedProspect.persona.type === 'compliance'
      ? 'emerald'
      : selectedProspect.persona.type === 'soc_ops'
      ? 'cyan'
      : selectedProspect.persona.type === 'vulnerability_mgmt'
      ? 'amber'
      : 'purple';

  return (
    <div className="space-y-4 max-w-7xl mx-auto">
      {/* Top Bar: Prospect Navigation & Observer Status */}
      <Card className="p-4 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <Badge variant="cyan" className="p-2 rounded-xl">
            <Eye className="w-4 h-4" />
          </Badge>
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-sm font-extrabold text-foreground">Observer Review Console</h2>
              <Badge variant="cyan" className="font-mono text-[10px] font-bold">
                Human-in-the-loop
              </Badge>
            </div>
            <p className="text-[11px] text-muted-foreground">
              Review AI-synthesized research & email draft. Push directly to your connected Gmail account Drafts folder.
            </p>
          </div>
        </div>

        {/* Prospect Selector */}
        <div className="flex items-center gap-2">
          <span className="text-xs text-muted-foreground font-semibold">Target:</span>
          <select
            aria-label="Select target prospect"
            value={selectedProspect.id}
            onChange={e => setSelectedProspectId(e.target.value)}
            className="bg-card border border-input rounded-md px-3 py-1.5 text-xs text-foreground font-semibold focus:outline-none focus:ring-2 focus:ring-ring cursor-pointer"
          >
            {prospects.map(p => (
              <option key={p.id} value={p.id}>
                {p.name} ({p.company})
              </option>
            ))}
          </select>
        </div>
      </Card>

      {/* Split-Screen Workbench */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left 5 Columns: AI Intelligence Dossier & Threat Context */}
        <div className="lg:col-span-5 space-y-4">
          {/* Target Profile Card */}
          <Card className="p-5 space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-muted-foreground uppercase tracking-wider">
                Prospect Dossier
              </span>
              <Badge variant="secondary" className="font-mono text-[10px]">
                {selectedProspect.source}
              </Badge>
            </div>

            <div className="flex items-center gap-3.5">
              <img
                src={selectedProspect.avatar}
                alt={selectedProspect.name}
                className="w-14 h-14 rounded-2xl object-cover border-2 border-border shadow-sm"
              />
              <div className="min-w-0">
                <h3 className="text-base font-extrabold text-foreground truncate">{selectedProspect.name}</h3>
                <p className="text-xs text-muted-foreground truncate font-medium">{selectedProspect.title}</p>
                <p className="text-xs text-cyan-600 dark:text-cyan-400 font-bold truncate mt-0.5">{selectedProspect.company}</p>
              </div>
            </div>

            {/* Tier-2 Status / Unlock */}
            <div className="p-3.5 rounded-xl bg-muted/40 border border-border">
              {selectedProspect.tier2Enriched.unlocked ? (
                <div className="space-y-1 text-xs">
                  <div className="flex items-center justify-between">
                    <span className="text-muted-foreground font-medium">Work Email:</span>
                    <span className="font-mono text-cyan-600 dark:text-cyan-400 font-bold">{selectedProspect.tier2Enriched.workEmail}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-muted-foreground font-medium">Direct Phone:</span>
                    <span className="font-mono text-foreground font-semibold">{selectedProspect.tier2Enriched.directPhone}</span>
                  </div>
                </div>
              ) : (
                <div className="flex items-center justify-between">
                  <div className="text-xs text-muted-foreground flex items-center gap-1.5 font-medium">
                    <Lock className="w-3.5 h-3.5 text-amber-500" />
                    <span>Direct contacts locked</span>
                  </div>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => unlockTier2(selectedProspect.id)}
                    className="border-amber-500/30 text-amber-600 dark:text-amber-400 hover:bg-amber-500/10 font-bold text-xs gap-1"
                  >
                    <Coins className="w-3 h-3" />
                    <span>Unlock (1 Credit)</span>
                  </Button>
                </div>
              )}
            </div>
          </Card>

          {/* Persona Decision Engine Block */}
          <Card className="p-5 space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-muted-foreground uppercase tracking-wider">
                Persona Decision
              </span>
              <Badge variant={personaBadgeVariant} className="font-bold">
                {selectedProspect.persona.confidence}% Confidence
              </Badge>
            </div>

            <div className="space-y-1">
              <h4 className="text-sm font-bold text-foreground">{selectedProspect.persona.label}</h4>
              <p className="text-xs text-muted-foreground leading-relaxed">{selectedProspect.persona.rationale}</p>
            </div>

            {/* Quick Switcher for Persona */}
            <div className="pt-3 border-t border-border space-y-2">
              <div className="text-[11px] text-muted-foreground font-bold uppercase tracking-wider">Dynamically Re-tune Persona:</div>
              <div className="grid grid-cols-2 gap-1.5">
                {PERSONA_STRATEGIES.map(strat => (
                  <Button
                    key={strat.id}
                    variant={selectedProspect.persona.type === strat.id ? 'cyan' : 'outline'}
                    size="sm"
                    onClick={() => switchPersona(selectedProspect.id, strat.id)}
                    className="text-[11px] font-semibold justify-start truncate"
                  >
                    {strat.title.split(' ')[0]} Focus
                  </Button>
                ))}
              </div>
            </div>
          </Card>

          {/* Threat Advisory & Tech Stack Hook */}
          <div className="p-5 rounded-2xl bg-red-500/5 dark:bg-red-950/20 border border-red-500/20 space-y-3 shadow-2xs">
            <div className="flex items-center justify-between text-red-600 dark:text-red-400">
              <div className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider">
                <ShieldAlert className="w-4 h-4" />
                <span>Weaponized Threat Anchor</span>
              </div>
              <Badge variant="outline" className="font-mono font-bold border-red-500/30 text-red-600 dark:text-red-400">
                {selectedProspect.matchedVulnerability.cveId}
              </Badge>
            </div>

            <div>
              <div className="text-sm font-bold text-foreground">{selectedProspect.matchedVulnerability.name}</div>
              <div className="flex items-center gap-2 mt-1.5">
                <Badge variant="destructive" className="font-mono font-bold">
                  CVSS {selectedProspect.matchedVulnerability.cvss}
                </Badge>
                <Badge variant="outline" className="font-mono font-bold border-red-500/30 text-red-600 dark:text-red-400">
                  EPSS {selectedProspect.matchedVulnerability.epssScore}
                </Badge>
                <span className="text-[10px] text-muted-foreground font-semibold">• CISA KEV Exploited</span>
              </div>
            </div>

            <p className="text-xs text-muted-foreground leading-relaxed">
              {selectedProspect.matchedVulnerability.summary}
            </p>

            <div className="text-[11px] text-muted-foreground pt-2 border-t border-red-500/20">
              <span className="text-red-600 dark:text-red-400 font-bold">Detected Asset: </span>
              <span className="font-mono font-semibold text-foreground">{selectedProspect.techStack[0]?.name}</span>
            </div>
          </div>
        </div>

        {/* Right 7 Columns: Interactive Email Composer & Gmail Sync */}
        <div className="lg:col-span-7 space-y-4">
          <Card className="p-6 space-y-5">
            {/* Header & Status Indicator */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-border">
              <div>
                <span className="text-xs font-bold text-muted-foreground uppercase tracking-wider flex items-center gap-2">
                  <Mail className="w-4 h-4 text-cyan-600 dark:text-cyan-400" />
                  <span>Interactive Outreach Workbench</span>
                </span>
                <p className="text-xs text-muted-foreground mt-0.5">
                  Sender: <strong className="text-foreground">shashank@aegisreach.ai</strong> (via Gmail OAuth 2.0)
                </p>
              </div>

              {/* Status Badge */}
              <div>
                {selectedProspect.outreachDraft.status === 'gmail_draft' ? (
                  <Badge variant="emerald" className="font-mono gap-1.5 py-1">
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    <span>Gmail Draft ({selectedProspect.outreachDraft.gmailDraftId})</span>
                  </Badge>
                ) : selectedProspect.outreachDraft.status === 'sent' ? (
                  <Badge variant="cyan" className="font-mono gap-1.5 py-1">
                    <Check className="w-3.5 h-3.5" />
                    <span>Sent & Telemetry Active</span>
                  </Badge>
                ) : (
                  <Badge variant="amber" className="gap-1.5 py-1">
                    <AlertCircle className="w-3.5 h-3.5" />
                    <span>Pending Human Review</span>
                  </Badge>
                )}
              </div>
            </div>

            {/* Variable Tokens Strip */}
            <div className="flex flex-wrap items-center gap-1.5 p-2.5 rounded-xl bg-muted/40 border border-border text-[11px]">
              <span className="text-muted-foreground font-bold">Injected Tokens:</span>
              <Badge variant="cyan" className="font-mono">{'{{Name}}'}</Badge>
              <Badge variant="purple" className="font-mono">{'{{Company}}'}</Badge>
              <Badge variant="amber" className="font-mono">{'{{TechStackItem}}'}</Badge>
              <Badge variant="destructive" className="font-mono">{'{{CVE_ID}}'}</Badge>
            </div>

            {/* Subject Input */}
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-foreground">Email Subject</label>
              <Input
                type="text"
                value={subjectText}
                onChange={e => handleSubjectChange(e.target.value)}
                className="font-semibold"
              />
            </div>

            {/* Body Editor */}
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-foreground flex items-center justify-between">
                <span>Personalized Outreach Copy</span>
                <span className="text-[11px] text-muted-foreground font-medium">{bodyText.length} characters</span>
              </label>
              <textarea
                rows={11}
                value={bodyText}
                onChange={e => handleBodyChange(e.target.value)}
                className="w-full p-4 bg-card border border-input rounded-md text-xs text-foreground focus:outline-none focus:ring-2 focus:ring-ring font-sans leading-relaxed resize-y transition-all"
              />
            </div>

            {/* Observer Mode Callout */}
            <div className="p-3.5 rounded-xl bg-muted/40 border border-border text-xs flex items-center justify-between">
              <div className="flex items-center gap-2 text-muted-foreground">
                <Eye className="w-4 h-4 text-cyan-600 dark:text-cyan-400 shrink-0" />
                <span>
                  <strong>Observer Protection:</strong> Saving a draft populates your Gmail Drafts folder without automatically dispatching.
                </span>
              </div>
              <span className="font-mono text-cyan-600 dark:text-cyan-400 text-[11px] font-bold">users.drafts.create</span>
            </div>

            {/* Action Bar */}
            <div className="flex flex-wrap items-center justify-between gap-3 pt-4 border-t border-border">
              <Button
                variant="outline"
                size="sm"
                onClick={() => switchPersona(selectedProspect.id, selectedProspect.persona.type)}
                className="gap-1.5 font-bold text-xs"
              >
                <RefreshCw className="w-3.5 h-3.5" />
                <span>Re-generate with AI</span>
              </Button>

              <div className="flex items-center gap-2.5">
                {/* Button 1: Sync to Gmail Drafts */}
                <Button
                  variant="outline"
                  disabled={isSyncing}
                  onClick={handleSyncToGmail}
                  className="gap-2 font-bold text-xs"
                >
                  {isSyncing ? (
                    <RefreshCw className="w-3.5 h-3.5 animate-spin text-cyan-600 dark:text-cyan-400" />
                  ) : (
                    <Mail className="w-3.5 h-3.5 text-rose-500" />
                  )}
                  <span>Push to Gmail Drafts</span>
                </Button>

                {/* Button 2: Approve & Direct Send */}
                <Button
                  variant="cyan"
                  disabled={isSending}
                  onClick={handleSendNow}
                  className="gap-2 font-bold text-xs"
                >
                  {isSending ? (
                    <RefreshCw className="w-3.5 h-3.5 animate-spin" />
                  ) : (
                    <Send className="w-3.5 h-3.5" />
                  )}
                  <span>Approve & Dispatch</span>
                </Button>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
};

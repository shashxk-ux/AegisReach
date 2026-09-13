import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { 
  Eye, 
  Send, 
  Sparkles, 
  ShieldAlert, 
  Mail, 
  CheckCircle2, 
  RefreshCw, 
  ExternalLink, 
  Check, 
  Lock, 
  Coins, 
  Building2, 
  Cpu, 
  FileText,
  AlertCircle
} from 'lucide-react';
import { PersonaType } from '../../types';
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
    unlockTier2,
    mode 
  } = useApp();

  const [isSyncing, setIsSyncing] = useState(false);
  const [isSending, setIsSending] = useState(false);
  const [subjectText, setSubjectText] = useState(selectedProspect?.outreachDraft.subject || '');
  const [bodyText, setBodyText] = useState(selectedProspect?.outreachDraft.body || '');

  // Keep local editor in sync when selected prospect changes
  React.useEffect(() => {
    if (selectedProspect) {
      setSubjectText(selectedProspect.outreachDraft.subject);
      setBodyText(selectedProspect.outreachDraft.body);
    }
  }, [selectedProspect]);

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

  const personaColor = 
    selectedProspect.persona.type === 'compliance'
      ? 'bg-emerald-50 text-emerald-800 border-emerald-300 dark:bg-emerald-500/10 dark:text-emerald-400 dark:border-emerald-500/30'
      : selectedProspect.persona.type === 'soc_ops'
      ? 'bg-blue-50 text-blue-800 border-blue-300 dark:bg-blue-500/10 dark:text-blue-400 dark:border-blue-500/30'
      : selectedProspect.persona.type === 'vulnerability_mgmt'
      ? 'bg-amber-50 text-amber-800 border-amber-300 dark:bg-amber-500/10 dark:text-amber-400 dark:border-amber-500/30'
      : 'bg-purple-50 text-purple-800 border-purple-300 dark:bg-purple-500/10 dark:text-purple-400 dark:border-purple-500/30';

  return (
    <div className="space-y-4 max-w-7xl mx-auto">
      {/* Top Bar: Prospect Navigation & Observer Status */}
      <div className="p-4 rounded-2xl bg-slate-900/60 border border-slate-800 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="p-2 rounded-xl bg-cyan-500/10 border border-cyan-500/20 text-cyan-400">
            <Eye className="w-4 h-4" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-sm font-bold text-white">Observer Mode Review Console</h2>
              <span className="text-[10px] px-2 py-0.5 rounded-full bg-cyan-950 text-cyan-300 border border-cyan-800/60 font-mono">
                Human-in-the-loop Active
              </span>
            </div>
            <p className="text-[11px] text-slate-400">
              Review AI-synthesized research & email draft. Push directly to your connected Gmail account Drafts folder.
            </p>
          </div>
        </div>

        {/* Prospect Selector */}
        <div className="flex items-center gap-2">
          <span className="text-xs text-slate-400">Active Target:</span>
          <select
            value={selectedProspect.id}
            onChange={e => setSelectedProspectId(e.target.value)}
            className="bg-slate-900 border border-slate-800 rounded-xl px-3 py-1.5 text-xs text-slate-200 focus:outline-none focus:border-cyan-500"
          >
            {prospects.map(p => (
              <option key={p.id} value={p.id}>
                {p.name} ({p.company})
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Split-Screen Workbench */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left 5 Columns: AI Intelligence Dossier & Threat Context */}
        <div className="lg:col-span-5 space-y-4">
          {/* Target Profile Card */}
          <div className="p-5 rounded-2xl bg-slate-900/40 border border-slate-800 space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">
                Prospect Dossier
              </span>
              <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-slate-800 text-slate-300 border border-slate-700">
                {selectedProspect.source}
              </span>
            </div>

            <div className="flex items-center gap-3.5">
              <img
                src={selectedProspect.avatar}
                alt={selectedProspect.name}
                className="w-14 h-14 rounded-2xl object-cover border border-slate-700 shadow-md"
              />
              <div className="min-w-0">
                <h3 className="text-base font-bold text-white truncate">{selectedProspect.name}</h3>
                <p className="text-xs text-slate-400 truncate">{selectedProspect.title}</p>
                <p className="text-xs text-cyan-400 font-medium truncate mt-0.5">{selectedProspect.company}</p>
              </div>
            </div>

            {/* Tier-2 Status / Unlock */}
            <div className="p-3 rounded-xl bg-slate-950 border border-slate-800/80">
              {selectedProspect.tier2Enriched.unlocked ? (
                <div className="space-y-1 text-xs">
                  <div className="flex items-center justify-between">
                    <span className="text-slate-400">Target Email:</span>
                    <span className="font-mono text-cyan-400">{selectedProspect.tier2Enriched.workEmail}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-slate-400">Direct Phone:</span>
                    <span className="font-mono text-slate-200">{selectedProspect.tier2Enriched.directPhone}</span>
                  </div>
                </div>
              ) : (
                <div className="flex items-center justify-between">
                  <div className="text-xs text-slate-400 flex items-center gap-1.5">
                    <Lock className="w-3.5 h-3.5 text-amber-400" />
                    <span>Direct contact info locked</span>
                  </div>
                  <button
                    onClick={() => unlockTier2(selectedProspect.id)}
                    className="flex items-center gap-1 px-2.5 py-1 rounded-lg bg-amber-500/10 hover:bg-amber-500/20 border border-amber-500/30 text-amber-300 text-xs font-semibold"
                  >
                    <Coins className="w-3 h-3 text-amber-400" />
                    <span>Unlock (1 Credit)</span>
                  </button>
                </div>
              )}
            </div>
          </div>

          {/* Persona Decision Engine Block */}
          <div className="p-5 rounded-2xl bg-slate-900/40 border border-slate-800 space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">
                Persona Decision
              </span>
              <span className={`text-xs px-2.5 py-0.5 rounded-full border ${personaColor} font-semibold`}>
                {selectedProspect.persona.confidence}% Confidence
              </span>
            </div>

            <div className="space-y-1.5">
              <h4 className="text-sm font-bold text-white">{selectedProspect.persona.label}</h4>
              <p className="text-xs text-slate-300 leading-relaxed">{selectedProspect.persona.rationale}</p>
            </div>

            {/* Quick Switcher for Persona */}
            <div className="pt-2 border-t border-slate-800/80 space-y-2">
              <div className="text-[11px] text-slate-400 font-medium">Dynamically Re-tune Persona:</div>
              <div className="grid grid-cols-2 gap-1.5">
                {PERSONA_STRATEGIES.map(strat => (
                  <button
                    key={strat.id}
                    onClick={() => switchPersona(selectedProspect.id, strat.id)}
                    className={`px-2 py-1.5 rounded-lg text-[11px] font-medium transition-all text-left truncate ${
                      selectedProspect.persona.type === strat.id
                        ? 'bg-purple-600 text-white shadow-sm'
                        : 'bg-slate-950 text-slate-400 hover:text-slate-200 border border-slate-800'
                    }`}
                  >
                    {strat.title.split(' ')[0]} Focus
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Threat Advisory & Tech Stack Hook */}
          <div className="p-5 rounded-2xl bg-red-50/70 dark:bg-red-950/20 border border-red-200 dark:border-red-500/30 space-y-3 shadow-xs">
            <div className="flex items-center justify-between text-red-600 dark:text-red-400">
              <div className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider">
                <ShieldAlert className="w-4 h-4" />
                <span>Weaponized Threat Anchor</span>
              </div>
              <span className="text-[10px] font-mono font-bold px-2.5 py-1 rounded-md bg-red-100/90 text-red-700 border border-red-200 dark:bg-red-950/80 dark:text-red-300 dark:border-red-800/80 tracking-tight">
                {selectedProspect.matchedVulnerability.cveId}
              </span>
            </div>

            <div>
              <div className="text-sm font-bold text-slate-900 dark:text-white">{selectedProspect.matchedVulnerability.name}</div>
              <div className="flex items-center gap-2 mt-1.5">
                <span 
                  className="text-[11px] font-extrabold px-2 py-0.5 rounded-md bg-red-600 !text-white font-mono shadow-xs inline-flex items-center justify-center"
                  style={{ color: '#ffffff' }}
                >
                  CVSS {selectedProspect.matchedVulnerability.cvss}
                </span>
                <span className="text-[11px] font-mono font-bold px-2 py-0.5 rounded-md bg-white text-red-700 border border-red-200 dark:bg-red-950/80 dark:text-red-300 dark:border-red-800 shadow-xs inline-flex items-center justify-center">
                  EPSS {selectedProspect.matchedVulnerability.epssScore}
                </span>
                <span className="text-[10px] text-slate-500 dark:text-slate-400 font-medium">• CISA KEV Exploited</span>
              </div>
            </div>

            <p className="text-xs text-slate-700 dark:text-slate-300 leading-relaxed">
              {selectedProspect.matchedVulnerability.summary}
            </p>

            <div className="text-[11px] text-slate-600 dark:text-slate-400 pt-1 border-t border-red-200 dark:border-red-900/30">
              <span className="text-red-600 dark:text-red-400 font-semibold">Detected Tech Asset: </span>
              <span className="font-mono font-semibold text-slate-900 dark:text-slate-200">{selectedProspect.techStack[0]?.name}</span>
            </div>
          </div>
        </div>

        {/* Right 7 Columns: Interactive Email Composer & Gmail Sync */}
        <div className="lg:col-span-7 space-y-4">
          <div className="p-6 rounded-2xl bg-slate-900/50 border border-slate-800 space-y-5">
            {/* Header & Status Indicator */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-slate-800">
              <div>
                <span className="text-xs font-bold text-slate-400 uppercase tracking-wider flex items-center gap-2">
                  <Mail className="w-4 h-4 text-cyan-400" />
                  <span>Interactive Outreach Workbench</span>
                </span>
                <p className="text-xs text-slate-400 mt-0.5">
                  Sender: <strong className="text-slate-200">shashank@aegisreach.ai</strong> (via Gmail OAuth 2.0)
                </p>
              </div>

              {/* Status Badge */}
              <div>
                {selectedProspect.outreachDraft.status === 'gmail_draft' ? (
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 text-xs font-mono font-semibold">
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    <span>Gmail Draft ({selectedProspect.outreachDraft.gmailDraftId})</span>
                  </span>
                ) : selectedProspect.outreachDraft.status === 'sent' ? (
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-500/10 text-blue-400 border border-blue-500/30 text-xs font-mono font-semibold">
                    <Check className="w-3.5 h-3.5" />
                    <span>Sent & Telemetry Active</span>
                  </span>
                ) : (
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-500/10 text-amber-400 border border-amber-500/30 text-xs font-semibold">
                    <AlertCircle className="w-3.5 h-3.5" />
                    <span>Pending Human Approval</span>
                  </span>
                )}
              </div>
            </div>

            {/* Variable Tokens Strip */}
            <div className="flex flex-wrap items-center gap-1.5 p-2.5 rounded-xl bg-slate-950 border border-slate-800 text-[11px]">
              <span className="text-slate-500 font-medium">Injected Tokens:</span>
              <span className="px-1.5 py-0.5 rounded bg-cyan-950/80 text-cyan-300 border border-cyan-800/40 font-mono">
                {'{{Name}}'}
              </span>
              <span className="px-1.5 py-0.5 rounded bg-purple-950/80 text-purple-300 border border-purple-800/40 font-mono">
                {'{{Company}}'}
              </span>
              <span className="px-1.5 py-0.5 rounded bg-amber-950/80 text-amber-300 border border-amber-800/40 font-mono">
                {'{{TechStackItem}}'}
              </span>
              <span className="px-1.5 py-0.5 rounded bg-red-950/80 text-red-300 border border-red-800/40 font-mono">
                {'{{CVE_ID}}'}
              </span>
            </div>

            {/* Subject Input */}
            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-slate-300">Email Subject</label>
              <input
                type="text"
                value={subjectText}
                onChange={e => handleSubjectChange(e.target.value)}
                className="w-full px-3.5 py-2.5 bg-slate-950 border border-slate-800 rounded-xl text-xs text-slate-100 focus:outline-none focus:border-cyan-500/50 font-medium"
              />
            </div>

            {/* Body Editor */}
            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-slate-300 flex items-center justify-between">
                <span>Personalized Message Body</span>
                <span className="text-[11px] text-slate-500 font-normal">Editable in real-time</span>
              </label>
              <textarea
                rows={11}
                value={bodyText}
                onChange={e => handleBodyChange(e.target.value)}
                className="w-full p-4 bg-slate-950 border border-slate-800 rounded-xl text-xs text-slate-200 focus:outline-none focus:border-cyan-500/50 font-sans leading-relaxed resize-y"
              />
            </div>

            {/* Observer Mode Callout */}
            <div className="p-3.5 rounded-xl bg-slate-950/80 border border-slate-800 text-xs flex items-center justify-between">
              <div className="flex items-center gap-2 text-slate-400">
                <Eye className="w-4 h-4 text-cyan-400" />
                <span>
                  <strong>Observer Mode Rule:</strong> Creating a draft saves it to your Gmail Drafts folder without sending.
                </span>
              </div>
              <span className="font-mono text-cyan-400 text-[11px]">users.drafts.create</span>
            </div>

            {/* Action Bar */}
            <div className="flex flex-wrap items-center justify-between gap-3 pt-4 border-t border-slate-800">
              <button
                onClick={() => switchPersona(selectedProspect.id, selectedProspect.persona.type)}
                className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-medium transition-colors"
              >
                <RefreshCw className="w-3.5 h-3.5" />
                <span>Re-generate with AI</span>
              </button>

              <div className="flex items-center gap-2.5">
                {/* Button 1: Sync to Gmail Drafts */}
                <button
                  disabled={isSyncing}
                  onClick={handleSyncToGmail}
                  className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 border border-slate-700 text-white font-semibold text-xs transition-all shadow-md"
                >
                  {isSyncing ? (
                    <RefreshCw className="w-3.5 h-3.5 animate-spin text-cyan-400" />
                  ) : (
                    <Mail className="w-3.5 h-3.5 text-red-400" />
                  )}
                  <span>Push to Gmail Drafts</span>
                </button>

                {/* Button 2: Approve & Direct Send */}
                <button
                  disabled={isSending}
                  onClick={handleSendNow}
                  className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-500 hover:to-blue-500 text-white font-bold text-xs shadow-lg shadow-cyan-600/30 transition-all"
                >
                  {isSending ? (
                    <RefreshCw className="w-3.5 h-3.5 animate-spin" />
                  ) : (
                    <Send className="w-3.5 h-3.5" />
                  )}
                  <span>Approve & Dispatch</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

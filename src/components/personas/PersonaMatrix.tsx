import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { PERSONA_STRATEGIES } from '../../data/mockData';
import { PersonaType } from '../../types';
import { 
  BrainCircuit, 
  ShieldCheck, 
  Activity, 
  AlertTriangle, 
  Cpu, 
  Sparkles, 
  ArrowRight, 
  CheckCircle2, 
  Code2, 
  FileText,
  Layers,
  Wand2
} from 'lucide-react';

export const PersonaMatrix: React.FC = () => {
  const { prospects, switchPersona, setSelectedProspectId, setActiveTab } = useApp();

  const [activeStrategyId, setActiveStrategyId] = useState<PersonaType>('compliance');
  const [sandboxProspectId, setSandboxProspectId] = useState<string>(prospects[0]?.id || 'pr-101');

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

  return (
    <div className="space-y-6 max-w-6xl mx-auto">
      {/* Header Banner */}
      <div className="p-6 rounded-2xl bg-gradient-to-r from-white via-purple-50/40 to-white dark:from-slate-900 dark:via-purple-950/40 dark:to-slate-900 border border-purple-200 dark:border-purple-500/30 shadow-sm flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded-full bg-purple-500/10 border border-purple-500/20 text-purple-700 dark:text-purple-400 text-xs font-semibold mb-2">
            <BrainCircuit className="w-3.5 h-3.5" />
            <span>The Strategic Showcase: Campaign Decision Engine</span>
          </div>
          <h2 className="text-xl font-bold text-slate-900 dark:text-white tracking-tight">CISO Persona Decision Matrix</h2>
          <p className="text-xs text-slate-600 dark:text-slate-300 mt-1 max-w-2xl leading-relaxed">
            Rather than blasting generic email templates, AegisReach determines whether a security leader is <strong>Compliance-driven</strong>, <strong>SecOps-driven</strong>, <strong>Vulnerability-driven</strong>, or <strong>Technical-driven</strong>, dynamically morphing the messaging angle and CVE narrative.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <span className="text-xs px-3 py-1.5 rounded-xl bg-purple-100 dark:bg-purple-950/60 border border-purple-200 dark:border-purple-800 text-purple-800 dark:text-purple-300 font-mono font-semibold">
            4 Active Archetypes
          </span>
        </div>
      </div>

      {/* 4 Persona Strategy Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {PERSONA_STRATEGIES.map(strategy => {
          const isSelected = activeStrategyId === strategy.id;
          let Icon = ShieldCheck;
          if (strategy.id === 'soc_ops') Icon = Activity;
          if (strategy.id === 'vulnerability_mgmt') Icon = AlertTriangle;
          if (strategy.id === 'technical') Icon = Cpu;

          return (
            <div
              key={strategy.id}
              onClick={() => setActiveStrategyId(strategy.id)}
              className={`p-4 rounded-2xl border cursor-pointer transition-all flex flex-col justify-between ${
                isSelected
                  ? 'bg-white dark:bg-slate-900 shadow-md ring-2 ring-purple-500/40 border-purple-400 dark:border-purple-500/50'
                  : 'bg-slate-50/90 dark:bg-slate-950/50 border-slate-200 dark:border-slate-800 hover:border-slate-300 dark:hover:border-slate-700 hover:bg-white dark:hover:bg-slate-900/40 shadow-xs'
              }`}
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <div className={`p-2 rounded-xl border ${strategy.badgeColor}`}>
                    <Icon className="w-4 h-4" />
                  </div>
                  {isSelected && (
                    <span className="text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded-full bg-purple-100 text-purple-800 border border-purple-200 dark:bg-purple-500/20 dark:text-purple-300 dark:border-purple-500/30">
                      Viewing
                    </span>
                  )}
                </div>

                <div>
                  <h3 className="text-sm font-bold text-slate-900 dark:text-white tracking-tight">{strategy.title}</h3>
                  <p className="text-[11px] text-slate-600 dark:text-slate-400 mt-1 line-clamp-2">{strategy.messagingHook}</p>
                </div>
              </div>

              <div className="pt-3 mt-3 border-t border-slate-200 dark:border-slate-800/80 flex items-center justify-between text-[11px]">
                <span className="text-slate-500 dark:text-slate-400 font-medium">Target Certs:</span>
                <span className="font-mono text-slate-800 dark:text-slate-300 font-semibold">{strategy.certifications.slice(0, 2).join(', ')}</span>
              </div>
            </div>
          );
        })}
      </div>

      {/* Strategy Detail View & Prompt Engine */}
      <div className="p-6 rounded-2xl bg-white dark:bg-slate-900/50 border border-slate-200 dark:border-slate-800 space-y-6 shadow-sm">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-4 border-b border-slate-200 dark:border-slate-800">
          <div>
            <div className="text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider">Strategy Deep Dive</div>
            <h3 className="text-lg font-bold text-slate-900 dark:text-white mt-0.5 flex items-center gap-2">
              <span>{selectedStrategy.title}</span>
              <span className={`text-xs px-2.5 py-0.5 rounded-full border ${selectedStrategy.badgeColor}`}>
                System Archetype
              </span>
            </h3>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-xs text-slate-500 dark:text-slate-400">Triggered by roles:</span>
            <span className="text-xs font-mono text-slate-800 dark:text-slate-200 bg-slate-100 dark:bg-slate-950 px-2.5 py-1 rounded-lg border border-slate-200 dark:border-slate-800 font-semibold">
              {selectedStrategy.targetTitles[0]}
            </span>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Left: Core Psychological Pain Points */}
          <div className="space-y-4">
            <h4 className="text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider flex items-center gap-2">
              <Layers className="w-4 h-4 text-cyan-600 dark:text-cyan-400" />
              <span>Core Psychological Drivers & Fiduciary Pressures</span>
            </h4>
            <div className="space-y-2">
              {selectedStrategy.corePainPoints.map((pain, idx) => (
                <div key={idx} className="p-3 rounded-xl bg-slate-50 dark:bg-slate-950/70 border border-slate-200 dark:border-slate-800/80 text-xs text-slate-800 dark:text-slate-300 flex items-start gap-2.5 shadow-2xs">
                  <span className="w-1.5 h-1.5 rounded-full bg-cyan-600 dark:bg-cyan-400 mt-1.5 shrink-0" />
                  <span>{pain}</span>
                </div>
              ))}
            </div>

            {/* CVE Pitch Angle */}
            <div className="p-4 rounded-xl bg-amber-50/80 dark:bg-amber-950/20 border border-amber-200 dark:border-amber-500/30 space-y-1.5 shadow-2xs">
              <div className="text-xs font-bold text-amber-800 dark:text-amber-400 uppercase tracking-wider flex items-center gap-1.5">
                <AlertTriangle className="w-3.5 h-3.5" />
                <span>CVE & Vulnerability Narrative Tuning</span>
              </div>
              <p className="text-xs text-amber-950 dark:text-slate-300 leading-relaxed font-medium">
                {selectedStrategy.cvePitchAngle}
              </p>
            </div>
          </div>

          {/* Right: LLM System Prompt Snippet & Instruction */}
          <div className="space-y-4">
            <h4 className="text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider flex items-center gap-2">
              <Code2 className="w-4 h-4 text-purple-600 dark:text-purple-400" />
              <span>Dynamic LLM Decision Engine Prompt</span>
            </h4>
            
            <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-purple-500/30 font-mono text-xs text-slate-800 dark:text-slate-200 space-y-2.5 shadow-2xs">
              <div className="text-purple-700 dark:text-purple-400 font-bold tracking-tight">// AegisReach Dynamic Prompt Template</div>
              <div className="text-slate-800 dark:text-slate-300 leading-relaxed font-mono font-medium">
                {selectedStrategy.systemPromptSnippet}
              </div>
              <div className="pt-2.5 border-t border-slate-200 dark:border-slate-800 text-[11px] text-slate-600 dark:text-slate-400 font-medium">
                Variables injected:{' '}
                <span className="inline-flex flex-wrap gap-1.5 mt-1">
                  <code className="text-purple-700 dark:text-cyan-400 bg-purple-100/80 dark:bg-slate-900 px-1.5 py-0.5 rounded border border-purple-200 dark:border-slate-800 font-bold font-mono">{'{{CISO_NAME}}'}</code>
                  <code className="text-purple-700 dark:text-cyan-400 bg-purple-100/80 dark:bg-slate-900 px-1.5 py-0.5 rounded border border-purple-200 dark:border-slate-800 font-bold font-mono">{'{{COMPANY}}'}</code>
                  <code className="text-purple-700 dark:text-cyan-400 bg-purple-100/80 dark:bg-slate-900 px-1.5 py-0.5 rounded border border-purple-200 dark:border-slate-800 font-bold font-mono">{'{{TECH_STACK_ITEM}}'}</code>
                  <code className="text-purple-700 dark:text-cyan-400 bg-purple-100/80 dark:bg-slate-900 px-1.5 py-0.5 rounded border border-purple-200 dark:border-slate-800 font-bold font-mono">{'{{CVE_ID}}'}</code>
                  <code className="text-purple-700 dark:text-cyan-400 bg-purple-100/80 dark:bg-slate-900 px-1.5 py-0.5 rounded border border-purple-200 dark:border-slate-800 font-bold font-mono">{'{{EPSS}}'}</code>
                </span>
              </div>
            </div>

            <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-950/80 border border-slate-200 dark:border-slate-800 space-y-2 shadow-2xs">
              <div className="text-xs font-bold text-slate-700 dark:text-slate-300">Target Certifications & Credentials:</div>
              <div className="flex flex-wrap gap-1.5">
                {selectedStrategy.certifications.map((cert, idx) => (
                  <span key={idx} className="text-xs font-mono px-2 py-0.5 rounded bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300 shadow-2xs font-semibold">
                    {cert}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Interactive Persona Sandbox: Live Testing with Real Prospects */}
      <div className="p-6 rounded-2xl bg-white dark:bg-gradient-to-b dark:from-slate-900 dark:to-slate-950 border border-slate-200 dark:border-slate-800 space-y-6 shadow-sm">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 text-cyan-600 dark:text-cyan-400 text-xs font-bold uppercase tracking-wider">
              <Wand2 className="w-4 h-4" />
              <span>Interactive Decision Sandbox</span>
            </div>
            <h3 className="text-base font-bold text-slate-900 dark:text-white mt-0.5">
              Live Messaging Transformation Simulator
            </h3>
            <p className="text-xs text-slate-600 dark:text-slate-400">
              Select any prospect and toggle between personas to watch the email hook and tone instantly recalibrate.
            </p>
          </div>

          {/* Prospect Selector */}
          <div className="flex items-center gap-2">
            <span className="text-xs text-slate-500 dark:text-slate-400 font-medium">Target Prospect:</span>
            <select
              value={sandboxProspectId}
              onChange={e => setSandboxProspectId(e.target.value)}
              className="bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl px-3 py-2 text-xs text-slate-900 dark:text-slate-200 focus:outline-none focus:border-cyan-500 shadow-2xs font-medium"
            >
              {prospects.map(p => (
                <option key={p.id} value={p.id}>
                  {p.name} — {p.company} ({p.persona.label})
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Persona Switch Buttons */}
        <div className="flex flex-wrap items-center gap-2">
          {PERSONA_STRATEGIES.map(strat => {
            const isCurrentlyApplied = sandboxProspect.persona.type === strat.id;
            return (
              <button
                key={strat.id}
                onClick={() => handleApplyPersonaToProspect(strat.id)}
                className={`px-3.5 py-2 rounded-xl text-xs font-semibold transition-all flex items-center gap-2 ${
                  isCurrentlyApplied
                    ? 'bg-gradient-to-r from-purple-600 to-cyan-600 text-white shadow-md ring-2 ring-purple-400/30'
                    : 'bg-slate-50 dark:bg-slate-900/80 text-slate-700 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200 border border-slate-200 dark:border-slate-800 hover:bg-slate-100'
                }`}
              >
                {isCurrentlyApplied && <Sparkles className="w-3.5 h-3.5 text-cyan-300" />}
                <span>Set to: {strat.title}</span>
              </button>
            );
          })}
        </div>

        {/* Live Transformation Result */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 p-5 rounded-2xl bg-slate-50/80 dark:bg-slate-950 border border-slate-200 dark:border-slate-800">
          {/* Left Column: AI Decision Context */}
          <div className="space-y-3">
            <div className="text-xs font-bold text-slate-700 dark:text-slate-400 uppercase tracking-wider">
              AI Decision Context
            </div>
            <div className="p-3.5 rounded-xl bg-white dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800 space-y-2 text-xs shadow-2xs">
              <div className="flex items-center justify-between">
                <span className="text-slate-500 dark:text-slate-400">Prospect:</span>
                <span className="font-bold text-slate-900 dark:text-white">{sandboxProspect.name}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-slate-500 dark:text-slate-400">Company:</span>
                <span className="text-cyan-700 dark:text-cyan-400 font-semibold">{sandboxProspect.company}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-slate-500 dark:text-slate-400">Tech Stack Anchor:</span>
                <span className="font-mono text-slate-800 dark:text-slate-300 font-semibold">{sandboxProspect.techStack[0]?.name}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-slate-500 dark:text-slate-400">Matched CVE:</span>
                <span className="font-mono text-red-600 dark:text-red-400 font-bold">{sandboxProspect.matchedVulnerability.cveId}</span>
              </div>
              <div className="pt-2 border-t border-slate-200 dark:border-slate-800 text-[11px] text-slate-600 dark:text-slate-400 leading-relaxed">
                {sandboxProspect.persona.rationale}
              </div>
            </div>
          </div>

          {/* Middle & Right Column: Synthesized Cold Email Preview */}
          <div className="lg:col-span-2 space-y-3">
            <div className="flex items-center justify-between">
              <div className="text-xs font-bold text-slate-700 dark:text-slate-400 uppercase tracking-wider flex items-center gap-1.5">
                <FileText className="w-3.5 h-3.5 text-cyan-600 dark:text-cyan-400" />
                <span>Dynamically Synthesized Outreach</span>
              </div>
              <span className="text-[11px] font-mono text-purple-700 dark:text-purple-400 px-2.5 py-0.5 rounded-md bg-purple-100 dark:bg-purple-950/60 border border-purple-200 dark:border-purple-800/40 font-semibold">
                Persona: {sandboxProspect.persona.label}
              </span>
            </div>

            <div className="p-4 rounded-xl bg-white dark:bg-slate-900/80 border border-slate-200 dark:border-slate-800 space-y-3 text-xs shadow-2xs">
              <div className="flex items-center gap-2 pb-2 border-b border-slate-200 dark:border-slate-800">
                <span className="text-slate-500 font-semibold">Subject:</span>
                <span className="text-slate-900 dark:text-white font-bold">{sandboxProspect.outreachDraft.subject}</span>
              </div>
              <div className="text-slate-700 dark:text-slate-300 whitespace-pre-line leading-relaxed font-sans">
                {sandboxProspect.outreachDraft.body}
              </div>
            </div>

            <div className="flex items-center justify-end">
              <button
                onClick={handleJumpToReview}
                className="flex items-center gap-2 px-4 py-2 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold text-xs transition-colors shadow-md shadow-cyan-500/20"
              >
                <span>Open in Observer Reviewer</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { PERSONA_STRATEGIES } from '../../data/mockData';
import { PersonaType } from '../../types';
import { Card, Badge, Button } from '../ui';
import { 
  BrainCircuit, 
  ShieldCheck, 
  Activity, 
  AlertTriangle, 
  Cpu, 
  Sparkles, 
  ArrowRight, 
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
      <Card className="p-6 bg-gradient-to-r from-card via-purple-500/5 to-card border-border shadow-xs">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div>
            <Badge variant="purple" className="gap-2 mb-2">
              <BrainCircuit className="w-3.5 h-3.5" />
              <span>The Strategic Showcase: Campaign Decision Engine</span>
            </Badge>
            <h2 className="text-xl font-bold text-foreground tracking-tight">CISO Persona Decision Matrix</h2>
            <p className="text-xs text-muted-foreground mt-1 max-w-2xl leading-relaxed">
              Rather than blasting generic email templates, AegisReach determines whether a security leader is <strong>Compliance-driven</strong>, <strong>SecOps-driven</strong>, <strong>Vulnerability-driven</strong>, or <strong>Technical-driven</strong>, dynamically morphing the messaging angle and CVE narrative.
            </p>
          </div>

          <Badge variant="purple" className="font-mono px-3 py-1 text-xs">
            4 Active Archetypes
          </Badge>
        </div>
      </Card>

      {/* 4 Persona Strategy Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {PERSONA_STRATEGIES.map(strategy => {
          const isSelected = activeStrategyId === strategy.id;
          let Icon = ShieldCheck;
          let badgeVariant: 'emerald' | 'cyan' | 'amber' | 'purple' = 'emerald';
          if (strategy.id === 'soc_ops') {
            Icon = Activity;
            badgeVariant = 'cyan';
          }
          if (strategy.id === 'vulnerability_mgmt') {
            Icon = AlertTriangle;
            badgeVariant = 'amber';
          }
          if (strategy.id === 'technical') {
            Icon = Cpu;
            badgeVariant = 'purple';
          }

          return (
            <Card
              key={strategy.id}
              onClick={() => setActiveStrategyId(strategy.id)}
              className={`p-4 cursor-pointer transition-all flex flex-col justify-between ${
                isSelected
                  ? 'ring-2 ring-purple-500/40 border-purple-400 dark:border-purple-500/50 shadow-md'
                  : 'hover:border-slate-300 dark:hover:border-slate-700'
              }`}
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <Badge variant={badgeVariant} className="p-2 rounded-xl">
                    <Icon className="w-4 h-4" />
                  </Badge>
                  {isSelected && (
                    <Badge variant="purple" className="text-[10px] uppercase font-bold tracking-wider">
                      Viewing
                    </Badge>
                  )}
                </div>

                <div>
                  <h3 className="text-sm font-bold text-foreground tracking-tight">{strategy.title}</h3>
                  <p className="text-[11px] text-muted-foreground mt-1 line-clamp-2">{strategy.messagingHook}</p>
                </div>
              </div>

              <div className="pt-3 mt-3 border-t border-border flex items-center justify-between text-[11px]">
                <span className="text-muted-foreground font-medium">Target Certs:</span>
                <span className="font-mono text-foreground font-semibold">{strategy.certifications.slice(0, 2).join(', ')}</span>
              </div>
            </Card>
          );
        })}
      </div>

      {/* Strategy Detail View & Prompt Engine */}
      <Card className="p-6 space-y-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-4 border-b border-border">
          <div>
            <div className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">Strategy Deep Dive</div>
            <h3 className="text-lg font-bold text-foreground mt-0.5 flex items-center gap-2">
              <span>{selectedStrategy.title}</span>
              <Badge variant="purple">
                System Archetype
              </Badge>
            </h3>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-xs text-muted-foreground">Triggered by roles:</span>
            <span className="text-xs font-mono text-foreground bg-muted px-2.5 py-1 rounded-md border border-border font-semibold">
              {selectedStrategy.targetTitles[0]}
            </span>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Left: Core Psychological Pain Points */}
          <div className="space-y-4">
            <h4 className="text-xs font-bold text-foreground uppercase tracking-wider flex items-center gap-2">
              <Layers className="w-4 h-4 text-cyan-600 dark:text-cyan-400" />
              <span>Core Psychological Drivers & Fiduciary Pressures</span>
            </h4>
            <div className="space-y-2">
              {selectedStrategy.corePainPoints.map((pain, idx) => (
                <div key={idx} className="p-3 rounded-xl bg-muted/40 border border-border text-xs text-foreground flex items-start gap-2.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-cyan-600 dark:bg-cyan-400 mt-1.5 shrink-0" />
                  <span>{pain}</span>
                </div>
              ))}
            </div>

            {/* CVE Pitch Angle */}
            <div className="p-4 rounded-xl bg-amber-500/10 border border-amber-500/20 space-y-1.5">
              <div className="text-xs font-bold text-amber-700 dark:text-amber-400 uppercase tracking-wider flex items-center gap-1.5">
                <AlertTriangle className="w-3.5 h-3.5" />
                <span>CVE & Vulnerability Narrative Tuning</span>
              </div>
              <p className="text-xs text-foreground leading-relaxed font-medium">
                {selectedStrategy.cvePitchAngle}
              </p>
            </div>
          </div>

          {/* Right: LLM System Prompt Snippet & Instruction */}
          <div className="space-y-4">
            <h4 className="text-xs font-bold text-foreground uppercase tracking-wider flex items-center gap-2">
              <Code2 className="w-4 h-4 text-purple-600 dark:text-purple-400" />
              <span>Dynamic LLM Decision Engine Prompt</span>
            </h4>
            
            <div className="p-4 rounded-xl bg-muted/50 border border-border font-mono text-xs text-foreground space-y-2.5">
              <div className="text-purple-600 dark:text-purple-400 font-bold tracking-tight">// AegisReach Dynamic Prompt Template</div>
              <div className="text-muted-foreground leading-relaxed font-mono font-medium">
                {selectedStrategy.systemPromptSnippet}
              </div>
              <div className="pt-2.5 border-t border-border text-[11px] text-muted-foreground font-medium">
                Variables injected:{' '}
                <span className="inline-flex flex-wrap gap-1.5 mt-1">
                  <code className="text-purple-600 dark:text-cyan-400 bg-purple-500/10 px-1.5 py-0.5 rounded border border-purple-500/20 font-bold font-mono">{'{{CISO_NAME}}'}</code>
                  <code className="text-purple-600 dark:text-cyan-400 bg-purple-500/10 px-1.5 py-0.5 rounded border border-purple-500/20 font-bold font-mono">{'{{COMPANY}}'}</code>
                  <code className="text-purple-600 dark:text-cyan-400 bg-purple-500/10 px-1.5 py-0.5 rounded border border-purple-500/20 font-bold font-mono">{'{{TECH_STACK_ITEM}}'}</code>
                  <code className="text-purple-600 dark:text-cyan-400 bg-purple-500/10 px-1.5 py-0.5 rounded border border-purple-500/20 font-bold font-mono">{'{{CVE_ID}}'}</code>
                  <code className="text-purple-600 dark:text-cyan-400 bg-purple-500/10 px-1.5 py-0.5 rounded border border-purple-500/20 font-bold font-mono">{'{{EPSS}}'}</code>
                </span>
              </div>
            </div>

            <div className="p-4 rounded-xl bg-card border border-border space-y-2">
              <div className="text-xs font-bold text-foreground">Target Certifications & Credentials:</div>
              <div className="flex flex-wrap gap-1.5">
                {selectedStrategy.certifications.map((cert, idx) => (
                  <Badge key={idx} variant="outline" className="font-mono text-xs font-semibold">
                    {cert}
                  </Badge>
                ))}
              </div>
            </div>
          </div>
        </div>
      </Card>

      {/* Interactive Persona Sandbox */}
      <Card className="p-6 space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 text-cyan-600 dark:text-cyan-400 text-xs font-bold uppercase tracking-wider">
              <Wand2 className="w-4 h-4" />
              <span>Interactive Decision Sandbox</span>
            </div>
            <h3 className="text-base font-bold text-foreground mt-0.5">
              Live Messaging Transformation Simulator
            </h3>
            <p className="text-xs text-muted-foreground">
              Select any prospect and toggle between personas to watch the email hook and tone instantly recalibrate.
            </p>
          </div>

          {/* Prospect Selector */}
          <div className="flex items-center gap-2">
            <span className="text-xs text-muted-foreground font-medium">Target Prospect:</span>
            <select
              value={sandboxProspectId}
              onChange={e => setSandboxProspectId(e.target.value)}
              className="bg-card border border-input rounded-md px-3 py-1.5 text-xs text-foreground focus:outline-none focus:ring-2 focus:ring-ring font-medium cursor-pointer"
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
              <Button
                key={strat.id}
                variant={isCurrentlyApplied ? 'cyan' : 'outline'}
                size="sm"
                onClick={() => handleApplyPersonaToProspect(strat.id)}
                className={`text-xs gap-2 ${isCurrentlyApplied ? '!text-slate-950 font-bold' : 'font-semibold'}`}
              >
                {isCurrentlyApplied && <Sparkles className="w-3.5 h-3.5 text-slate-950" />}
                <span>Set to: {strat.title}</span>
              </Button>
            );
          })}
        </div>

        {/* Live Transformation Result */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 p-5 rounded-2xl bg-muted/30 border border-border">
          {/* Left Column: AI Decision Context */}
          <div className="space-y-3">
            <div className="text-xs font-bold text-muted-foreground uppercase tracking-wider">
              AI Decision Context
            </div>
            <div className="p-3.5 rounded-xl bg-card border border-border space-y-2 text-xs">
              <div className="flex items-center justify-between">
                <span className="text-muted-foreground">Prospect:</span>
                <span className="font-bold text-foreground">{sandboxProspect.name}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-muted-foreground">Company:</span>
                <span className="text-cyan-600 dark:text-cyan-400 font-semibold">{sandboxProspect.company}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-muted-foreground">Tech Stack Anchor:</span>
                <span className="font-mono text-foreground font-semibold">{sandboxProspect.techStack[0]?.name}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-muted-foreground">Matched CVE:</span>
                <span className="font-mono text-red-600 dark:text-red-400 font-bold">{sandboxProspect.matchedVulnerability.cveId}</span>
              </div>
              <div className="pt-2 border-t border-border text-[11px] text-muted-foreground leading-relaxed">
                {sandboxProspect.persona.rationale}
              </div>
            </div>
          </div>

          {/* Middle & Right Column: Synthesized Cold Email Preview */}
          <div className="lg:col-span-2 space-y-3">
            <div className="flex items-center justify-between">
              <div className="text-xs font-bold text-muted-foreground uppercase tracking-wider flex items-center gap-1.5">
                <FileText className="w-3.5 h-3.5 text-cyan-600 dark:text-cyan-400" />
                <span>Dynamically Synthesized Outreach</span>
              </div>
              <Badge variant="purple" className="font-mono font-semibold">
                Persona: {sandboxProspect.persona.label}
              </Badge>
            </div>

            <div className="p-4 rounded-xl bg-card border border-border space-y-3 text-xs">
              <div className="flex items-center gap-2 pb-2 border-b border-border">
                <span className="text-muted-foreground font-semibold">Subject:</span>
                <span className="text-foreground font-bold">{sandboxProspect.outreachDraft.subject}</span>
              </div>
              <div className="text-muted-foreground whitespace-pre-line leading-relaxed font-sans">
                {sandboxProspect.outreachDraft.body}
              </div>
            </div>

            <div className="flex items-center justify-end">
              <Button
                variant="cyan"
                size="sm"
                onClick={handleJumpToReview}
                className="gap-2 font-bold !text-slate-950"
              >
                <span>Open in Observer Reviewer</span>
                <ArrowRight className="w-3.5 h-3.5 text-slate-950 stroke-[2.5]" />
              </Button>
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
};

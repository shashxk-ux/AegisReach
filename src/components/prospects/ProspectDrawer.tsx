import React from 'react';
import { useApp } from '../../context/AppContext';
import { Button, Badge, Card } from '../ui';
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
  Lock
} from 'lucide-react';

export const ProspectDrawer: React.FC = () => {
  const { 
    isDrawerOpen, 
    closeDossier, 
    selectedProspect, 
    unlockTier2, 
    setActiveTab, 
    setSelectedProspectId 
  } = useApp();

  if (!isDrawerOpen || !selectedProspect) return null;

  const handleReviewClick = () => {
    setSelectedProspectId(selectedProspect.id);
    closeDossier();
    setActiveTab('review');
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
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Backdrop */}
      <div 
        onClick={closeDossier}
        className="absolute inset-0 bg-black/60 backdrop-blur-sm transition-opacity animate-in fade-in"
      />

      <div className="absolute inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-2xl bg-card border-l border-border shadow-2xl flex flex-col justify-between overflow-y-auto">
          {/* Header */}
          <div className="p-6 border-b border-border bg-card/90 sticky top-0 z-10 backdrop-blur-md flex items-start justify-between">
            <div className="flex items-center gap-4">
              <img
                src={selectedProspect.avatar}
                alt={selectedProspect.name}
                className="w-16 h-16 rounded-2xl object-cover border-2 border-border shadow-md"
              />
              <div>
                <div className="flex items-center gap-2">
                  <h3 className="text-xl font-bold text-foreground tracking-tight">{selectedProspect.name}</h3>
                  <Badge variant="secondary">
                    {selectedProspect.source}
                  </Badge>
                </div>
                <p className="text-xs text-muted-foreground mt-0.5">{selectedProspect.title}</p>
                <div className="flex items-center gap-2 mt-1 text-xs text-cyan-600 dark:text-cyan-400 font-semibold">
                  <span>{selectedProspect.company}</span>
                  <span className="text-muted-foreground">•</span>
                  <span className="text-muted-foreground font-normal">{selectedProspect.location}</span>
                  <span className="text-muted-foreground">•</span>
                  <span className="text-muted-foreground font-normal">{selectedProspect.companySize}</span>
                </div>
              </div>
            </div>

            <Button
              variant="ghost"
              size="icon"
              onClick={closeDossier}
              aria-label="Close dossier"
              className="text-muted-foreground hover:text-foreground"
            >
              <X className="w-5 h-5" />
            </Button>
          </div>

          {/* Body Content */}
          <div className="p-6 space-y-6 flex-1">
            {/* 2-Tier Enrichment Banner */}
            <Card className="p-4 space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-foreground uppercase tracking-wider">
                  Contact Enrichment State
                </span>
                <Badge variant="emerald" className="font-mono">
                  Tier-1 Cheap Pass ($0) Active
                </Badge>
              </div>

              {selectedProspect.tier2Enriched.unlocked ? (
                <div className="grid grid-cols-2 gap-3 pt-1">
                  <div className="p-3 rounded-xl bg-muted/40 border border-border flex items-center gap-3">
                    <Mail className="w-4 h-4 text-cyan-600 dark:text-cyan-400 shrink-0" />
                    <div className="min-w-0">
                      <div className="text-[10px] text-muted-foreground font-medium">Verified Direct Email</div>
                      <div className="text-xs font-mono text-foreground truncate font-semibold">{selectedProspect.tier2Enriched.workEmail}</div>
                    </div>
                  </div>
                  <div className="p-3 rounded-xl bg-muted/40 border border-border flex items-center gap-3">
                    <Phone className="w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0" />
                    <div className="min-w-0">
                      <div className="text-[10px] text-muted-foreground font-medium">Direct Phone Line</div>
                      <div className="text-xs font-mono text-foreground truncate font-semibold">{selectedProspect.tier2Enriched.directPhone}</div>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="flex items-center justify-between p-3 rounded-xl bg-amber-500/10 border border-amber-500/20">
                  <div className="flex items-center gap-2.5">
                    <Lock className="w-4 h-4 text-amber-600 dark:text-amber-400" />
                    <p className="text-xs text-foreground">
                      Direct work email and phone locked. Syntax & MX records verified.
                    </p>
                  </div>
                  <Button
                    variant="cyan"
                    size="sm"
                    onClick={() => unlockTier2(selectedProspect.id)}
                    className="gap-1.5 shrink-0"
                  >
                    <Coins className="w-3.5 h-3.5" />
                    <span>Unlock (1 Credit)</span>
                  </Button>
                </div>
              )}
            </Card>

            {/* Persona Classification Card */}
            <Card className="p-5 space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Sparkles className="w-4 h-4 text-cyan-600 dark:text-cyan-400" />
                  <span className="text-xs font-bold uppercase tracking-wider text-foreground">
                    AI Persona Classification
                  </span>
                </div>
                <Badge variant={personaBadgeVariant} className="font-mono">
                  {selectedProspect.persona.confidence}% Confidence
                </Badge>
              </div>

              <h4 className="text-lg font-bold tracking-tight text-foreground">
                {selectedProspect.persona.label}
              </h4>
              <p className="text-xs leading-relaxed text-muted-foreground">
                {selectedProspect.persona.rationale}
              </p>

              <div className="pt-2 border-t border-border space-y-1.5">
                <div className="text-[11px] font-bold text-foreground">Trigger Signals Detected:</div>
                <ul className="space-y-1">
                  {selectedProspect.persona.triggerSignals.map((signal, idx) => (
                    <li key={idx} className="text-xs flex items-start gap-2 text-muted-foreground">
                      <span className="w-1.5 h-1.5 rounded-full mt-1.5 shrink-0 bg-cyan-500" />
                      <span>{signal}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </Card>

            {/* Detected Tech Stack */}
            <div className="space-y-3">
              <h4 className="text-xs font-bold text-muted-foreground uppercase tracking-wider flex items-center gap-2">
                <Cpu className="w-3.5 h-3.5 text-cyan-600 dark:text-cyan-400" />
                <span>Detected Company Tech Stack ({selectedProspect.techStack.length})</span>
              </h4>
              <div className="grid grid-cols-2 gap-2.5">
                {selectedProspect.techStack.map((tech, idx) => (
                  <div key={idx} className="p-3 rounded-xl bg-card border border-border flex flex-col justify-between shadow-2xs">
                    <span className="text-xs font-bold text-foreground">{tech.name}</span>
                    <div className="flex items-center justify-between text-[10px] text-muted-foreground mt-1.5">
                      <span className="font-medium">{tech.category}</span>
                      <span className="font-mono text-cyan-600 dark:text-cyan-400 font-semibold">{tech.detectedVia}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Threat Intelligence & Correlated CVE Card */}
            <div className="p-5 rounded-2xl bg-red-500/5 dark:bg-red-950/20 border border-red-500/20 space-y-3.5 shadow-2xs">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2 text-red-600 dark:text-red-400">
                  <ShieldAlert className="w-4 h-4" />
                  <span className="text-xs font-bold uppercase tracking-wider">Matched Threat Advisory</span>
                </div>
                <Badge variant="outline" className="text-[10px] font-mono border-red-500/30 text-red-600 dark:text-red-400 font-bold">
                  {selectedProspect.matchedVulnerability.advisorySource}
                </Badge>
              </div>

              <div className="flex items-baseline justify-between">
                <div>
                  <h5 className="text-base font-bold text-foreground font-mono">{selectedProspect.matchedVulnerability.cveId}</h5>
                  <p className="text-xs text-red-600 dark:text-red-400 font-medium">{selectedProspect.matchedVulnerability.name}</p>
                </div>
                <div className="flex items-center gap-2">
                  <Badge variant="destructive" className="font-mono font-bold">
                    CVSS {selectedProspect.matchedVulnerability.cvss}
                  </Badge>
                  <Badge variant="outline" className="border-red-500/30 text-red-600 dark:text-red-400 font-mono font-bold">
                    EPSS {selectedProspect.matchedVulnerability.epssScore}
                  </Badge>
                </div>
              </div>

              <p className="text-xs text-muted-foreground leading-relaxed">
                {selectedProspect.matchedVulnerability.summary}
              </p>

              <div className="p-3.5 rounded-xl bg-card border border-red-500/20 text-xs shadow-2xs">
                <span className="text-[11px] font-bold text-red-600 dark:text-red-400 uppercase tracking-wider block mb-1">
                  Executive Impact:
                </span>
                <p className="text-muted-foreground leading-relaxed">
                  {selectedProspect.matchedVulnerability.businessImpact}
                </p>
              </div>
            </div>

            {/* Public Talks & Publications */}
            <div className="space-y-3">
              <h4 className="text-xs font-bold text-muted-foreground uppercase tracking-wider flex items-center gap-2">
                <FileText className="w-3.5 h-3.5 text-purple-600 dark:text-purple-400" />
                <span>Recent Talks, Papers & Accolades</span>
              </h4>
              <div className="space-y-2">
                {selectedProspect.researchSignals.recentPublications.map((pub, idx) => (
                  <div key={idx} className="p-2.5 rounded-xl bg-card border border-border text-xs text-foreground flex items-center gap-2 shadow-2xs">
                    <Award className="w-3.5 h-3.5 text-amber-500 dark:text-amber-400 shrink-0" />
                    <span>{pub}</span>
                  </div>
                ))}
                {selectedProspect.researchSignals.recentTalks.map((talk, idx) => (
                  <div key={idx} className="p-2.5 rounded-xl bg-card border border-border text-xs text-foreground flex items-center gap-2 shadow-2xs">
                    <Radio className="w-3.5 h-3.5 text-cyan-600 dark:text-cyan-400 shrink-0" />
                    <span>{talk}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Footer CTA */}
          <div className="p-5 border-t border-border bg-card/95 sticky bottom-0 z-10 backdrop-blur-md flex items-center justify-between">
            <div className="text-xs text-muted-foreground font-medium">
              Observer Mode: Email generated as Gmail draft.
            </div>
            <Button
              variant="cyan"
              onClick={handleReviewClick}
              className="gap-2 font-bold"
            >
              <span>Review Outreach Draft</span>
              <ArrowRight className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

import React from 'react';
import { useApp } from '../../context/AppContext';
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

  const personaStyle = 
    selectedProspect.persona.type === 'compliance'
      ? {
          badge: 'bg-emerald-100/80 text-emerald-800 border-emerald-300 dark:bg-emerald-500/10 dark:text-emerald-400 dark:border-emerald-500/30',
          card: 'bg-gradient-to-b from-emerald-50/90 to-white border-emerald-200 shadow-xs text-slate-900 dark:from-emerald-950/40 dark:to-slate-900 dark:border-emerald-500/30 dark:text-emerald-400',
          title: 'text-slate-900 dark:text-white',
          desc: 'text-slate-600 dark:text-slate-300',
          bullet: 'bg-emerald-600 dark:bg-cyan-400',
          itemText: 'text-slate-700 dark:text-slate-300'
        }
      : selectedProspect.persona.type === 'soc_ops'
      ? {
          badge: 'bg-blue-100/80 text-blue-800 border-blue-300 dark:bg-blue-500/10 dark:text-blue-400 dark:border-blue-500/30',
          card: 'bg-gradient-to-b from-blue-50/90 to-white border-blue-200 shadow-xs text-slate-900 dark:from-blue-950/40 dark:to-slate-900 dark:border-blue-500/30 dark:text-blue-400',
          title: 'text-slate-900 dark:text-white',
          desc: 'text-slate-600 dark:text-slate-300',
          bullet: 'bg-blue-600 dark:bg-cyan-400',
          itemText: 'text-slate-700 dark:text-slate-300'
        }
      : selectedProspect.persona.type === 'vulnerability_mgmt'
      ? {
          badge: 'bg-amber-100/80 text-amber-800 border-amber-300 dark:bg-amber-500/10 dark:text-amber-400 dark:border-amber-500/30',
          card: 'bg-gradient-to-b from-amber-50/90 to-white border-amber-200 shadow-xs text-slate-900 dark:from-amber-950/40 dark:to-slate-900 dark:border-amber-500/30 dark:text-amber-400',
          title: 'text-slate-900 dark:text-white',
          desc: 'text-slate-600 dark:text-slate-300',
          bullet: 'bg-amber-600 dark:bg-cyan-400',
          itemText: 'text-slate-700 dark:text-slate-300'
        }
      : {
          badge: 'bg-purple-100/80 text-purple-800 border-purple-300 dark:bg-purple-500/10 dark:text-purple-400 dark:border-purple-500/30',
          card: 'bg-gradient-to-b from-purple-50/90 to-white border-purple-200 shadow-xs text-slate-900 dark:from-purple-950/40 dark:to-slate-900 dark:border-purple-500/30 dark:text-purple-400',
          title: 'text-slate-900 dark:text-white',
          desc: 'text-slate-600 dark:text-slate-300',
          bullet: 'bg-purple-600 dark:bg-cyan-400',
          itemText: 'text-slate-700 dark:text-slate-300'
        };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Backdrop */}
      <div 
        onClick={closeDossier}
        className="absolute inset-0 bg-black/60 backdrop-blur-sm transition-opacity animate-in fade-in"
      />

      <div className="absolute inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-2xl bg-white dark:bg-slate-950 border-l border-slate-200 dark:border-slate-800 shadow-2xl flex flex-col justify-between overflow-y-auto">
          {/* Header */}
          <div className="p-6 border-b border-slate-200 dark:border-slate-800 bg-white/90 dark:bg-slate-900/50 sticky top-0 z-10 backdrop-blur-md flex items-start justify-between">
            <div className="flex items-center gap-4">
              <img
                src={selectedProspect.avatar}
                alt={selectedProspect.name}
                className="w-16 h-16 rounded-2xl object-cover border-2 border-slate-200 dark:border-slate-700 shadow-md"
              />
              <div>
                <div className="flex items-center gap-2">
                  <h3 className="text-xl font-bold text-slate-900 dark:text-white tracking-tight">{selectedProspect.name}</h3>
                  <span className="text-xs px-2 py-0.5 rounded bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 border border-slate-200 dark:border-slate-700 font-medium">
                    {selectedProspect.source}
                  </span>
                </div>
                <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">{selectedProspect.title}</p>
                <div className="flex items-center gap-2 mt-1 text-xs text-cyan-700 dark:text-cyan-400 font-semibold">
                  <span>{selectedProspect.company}</span>
                  <span className="text-slate-300 dark:text-slate-600">•</span>
                  <span className="text-slate-500 dark:text-slate-400 font-normal">{selectedProspect.location}</span>
                  <span className="text-slate-300 dark:text-slate-600">•</span>
                  <span className="text-slate-500 dark:text-slate-400 font-normal">{selectedProspect.companySize}</span>
                </div>
              </div>
            </div>

            <button
              onClick={closeDossier}
              className="text-slate-400 hover:text-slate-700 dark:hover:text-white p-2 rounded-xl bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Body Content */}
          <div className="p-6 space-y-6 flex-1">
            {/* 2-Tier Enrichment Banner */}
            <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-900/80 border border-slate-200 dark:border-slate-800 space-y-3 shadow-xs">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider">
                  Contact Enrichment State
                </span>
                <span className="text-xs px-2.5 py-0.5 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200 dark:bg-emerald-500/10 dark:text-emerald-400 dark:border-emerald-500/20 font-mono font-medium">
                  Tier-1 Cheap Pass ($0) Active
                </span>
              </div>

              {selectedProspect.tier2Enriched.unlocked ? (
                <div className="grid grid-cols-2 gap-3 pt-1">
                  <div className="p-3 rounded-xl bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-800/80 flex items-center gap-3 shadow-xs">
                    <Mail className="w-4 h-4 text-cyan-600 dark:text-cyan-400 shrink-0" />
                    <div className="min-w-0">
                      <div className="text-[10px] text-slate-500 font-medium">Verified Direct Email</div>
                      <div className="text-xs font-mono text-slate-900 dark:text-slate-200 truncate font-semibold">{selectedProspect.tier2Enriched.workEmail}</div>
                    </div>
                  </div>
                  <div className="p-3 rounded-xl bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-800/80 flex items-center gap-3 shadow-xs">
                    <Phone className="w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0" />
                    <div className="min-w-0">
                      <div className="text-[10px] text-slate-500 font-medium">Direct Phone Line</div>
                      <div className="text-xs font-mono text-slate-900 dark:text-slate-200 truncate font-semibold">{selectedProspect.tier2Enriched.directPhone}</div>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="flex items-center justify-between p-3 rounded-xl bg-amber-50 dark:bg-amber-950/20 border border-amber-200 dark:border-amber-500/30">
                  <div className="flex items-center gap-2.5">
                    <Lock className="w-4 h-4 text-amber-600 dark:text-amber-400" />
                    <p className="text-xs text-amber-900 dark:text-slate-300">
                      Direct work email and phone locked. Syntax & MX records verified.
                    </p>
                  </div>
                  <button
                    onClick={() => unlockTier2(selectedProspect.id)}
                    className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs transition-colors shrink-0 shadow-sm"
                  >
                    <Coins className="w-3.5 h-3.5" />
                    <span>Unlock (1 Credit)</span>
                  </button>
                </div>
              )}
            </div>

            {/* Persona Classification Card */}
            <div className={`p-5 rounded-2xl border ${personaStyle.card} space-y-3`}>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Sparkles className="w-4 h-4 text-cyan-600 dark:text-cyan-400" />
                  <span className="text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-200">
                    AI Persona Classification
                  </span>
                </div>
                <div className={`px-2.5 py-0.5 rounded-full border text-xs font-mono font-bold ${personaStyle.badge}`}>
                  {selectedProspect.persona.confidence}% Confidence
                </div>
              </div>

              <h4 className={`text-lg font-bold tracking-tight ${personaStyle.title}`}>
                {selectedProspect.persona.label}
              </h4>
              <p className={`text-xs leading-relaxed ${personaStyle.desc}`}>
                {selectedProspect.persona.rationale}
              </p>

              <div className="pt-2 border-t border-slate-200/80 dark:border-slate-800/80 space-y-1.5">
                <div className="text-[11px] font-bold text-slate-600 dark:text-slate-400">Trigger Signals Detected:</div>
                <ul className="space-y-1">
                  {selectedProspect.persona.triggerSignals.map((signal, idx) => (
                    <li key={idx} className={`text-xs flex items-start gap-2 ${personaStyle.itemText}`}>
                      <span className={`w-1.5 h-1.5 rounded-full mt-1.5 shrink-0 ${personaStyle.bullet}`} />
                      <span>{signal}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Detected Tech Stack */}
            <div className="space-y-3">
              <h4 className="text-xs font-bold text-slate-600 dark:text-slate-400 uppercase tracking-wider flex items-center gap-2">
                <Cpu className="w-3.5 h-3.5 text-cyan-600 dark:text-cyan-400" />
                <span>Detected Company Tech Stack ({selectedProspect.techStack.length})</span>
              </h4>
              <div className="grid grid-cols-2 gap-2.5">
                {selectedProspect.techStack.map((tech, idx) => (
                  <div key={idx} className="p-3 rounded-xl bg-slate-50 dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800 flex flex-col justify-between shadow-xs">
                    <span className="text-xs font-bold text-slate-900 dark:text-slate-200">{tech.name}</span>
                    <div className="flex items-center justify-between text-[10px] text-slate-500 dark:text-slate-400 mt-1.5">
                      <span className="font-medium">{tech.category}</span>
                      <span className="font-mono text-cyan-700 dark:text-cyan-400/90 font-semibold">{tech.detectedVia}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Threat Intelligence & Correlated CVE Card */}
            <div className="p-5 rounded-2xl bg-red-50/70 dark:bg-red-950/20 border border-red-200 dark:border-red-500/30 space-y-3.5 shadow-xs">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2 text-red-600 dark:text-red-400">
                  <ShieldAlert className="w-4 h-4" />
                  <span className="text-xs font-bold uppercase tracking-wider">Matched Threat Advisory</span>
                </div>
                <span className="text-[10px] font-mono text-red-700 dark:text-red-300 px-2.5 py-1 rounded-md bg-red-100/90 border border-red-200 dark:bg-red-950/80 dark:border-red-800/80 font-bold tracking-tight">
                  {selectedProspect.matchedVulnerability.advisorySource}
                </span>
              </div>

              <div className="flex items-baseline justify-between">
                <div>
                  <h5 className="text-base font-bold text-slate-900 dark:text-white font-mono">{selectedProspect.matchedVulnerability.cveId}</h5>
                  <p className="text-xs text-red-700 dark:text-red-300 font-medium">{selectedProspect.matchedVulnerability.name}</p>
                </div>
                <div className="flex items-center gap-2">
                  <span 
                    className="text-xs px-2.5 py-0.5 rounded-md bg-red-600 !text-white font-extrabold font-mono shadow-xs inline-flex items-center justify-center"
                    style={{ color: '#ffffff' }}
                  >
                    CVSS {selectedProspect.matchedVulnerability.cvss}
                  </span>
                  <span className="text-xs px-2.5 py-0.5 rounded-md bg-white text-red-700 border border-red-200 dark:bg-red-950/80 dark:text-red-300 dark:border-red-800 font-mono font-bold shadow-xs inline-flex items-center justify-center">
                    EPSS {selectedProspect.matchedVulnerability.epssScore}
                  </span>
                </div>
              </div>

              <p className="text-xs text-slate-700 dark:text-slate-300 leading-relaxed">
                {selectedProspect.matchedVulnerability.summary}
              </p>

              <div className="p-3.5 rounded-xl bg-white dark:bg-slate-950/80 border border-red-200 dark:border-red-900/40 text-xs shadow-xs">
                <span className="text-[11px] font-bold text-red-700 dark:text-red-400 uppercase tracking-wider block mb-1">
                  Executive Impact:
                </span>
                <p className="text-slate-700 dark:text-slate-300 leading-relaxed">
                  {selectedProspect.matchedVulnerability.businessImpact}
                </p>
              </div>
            </div>

            {/* Public Talks & Publications */}
            <div className="space-y-3">
              <h4 className="text-xs font-bold text-slate-600 dark:text-slate-400 uppercase tracking-wider flex items-center gap-2">
                <FileText className="w-3.5 h-3.5 text-purple-600 dark:text-purple-400" />
                <span>Recent Talks, Papers & Accolades</span>
              </h4>
              <div className="space-y-2">
                {selectedProspect.researchSignals.recentPublications.map((pub, idx) => (
                  <div key={idx} className="p-2.5 rounded-xl bg-slate-50 dark:bg-slate-900/50 border border-slate-200 dark:border-slate-800 text-xs text-slate-700 dark:text-slate-300 flex items-center gap-2 shadow-xs">
                    <Award className="w-3.5 h-3.5 text-amber-500 dark:text-amber-400 shrink-0" />
                    <span>{pub}</span>
                  </div>
                ))}
                {selectedProspect.researchSignals.recentTalks.map((talk, idx) => (
                  <div key={idx} className="p-2.5 rounded-xl bg-slate-50 dark:bg-slate-900/50 border border-slate-200 dark:border-slate-800 text-xs text-slate-700 dark:text-slate-300 flex items-center gap-2 shadow-xs">
                    <Radio className="w-3.5 h-3.5 text-cyan-600 dark:text-cyan-400 shrink-0" />
                    <span>{talk}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Footer CTA */}
          <div className="p-5 border-t border-slate-200 dark:border-slate-800 bg-white/95 dark:bg-slate-900/80 sticky bottom-0 z-10 backdrop-blur-md flex items-center justify-between">
            <div className="text-xs text-slate-500 dark:text-slate-400 font-medium">
              Observer Mode: Email generated as Gmail draft.
            </div>
            <button
              onClick={handleReviewClick}
              className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-500 hover:to-blue-500 text-white font-semibold text-xs shadow-lg shadow-cyan-600/20 transition-all"
            >
              <span>Review Outreach Draft</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

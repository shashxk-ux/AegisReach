import React from 'react';
import { useApp } from '../../context/AppContext';
import { 
  Search, 
  Filter, 
  CheckCircle, 
  Coins, 
  ExternalLink, 
  Sparkles, 
  ShieldAlert, 
  Mail, 
  Phone, 
  Lock, 
  ChevronRight,
  Database,
  ArrowUpDown
} from 'lucide-react';
import { PersonaType, SourcingChannel } from '../../types';

export const ProspectTable: React.FC = () => {
  const { 
    prospects, 
    unlockTier2, 
    openDossier, 
    setActiveTab, 
    setSelectedProspectId,
    searchQuery,
    setSearchQuery,
    personaFilter,
    setPersonaFilter,
    sourceFilter,
    setSourceFilter,
    showToast
  } = useApp();

  const filteredProspects = prospects.filter(p => {
    const matchesSearch = 
      p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.company.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.matchedVulnerability.cveId.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesPersona = personaFilter === 'all' || p.persona.type === personaFilter;
    const matchesSource = sourceFilter === 'all' || p.source === sourceFilter;

    return matchesSearch && matchesPersona && matchesSource;
  });

  const handleReviewClick = (id: string) => {
    setSelectedProspectId(id);
    setActiveTab('review');
  };

  const handleBatchCheapPass = () => {
    showToast('info', 'Tier-1 Cheap Pass Complete', 'Syntactically verified 1,420 email formats and MX records at $0 cost.');
  };

  return (
    <div className="space-y-4">
      {/* Top Banner & Quick Metrics */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 p-4 rounded-2xl bg-slate-900/60 border border-slate-800">
        <div>
          <h2 className="text-lg font-bold text-white tracking-tight flex items-center gap-2">
            <span>Sourced CISO Prospects</span>
            <span className="text-xs px-2.5 py-0.5 rounded-full bg-cyan-500/10 text-cyan-400 border border-cyan-500/20 font-mono">
              {filteredProspects.length} Available
            </span>
          </h2>
          <p className="text-xs text-slate-400 mt-0.5">
            2-Tier Verification: Cheap MX pass verified for all records. Spend ZoomInfo/Apollo credits only on selected targets.
          </p>
        </div>

        <div className="flex items-center gap-2.5">
          <button
            onClick={handleBatchCheapPass}
            className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-slate-800/80 hover:bg-slate-800 border border-slate-700 text-xs font-medium text-slate-300 transition-all"
          >
            <CheckCircle className="w-3.5 h-3.5 text-emerald-400" />
            <span>Run Cheap Pass ($0)</span>
          </button>
          <button
            onClick={() => setActiveTab('icp')}
            className="flex items-center gap-2 px-3.5 py-1.5 rounded-xl bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-500 hover:to-blue-500 text-white text-xs font-semibold shadow-lg shadow-cyan-600/20 transition-all"
          >
            <Filter className="w-3.5 h-3.5" />
            <span>Adjust ICP Filters</span>
          </button>
        </div>
      </div>

      {/* Search & Filter Toolbar */}
      <div className="flex flex-wrap items-center justify-between gap-3 bg-white dark:bg-slate-950/60 p-3 rounded-xl border border-slate-200 dark:border-slate-800/80 shadow-xs">
        <div className="flex items-center gap-2 flex-1 min-w-[240px]">
          <div className="relative w-full max-w-md">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search by CISO name, company, title, CVE..."
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-4 py-2 bg-slate-50 dark:bg-slate-900/90 border border-slate-200 dark:border-slate-800 rounded-xl text-xs text-slate-900 dark:text-slate-200 placeholder:text-slate-400 focus:outline-none focus:border-cyan-500/50 focus:bg-white shadow-2xs font-medium"
            />
          </div>
        </div>

        <div className="flex items-center gap-2.5">
          {/* Persona Filter */}
          <div className="flex items-center gap-1.5 text-xs text-slate-600 dark:text-slate-400">
            <span className="text-[11px] font-medium text-slate-500">Persona:</span>
            <select
              value={personaFilter}
              onChange={e => setPersonaFilter(e.target.value)}
              className="bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-lg px-2.5 py-1.5 text-xs text-slate-800 dark:text-slate-300 focus:outline-none focus:border-cyan-500/50 shadow-2xs font-medium cursor-pointer"
            >
              <option value="all">All Personas</option>
              <option value="compliance">Compliance-Oriented</option>
              <option value="soc_ops">SOC / Ops-Oriented</option>
              <option value="vulnerability_mgmt">Vulnerability Mgmt</option>
              <option value="technical">Technical / Architecture</option>
            </select>
          </div>

          {/* Sourcing Channel Filter */}
          <div className="flex items-center gap-1.5 text-xs text-slate-600 dark:text-slate-400">
            <span className="text-[11px] font-medium text-slate-500">Source:</span>
            <select
              value={sourceFilter}
              onChange={e => setSourceFilter(e.target.value)}
              className="bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-lg px-2.5 py-1.5 text-xs text-slate-800 dark:text-slate-300 focus:outline-none focus:border-cyan-500/50 shadow-2xs font-medium cursor-pointer"
            >
              <option value="all">All Sources</option>
              <option value="ZoomInfo">ZoomInfo</option>
              <option value="Apollo">Apollo</option>
              <option value="Trivly">Trivly Scraper</option>
              <option value="CSV Upload">CSV Upload</option>
            </select>
          </div>
        </div>
      </div>

      {/* Main Data Table */}
      <div className="overflow-x-auto rounded-2xl border border-slate-200 dark:border-slate-800/80 bg-white dark:bg-slate-950/40 shadow-sm">
        <table className="w-full text-left text-xs">
          <thead className="bg-slate-50 dark:bg-slate-900/80 border-b border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-400 text-[11px] uppercase tracking-wider font-semibold">
            <tr>
              <th className="py-3 px-4">CISO & Company</th>
              <th className="py-3 px-4">Persona Strategy</th>
              <th className="py-3 px-4">Tech Stack & CVE Hook</th>
              <th className="py-3 px-4">Tier-1 Cheap Pass</th>
              <th className="py-3 px-4">Tier-2 Direct Contact</th>
              <th className="py-3 px-4 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 dark:divide-slate-800/60">
            {filteredProspects.map(prospect => {
              const personaColor = 
                prospect.persona.type === 'compliance'
                  ? 'bg-emerald-50 text-emerald-800 border-emerald-300 dark:bg-emerald-500/10 dark:text-emerald-400 dark:border-emerald-500/30'
                  : prospect.persona.type === 'soc_ops'
                  ? 'bg-blue-50 text-blue-800 border-blue-300 dark:bg-blue-500/10 dark:text-blue-400 dark:border-blue-500/30'
                  : prospect.persona.type === 'vulnerability_mgmt'
                  ? 'bg-amber-50 text-amber-800 border-amber-300 dark:bg-amber-500/10 dark:text-amber-400 dark:border-amber-500/30'
                  : 'bg-purple-50 text-purple-800 border-purple-300 dark:bg-purple-500/10 dark:text-purple-400 dark:border-purple-500/30';

              return (
                <tr 
                  key={prospect.id} 
                  className="hover:bg-slate-900/40 transition-colors group cursor-pointer"
                  onClick={() => openDossier(prospect.id)}
                >
                  {/* CISO & Company */}
                  <td className="py-3.5 px-4">
                    <div className="flex items-center gap-3">
                      <img
                        src={prospect.avatar}
                        alt={prospect.name}
                        className="w-10 h-10 rounded-full object-cover border border-slate-700/80 shrink-0"
                      />
                      <div className="min-w-0">
                        <div className="font-semibold text-slate-100 flex items-center gap-1.5">
                          <span>{prospect.name}</span>
                          <span className="text-[10px] px-1.5 py-0.2 rounded bg-slate-800 text-slate-400 border border-slate-700">
                            {prospect.source}
                          </span>
                        </div>
                        <p className="text-[11px] text-slate-400 truncate">{prospect.title}</p>
                        <p className="text-[11px] text-cyan-400/90 font-medium truncate mt-0.5">{prospect.company}</p>
                      </div>
                    </div>
                  </td>

                  {/* Persona Strategy */}
                  <td className="py-3.5 px-4">
                    <div className="space-y-1">
                      <div className={`inline-flex items-center gap-1.5 px-2 py-0.5 rounded-md border text-[11px] font-medium ${personaColor}`}>
                        <Sparkles className="w-3 h-3" />
                        <span>{prospect.persona.label}</span>
                      </div>
                      <div className="flex items-center gap-1.5 text-[11px] text-slate-400">
                        <span>Confidence:</span>
                        <span className="font-mono text-slate-200 font-semibold">{prospect.persona.confidence}%</span>
                      </div>
                    </div>
                  </td>

                  {/* Tech Stack & CVE Hook */}
                  <td className="py-3.5 px-4 max-w-xs">
                    <div className="space-y-1.5">
                      <div className="flex flex-wrap gap-1">
                        {prospect.techStack.slice(0, 2).map((tech, idx) => (
                          <span
                            key={idx}
                            className="text-[10px] px-1.5 py-0.5 rounded bg-slate-900 border border-slate-800 text-slate-300 font-mono"
                          >
                            {tech.name}
                          </span>
                        ))}
                      </div>
                      <div className="inline-flex items-center gap-1.5 text-[11px] px-2 py-0.5 rounded bg-red-50 text-red-700 border border-red-200 dark:bg-red-950/50 dark:border-red-800/40 dark:text-red-300">
                        <ShieldAlert className="w-3 h-3 text-red-600 dark:text-red-400 shrink-0" />
                        <span className="font-mono font-bold">{prospect.matchedVulnerability.cveId}</span>
                        <span className="text-[10px] font-semibold text-red-600 dark:text-red-400/90">CVSS {prospect.matchedVulnerability.cvss}</span>
                      </div>
                    </div>
                  </td>

                  {/* Tier-1 Cheap Pass */}
                  <td className="py-3.5 px-4">
                    <div className="space-y-1">
                      <div className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 text-[10px] font-medium">
                        <CheckCircle className="w-3 h-3" />
                        <span>Cheap Pass Active</span>
                      </div>
                      <div className="text-[10px] text-slate-500 flex items-center gap-2">
                        <span>MX Active</span>
                        <span>•</span>
                        <span>$0 Spent</span>
                      </div>
                    </div>
                  </td>

                  {/* Tier-2 Contact Unlock */}
                  <td className="py-3.5 px-4" onClick={e => e.stopPropagation()}>
                    {prospect.tier2Enriched.unlocked ? (
                      <div className="space-y-1">
                        <div className="flex items-center gap-1.5 text-slate-300 text-xs font-mono">
                          <Mail className="w-3 h-3 text-cyan-400" />
                          <span className="truncate max-w-[150px]">{prospect.tier2Enriched.workEmail}</span>
                        </div>
                        <div className="flex items-center gap-1.5 text-slate-400 text-[11px] font-mono">
                          <Phone className="w-3 h-3 text-emerald-400" />
                          <span>{prospect.tier2Enriched.directPhone}</span>
                        </div>
                      </div>
                    ) : (
                      <button
                        onClick={() => unlockTier2(prospect.id)}
                        className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-xl bg-amber-500/10 hover:bg-amber-500/20 border border-amber-500/30 text-amber-300 text-xs font-medium transition-all group/btn shadow-sm"
                      >
                        <Lock className="w-3 h-3 text-amber-400 group-hover/btn:hidden" />
                        <Coins className="w-3 h-3 text-amber-400 hidden group-hover/btn:inline" />
                        <span>Unlock (1 Credit)</span>
                      </button>
                    )}
                  </td>

                  {/* Actions */}
                  <td className="py-3.5 px-4 text-right" onClick={e => e.stopPropagation()}>
                    <div className="flex items-center justify-end gap-2">
                      <button
                        onClick={() => openDossier(prospect.id)}
                        className="p-1.5 rounded-lg bg-slate-900 border border-slate-800 text-slate-400 hover:text-cyan-300 hover:border-cyan-500/40 transition-colors"
                        title="Open AI Research Dossier"
                      >
                        <ExternalLink className="w-3.5 h-3.5" />
                      </button>
                      <button
                        onClick={() => handleReviewClick(prospect.id)}
                        className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-cyan-500/10 hover:bg-cyan-500/20 border border-cyan-500/30 text-cyan-300 font-medium text-xs transition-colors"
                      >
                        <span>Review Email</span>
                        <ChevronRight className="w-3 h-3" />
                      </button>
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

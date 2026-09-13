import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { 
  Filter, 
  Sparkles, 
  Database, 
  Globe2, 
  Briefcase, 
  Building2, 
  ShieldCheck, 
  Coins, 
  ArrowRight,
  Check
} from 'lucide-react';

export const IcpStudio: React.FC = () => {
  const { setActiveTab, showToast } = useApp();

  const [selectedIndustries, setSelectedIndustries] = useState<string[]>([
    'Financial Services & FinTech',
    'Healthcare & Life Sciences',
    'Cloud Infrastructure & SaaS'
  ]);

  const [selectedGeos, setSelectedGeos] = useState<string[]>(['North America', 'Western Europe (UK, DE, FR)']);

  const [selectedRoles, setSelectedRoles] = useState<string[]>([
    'Chief Information Security Officer (CISO)',
    'VP Security Operations / SecOps',
    'Head of Vulnerability Management',
    'Chief Security Architect'
  ]);

  const [selectedSizes, setSelectedSizes] = useState<string[]>([
    '1,000 - 5,000 employees',
    '5,000 - 10,000 employees',
    '10,000+ enterprise'
  ]);

  const [selectedSources, setSelectedSources] = useState<string[]>([
    'ZoomInfo (API)',
    'Apollo (API)',
    'Trivly Web Scraper',
    'CSV Importer'
  ]);

  const [targetVolume, setTargetVolume] = useState<number>(1420);

  const toggleItem = (list: string[], setList: (val: string[]) => void, item: string) => {
    if (list.includes(item)) {
      setList(list.filter(i => i !== item));
    } else {
      setList([...list, item]);
    }
  };

  const handleSaveICP = () => {
    showToast(
      'success',
      'ICP Profile Saved & Synchronized',
      `Identified ${targetVolume.toLocaleString()} addressable CISOs across selected verticals. 2-Tier enrichment ready.`
    );
    setActiveTab('prospects');
  };

  const industries = [
    'Financial Services & FinTech',
    'Healthcare & Life Sciences',
    'Cloud Infrastructure & SaaS',
    'Defense & Aerospace Systems',
    'Omnichannel Retail & E-Commerce',
    'Critical Infrastructure & Energy',
    'Telecommunications & 5G'
  ];

  const geos = [
    'North America',
    'Western Europe (UK, DE, FR)',
    'Nordics & Benelux',
    'APAC (Singapore, Australia, Japan)',
    'Middle East (UAE, Saudi Arabia)'
  ];

  const roles = [
    'Chief Information Security Officer (CISO)',
    'VP Security Operations / SecOps',
    'Head of Vulnerability Management',
    'Chief Security Architect',
    'Business Information Security Officer (BISO)',
    'Director of Cloud Security'
  ];

  const sizes = [
    '250 - 1,000 employees',
    '1,000 - 5,000 employees',
    '5,000 - 10,000 employees',
    '10,000+ enterprise'
  ];

  const sources = [
    'ZoomInfo (API)',
    'Apollo (API)',
    'Trivly Web Scraper',
    'CSV Importer',
    'Public Security Advisories & URLs'
  ];

  return (
    <div className="space-y-6 max-w-6xl mx-auto">
      {/* Header Banner */}
      <div className="p-6 rounded-2xl bg-white dark:bg-gradient-to-r dark:from-slate-900 dark:via-slate-900/90 dark:to-cyan-950/40 border border-slate-200 dark:border-slate-800 shadow-sm flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded-full bg-cyan-50 dark:bg-cyan-500/10 border border-cyan-200 dark:border-cyan-500/20 text-cyan-700 dark:text-cyan-400 text-xs font-semibold mb-2">
            <Filter className="w-3.5 h-3.5" />
            <span>Workflow Step 1: Define Target Audience</span>
          </div>
          <h2 className="text-xl font-bold text-slate-900 dark:text-white tracking-tight">Ideal Customer Profile (ICP) Studio</h2>
          <p className="text-xs text-slate-600 dark:text-slate-400 mt-1 max-w-2xl leading-relaxed">
            Specify audience parameters to guide multi-source sourcing adapters. AegisReach initiates a zero-cost Tier-1 verification pass on all discovered contacts before spending Apollo or ZoomInfo credits.
          </p>
        </div>

        <button
          onClick={handleSaveICP}
          className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-500 hover:to-blue-500 text-white text-xs font-semibold shadow-md shadow-cyan-500/20 transition-all shrink-0 cursor-pointer"
        >
          <span>Save & Query Pipeline</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>

      {/* Main Grid: Filters & Real-Time Forecast */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left 2 Columns: Filter Configurations */}
        <div className="lg:col-span-2 space-y-5">
          {/* Industry Vertical */}
          <div className="p-5 rounded-2xl bg-white dark:bg-slate-900/40 border border-slate-200 dark:border-slate-800 space-y-3 shadow-sm">
            <div className="flex items-center justify-between">
              <label className="text-xs font-bold text-slate-800 dark:text-slate-200 uppercase tracking-wider flex items-center gap-2">
                <Building2 className="w-4 h-4 text-cyan-600 dark:text-cyan-400" />
                <span>Target Industries / Verticals</span>
              </label>
              <span className="text-xs text-slate-500 font-mono font-medium">{selectedIndustries.length} Selected</span>
            </div>
            <div className="flex flex-wrap gap-2">
              {industries.map(ind => {
                const isSelected = selectedIndustries.includes(ind);
                return (
                  <button
                    key={ind}
                    onClick={() => toggleItem(selectedIndustries, setSelectedIndustries, ind)}
                    className={`px-3 py-1.5 rounded-xl text-xs font-medium transition-all flex items-center gap-1.5 cursor-pointer ${
                      isSelected
                        ? 'bg-cyan-50 dark:bg-cyan-500/10 text-cyan-800 dark:text-cyan-300 border border-cyan-300 dark:border-cyan-500/30 font-semibold'
                        : 'bg-slate-50 dark:bg-slate-900/90 text-slate-700 dark:text-slate-400 border border-slate-200 dark:border-slate-800 hover:border-slate-300 dark:hover:border-slate-700 hover:bg-slate-100'
                    }`}
                  >
                    {isSelected && <Check className="w-3 h-3 text-cyan-600 dark:text-cyan-400" />}
                    <span>{ind}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Job Role / Seniority */}
          <div className="p-5 rounded-2xl bg-white dark:bg-slate-900/40 border border-slate-200 dark:border-slate-800 space-y-3 shadow-sm">
            <div className="flex items-center justify-between">
              <label className="text-xs font-bold text-slate-800 dark:text-slate-200 uppercase tracking-wider flex items-center gap-2">
                <Briefcase className="w-4 h-4 text-purple-600 dark:text-purple-400" />
                <span>Security Leadership Roles</span>
              </label>
              <span className="text-xs text-slate-500 font-mono font-medium">{selectedRoles.length} Selected</span>
            </div>
            <div className="flex flex-wrap gap-2">
              {roles.map(role => {
                const isSelected = selectedRoles.includes(role);
                return (
                  <button
                    key={role}
                    onClick={() => toggleItem(selectedRoles, setSelectedRoles, role)}
                    className={`px-3 py-1.5 rounded-xl text-xs font-medium transition-all flex items-center gap-1.5 ${
                      isSelected
                        ? 'bg-purple-500/10 text-purple-300 border border-purple-500/30'
                        : 'bg-slate-900/90 text-slate-400 border border-slate-800 hover:border-slate-700'
                    }`}
                  >
                    {isSelected && <Check className="w-3 h-3 text-purple-400" />}
                    <span>{role}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Geography & Company Size */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Geography */}
            <div className="p-5 rounded-2xl bg-slate-900/40 border border-slate-800 space-y-3">
              <label className="text-xs font-bold text-slate-800 dark:text-slate-200 uppercase tracking-wider flex items-center gap-2">
                <Globe2 className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
                <span>Target Geographies</span>
              </label>
              <div className="flex flex-wrap gap-2">
                {geos.map(geo => {
                  const isSelected = selectedGeos.includes(geo);
                  return (
                    <button
                      key={geo}
                      onClick={() => toggleItem(selectedGeos, setSelectedGeos, geo)}
                      className={`px-2.5 py-1.5 rounded-xl text-xs font-medium transition-all cursor-pointer ${
                        isSelected
                          ? 'bg-emerald-50 dark:bg-emerald-500/10 text-emerald-800 dark:text-emerald-300 border border-emerald-300 dark:border-emerald-500/30 font-semibold'
                          : 'bg-slate-50 dark:bg-slate-900/90 text-slate-700 dark:text-slate-400 border border-slate-200 dark:border-slate-800 hover:border-slate-300 dark:hover:border-slate-700 hover:bg-slate-100'
                      }`}
                    >
                      {geo}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Company Size */}
            <div className="p-5 rounded-2xl bg-white dark:bg-slate-900/40 border border-slate-200 dark:border-slate-800 space-y-3 shadow-sm">
              <label className="text-xs font-bold text-slate-800 dark:text-slate-200 uppercase tracking-wider flex items-center gap-2">
                <Building2 className="w-4 h-4 text-amber-600 dark:text-amber-400" />
                <span>Company Headcount</span>
              </label>
              <div className="flex flex-wrap gap-2">
                {sizes.map(size => {
                  const isSelected = selectedSizes.includes(size);
                  return (
                    <button
                      key={size}
                      onClick={() => toggleItem(selectedSizes, setSelectedSizes, size)}
                      className={`px-2.5 py-1.5 rounded-xl text-xs font-medium transition-all cursor-pointer ${
                        isSelected
                          ? 'bg-amber-50 dark:bg-amber-500/10 text-amber-800 dark:text-amber-300 border border-amber-300 dark:border-amber-500/30 font-semibold'
                          : 'bg-slate-50 dark:bg-slate-900/90 text-slate-700 dark:text-slate-400 border border-slate-200 dark:border-slate-800 hover:border-slate-300 dark:hover:border-slate-700 hover:bg-slate-100'
                      }`}
                    >
                      {size}
                    </button>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Sourcing Adapters Selection */}
          <div className="p-5 rounded-2xl bg-white dark:bg-slate-900/40 border border-slate-200 dark:border-slate-800 space-y-3 shadow-sm">
            <div className="flex items-center justify-between">
              <label className="text-xs font-bold text-slate-800 dark:text-slate-200 uppercase tracking-wider flex items-center gap-2">
                <Database className="w-4 h-4 text-blue-600 dark:text-blue-400" />
                <span>Multi-Source Ingestion Adapters</span>
              </label>
              <span className="text-[11px] text-cyan-700 dark:text-cyan-400 font-mono font-semibold">Cross-Deduplication: Active</span>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
              {sources.map(src => {
                const isSelected = selectedSources.includes(src);
                return (
                  <button
                    key={src}
                    onClick={() => toggleItem(selectedSources, setSelectedSources, src)}
                    className={`p-3 rounded-xl text-xs font-medium text-left border transition-all cursor-pointer ${
                      isSelected
                        ? 'bg-blue-50 dark:bg-blue-500/10 text-blue-800 dark:text-blue-300 border-blue-300 dark:border-blue-500/30 font-semibold'
                        : 'bg-slate-50 dark:bg-slate-900/70 text-slate-700 dark:text-slate-400 border-slate-200 dark:border-slate-800 hover:border-slate-300 dark:hover:border-slate-700 hover:bg-slate-100'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <span>{src}</span>
                      {isSelected && <Check className="w-3.5 h-3.5 text-blue-600 dark:text-blue-400" />}
                    </div>
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* Right Column: Real-Time Sourcing Forecast & Cost Economics */}
        <div className="space-y-5">
          <div className="p-6 rounded-2xl bg-white dark:bg-gradient-to-b dark:from-slate-900 dark:via-slate-950 dark:to-slate-950 border border-slate-200 dark:border-slate-800 space-y-5 sticky top-20 shadow-sm">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-slate-600 dark:text-slate-400 uppercase tracking-wider">
                Audience Forecast
              </span>
              <span className="flex h-2 w-2 relative">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-cyan-500"></span>
              </span>
            </div>

            <div>
              <div className="text-3xl font-extrabold text-slate-900 dark:text-white font-mono tracking-tight">
                {targetVolume.toLocaleString()}
              </div>
              <p className="text-xs text-slate-600 dark:text-slate-400 mt-1">Verified CISOs matching your exact criteria</p>
            </div>

            {/* Target Slider */}
            <div className="space-y-2 pt-2 border-t border-slate-200 dark:border-slate-800/80">
              <div className="flex items-center justify-between text-xs">
                <span className="text-slate-600 dark:text-slate-400 font-medium">Prospect Target Quota</span>
                <span className="font-mono text-cyan-700 dark:text-cyan-400 font-bold">{targetVolume} prospects</span>
              </div>
              <input
                type="range"
                min="100"
                max="3000"
                step="50"
                value={targetVolume}
                onChange={e => setTargetVolume(Number(e.target.value))}
                className="w-full accent-cyan-600 dark:accent-cyan-400 bg-slate-200 dark:bg-slate-800 rounded-lg cursor-pointer h-1.5"
              />
            </div>

            {/* 2-Tier Cost Economics */}
            <div className="space-y-3 pt-4 border-t border-slate-200 dark:border-slate-800/80">
              <div className="text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider flex items-center gap-1.5">
                <Coins className="w-3.5 h-3.5 text-amber-600 dark:text-amber-400" />
                <span>2-Tier Cost Economics</span>
              </div>

              <div className="space-y-2 text-xs">
                <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-900/80 border border-slate-200 dark:border-slate-800 flex items-center justify-between shadow-2xs">
                  <div>
                    <div className="font-semibold text-emerald-700 dark:text-emerald-400">Tier-1 Cheap Pass</div>
                    <div className="text-[10px] text-slate-500 dark:text-slate-400">MX record & syntax validation</div>
                  </div>
                  <div className="font-mono font-bold text-slate-900 dark:text-white text-sm">$0.00</div>
                </div>

                <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-900/80 border border-slate-200 dark:border-slate-800 flex items-center justify-between shadow-2xs">
                  <div>
                    <div className="font-semibold text-amber-700 dark:text-amber-400">Tier-2 Direct Enrichment</div>
                    <div className="text-[10px] text-slate-500 dark:text-slate-400">Apollo / ZoomInfo credits</div>
                  </div>
                  <div className="font-mono font-bold text-slate-900 dark:text-white text-sm">On-Demand</div>
                </div>
              </div>

              <div className="p-3 rounded-xl bg-cyan-50 dark:bg-cyan-950/20 border border-cyan-200 dark:border-cyan-500/30 text-xs space-y-1 shadow-2xs">
                <div className="font-semibold text-cyan-800 dark:text-cyan-300 flex items-center gap-1.5">
                  <ShieldCheck className="w-3.5 h-3.5 text-cyan-600 dark:text-cyan-400" />
                  <span>Cost Efficiency Engine:</span>
                </div>
                <p className="text-[11px] text-cyan-950 dark:text-slate-300 leading-relaxed font-medium">
                  By executing the zero-cost Tier-1 validation pass, AegisReach prevents burning ~60% of external credit allocations on stale or disconnected email domains.
                </p>
              </div>
            </div>

            <button
              onClick={handleSaveICP}
              className="w-full py-3 rounded-xl bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-500 hover:to-blue-500 text-white font-bold text-xs shadow-md shadow-cyan-500/20 transition-all flex items-center justify-center gap-2 cursor-pointer"
            >
              <span>Load Into Sourcing Pipeline</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

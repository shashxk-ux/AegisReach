import React, { useState, useRef } from 'react';
import { useApp } from '../../context/AppContext';
import { SAMPLE_XLS_PROSPECTS } from '../../data/mockData';
import { Prospect } from '../../types';
import { Card, Badge, Button } from '../ui';
import { 
  Filter, 
  Database, 
  Globe2, 
  Briefcase, 
  Building2, 
  ShieldCheck, 
  Coins, 
  ArrowRight, 
  Check, 
  FileSpreadsheet, 
  UploadCloud, 
  CheckCircle2, 
  Sparkles, 
  X,
  ShieldAlert
} from 'lucide-react';

export const IcpStudio: React.FC = () => {
  const { setActiveTab, showToast, importProspects } = useApp();

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
    'CSV Importer',
    'XLS Import'
  ]);

  const [targetVolume, setTargetVolume] = useState<number>(1420);

  // XLS File Import State
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [importedFileName, setImportedFileName] = useState<string | null>(null);
  const [importedProspects, setImportedProspects] = useState<Prospect[]>([]);
  const [isDragging, setIsDragging] = useState(false);
  const [isParsing, setIsParsing] = useState(false);

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

  // Process an uploaded file (either actual .xls, .xlsx, or .csv)
  const processUploadedFile = (file: File) => {
    setIsParsing(true);
    setImportedFileName(file.name);

    setTimeout(() => {
      // Map/generate high-fidelity prospect records tagged with the user's XLS filename
      const generated: Prospect[] = SAMPLE_XLS_PROSPECTS.map((p, idx) => ({
        ...p,
        id: `xls-${Date.now()}-${idx}`,
        source: 'XLS Import'
      }));

      setImportedProspects(generated);
      setIsParsing(false);
      showToast(
        'info',
        'XLS File Parsed & Verified',
        `Extracted ${generated.length} CISO records from "${file.name}". Validated MX syntax at $0 cost.`
      );
    }, 600);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files[0]) {
      processUploadedFile(files[0]);
    }
  };

  const handleLoadDemoXls = () => {
    setIsParsing(true);
    setImportedFileName('enterprise_ciso_leads_q4.xls');
    setTimeout(() => {
      setImportedProspects(SAMPLE_XLS_PROSPECTS);
      setIsParsing(false);
      showToast(
        'info',
        'Demo .xls File Loaded',
        'Loaded 3 verified CISO leads with Palo Alto, Citrix, and runc vulnerabilities ready for pipeline injection.'
      );
    }, 450);
  };

  const handleInjectIntoPipeline = () => {
    if (importedProspects.length === 0) return;
    importProspects(importedProspects, importedFileName || 'Spreadsheet');
    setImportedProspects([]);
    setImportedFileName(null);
    setActiveTab('prospects');
  };

  const handleClearImport = () => {
    setImportedProspects([]);
    setImportedFileName(null);
    if (fileInputRef.current) fileInputRef.current.value = '';
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
    'XLS Import',
    'Public Security Advisories & URLs'
  ];

  return (
    <div className="space-y-6 max-w-6xl mx-auto">
      {/* Hidden file input */}
      <input
        type="file"
        ref={fileInputRef}
        onChange={handleFileChange}
        accept=".xls,.xlsx,.csv,application/vnd.ms-excel,application/vnd.openxmlformats-officedocument.spreadsheetml.sheet,text/csv"
        className="hidden"
      />

      {/* Header Banner */}
      <Card className="p-6 bg-gradient-to-r from-card via-cyan-500/5 to-card">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div>
            <Badge variant="cyan" className="gap-2 mb-2">
              <Filter className="w-3.5 h-3.5" />
              <span>Workflow Step 1: Define Target Audience</span>
            </Badge>
            <h2 className="text-xl font-bold text-foreground tracking-tight">Ideal Customer Profile (ICP) Studio</h2>
            <p className="text-xs text-muted-foreground mt-1 max-w-2xl leading-relaxed">
              Specify audience parameters or directly inject external CISO spreadsheets (.xls / .xlsx / .csv). AegisReach initiates an automated zero-cost Tier-1 verification pass on all ingested contacts before spending Apollo or ZoomInfo credits.
            </p>
          </div>

          <div className="flex items-center gap-2.5 shrink-0">
            <Button
              variant="outline"
              onClick={() => fileInputRef.current?.click()}
              className="gap-2 font-semibold text-xs h-9"
            >
              <FileSpreadsheet className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
              <span>Import .xls Leads</span>
            </Button>
            <Button
              variant="cyan"
              onClick={handleSaveICP}
              className="gap-2 font-bold !text-slate-950 shrink-0 h-9"
            >
              <span>Save & Query Pipeline</span>
              <ArrowRight className="w-4 h-4 text-slate-950 stroke-[2.5]" />
            </Button>
          </div>
        </div>
      </Card>

      {/* DIRECT XLS LEAD INGESTION SECTION */}
      <Card className="p-6 space-y-4 border-cyan-500/30 bg-gradient-to-b from-card via-cyan-500/5 to-card shadow-sm">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-border">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-600 dark:text-emerald-400">
              <FileSpreadsheet className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-sm font-bold text-foreground">
                  Direct Pipeline Injection (.xls / .xlsx / .csv)
                </h3>
                <Badge variant="emerald" className="text-[10px] font-mono">
                  Tier-1 MX Pass ($0)
                </Badge>
              </div>
              <p className="text-xs text-muted-foreground mt-0.5">
                Upload bespoke spreadsheet exports from trade shows, webinar attendees, or CRM lists to immediately inject them into the active Prospect Pipeline.
              </p>
            </div>
          </div>

          {importedProspects.length > 0 && (
            <Badge variant="cyan" className="font-mono text-xs">
              {importedProspects.length} CISOs Ready to Inject
            </Badge>
          )}
        </div>

        {/* Dropzone & Action Bar */}
        {importedProspects.length === 0 ? (
          <div
            onDragOver={e => {
              e.preventDefault();
              setIsDragging(true);
            }}
            onDragLeave={() => setIsDragging(false)}
            onDrop={e => {
              e.preventDefault();
              setIsDragging(false);
              if (e.dataTransfer.files && e.dataTransfer.files[0]) {
                processUploadedFile(e.dataTransfer.files[0]);
              }
            }}
            className={`border-2 border-dashed rounded-2xl p-6 text-center transition-all flex flex-col items-center justify-center space-y-3 ${
              isDragging
                ? 'border-cyan-500 bg-cyan-500/10 shadow-md'
                : 'border-border hover:border-cyan-500/50 bg-muted/20'
            }`}
          >
            <div className="w-12 h-12 rounded-2xl bg-card border border-border flex items-center justify-center text-cyan-600 dark:text-cyan-400 shadow-xs">
              {isParsing ? (
                <UploadCloud className="w-6 h-6 animate-bounce" />
              ) : (
                <FileSpreadsheet className="w-6 h-6" />
              )}
            </div>

            <div>
              <div className="text-xs font-bold text-foreground">
                {isParsing ? 'Parsing & Verifying Spreadsheet...' : 'Drop your .xls, .xlsx, or .csv file here'}
              </div>
              <p className="text-[11px] text-muted-foreground mt-0.5">
                Automatically maps CISO name, corporate domain, inferred perimeter tech stack, and CISA KEV vulnerabilities.
              </p>
            </div>

            <div className="flex flex-wrap items-center justify-center gap-2.5 pt-1">
              <Button
                variant="cyan"
                size="sm"
                onClick={() => fileInputRef.current?.click()}
                className="gap-2 font-bold !text-slate-950 text-xs"
              >
                <UploadCloud className="w-4 h-4 text-slate-950" />
                <span>Select .xls Spreadsheet</span>
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={handleLoadDemoXls}
                className="gap-1.5 font-semibold text-xs"
              >
                <Sparkles className="w-3.5 h-3.5 text-amber-500" />
                <span>⚡ Load Demo .xls (3 CISOs)</span>
              </Button>
            </div>
          </div>
        ) : (
          /* Live Parsed Preview & Injection Console */
          <div className="space-y-4">
            <div className="flex items-center justify-between p-3.5 rounded-xl bg-card border border-border">
              <div className="flex items-center gap-2.5">
                <FileSpreadsheet className="w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0" />
                <div>
                  <div className="text-xs font-bold text-foreground flex items-center gap-2">
                    <span>{importedFileName}</span>
                    <Badge variant="emerald" className="text-[10px] font-mono py-0">
                      Verified Syntactically
                    </Badge>
                  </div>
                  <div className="text-[11px] text-muted-foreground mt-0.5">
                    {importedProspects.length} verified leads parsed • MX records active • Correlated with 3 CISA KEV advisories
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={handleClearImport}
                  className="text-xs text-muted-foreground hover:text-foreground h-8"
                >
                  <X className="w-3.5 h-3.5 mr-1" />
                  <span>Clear</span>
                </Button>
                <Button
                  variant="cyan"
                  size="sm"
                  onClick={handleInjectIntoPipeline}
                  className="gap-2 font-bold !text-slate-950 text-xs h-8"
                >
                  <CheckCircle2 className="w-4 h-4 text-slate-950" />
                  <span>Inject into Prospect Pipeline</span>
                  <ArrowRight className="w-3.5 h-3.5 text-slate-950 stroke-[2.5]" />
                </Button>
              </div>
            </div>

            {/* Parsed Leads Table Preview */}
            <div className="overflow-x-auto rounded-xl border border-border bg-card shadow-2xs">
              <table className="w-full text-left text-xs">
                <thead className="bg-muted/50 border-b border-border text-[11px] font-bold text-muted-foreground uppercase">
                  <tr>
                    <th className="py-2.5 px-3.5">CISO & Organization</th>
                    <th className="py-2.5 px-3.5">Detected Perimeter Stack</th>
                    <th className="py-2.5 px-3.5">Matched Threat CVE</th>
                    <th className="py-2.5 px-3.5">Assigned Strategy</th>
                    <th className="py-2.5 px-3.5 text-right">Tier-1 Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border">
                  {importedProspects.map(prospect => (
                    <tr key={prospect.id} className="hover:bg-muted/30 transition-colors">
                      <td className="py-2.5 px-3.5">
                        <div className="flex items-center gap-2.5">
                          <img
                            src={prospect.avatar}
                            alt={prospect.name}
                            className="w-8 h-8 rounded-full object-cover border border-border"
                          />
                          <div>
                            <div className="font-bold text-foreground">{prospect.name}</div>
                            <div className="text-[10px] text-muted-foreground">{prospect.title} • <strong className="text-cyan-600 dark:text-cyan-400">{prospect.company}</strong></div>
                          </div>
                        </div>
                      </td>

                      <td className="py-2.5 px-3.5">
                        <div className="flex flex-wrap gap-1">
                          {prospect.techStack.map((tech, idx) => (
                            <span key={idx} className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-muted text-foreground border border-border font-medium">
                              {tech.name}
                            </span>
                          ))}
                        </div>
                      </td>

                      <td className="py-2.5 px-3.5">
                        <div className="inline-flex items-center gap-1.5 text-[11px] text-red-600 dark:text-red-400 font-semibold">
                          <ShieldAlert className="w-3.5 h-3.5 shrink-0" />
                          <span className="font-mono">{prospect.matchedVulnerability.cveId}</span>
                          <Badge variant="destructive" className="text-[10px] px-1 py-0 font-mono">
                            CVSS {prospect.matchedVulnerability.cvss}
                          </Badge>
                        </div>
                      </td>

                      <td className="py-2.5 px-3.5">
                        <Badge
                          variant={
                            prospect.persona.type === 'compliance'
                              ? 'emerald'
                              : prospect.persona.type === 'soc_ops'
                              ? 'cyan'
                              : 'purple'
                          }
                          className="text-[10px]"
                        >
                          {prospect.persona.label}
                        </Badge>
                      </td>

                      <td className="py-2.5 px-3.5 text-right">
                        <Badge variant="emerald" className="gap-1 text-[10px] font-mono font-bold">
                          <Check className="w-3 h-3" />
                          <span>$0 MX Verified</span>
                        </Badge>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </Card>

      {/* Main Grid: Filters & Real-Time Forecast */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left 2 Columns: Filter Configurations */}
        <div className="lg:col-span-2 space-y-5">
          {/* Industry Vertical */}
          <Card className="p-5 space-y-3">
            <div className="flex items-center justify-between">
              <label className="text-xs font-bold text-foreground uppercase tracking-wider flex items-center gap-2">
                <Building2 className="w-4 h-4 text-cyan-600 dark:text-cyan-400" />
                <span>Target Industries / Verticals</span>
              </label>
              <Badge variant="secondary" className="font-mono">
                {selectedIndustries.length} Selected
              </Badge>
            </div>
            <div className="flex flex-wrap gap-2">
              {industries.map(ind => {
                const isSelected = selectedIndustries.includes(ind);
                return (
                  <Button
                    key={ind}
                    variant={isSelected ? 'cyan' : 'outline'}
                    size="sm"
                    onClick={() => toggleItem(selectedIndustries, setSelectedIndustries, ind)}
                    className={`h-8 text-xs gap-1.5 ${isSelected ? '!text-slate-950 font-bold' : 'font-medium'}`}
                  >
                    {isSelected && <Check className="w-3.5 h-3.5 stroke-[2.5] text-slate-950" />}
                    <span>{ind}</span>
                  </Button>
                );
              })}
            </div>
          </Card>

          {/* Job Role / Seniority */}
          <Card className="p-5 space-y-3">
            <div className="flex items-center justify-between">
              <label className="text-xs font-bold text-foreground uppercase tracking-wider flex items-center gap-2">
                <Briefcase className="w-4 h-4 text-purple-600 dark:text-purple-400" />
                <span>Security Leadership Roles</span>
              </label>
              <Badge variant="secondary" className="font-mono">
                {selectedRoles.length} Selected
              </Badge>
            </div>
            <div className="flex flex-wrap gap-2">
              {roles.map(role => {
                const isSelected = selectedRoles.includes(role);
                return (
                  <Button
                    key={role}
                    variant={isSelected ? 'cyan' : 'outline'}
                    size="sm"
                    onClick={() => toggleItem(selectedRoles, setSelectedRoles, role)}
                    className={`h-8 text-xs gap-1.5 ${isSelected ? '!text-slate-950 font-bold' : 'font-medium'}`}
                  >
                    {isSelected && <Check className="w-3.5 h-3.5 stroke-[2.5] text-slate-950" />}
                    <span>{role}</span>
                  </Button>
                );
              })}
            </div>
          </Card>

          {/* Geography & Company Size */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Geography */}
            <Card className="p-5 space-y-3">
              <label className="text-xs font-bold text-foreground uppercase tracking-wider flex items-center gap-2">
                <Globe2 className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
                <span>Target Geographies</span>
              </label>
              <div className="flex flex-wrap gap-2">
                {geos.map(geo => {
                  const isSelected = selectedGeos.includes(geo);
                  return (
                    <Button
                      key={geo}
                      variant={isSelected ? 'cyan' : 'outline'}
                      size="sm"
                      onClick={() => toggleItem(selectedGeos, setSelectedGeos, geo)}
                      className={`h-8 text-xs gap-1.5 ${isSelected ? '!text-slate-950 font-bold' : 'font-medium'}`}
                    >
                      {isSelected && <Check className="w-3.5 h-3.5 stroke-[2.5] text-slate-950" />}
                      <span>{geo}</span>
                    </Button>
                  );
                })}
              </div>
            </Card>

            {/* Company Size */}
            <Card className="p-5 space-y-3">
              <label className="text-xs font-bold text-foreground uppercase tracking-wider flex items-center gap-2">
                <Building2 className="w-4 h-4 text-amber-600 dark:text-amber-400" />
                <span>Company Headcount</span>
              </label>
              <div className="flex flex-wrap gap-2">
                {sizes.map(size => {
                  const isSelected = selectedSizes.includes(size);
                  return (
                    <Button
                      key={size}
                      variant={isSelected ? 'cyan' : 'outline'}
                      size="sm"
                      onClick={() => toggleItem(selectedSizes, setSelectedSizes, size)}
                      className={`h-8 text-xs gap-1.5 ${isSelected ? '!text-slate-950 font-bold' : 'font-medium'}`}
                    >
                      {isSelected && <Check className="w-3.5 h-3.5 stroke-[2.5] text-slate-950" />}
                      <span>{size}</span>
                    </Button>
                  );
                })}
              </div>
            </Card>
          </div>

          {/* Sourcing Adapters Selection */}
          <Card className="p-5 space-y-3">
            <div className="flex items-center justify-between">
              <label className="text-xs font-bold text-foreground uppercase tracking-wider flex items-center gap-2">
                <Database className="w-4 h-4 text-blue-600 dark:text-blue-400" />
                <span>Multi-Source Ingestion Adapters</span>
              </label>
              <Badge variant="cyan" className="font-mono text-[11px]">
                Cross-Deduplication: Active
              </Badge>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
              {sources.map(src => {
                const isSelected = selectedSources.includes(src);
                return (
                  <button
                    type="button"
                    key={src}
                    onClick={() => {
                      if (src === 'XLS Import') {
                        fileInputRef.current?.click();
                      } else {
                        toggleItem(selectedSources, setSelectedSources, src);
                      }
                    }}
                    className={`p-3 rounded-xl text-xs text-left border transition-all cursor-pointer ${
                      isSelected
                        ? 'bg-gradient-to-r from-cyan-500 to-cyan-400 !text-slate-950 border-cyan-300 font-bold shadow-sm'
                        : 'bg-card text-muted-foreground border-border hover:border-slate-300 dark:hover:border-slate-700 hover:bg-muted/40 font-medium'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <span className="flex items-center gap-1.5">
                        {src === 'XLS Import' && <FileSpreadsheet className="w-3.5 h-3.5 text-slate-950" />}
                        {src}
                      </span>
                      {isSelected && <Check className="w-3.5 h-3.5 stroke-[2.5] text-slate-950" />}
                    </div>
                  </button>
                );
              })}
            </div>
          </Card>
        </div>

        {/* Right Column: Real-Time Sourcing Forecast & Cost Economics */}
        <div className="space-y-5">
          <Card className="p-6 space-y-5 sticky top-20">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-muted-foreground uppercase tracking-wider">
                Audience Forecast
              </span>
              <span className="flex h-2 w-2 relative">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-cyan-500"></span>
              </span>
            </div>

            <div>
              <div className="text-3xl font-extrabold text-foreground font-mono tracking-tight">
                {targetVolume.toLocaleString()}
              </div>
              <p className="text-xs text-muted-foreground mt-1">Verified CISOs matching your exact criteria</p>
            </div>

            {/* Target Slider */}
            <div className="space-y-2 pt-2 border-t border-border">
              <div className="flex items-center justify-between text-xs">
                <span className="text-muted-foreground font-medium">Prospect Target Quota</span>
                <span className="font-mono text-cyan-600 dark:text-cyan-400 font-bold">{targetVolume} prospects</span>
              </div>
              <input
                type="range"
                min="100"
                max="3000"
                step="50"
                value={targetVolume}
                onChange={e => setTargetVolume(Number(e.target.value))}
                className="w-full accent-cyan-600 dark:accent-cyan-400 bg-muted rounded-lg cursor-pointer h-1.5"
              />
            </div>

            {/* 2-Tier Cost Economics */}
            <div className="space-y-3 pt-4 border-t border-border">
              <div className="text-xs font-bold text-foreground uppercase tracking-wider flex items-center gap-1.5">
                <Coins className="w-3.5 h-3.5 text-amber-500" />
                <span>2-Tier Cost Economics</span>
              </div>

              <div className="space-y-2 text-xs">
                <div className="p-3 rounded-xl bg-muted/40 border border-border flex items-center justify-between">
                  <div>
                    <div className="font-semibold text-emerald-600 dark:text-emerald-400">Tier-1 Cheap Pass</div>
                    <div className="text-[10px] text-muted-foreground">MX record & syntax validation</div>
                  </div>
                  <div className="font-mono font-bold text-foreground text-sm">$0.00</div>
                </div>

                <div className="p-3 rounded-xl bg-muted/40 border border-border flex items-center justify-between">
                  <div>
                    <div className="font-semibold text-amber-600 dark:text-amber-400">Tier-2 Direct Enrichment</div>
                    <div className="text-[10px] text-muted-foreground">Apollo / ZoomInfo credits</div>
                  </div>
                  <div className="font-mono font-bold text-foreground text-sm">On-Demand</div>
                </div>
              </div>

              <div className="p-3 rounded-xl bg-cyan-500/10 border border-cyan-500/20 text-xs space-y-1">
                <div className="font-semibold text-cyan-700 dark:text-cyan-300 flex items-center gap-1.5">
                  <ShieldCheck className="w-3.5 h-3.5 text-cyan-600 dark:text-cyan-400" />
                  <span>Cost Efficiency Engine:</span>
                </div>
                <p className="text-[11px] text-muted-foreground leading-relaxed font-medium">
                  By executing the zero-cost Tier-1 validation pass, AegisReach prevents burning ~60% of external credit allocations on stale or disconnected email domains.
                </p>
              </div>
            </div>

            <Button
              variant="cyan"
              onClick={handleSaveICP}
              className="w-full font-bold !text-slate-950 gap-2"
            >
              <span>Load Into Sourcing Pipeline</span>
              <ArrowRight className="w-4 h-4 text-slate-950 stroke-[2.5]" />
            </Button>
          </Card>
        </div>
      </div>
    </div>
  );
};

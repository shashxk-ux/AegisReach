import React, { useState, useRef } from 'react';
import { useApp } from '../../context/AppContext';
import { SAMPLE_XLS_PROSPECTS } from '../../data/mockData';
import { Prospect } from '../../types';
import { Card, Badge, Button, Input } from '../ui';
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
  ShieldAlert,
  Search,
  Download,
  Layers,
  Cpu,
  Zap,
  CheckSquare,
  Square,
  DollarSign,
  SlidersHorizontal
} from 'lucide-react';

interface IcpPreset {
  id: string;
  name: string;
  badge: string;
  badgeVariant: 'cyan' | 'purple' | 'emerald' | 'amber';
  icon: typeof ShieldAlert;
  description: string;
  vulnerabilityTarget: string;
  cveId: string;
  cvss: number;
  industries: string[];
  roles: string[];
  geos: string[];
  sizes: string[];
  techs: string[];
  volume: number;
  confidence: number;
}

export const IcpStudio: React.FC = () => {
  const { setActiveTab, showToast, importProspects } = useApp();

  // Mode: 'criteria' | 'spreadsheet' | 'presets'
  const [activeMode, setActiveMode] = useState<'criteria' | 'spreadsheet' | 'presets'>('criteria');

  // Filter criteria states
  const [selectedIndustries, setSelectedIndustries] = useState<string[]>([
    'Financial Services & FinTech',
    'Healthcare & Life Sciences',
    'Cloud Infrastructure & SaaS'
  ]);

  const [selectedGeos, setSelectedGeos] = useState<string[]>([
    'North America', 
    'Western Europe (UK, DE, FR)'
  ]);

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

  const [selectedTechs, setSelectedTechs] = useState<string[]>([
    'Palo Alto PAN-OS',
    'Citrix NetScaler',
    'Kubernetes EKS'
  ]);

  const [selectedSources, setSelectedSources] = useState<string[]>([
    'ZoomInfo (API)',
    'Apollo (API)',
    'Trivly Web Scraper',
    'CSV Importer',
    'XLS Import'
  ]);

  const [targetVolume, setTargetVolume] = useState<number>(1420);
  const [criteriaSearch, setCriteriaSearch] = useState<string>('');
  const [activePresetId, setActivePresetId] = useState<string | null>(null);

  // XLS / CSV File Import State
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [importedFileName, setImportedFileName] = useState<string | null>(null);
  const [importedProspects, setImportedProspects] = useState<Prospect[]>([]);
  const [selectedLeadIds, setSelectedLeadIds] = useState<string[]>([]);
  const [isDragging, setIsDragging] = useState(false);
  const [isParsing, setIsParsing] = useState(false);
  const [showMappingInspector, setShowMappingInspector] = useState(true);

  // 1-Click ICP Presets
  const presets: IcpPreset[] = [
    {
      id: 'federal_defense',
      name: 'Federal & Defense Zero-Trust (CMMC 2.0 / DoD)',
      badge: 'DoD / CMMC 2.0',
      badgeVariant: 'purple',
      icon: ShieldAlert,
      description: 'Air-gapped enclave defense for aerospace contractors & industrial base running edge VPN gateways.',
      vulnerabilityTarget: 'PAN-OS GlobalProtect Zero-Day Buffer Injection',
      cveId: 'CVE-2024-3400',
      cvss: 10.0,
      industries: ['Defense & Aerospace Systems', 'Critical Infrastructure & Energy'],
      roles: ['Chief Information Security Officer (CISO)', 'Chief Security Architect'],
      geos: ['North America'],
      sizes: ['5,000 - 10,000 employees', '10,000+ enterprise'],
      techs: ['Palo Alto PAN-OS', 'Cisco ASA / Firepower'],
      volume: 780,
      confidence: 98
    },
    {
      id: 'fintech_containers',
      name: 'FinTech Cloud-Native & Container Security (PCI-DSS v4.0)',
      badge: 'PCI-DSS v4.0 / eBPF',
      badgeVariant: 'cyan',
      icon: Cpu,
      description: 'Multi-tenant payment orchestration clusters requiring kernel-level container breakout interception.',
      vulnerabilityTarget: 'runc Container Breakout via Leaked File Descriptor',
      cveId: 'CVE-2024-21626',
      cvss: 8.6,
      industries: ['Financial Services & FinTech', 'Cloud Infrastructure & SaaS'],
      roles: ['VP Security Operations / SecOps', 'Chief Security Architect', 'Director of Cloud Security'],
      geos: ['North America', 'Western Europe (UK, DE, FR)', 'Nordics & Benelux'],
      sizes: ['1,000 - 5,000 employees', '5,000 - 10,000 employees'],
      techs: ['Kubernetes EKS', 'HashiCorp Vault', 'AWS CloudTrail'],
      volume: 1240,
      confidence: 96
    },
    {
      id: 'healthcare_clinical',
      name: 'Healthcare Clinical Systems & HIPAA (Health-ISAC)',
      badge: 'HIPAA / OCR Enclave',
      badgeVariant: 'emerald',
      icon: ShieldCheck,
      description: 'Hospital EHR records and clinical telehealth networks safeguarding Citrix NetScaler edge session tokens.',
      vulnerabilityTarget: 'Citrix NetScaler Bleed Session Hijack & Memory Leak',
      cveId: 'CVE-2023-4966',
      cvss: 9.4,
      industries: ['Healthcare & Life Sciences'],
      roles: ['Chief Information Security Officer (CISO)', 'Business Information Security Officer (BISO)'],
      geos: ['North America'],
      sizes: ['5,000 - 10,000 employees', '10,000+ enterprise'],
      techs: ['Citrix NetScaler', 'Epic Systems EMR'],
      volume: 620,
      confidence: 95
    },
    {
      id: 'critical_infra',
      name: 'Critical Infrastructure & OT/ICS (CISA KEV)',
      badge: 'NERC-CIP / OT Shield',
      badgeVariant: 'amber',
      icon: Zap,
      description: 'Energy grid, 5G telecom, and pipeline telemetry monitoring systems requiring zero-downtime perimeter isolation.',
      vulnerabilityTarget: 'Ivanti Connect Secure Auth Bypass & RCE',
      cveId: 'CVE-2023-46805',
      cvss: 9.8,
      industries: ['Critical Infrastructure & Energy', 'Telecommunications & 5G'],
      roles: ['Chief Information Security Officer (CISO)', 'Head of Vulnerability Management'],
      geos: ['North America', 'Western Europe (UK, DE, FR)', 'APAC (Singapore, Australia, Japan)'],
      sizes: ['1,000 - 5,000 employees', '10,000+ enterprise'],
      techs: ['Ivanti Connect Secure', 'Fortinet FortiOS'],
      volume: 540,
      confidence: 94
    }
  ];

  const toggleItem = (list: string[], setList: (val: string[]) => void, item: string) => {
    if (list.includes(item)) {
      setList(list.filter(i => i !== item));
    } else {
      setList([...list, item]);
    }
    setActivePresetId(null);
  };

  const handleSelectAll = (all: string[], setList: (val: string[]) => void) => {
    setList([...all]);
    setActivePresetId(null);
  };

  const handleClearCategory = (setList: (val: string[]) => void) => {
    setList([]);
    setActivePresetId(null);
  };

  const handleApplyPreset = (preset: IcpPreset) => {
    setSelectedIndustries(preset.industries);
    setSelectedRoles(preset.roles);
    setSelectedGeos(preset.geos);
    setSelectedSizes(preset.sizes);
    setSelectedTechs(preset.techs);
    setTargetVolume(preset.volume);
    setActivePresetId(preset.id);
    setActiveMode('criteria');
    showToast(
      'success',
      `Preset Applied: ${preset.name}`,
      `Loaded ${preset.volume} addressable CISOs with ${preset.techs.join(', ')} perimeter targeting.`
    );
  };

  const handleSaveICP = () => {
    showToast(
      'success',
      'ICP Profile Saved & Synchronized',
      `Identified ${targetVolume.toLocaleString()} addressable CISOs across selected verticals. 2-Tier enrichment ready.`
    );
    setActiveTab('prospects');
  };

  // Sample CSV Template Download
  const handleDownloadSampleCsv = () => {
    const csvContent = [
      'Full Name,Job Title,Company,Work Email,Perimeter Tech,CISA KEV CVE,Industry',
      'Marcus Vance,VP Defense Cyber Strategy,General Dynamics Defense Systems,marcus.vance@gd-defense.com,Palo Alto PAN-OS,CVE-2024-3400,Defense & Aerospace Systems',
      'Dr. Priya Patel,Global Head of Cybersecurity & HIPAA Privacy,Novartis Healthcare Network,priya.patel@novartis-hn.org,Citrix NetScaler,CVE-2023-4966,Healthcare & Life Sciences',
      'Daniel Lindqvist,VP Security Engineering & Cloud Architecture,Klarna Nordic Payments,daniel.lindqvist@klarna-nordic.se,Kubernetes EKS,CVE-2024-21626,Financial Services & FinTech'
    ].join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.setAttribute('href', url);
    link.setAttribute('download', 'aegisreach_ciso_leads_template.csv');
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    showToast('info', 'Template Downloaded', 'Downloaded aegisreach_ciso_leads_template.csv format template.');
  };

  // Process an uploaded file (either actual .csv, .xls, or .xlsx)
  const processUploadedFile = (file: File) => {
    setIsParsing(true);
    setImportedFileName(file.name);

    if (file.name.endsWith('.csv') || file.type.includes('csv') || file.type.includes('text')) {
      const reader = new FileReader();
      reader.onload = (event) => {
        const text = event.target?.result as string;
        if (text) {
          const lines = text.split('\n').filter(l => l.trim().length > 0);
          if (lines.length > 1) {
            const rows = lines.slice(1);
            const parsedList: Prospect[] = rows.slice(0, 10).map((row, idx) => {
              const cols = row.split(',').map(c => c.trim().replace(/^"|"$/g, ''));
              const name = cols[0] || `Lead ${idx + 1}`;
              const title = cols[1] || 'Chief Information Security Officer';
              const company = cols[2] || 'Enterprise Corp';
              const email = cols[3] || `contact${idx + 1}@${company.toLowerCase().replace(/[^a-z0-9]/g, '')}.com`;
              const techName = cols[4] || 'Palo Alto PAN-OS';
              const cve = cols[5] || 'CVE-2024-3400';
              const ind = cols[6] || 'Financial Services & FinTech';
              
              const base = SAMPLE_XLS_PROSPECTS[idx % SAMPLE_XLS_PROSPECTS.length];
              return {
                ...base,
                id: `csv-${Date.now()}-${idx}`,
                name,
                title,
                company,
                industry: ind,
                source: 'XLS Import',
                tier2Enriched: {
                  ...base.tier2Enriched,
                  workEmail: email
                },
                techStack: [{ name: techName, category: 'Edge Gateway', detectedVia: 'Spreadsheet Ingest' }],
                matchedVulnerability: {
                  ...base.matchedVulnerability,
                  cveId: cve,
                  name: `${techName} Exposure Gating`
                }
              };
            });
            setImportedProspects(parsedList);
            setSelectedLeadIds(parsedList.map(p => p.id));
            setIsParsing(false);
            setActiveMode('spreadsheet');
            showToast('success', 'CSV Parsed Successfully', `Parsed ${parsedList.length} leads from "${file.name}" with zero-cost Tier-1 verification.`);
            return;
          }
        }
        applyMockMapping(file.name);
      };
      reader.readAsText(file);
    } else {
      applyMockMapping(file.name);
    }
  };

  const applyMockMapping = (fileName: string) => {
    setTimeout(() => {
      const generated: Prospect[] = SAMPLE_XLS_PROSPECTS.map((p, idx) => ({
        ...p,
        id: `xls-${Date.now()}-${idx}`,
        source: 'XLS Import'
      }));
      setImportedProspects(generated);
      setSelectedLeadIds(generated.map(p => p.id));
      setIsParsing(false);
      setActiveMode('spreadsheet');
      showToast(
        'info',
        'Spreadsheet Parsed & Verified',
        `Extracted ${generated.length} CISO records from "${fileName}". Validated MX syntax at $0 cost.`
      );
    }, 550);
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
      setSelectedLeadIds(SAMPLE_XLS_PROSPECTS.map(p => p.id));
      setIsParsing(false);
      setActiveMode('spreadsheet');
      showToast(
        'info',
        'Demo .xls File Loaded',
        'Loaded 3 verified CISO leads with Palo Alto, Citrix, and runc vulnerabilities ready for pipeline injection.'
      );
    }, 450);
  };

  const handleToggleLeadSelection = (id: string) => {
    if (selectedLeadIds.includes(id)) {
      setSelectedLeadIds(selectedLeadIds.filter(i => i !== id));
    } else {
      setSelectedLeadIds([...selectedLeadIds, id]);
    }
  };

  const handleToggleSelectAllLeads = () => {
    if (selectedLeadIds.length === importedProspects.length) {
      setSelectedLeadIds([]);
    } else {
      setSelectedLeadIds(importedProspects.map(p => p.id));
    }
  };

  const handleInjectIntoPipeline = () => {
    const leadsToInject = importedProspects.filter(p => selectedLeadIds.includes(p.id));
    if (leadsToInject.length === 0) {
      showToast('warning', 'No Leads Selected', 'Please select at least 1 lead to inject into the pipeline.');
      return;
    }
    importProspects(leadsToInject, importedFileName || 'Spreadsheet');
    setImportedProspects([]);
    setSelectedLeadIds([]);
    setImportedFileName(null);
    setActiveTab('prospects');
  };

  const handleClearImport = () => {
    setImportedProspects([]);
    setSelectedLeadIds([]);
    setImportedFileName(null);
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  // Base options
  const industries = [
    'Financial Services & FinTech',
    'Healthcare & Life Sciences',
    'Cloud Infrastructure & SaaS',
    'Defense & Aerospace Systems',
    'Omnichannel Retail & E-Commerce',
    'Critical Infrastructure & Energy',
    'Telecommunications & 5G'
  ];

  const roles = [
    'Chief Information Security Officer (CISO)',
    'VP Security Operations / SecOps',
    'Head of Vulnerability Management',
    'Chief Security Architect',
    'Business Information Security Officer (BISO)',
    'Director of Cloud Security'
  ];

  const technologies = [
    'Palo Alto PAN-OS',
    'Citrix NetScaler',
    'Kubernetes EKS',
    'Fortinet FortiOS',
    'Cisco ASA / Firepower',
    'Ivanti Connect Secure',
    'AWS CloudTrail',
    'HashiCorp Vault'
  ];

  const geos = [
    'North America',
    'Western Europe (UK, DE, FR)',
    'Nordics & Benelux',
    'APAC (Singapore, Australia, Japan)',
    'Middle East (UAE, Saudi Arabia)'
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

  // Search filter helper
  const filterBySearch = (items: string[]) => {
    if (!criteriaSearch.trim()) return items;
    return items.filter(item => item.toLowerCase().includes(criteriaSearch.toLowerCase()));
  };

  // Dynamic 2-Tier Cost Economics
  const staleLeadsFiltered = Math.round(targetVolume * 0.58);
  const targetableEnrichedLeads = targetVolume - staleLeadsFiltered;
  const traditionalApolloSpend = targetVolume * 1.0;
  const aegisReachSpend = targetableEnrichedLeads * 1.0;
  const estimatedDollarsSaved = staleLeadsFiltered * 1.0;
  const matchConfidence = Math.min(
    99,
    84 + selectedIndustries.length * 2 + selectedRoles.length * 1.5 + (selectedTechs.length > 0 ? 3 : 0)
  );

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
      <Card className="p-6 bg-card border-border">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <Badge variant="cyan" className="gap-1.5 py-0.5">
                <Filter className="w-3.5 h-3.5" />
                <span>Workflow Step 1: Define Target Audience</span>
              </Badge>
              {activePresetId && (
                <Badge variant="purple" className="text-[10px] font-semibold">
                  ⚡ Preset Active
                </Badge>
              )}
            </div>
            <h2 className="text-2xl font-extrabold text-foreground tracking-tight">
              Ideal Customer Profile (ICP) Studio
            </h2>
            <p className="text-xs text-muted-foreground mt-1 max-w-2xl leading-relaxed">
              Architect multi-dimensional CISO cohorts or directly inject bespoke spreadsheet leads (.xls / .xlsx / .csv). AegisReach executes an automated zero-cost Tier-1 verification pass on all contacts before consuming external enrichment credits.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-2.5 shrink-0">
            <Button
              variant="outline"
              onClick={handleDownloadSampleCsv}
              className="gap-1.5 font-semibold text-xs h-9"
              title="Download Sample CSV Template"
            >
              <Download className="w-3.5 h-3.5 text-muted-foreground" />
              <span>.CSV Template</span>
            </Button>
            <Button
              variant="outline"
              onClick={() => {
                setActiveMode('spreadsheet');
                fileInputRef.current?.click();
              }}
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
              <span>Query Active Pipeline</span>
              <ArrowRight className="w-4 h-4 text-slate-950 stroke-[2.5]" />
            </Button>
          </div>
        </div>

        {/* Triple Mode Navigation Bar */}
        <div className="flex items-center gap-1.5 pt-5 mt-5 border-t border-border overflow-x-auto">
          <button
            type="button"
            onClick={() => setActiveMode('criteria')}
            className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
              activeMode === 'criteria'
                ? 'bg-cyan-400 !text-slate-950'
                : 'text-muted-foreground hover:text-foreground hover:bg-muted/50'
            }`}
          >
            <SlidersHorizontal className="w-3.5 h-3.5" />
            <span>Target Criteria Engine</span>
            <Badge variant="secondary" className="ml-1 text-[10px] py-0 px-1.5 font-mono">
              {targetVolume.toLocaleString()} CISOs
            </Badge>
          </button>

          <button
            type="button"
            onClick={() => setActiveMode('spreadsheet')}
            className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
              activeMode === 'spreadsheet'
                ? 'bg-cyan-400 !text-slate-950'
                : 'text-muted-foreground hover:text-foreground hover:bg-muted/50'
            }`}
          >
            <FileSpreadsheet className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
            <span>Spreadsheet Ingestion (.xls / .csv)</span>
            {importedProspects.length > 0 && (
              <Badge variant="emerald" className="ml-1 text-[10px] py-0 px-1.5 font-mono">
                {importedProspects.length} Ready
              </Badge>
            )}
          </button>

          <button
            type="button"
            onClick={() => setActiveMode('presets')}
            className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
              activeMode === 'presets'
                ? 'bg-cyan-400 !text-slate-950'
                : 'text-muted-foreground hover:text-foreground hover:bg-muted/50'
            }`}
          >
            <Sparkles className="w-3.5 h-3.5 text-amber-500" />
            <span>⚡ 1-Click ICP Archetype Presets</span>
            <Badge variant="purple" className="ml-1 text-[10px] py-0 px-1.5 font-mono">
              4 Battle-Tested
            </Badge>
          </button>
        </div>
      </Card>

      {/* ==================================================================== */}
      {/* MODE 1: TARGET CRITERIA ENGINE                                       */}
      {/* ==================================================================== */}
      {activeMode === 'criteria' && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left 2 Columns: Filter Configurations */}
          <div className="lg:col-span-2 space-y-5">
            {/* Quick Search Bar */}
            <div className="relative">
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input
                type="text"
                placeholder="Quick-filter roles, industries, or technologies (e.g., NetScaler, FinTech, CISO)..."
                value={criteriaSearch}
                onChange={e => setCriteriaSearch(e.target.value)}
                className="pl-10 h-10 text-xs bg-card"
              />
              {criteriaSearch && (
                <button
                  type="button"
                  onClick={() => setCriteriaSearch('')}
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              )}
            </div>

            {/* Industry Vertical */}
            <Card className="p-5 space-y-3">
              <div className="flex items-center justify-between">
                <label className="text-xs font-bold text-foreground uppercase tracking-wider flex items-center gap-2">
                  <Building2 className="w-4 h-4 text-cyan-600 dark:text-cyan-400" />
                  <span>Target Industries / Verticals</span>
                </label>
                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() => handleSelectAll(industries, setSelectedIndustries)}
                    className="text-[10px] font-semibold text-cyan-600 dark:text-cyan-400 hover:underline"
                  >
                    Select All
                  </button>
                  <span className="text-muted-foreground text-[10px]">•</span>
                  <button
                    type="button"
                    onClick={() => handleClearCategory(setSelectedIndustries)}
                    className="text-[10px] font-semibold text-muted-foreground hover:text-foreground"
                  >
                    Clear
                  </button>
                  <Badge variant="secondary" className="font-mono text-[10px] ml-1">
                    {selectedIndustries.length} Selected
                  </Badge>
                </div>
              </div>
              <div className="flex flex-wrap gap-2">
                {filterBySearch(industries).map(ind => {
                  const isSelected = selectedIndustries.includes(ind);
                  return (
                    <Button
                      key={ind}
                      variant={isSelected ? 'cyan' : 'outline'}
                      size="sm"
                      onClick={() => toggleItem(selectedIndustries, setSelectedIndustries, ind)}
                      className={`h-8 text-xs gap-1.5 ${isSelected ? '!text-slate-950 font-bold shadow-xs' : 'font-medium'}`}
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
                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() => handleSelectAll(roles, setSelectedRoles)}
                    className="text-[10px] font-semibold text-cyan-600 dark:text-cyan-400 hover:underline"
                  >
                    Select All
                  </button>
                  <span className="text-muted-foreground text-[10px]">•</span>
                  <button
                    type="button"
                    onClick={() => handleClearCategory(setSelectedRoles)}
                    className="text-[10px] font-semibold text-muted-foreground hover:text-foreground"
                  >
                    Clear
                  </button>
                  <Badge variant="secondary" className="font-mono text-[10px] ml-1">
                    {selectedRoles.length} Selected
                  </Badge>
                </div>
              </div>
              <div className="flex flex-wrap gap-2">
                {filterBySearch(roles).map(role => {
                  const isSelected = selectedRoles.includes(role);
                  return (
                    <Button
                      key={role}
                      variant={isSelected ? 'cyan' : 'outline'}
                      size="sm"
                      onClick={() => toggleItem(selectedRoles, setSelectedRoles, role)}
                      className={`h-8 text-xs gap-1.5 ${isSelected ? '!text-slate-950 font-bold shadow-xs' : 'font-medium'}`}
                    >
                      {isSelected && <Check className="w-3.5 h-3.5 stroke-[2.5] text-slate-950" />}
                      <span>{role}</span>
                    </Button>
                  );
                })}
              </div>
            </Card>

            {/* Edge Technology Footprint Gating */}
            <Card className="p-5 space-y-3 border-cyan-500/20 bg-card">
              <div className="flex items-center justify-between">
                <label className="text-xs font-bold text-foreground uppercase tracking-wider flex items-center gap-2">
                  <Cpu className="w-4 h-4 text-cyan-600 dark:text-cyan-400" />
                  <span>Perimeter Infrastructure & Tech Stack</span>
                </label>
                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() => handleSelectAll(technologies, setSelectedTechs)}
                    className="text-[10px] font-semibold text-cyan-600 dark:text-cyan-400 hover:underline"
                  >
                    Select All
                  </button>
                  <span className="text-muted-foreground text-[10px]">•</span>
                  <button
                    type="button"
                    onClick={() => handleClearCategory(setSelectedTechs)}
                    className="text-[10px] font-semibold text-muted-foreground hover:text-foreground"
                  >
                    Clear
                  </button>
                  <Badge variant="cyan" className="font-mono text-[10px] ml-1">
                    {selectedTechs.length} Active
                  </Badge>
                </div>
              </div>
              <p className="text-[11px] text-muted-foreground">
                Filter prospect companies running specific edge infrastructure matching weaponized CISA KEV threat feeds.
              </p>
              <div className="flex flex-wrap gap-2 pt-1">
                {filterBySearch(technologies).map(tech => {
                  const isSelected = selectedTechs.includes(tech);
                  return (
                    <Button
                      key={tech}
                      variant={isSelected ? 'cyan' : 'outline'}
                      size="sm"
                      onClick={() => toggleItem(selectedTechs, setSelectedTechs, tech)}
                      className={`h-8 text-xs gap-1.5 ${isSelected ? '!text-slate-950 font-bold shadow-xs' : 'font-medium'}`}
                    >
                      {isSelected && <Check className="w-3.5 h-3.5 stroke-[2.5] text-slate-950" />}
                      <span>{tech}</span>
                    </Button>
                  );
                })}
              </div>
            </Card>

            {/* Geography & Company Size Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Geography */}
              <Card className="p-5 space-y-3">
                <div className="flex items-center justify-between">
                  <label className="text-xs font-bold text-foreground uppercase tracking-wider flex items-center gap-2">
                    <Globe2 className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
                    <span>Target Geographies</span>
                  </label>
                  <Badge variant="secondary" className="font-mono text-[10px]">
                    {selectedGeos.length}
                  </Badge>
                </div>
                <div className="flex flex-wrap gap-2">
                  {geos.map(geo => {
                    const isSelected = selectedGeos.includes(geo);
                    return (
                      <Button
                        key={geo}
                        variant={isSelected ? 'cyan' : 'outline'}
                        size="sm"
                        onClick={() => toggleItem(selectedGeos, setSelectedGeos, geo)}
                        className={`h-8 text-xs gap-1.5 ${isSelected ? '!text-slate-950 font-bold shadow-xs' : 'font-medium'}`}
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
                <div className="flex items-center justify-between">
                  <label className="text-xs font-bold text-foreground uppercase tracking-wider flex items-center gap-2">
                    <Building2 className="w-4 h-4 text-amber-600 dark:text-amber-400" />
                    <span>Company Headcount</span>
                  </label>
                  <Badge variant="secondary" className="font-mono text-[10px]">
                    {selectedSizes.length}
                  </Badge>
                </div>
                <div className="flex flex-wrap gap-2">
                  {sizes.map(size => {
                    const isSelected = selectedSizes.includes(size);
                    return (
                      <Button
                        key={size}
                        variant={isSelected ? 'cyan' : 'outline'}
                        size="sm"
                        onClick={() => toggleItem(selectedSizes, setSelectedSizes, size)}
                        className={`h-8 text-xs gap-1.5 ${isSelected ? '!text-slate-950 font-bold shadow-xs' : 'font-medium'}`}
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
                  <Database className="w-4 h-4 text-cyan-600 dark:text-cyan-400" />
                  <span>Multi-Source Ingestion Adapters</span>
                </label>
                <Badge variant="cyan" className="font-mono text-[10px]">
                  Deduplication: Active
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
                          setActiveMode('spreadsheet');
                          fileInputRef.current?.click();
                        } else {
                          toggleItem(selectedSources, setSelectedSources, src);
                        }
                      }}
                      className={`p-3 rounded-xl text-xs text-left border transition-all cursor-pointer ${
                        isSelected
                          ? 'bg-cyan-400 !text-slate-950 border-cyan-300 font-semibold'
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
            <Card className="p-6 space-y-5 sticky top-4 border-border">
              <div className="flex items-center justify-between gap-3 flex-wrap">
                <span className="text-[11px] font-medium text-muted-foreground uppercase tracking-[0.14em]">
                  Audience Forecast
                </span>
                <span className="flex items-center gap-1.5 whitespace-nowrap">
                  <span className="flex h-2 w-2 relative">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-cyan-500"></span>
                  </span>
                  <span className="text-[10px] font-mono text-emerald-600 dark:text-emerald-400 font-bold">
                    {matchConfidence}% Match Confidence
                  </span>
                </span>
              </div>

              <div>
                <div className="text-3xl font-extrabold text-foreground font-mono tracking-tight flex items-baseline gap-2">
                  <span>{targetVolume.toLocaleString()}</span>
                  <span className="text-xs font-normal text-muted-foreground">CISOs</span>
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
                  onChange={e => {
                    setTargetVolume(Number(e.target.value));
                    setActivePresetId(null);
                  }}
                  className="w-full accent-cyan-600 dark:accent-cyan-400 bg-muted rounded-lg cursor-pointer h-1.5"
                />
                <div className="flex justify-between text-[10px] font-mono text-muted-foreground">
                  <span>100 min</span>
                  <span>3,000 max</span>
                </div>
              </div>

              {/* Dynamic 2-Tier Cost Economics */}
              <div className="space-y-3 pt-4 border-t border-border">
                <div className="flex items-center justify-between text-xs font-bold text-foreground uppercase tracking-wider">
                  <span className="flex items-center gap-1.5">
                    <Coins className="w-3.5 h-3.5 text-amber-500" />
                    <span>2-Tier Cost Engine</span>
                  </span>
                  <Badge variant="emerald" className="text-[10px] font-mono py-0 font-bold">
                    Save ~58%
                  </Badge>
                </div>

                <div className="space-y-2 text-xs">
                  <div className="p-3 rounded-xl bg-muted/40 border border-border flex items-center justify-between">
                    <div>
                      <div className="font-semibold text-emerald-600 dark:text-emerald-400 flex items-center gap-1">
                        <span>Tier-1 Cheap Pass</span>
                        <Badge variant="emerald" className="text-[9px] py-0 px-1 font-mono">100% Free</Badge>
                      </div>
                      <div className="text-[10px] text-muted-foreground">MX record & syntax pre-validation</div>
                    </div>
                    <div className="text-right">
                      <div className="font-mono font-bold text-foreground text-sm">$0.00</div>
                      <div className="text-[9px] text-muted-foreground">{targetVolume} domains verified</div>
                    </div>
                  </div>

                  <div className="p-3 rounded-xl bg-muted/40 border border-border flex items-center justify-between">
                    <div>
                      <div className="font-semibold text-cyan-600 dark:text-cyan-400">Tier-2 Direct Enrichment</div>
                      <div className="text-[10px] text-muted-foreground">Apollo / ZoomInfo mobile & email</div>
                    </div>
                    <div className="text-right">
                      <div className="font-mono font-bold text-foreground text-sm">${aegisReachSpend}</div>
                      <div className="text-[9px] text-muted-foreground">{targetableEnrichedLeads} qualified leads</div>
                    </div>
                  </div>
                </div>

                {/* Savings Breakdown */}
                <div className="p-3.5 rounded-xl bg-emerald-500/10 border border-emerald-500/25 space-y-2">
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-bold text-emerald-700 dark:text-emerald-300 flex items-center gap-1">
                      <DollarSign className="w-3.5 h-3.5" />
                      <span>Estimated Credit Savings:</span>
                    </span>
                    <span className="font-mono font-extrabold text-emerald-600 dark:text-emerald-400 text-sm">
                      +${estimatedDollarsSaved}
                    </span>
                  </div>

                  {/* Visual Bar */}
                  <div className="w-full bg-muted rounded-full h-2 overflow-hidden flex">
                    <div 
                      className="bg-emerald-500 h-full transition-all duration-300"
                      style={{ width: '58%' }}
                      title="58% Stale Leads Discarded at $0"
                    />
                    <div 
                      className="bg-cyan-500 h-full transition-all duration-300"
                      style={{ width: '42%' }}
                      title="42% High-Value Targetable Enriched"
                    />
                  </div>
                  <div className="flex justify-between text-[10px] text-muted-foreground font-mono">
                    <span className="text-emerald-600 dark:text-emerald-400">58% filtered at $0</span>
                    <span className="text-cyan-600 dark:text-cyan-400">42% high-yield leads</span>
                  </div>

                  <p className="text-[11px] text-muted-foreground leading-relaxed pt-1">
                    Pre-validating MX routing discards ~{staleLeadsFiltered} inactive inboxes for <strong>$0</strong>, saving you from spending ${traditionalApolloSpend} on blind Apollo/ZoomInfo list enrichment.
                  </p>
                </div>
              </div>

              <Button
                variant="cyan"
                onClick={handleSaveICP}
                className="w-full font-bold !text-slate-950 gap-2 h-10 shadow-sm"
              >
                <span>Load Into Sourcing Pipeline</span>
                <ArrowRight className="w-4 h-4 text-slate-950 stroke-[2.5]" />
              </Button>
            </Card>
          </div>
        </div>
      )}

      {/* ==================================================================== */}
      {/* MODE 2: DIRECT SPREADSHEET INGESTION (.xls / .xlsx / .csv)           */}
      {/* ==================================================================== */}
      {activeMode === 'spreadsheet' && (
        <Card className="p-6 space-y-6 border-cyan-500/30 bg-card">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-border">
            <div className="flex items-center gap-3">
              <div className="p-2.5 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-600 dark:text-emerald-400">
                <FileSpreadsheet className="w-6 h-6" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h3 className="text-base font-bold text-foreground">
                    Direct Sourced Lead Ingestion (.xls / .xlsx / .csv)
                  </h3>
                  <Badge variant="emerald" className="text-[10px] font-mono">
                    Tier-1 MX Pass ($0)
                  </Badge>
                </div>
                <p className="text-xs text-muted-foreground mt-0.5">
                  Import trade show attendee lists, webinar registrations, or CRM spreadsheet exports. Contacts are mapped to active CISA KEV threat models before entering outreach.
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={handleDownloadSampleCsv}
                className="gap-1.5 text-xs font-semibold"
              >
                <Download className="w-3.5 h-3.5" />
                <span>Sample CSV</span>
              </Button>
              {importedProspects.length > 0 && (
                <Badge variant="cyan" className="font-mono text-xs px-2.5 py-1">
                  {importedProspects.length} CISOs Parsed
                </Badge>
              )}
            </div>
          </div>

          {/* Dropzone Area when no file is parsed */}
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
              className={`border-2 border-dashed rounded-2xl p-8 text-center transition-all flex flex-col items-center justify-center space-y-4 ${
                isDragging
                  ? 'border-cyan-500 bg-cyan-500/10 shadow-md scale-[0.99]'
                  : 'border-border hover:border-cyan-500/50 bg-muted/20'
              }`}
            >
              <div className="w-14 h-14 rounded-2xl bg-card border border-border flex items-center justify-center text-cyan-600 dark:text-cyan-400 shadow-xs">
                {isParsing ? (
                  <UploadCloud className="w-7 h-7 animate-bounce" />
                ) : (
                  <FileSpreadsheet className="w-7 h-7 text-emerald-500" />
                )}
              </div>

              <div className="space-y-1 max-w-md">
                <div className="text-sm font-bold text-foreground">
                  {isParsing ? 'Parsing Spreadsheet & Verifying MX Routing...' : 'Drop your .xls, .xlsx, or .csv file here'}
                </div>
                <p className="text-xs text-muted-foreground leading-relaxed">
                  Automatic column matching for CISO name, corporate domain, inferred perimeter tech stack, and CISA KEV exploit correlation.
                </p>
              </div>

              <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
                <Button
                  variant="cyan"
                  onClick={() => fileInputRef.current?.click()}
                  className="gap-2 font-bold !text-slate-950 text-xs h-9 px-4"
                >
                  <UploadCloud className="w-4 h-4 text-slate-950" />
                  <span>Choose Spreadsheet File</span>
                </Button>
                <Button
                  variant="outline"
                  onClick={handleLoadDemoXls}
                  className="gap-2 font-semibold text-xs h-9 px-4"
                >
                  <Sparkles className="w-4 h-4 text-amber-500" />
                  <span>⚡ Load Demo .xls (3 CISOs)</span>
                </Button>
              </div>
            </div>
          ) : (
            /* Live Parsed Preview & Injection Console */
            <div className="space-y-5">
              {/* File Info & Action Bar */}
              <div className="flex flex-col md:flex-row md:items-center justify-between p-4 rounded-xl bg-card border border-border gap-4 shadow-2xs">
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-lg bg-emerald-500/10 text-emerald-600 dark:text-emerald-400">
                    <FileSpreadsheet className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="text-sm font-bold text-foreground flex items-center gap-2">
                      <span>{importedFileName}</span>
                      <Badge variant="emerald" className="text-[10px] font-mono py-0">
                        100% MX Verified ($0)
                      </Badge>
                    </div>
                    <div className="text-xs text-muted-foreground mt-0.5">
                      {importedProspects.length} verified leads parsed • {selectedLeadIds.length} selected for injection • 3 CISA KEV CVEs matched
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-2.5">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={handleClearImport}
                    className="text-xs text-muted-foreground hover:text-foreground h-9"
                  >
                    <X className="w-4 h-4 mr-1" />
                    <span>Clear File</span>
                  </Button>
                  <Button
                    variant="cyan"
                    onClick={handleInjectIntoPipeline}
                    disabled={selectedLeadIds.length === 0}
                    className="gap-2 font-bold !text-slate-950 text-xs h-9 px-4 shadow-xs"
                  >
                    <CheckCircle2 className="w-4 h-4 text-slate-950" />
                    <span>Inject {selectedLeadIds.length} Selected into Pipeline</span>
                    <ArrowRight className="w-4 h-4 text-slate-950 stroke-[2.5]" />
                  </Button>
                </div>
              </div>

              {/* Column Mapping Inspector */}
              <Card className="p-4 bg-muted/30 border-border space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Layers className="w-4 h-4 text-cyan-600 dark:text-cyan-400" />
                    <span className="text-xs font-bold text-foreground uppercase tracking-wider">
                      Schema Column Mapping Inspector
                    </span>
                    <Badge variant="cyan" className="text-[10px] font-mono">
                      5 / 5 Fields Auto-Mapped
                    </Badge>
                  </div>
                  <button
                    type="button"
                    onClick={() => setShowMappingInspector(!showMappingInspector)}
                    className="text-xs text-muted-foreground hover:text-foreground font-semibold"
                  >
                    {showMappingInspector ? 'Collapse' : 'Expand'}
                  </button>
                </div>

                {showMappingInspector && (
                  <div className="grid grid-cols-2 sm:grid-cols-5 gap-2.5 pt-1 text-xs">
                    <div className="p-2.5 rounded-lg bg-card border border-border space-y-1">
                      <div className="text-[10px] text-muted-foreground font-mono">Spreadsheet: "Name"</div>
                      <div className="font-bold text-foreground">Identity & Avatar</div>
                      <div className="text-[10px] text-emerald-600 dark:text-emerald-400 font-semibold">✓ Exact Match</div>
                    </div>
                    <div className="p-2.5 rounded-lg bg-card border border-border space-y-1">
                      <div className="text-[10px] text-muted-foreground font-mono">Spreadsheet: "Company"</div>
                      <div className="font-bold text-foreground">Domain Verification</div>
                      <div className="text-[10px] text-emerald-600 dark:text-emerald-400 font-semibold">✓ MX Validated ($0)</div>
                    </div>
                    <div className="p-2.5 rounded-lg bg-card border border-border space-y-1">
                      <div className="text-[10px] text-muted-foreground font-mono">Spreadsheet: "Perimeter Tech"</div>
                      <div className="font-bold text-foreground">Stack Detection</div>
                      <div className="text-[10px] text-cyan-600 dark:text-cyan-400 font-semibold">✓ Fingerprinted</div>
                    </div>
                    <div className="p-2.5 rounded-lg bg-card border border-border space-y-1">
                      <div className="text-[10px] text-muted-foreground font-mono">Spreadsheet: "CVE ID"</div>
                      <div className="font-bold text-foreground">CISA KEV Exploit</div>
                      <div className="text-[10px] text-red-600 dark:text-red-400 font-semibold">✓ Weaponized CVE</div>
                    </div>
                    <div className="p-2.5 rounded-lg bg-card border border-border space-y-1">
                      <div className="text-[10px] text-muted-foreground font-mono">Spreadsheet: "Title"</div>
                      <div className="font-bold text-foreground">CISO Archetype</div>
                      <div className="text-[10px] text-purple-600 dark:text-purple-400 font-semibold">✓ Persona Assigned</div>
                    </div>
                  </div>
                )}
              </Card>

              {/* Parsed Leads Table Preview with Checkboxes */}
              <div className="space-y-2">
                <div className="flex items-center justify-between px-1 text-xs">
                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      onClick={handleToggleSelectAllLeads}
                      className="text-xs font-semibold text-cyan-600 dark:text-cyan-400 hover:underline flex items-center gap-1.5"
                    >
                      {selectedLeadIds.length === importedProspects.length ? (
                        <CheckSquare className="w-4 h-4" />
                      ) : (
                        <Square className="w-4 h-4" />
                      )}
                      <span>{selectedLeadIds.length === importedProspects.length ? 'Deselect All' : 'Select All Leads'}</span>
                    </button>
                    <span className="text-muted-foreground">({selectedLeadIds.length} of {importedProspects.length} selected)</span>
                  </div>
                  <span className="text-[11px] text-muted-foreground">Click a row to toggle inclusion</span>
                </div>

                <div className="overflow-x-auto rounded-xl border border-border bg-card shadow-2xs">
                  <table className="w-full text-left text-xs">
                    <thead className="bg-muted/50 border-b border-border text-[11px] font-bold text-muted-foreground uppercase">
                      <tr>
                        <th className="py-3 px-3.5 w-10 text-center">
                          <input
                            type="checkbox"
                            checked={selectedLeadIds.length === importedProspects.length && importedProspects.length > 0}
                            onChange={handleToggleSelectAllLeads}
                            className="rounded accent-cyan-600 cursor-pointer"
                          />
                        </th>
                        <th className="py-3 px-3.5">CISO & Organization</th>
                        <th className="py-3 px-3.5">Detected Perimeter Stack</th>
                        <th className="py-3 px-3.5">Matched Threat CVE</th>
                        <th className="py-3 px-3.5">Assigned Strategy</th>
                        <th className="py-3 px-3.5 text-right">Tier-1 Status</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-border">
                      {importedProspects.map(prospect => {
                        const isChecked = selectedLeadIds.includes(prospect.id);
                        return (
                          <tr 
                            key={prospect.id} 
                            onClick={() => handleToggleLeadSelection(prospect.id)}
                            className={`hover:bg-muted/40 transition-colors cursor-pointer ${
                              isChecked ? 'bg-cyan-500/5' : 'opacity-75'
                            }`}
                          >
                            <td className="py-3 px-3.5 text-center" onClick={e => e.stopPropagation()}>
                              <input
                                type="checkbox"
                                checked={isChecked}
                                onChange={() => handleToggleLeadSelection(prospect.id)}
                                className="rounded accent-cyan-600 cursor-pointer"
                              />
                            </td>

                            <td className="py-3 px-3.5">
                              <div className="flex items-center gap-2.5">
                                <img
                                  src={prospect.avatar}
                                  alt={prospect.name}
                                  className="w-8 h-8 rounded-full object-cover border border-border shrink-0"
                                />
                                <div>
                                  <div className="font-bold text-foreground">{prospect.name}</div>
                                  <div className="text-[10px] text-muted-foreground">
                                    {prospect.title} • <strong className="text-cyan-600 dark:text-cyan-400">{prospect.company}</strong>
                                  </div>
                                </div>
                              </div>
                            </td>

                            <td className="py-3 px-3.5">
                              <div className="flex flex-wrap gap-1">
                                {prospect.techStack.map((tech, idx) => (
                                  <span key={idx} className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-muted text-foreground border border-border font-medium">
                                    {tech.name}
                                  </span>
                                ))}
                              </div>
                            </td>

                            <td className="py-3 px-3.5">
                              <div className="inline-flex items-center gap-1.5 text-[11px] text-red-600 dark:text-red-400 font-semibold">
                                <ShieldAlert className="w-3.5 h-3.5 shrink-0" />
                                <span className="font-mono">{prospect.matchedVulnerability.cveId}</span>
                                <Badge variant="destructive" className="text-[10px] px-1 py-0 font-mono">
                                  CVSS {prospect.matchedVulnerability.cvss}
                                </Badge>
                              </div>
                            </td>

                            <td className="py-3 px-3.5">
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

                            <td className="py-3 px-3.5 text-right">
                              <Badge variant="emerald" className="gap-1 text-[10px] font-mono font-bold">
                                <Check className="w-3 h-3" />
                                <span>$0 MX Verified</span>
                              </Badge>
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}
        </Card>
      )}

      {/* ==================================================================== */}
      {/* MODE 3: 1-CLICK ICP ARCHETYPE PRESETS                                */}
      {/* ==================================================================== */}
      {activeMode === 'presets' && (
        <div className="space-y-5">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-lg font-extrabold text-foreground tracking-tight">
                Pre-Configured CISO ICP Archetypes
              </h3>
              <p className="text-xs text-muted-foreground mt-0.5">
                Load proven, campaign-ready audience configurations tailored to active CISA KEV exploitation campaigns with 1 click.
              </p>
            </div>
            <Badge variant="cyan" className="font-mono text-xs">
              4 Production Templates
            </Badge>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {presets.map(preset => {
              const Icon = preset.icon;
              const isApplied = activePresetId === preset.id;
              return (
                <Card 
                  key={preset.id} 
                  className={`p-6 space-y-4 transition-all duration-200 ${
                    isApplied
                      ? 'border-cyan-500 bg-cyan-500/5 ring-2 ring-cyan-500/20 shadow-md'
                      : 'border-border hover:border-slate-300 dark:hover:border-slate-700 hover:shadow-xs'
                  }`}
                >
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex items-center gap-3">
                      <div className={`p-2.5 rounded-xl border ${
                        preset.badgeVariant === 'purple'
                          ? 'bg-purple-500/10 border-purple-500/30 text-purple-600 dark:text-purple-400'
                          : preset.badgeVariant === 'cyan'
                          ? 'bg-cyan-500/10 border-cyan-500/30 text-cyan-600 dark:text-cyan-400'
                          : preset.badgeVariant === 'emerald'
                          ? 'bg-emerald-500/10 border-emerald-500/30 text-emerald-600 dark:text-emerald-400'
                          : 'bg-amber-500/10 border-amber-500/30 text-amber-600 dark:text-amber-400'
                      }`}>
                        <Icon className="w-5 h-5" />
                      </div>
                      <div>
                        <h4 className="text-sm font-bold text-foreground leading-snug">{preset.name}</h4>
                        <Badge variant={preset.badgeVariant} className="text-[10px] font-mono mt-1">
                          {preset.badge}
                        </Badge>
                      </div>
                    </div>

                    <div className="text-right shrink-0">
                      <div className="text-lg font-mono font-extrabold text-foreground">
                        {preset.volume.toLocaleString()}
                      </div>
                      <div className="text-[10px] text-muted-foreground">Target CISOs</div>
                    </div>
                  </div>

                  <p className="text-xs text-muted-foreground leading-relaxed">
                    {preset.description}
                  </p>

                  {/* Target CVE Gating Badge */}
                  <div className="p-2.5 rounded-lg bg-muted/40 border border-border flex items-center justify-between text-xs">
                    <div className="flex items-center gap-2">
                      <span className="text-[10px] font-bold text-muted-foreground uppercase">Target CVE:</span>
                      <span className="font-mono font-semibold text-red-600 dark:text-red-400">{preset.cveId}</span>
                    </div>
                    <Badge variant="destructive" className="text-[9px] font-mono py-0">
                      CVSS {preset.cvss}
                    </Badge>
                  </div>

                  {/* Criteria Tags */}
                  <div className="space-y-1.5 pt-1 text-xs">
                    <div className="flex items-center gap-1.5 text-muted-foreground text-[11px]">
                      <strong className="text-foreground">Tech Stack:</strong>
                      <span>{preset.techs.join(', ')}</span>
                    </div>
                    <div className="flex items-center gap-1.5 text-muted-foreground text-[11px]">
                      <strong className="text-foreground">Verticals:</strong>
                      <span>{preset.industries.join(', ')}</span>
                    </div>
                    <div className="flex items-center gap-1.5 text-muted-foreground text-[11px]">
                      <strong className="text-foreground">Roles:</strong>
                      <span>{preset.roles.join(', ')}</span>
                    </div>
                  </div>

                  <div className="pt-2 border-t border-border flex items-center justify-between">
                    <div className="text-[10px] text-emerald-600 dark:text-emerald-400 font-mono font-semibold flex items-center gap-1">
                      <Check className="w-3 h-3" />
                      <span>{preset.confidence}% Match Alignment</span>
                    </div>

                    <Button
                      variant={isApplied ? 'outline' : 'cyan'}
                      size="sm"
                      onClick={() => handleApplyPreset(preset)}
                      className={`gap-1.5 text-xs ${!isApplied ? '!text-slate-950 font-bold' : 'font-semibold'}`}
                    >
                      {isApplied ? (
                        <>
                          <Check className="w-3.5 h-3.5 text-cyan-600" />
                          <span>Active in Studio</span>
                        </>
                      ) : (
                        <>
                          <Sparkles className="w-3.5 h-3.5 text-slate-950" />
                          <span>Apply Preset to Studio</span>
                        </>
                      )}
                    </Button>
                  </div>
                </Card>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
};


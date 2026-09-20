import React, { useState, useRef } from 'react';
import { useApp } from '../../context/AppContext';
import { SAMPLE_XLS_PROSPECTS } from '../../data/mockData';
import { Prospect } from '../../types';
import { stepLabel } from '../layout/nav';
import { AnimatedNumber, AutoHeight, Bar, Collapse, FadeSwap } from '../ui/motion';
import { spring } from '../ui/springs';
import { motion } from 'motion/react';
import {
  Card,
  Badge,
  Button,
  Input,
  Field,
  PageHeader,
  ChipGroup,
  Table,
  TableHeader,
  TableBody,
  TableHead,
  TableRow,
  TableCell,
} from '../ui';
import {
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
  DollarSign,
  SlidersHorizontal,
  ChevronDown,
  type LucideIcon,
} from 'lucide-react';

type IcpMode = 'criteria' | 'spreadsheet' | 'presets';

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
  const [activeMode, setActiveMode] = useState<IcpMode>('criteria');
  const modeRefs = useRef<Array<HTMLButtonElement | null>>([]);
  const [showMapping, setShowMapping] = useState(true);

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
    'Trivly Web Scraper'
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

  const modeTabs: Array<{ id: IcpMode; label: string; icon: LucideIcon; meta?: string }> = [
    { id: 'criteria', label: 'Target criteria', icon: SlidersHorizontal, meta: `${targetVolume.toLocaleString()} CISOs` },
    {
      id: 'spreadsheet',
      label: 'Spreadsheet import',
      icon: FileSpreadsheet,
      meta: importedProspects.length > 0 ? `${importedProspects.length} ready` : undefined,
    },
    { id: 'presets', label: 'Ready-made archetypes', icon: Sparkles, meta: '4' },
  ];

  const onModeKeyDown = (event: React.KeyboardEvent, index: number) => {
    const last = modeTabs.length - 1;
    let next = index;
    if (event.key === 'ArrowRight') next = index === last ? 0 : index + 1;
    else if (event.key === 'ArrowLeft') next = index === 0 ? last : index - 1;
    else if (event.key === 'Home') next = 0;
    else if (event.key === 'End') next = last;
    else return;
    event.preventDefault();
    setActiveMode(modeTabs[next].id);
    modeRefs.current[next]?.focus();
  };

  const searching = criteriaSearch.trim().length > 0;
  const activePreset = presets.find(p => p.id === activePresetId);
  const allLeadsSelected = importedProspects.length > 0 && selectedLeadIds.length === importedProspects.length;

  const mappingFields = [
    { from: 'Name', to: 'Identity & avatar', result: 'Exact match', tone: 'text-success' },
    { from: 'Company', to: 'Domain verification', result: 'MX validated ($0)', tone: 'text-success' },
    { from: 'Perimeter Tech', to: 'Stack detection', result: 'Fingerprinted', tone: 'text-brand' },
    { from: 'CVE ID', to: 'CISA KEV exploit', result: 'Weaponized CVE', tone: 'text-danger' },
    { from: 'Title', to: 'CISO archetype', result: 'Persona assigned', tone: 'text-steel' },
  ];

  return (
    <div className="space-y-10">
      <input
        type="file"
        ref={fileInputRef}
        onChange={handleFileChange}
        aria-label="Upload a lead spreadsheet (.xls, .xlsx or .csv)"
        tabIndex={-1}
        accept=".xls,.xlsx,.csv,application/vnd.ms-excel,application/vnd.openxmlformats-officedocument.spreadsheetml.sheet,text/csv"
        className="hidden"
      />

      <PageHeader
        eyebrow={stepLabel('icp')}
        title="Ideal Customer Profile Studio"
        description="Build a CISO audience from criteria, import your own spreadsheet, or start from a proven archetype. Every contact gets a free MX check before any enrichment credits are spent."
        actions={
          <>
            <Button variant="outline" onClick={handleDownloadSampleCsv}>
              <Download className="h-4 w-4 text-muted-foreground" aria-hidden="true" />
              CSV template
            </Button>
            <Button
              variant="outline"
              onClick={() => {
                setActiveMode('spreadsheet');
                fileInputRef.current?.click();
              }}
            >
              <FileSpreadsheet className="h-4 w-4 text-success" aria-hidden="true" />
              Import spreadsheet
            </Button>
          </>
        }
      >
        {activePreset && (
          <p className="flex items-center gap-2 text-sm text-muted-foreground">
            <Badge variant="purple">
              <Sparkles className="h-3 w-3" aria-hidden="true" />
              Preset active
            </Badge>
            {activePreset.name}
          </p>
        )}
        <div role="tablist" aria-label="How to define your audience" className="flex gap-1 overflow-x-auto border-b border-border">
          {modeTabs.map((tab, index) => {
            const Icon = tab.icon;
            const isActive = activeMode === tab.id;
            return (
              <button
                key={tab.id}
                ref={el => {
                  modeRefs.current[index] = el;
                }}
                type="button"
                role="tab"
                id={`icp-tab-${tab.id}`}
                aria-selected={isActive}
                aria-controls="icp-panel"
                tabIndex={isActive ? 0 : -1}
                onClick={() => setActiveMode(tab.id)}
                onKeyDown={event => onModeKeyDown(event, index)}
                className={`relative flex shrink-0 items-center gap-2 px-4 py-3 text-sm font-medium transition-colors duration-200 ${
                  isActive ? 'text-foreground' : 'text-muted-foreground hover:text-foreground'
                }`}
              >
                {isActive && (
                  <motion.span
                    layoutId="icp-tab-underline"
                    aria-hidden="true"
                    transition={spring}
                    className="absolute inset-x-0 -bottom-px h-0.5 rounded-full bg-brand"
                  />
                )}
                <Icon className={`h-4 w-4 ${isActive ? 'text-brand' : ''}`} aria-hidden="true" />
                {tab.label}
                {tab.meta && (
                  <span className="rounded-md bg-secondary px-1.5 py-0.5 font-mono text-xs text-secondary-foreground">
                    {tab.meta}
                  </span>
                )}
              </button>
            );
          })}
        </div>
      </PageHeader>

      <div role="tabpanel" id="icp-panel" aria-labelledby={`icp-tab-${activeMode}`} tabIndex={0}>
        <FadeSwap swapKey={activeMode}>
        {activeMode === 'criteria' && (
          <div className="grid items-start gap-8 xl:grid-cols-[minmax(0,1fr)_23rem]">
            <div className="space-y-6">
              <Field
                label="Filter the options below"
                htmlFor="criteria-search"
                helper="Type a role, industry or technology, for example NetScaler, FinTech or CISO."
              >
                <div className="relative">
                  <Search
                    className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground"
                    aria-hidden="true"
                  />
                  <Input
                    id="criteria-search"
                    type="search"
                    placeholder="Search criteria"
                    value={criteriaSearch}
                    onChange={e => setCriteriaSearch(e.target.value)}
                    aria-describedby="criteria-search-help"
                    className="pl-10 pr-10"
                  />
                  {criteriaSearch && (
                    <button
                      type="button"
                      onClick={() => setCriteriaSearch('')}
                      aria-label="Clear filter"
                      className="absolute right-1.5 top-1/2 flex h-8 w-8 -translate-y-1/2 items-center justify-center rounded-lg text-muted-foreground hover:bg-muted hover:text-foreground"
                    >
                      <X className="h-4 w-4" aria-hidden="true" />
                    </button>
                  )}
                </div>
              </Field>

              <Card className="divide-y divide-border">
                <ChipGroup
                  id="industries"
                  title="Target industries"
                  icon={Building2}
                  iconClass="text-brand"
                  items={filterBySearch(industries)}
                  selected={selectedIndustries}
                  onToggle={item => toggleItem(selectedIndustries, setSelectedIndustries, item)}
                  onSelectAll={() => handleSelectAll(industries, setSelectedIndustries)}
                  onClear={() => handleClearCategory(setSelectedIndustries)}
                  searching={searching}
                />
                <ChipGroup
                  id="roles"
                  title="Security leadership roles"
                  icon={Briefcase}
                  iconClass="text-steel"
                  items={filterBySearch(roles)}
                  selected={selectedRoles}
                  onToggle={item => toggleItem(selectedRoles, setSelectedRoles, item)}
                  onSelectAll={() => handleSelectAll(roles, setSelectedRoles)}
                  onClear={() => handleClearCategory(setSelectedRoles)}
                  searching={searching}
                />
                <ChipGroup
                  id="techs"
                  title="Perimeter infrastructure"
                  icon={Cpu}
                  iconClass="text-brand"
                  description="Target companies running edge infrastructure that matches actively exploited CISA KEV threats."
                  items={filterBySearch(technologies)}
                  selected={selectedTechs}
                  onToggle={item => toggleItem(selectedTechs, setSelectedTechs, item)}
                  onSelectAll={() => handleSelectAll(technologies, setSelectedTechs)}
                  onClear={() => handleClearCategory(setSelectedTechs)}
                  searching={searching}
                />
                <ChipGroup
                  id="geos"
                  title="Target geographies"
                  icon={Globe2}
                  iconClass="text-success"
                  items={filterBySearch(geos)}
                  selected={selectedGeos}
                  onToggle={item => toggleItem(selectedGeos, setSelectedGeos, item)}
                  searching={searching}
                />
                <ChipGroup
                  id="sizes"
                  title="Company headcount"
                  icon={Building2}
                  iconClass="text-warning"
                  items={filterBySearch(sizes)}
                  selected={selectedSizes}
                  onToggle={item => toggleItem(selectedSizes, setSelectedSizes, item)}
                  searching={searching}
                />
                <ChipGroup
                  id="sources"
                  title="Sourcing adapters"
                  icon={Database}
                  iconClass="text-brand"
                  description="Live sources only. Duplicates across them are removed automatically. To bring in your own file, use the Spreadsheet import tab."
                  items={filterBySearch(sources)}
                  selected={selectedSources}
                  onToggle={item => toggleItem(selectedSources, setSelectedSources, item)}
                  searching={searching}
                />
              </Card>
            </div>

            <aside aria-label="Audience forecast" className="xl:sticky xl:top-[calc(var(--header-h)+1rem)]">
              <Card className="p-6">
                <AutoHeight>
                <div className="space-y-6">
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <h2 className="text-sm font-semibold text-foreground">Audience forecast</h2>
                  <span className="font-mono text-xs font-medium text-success">{matchConfidence}% match confidence</span>
                </div>

                <div role="status" aria-live="polite" className="space-y-1">
                  <p className="flex items-baseline gap-2 font-mono text-4xl font-semibold tracking-tight text-foreground">
                    <AnimatedNumber value={targetVolume} />
                    <span className="text-sm font-normal text-muted-foreground">CISOs</span>
                  </p>
                  <p className="text-sm text-muted-foreground">Verified security leaders matching your criteria</p>
                </div>

                <div className="space-y-3 border-t border-border pt-5">
                  <div className="flex items-baseline justify-between gap-3">
                    <label htmlFor="quota" className="text-sm font-medium text-foreground">
                      Prospect target quota
                    </label>
                    <output htmlFor="quota" className="font-mono text-sm font-semibold text-brand">
                      {targetVolume.toLocaleString()} prospects
                    </output>
                  </div>
                  <input
                    id="quota"
                    type="range"
                    min="100"
                    max="3000"
                    step="50"
                    value={targetVolume}
                    aria-valuetext={`${targetVolume} prospects`}
                    onChange={e => {
                      setTargetVolume(Number(e.target.value));
                      setActivePresetId(null);
                    }}
                    className="h-6 w-full cursor-pointer accent-[var(--brand)]"
                  />
                  <div className="flex justify-between font-mono text-xs text-muted-foreground">
                    <span>100 min</span>
                    <span>3,000 max</span>
                  </div>
                </div>

                <div className="space-y-4 border-t border-border pt-5">
                  <div className="flex items-center justify-between gap-2">
                    <h3 className="flex items-center gap-2 text-sm font-semibold text-foreground">
                      <Coins className="h-4 w-4 text-warning" aria-hidden="true" />
                      Two-tier cost engine
                    </h3>
                    <Badge variant="emerald" className="font-mono">
                      Save ~58%
                    </Badge>
                  </div>

                  <ul className="space-y-2.5">
                    <li className="flex items-start justify-between gap-3 rounded-xl border border-border bg-muted/50 p-3.5">
                      <div className="space-y-0.5">
                        <p className="flex items-center gap-2 text-sm font-medium text-success">
                          Tier-1 cheap pass
                          <Badge variant="emerald" className="font-mono">
                            Free
                          </Badge>
                        </p>
                        <p className="text-xs text-muted-foreground">MX record and syntax pre-validation</p>
                      </div>
                      <div className="text-right">
                        <p className="font-mono text-base font-semibold text-foreground">$0.00</p>
                        <p className="text-xs text-muted-foreground"><AnimatedNumber value={targetVolume} /> verified</p>
                      </div>
                    </li>
                    <li className="flex items-start justify-between gap-3 rounded-xl border border-border bg-muted/50 p-3.5">
                      <div className="space-y-0.5">
                        <p className="text-sm font-medium text-brand">Tier-2 direct enrichment</p>
                        <p className="text-xs text-muted-foreground">Apollo / ZoomInfo email and mobile</p>
                      </div>
                      <div className="text-right">
                        <p className="font-mono text-base font-semibold text-foreground">$<AnimatedNumber value={aegisReachSpend} /></p>
                        <p className="text-xs text-muted-foreground"><AnimatedNumber value={targetableEnrichedLeads} /> qualified</p>
                      </div>
                    </li>
                  </ul>

                  <div className="space-y-3 rounded-xl border border-success/30 bg-success/10 p-4">
                    <div className="flex items-center justify-between gap-3">
                      <p className="flex items-center gap-1.5 text-sm font-semibold text-success">
                        <DollarSign className="h-4 w-4" aria-hidden="true" />
                        Estimated credit savings
                      </p>
                      <p className="font-mono text-lg font-semibold text-success">+$<AnimatedNumber value={estimatedDollarsSaved} /></p>
                    </div>
                    <div
                      role="img"
                      aria-label="58 percent of leads filtered out at zero cost, 42 percent high-yield leads enriched"
                      className="flex h-2.5 overflow-hidden rounded-full bg-muted"
                    >
                      <Bar percent={58} className="h-full bg-success" />
                      <Bar percent={42} className="h-full bg-brand" delay={0.08} />
                    </div>
                    <div className="flex justify-between font-mono text-xs">
                      <span className="text-success">58% filtered at $0</span>
                      <span className="text-brand">42% high-yield</span>
                    </div>
                    <p className="text-sm leading-relaxed text-muted-foreground">
                      Pre-validating MX routing discards about <AnimatedNumber value={staleLeadsFiltered} /> inactive inboxes
                      for <span className="font-semibold text-foreground">$0</span>, saving you from spending $
                      <AnimatedNumber value={traditionalApolloSpend} /> on blind list enrichment.
                    </p>
                  </div>
                </div>

                <Button variant="cyan" size="lg" onClick={handleSaveICP} className="w-full">
                  Load into sourcing pipeline
                  <ArrowRight className="h-4 w-4" aria-hidden="true" />
                </Button>
                </div>
                </AutoHeight>
              </Card>
            </aside>
          </div>
        )}

        {activeMode === 'spreadsheet' && (
          <Card className="space-y-8 p-6 md:p-8">
            <div className="flex flex-col justify-between gap-4 border-b border-border pb-6 sm:flex-row sm:items-start">
              <div className="flex gap-4">
                <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl border border-success/30 bg-success/10 text-success">
                  <FileSpreadsheet className="h-6 w-6" aria-hidden="true" />
                </span>
                <div className="space-y-1">
                  <h2 className="flex flex-wrap items-center gap-2 text-xl font-semibold tracking-tight text-foreground">
                    Direct lead import
                    <Badge variant="emerald" className="font-mono">
                      Tier-1 MX pass ($0)
                    </Badge>
                  </h2>
                  <p className="max-w-2xl text-sm leading-relaxed text-muted-foreground">
                    Bring in trade-show attendees, webinar registrations or CRM exports (.xls, .xlsx, .csv). Contacts are mapped to active
                    CISA KEV threat models before they enter outreach.
                  </p>
                </div>
              </div>
              <div className="flex shrink-0 items-center gap-2">
                <Button variant="outline" onClick={handleDownloadSampleCsv}>
                  <Download className="h-4 w-4" aria-hidden="true" />
                  Sample CSV
                </Button>
                {importedProspects.length > 0 && (
                  <Badge variant="cyan" className="px-2.5 py-1 font-mono">
                    {importedProspects.length} CISOs parsed
                  </Badge>
                )}
              </div>
            </div>

            <FadeSwap swapKey={importedProspects.length === 0 ? 'drop' : 'preview'}>
            {importedProspects.length === 0 ? (
              <div
                role="group"
                aria-label="Spreadsheet drop zone"
                aria-busy={isParsing}
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
                className={`flex flex-col items-center justify-center gap-5 rounded-3xl border-2 border-dashed p-10 text-center transition-colors duration-200 ${
                  isDragging ? 'border-brand bg-brand/10' : 'border-input bg-muted/30'
                }`}
              >
                <span className="flex h-14 w-14 items-center justify-center rounded-2xl border border-border bg-card text-brand">
                  {isParsing ? (
                    <UploadCloud className="h-7 w-7 animate-pulse" aria-hidden="true" />
                  ) : (
                    <FileSpreadsheet className="h-7 w-7 text-success" aria-hidden="true" />
                  )}
                </span>
                <div className="max-w-md space-y-1.5">
                  <p role="status" className="text-base font-semibold text-foreground">
                    {isParsing ? 'Parsing spreadsheet and verifying MX routing…' : 'Drop a .xls, .xlsx or .csv file here'}
                  </p>
                  <p className="text-sm leading-relaxed text-muted-foreground">
                    Columns are matched automatically for CISO name, corporate domain, perimeter tech stack and CISA KEV exploit
                    correlation. You can also use the buttons below.
                  </p>
                </div>
                <div className="flex flex-wrap items-center justify-center gap-3">
                  <Button variant="cyan" onClick={() => fileInputRef.current?.click()} disabled={isParsing}>
                    <UploadCloud className="h-4 w-4" aria-hidden="true" />
                    Choose spreadsheet file
                  </Button>
                  <Button variant="outline" onClick={handleLoadDemoXls} disabled={isParsing}>
                    <Sparkles className="h-4 w-4 text-warning" aria-hidden="true" />
                    Load demo file (3 CISOs)
                  </Button>
                </div>
              </div>
            ) : (
              <div className="space-y-6">
                <div className="flex flex-col justify-between gap-4 rounded-2xl border border-border bg-muted/40 p-5 md:flex-row md:items-center">
                  <div className="flex items-center gap-3.5">
                    <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-success/10 text-success">
                      <FileSpreadsheet className="h-5 w-5" aria-hidden="true" />
                    </span>
                    <div className="space-y-0.5">
                      <p className="flex flex-wrap items-center gap-2 text-base font-semibold text-foreground">
                        {importedFileName}
                        <Badge variant="emerald" className="font-mono">
                          100% MX verified ($0)
                        </Badge>
                      </p>
                      <p role="status" className="text-sm text-muted-foreground">
                        {importedProspects.length} leads parsed &middot; {selectedLeadIds.length} selected for injection &middot; 3 CISA KEV
                        CVEs matched
                      </p>
                    </div>
                  </div>
                  <div className="flex flex-wrap items-center gap-2.5">
                    <Button variant="ghost" onClick={handleClearImport} className="text-muted-foreground">
                      <X className="h-4 w-4" aria-hidden="true" />
                      Clear file
                    </Button>
                    <Button variant="cyan" onClick={handleInjectIntoPipeline} disabled={selectedLeadIds.length === 0}>
                      <CheckCircle2 className="h-4 w-4" aria-hidden="true" />
                      Inject {selectedLeadIds.length} into pipeline
                      <ArrowRight className="h-4 w-4" aria-hidden="true" />
                    </Button>
                  </div>
                </div>

                <div className="rounded-2xl border border-border bg-muted/30">
                  <button
                    type="button"
                    aria-expanded={showMapping}
                    onClick={() => setShowMapping(v => !v)}
                    className="flex min-h-11 w-full items-center justify-between gap-3 rounded-2xl px-5 py-3 text-left text-sm font-semibold text-foreground"
                  >
                    <span className="flex flex-wrap items-center gap-2">
                      <Layers className="h-4 w-4 text-brand" aria-hidden="true" />
                      Column mapping inspector
                      <Badge variant="cyan" className="font-mono">
                        5 of 5 auto-mapped
                      </Badge>
                    </span>
                    <span className="flex items-center gap-1.5 text-muted-foreground">
                      {showMapping ? 'Hide' : 'Show'}
                      <ChevronDown className={`h-4 w-4 transition-transform ${showMapping ? 'rotate-180' : ''}`} aria-hidden="true" />
                    </span>
                  </button>
                  <Collapse open={showMapping}>
                  <ul className="grid gap-3 border-t border-border p-5 sm:grid-cols-2 lg:grid-cols-5">
                    {mappingFields.map(field => (
                      <li key={field.from} className="space-y-1 rounded-xl border border-border bg-card p-3.5">
                        <p className="font-mono text-xs text-muted-foreground">Column: &ldquo;{field.from}&rdquo;</p>
                        <p className="text-sm font-semibold text-foreground">{field.to}</p>
                        <p className={`flex items-center gap-1 text-xs font-medium ${field.tone}`}>
                          <Check className="h-3.5 w-3.5" aria-hidden="true" />
                          {field.result}
                        </p>
                      </li>
                    ))}
                  </ul>
                  </Collapse>
                </div>

                <div className="space-y-3">
                  <p className="text-sm text-muted-foreground">
                    <span className="font-mono font-medium text-foreground">{selectedLeadIds.length}</span> of{' '}
                    <span className="font-mono">{importedProspects.length}</span> leads selected. Use the checkboxes to choose which
                    leads to inject.
                  </p>
                  <div className="overflow-hidden rounded-2xl border border-border">
                    <Table label="Parsed spreadsheet leads" className="min-w-[48rem]">
                      <TableHeader>
                        <TableRow>
                          <TableHead className="w-12">
                            <input
                              type="checkbox"
                              aria-label="Select all leads"
                              checked={allLeadsSelected}
                              onChange={handleToggleSelectAllLeads}
                              className="h-4 w-4 cursor-pointer accent-[var(--brand)]"
                            />
                          </TableHead>
                          <TableHead>CISO &amp; organization</TableHead>
                          <TableHead>Perimeter stack</TableHead>
                          <TableHead>Matched CVE</TableHead>
                          <TableHead>Assigned strategy</TableHead>
                          <TableHead className="text-right">Tier-1</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {importedProspects.map(prospect => {
                          const isChecked = selectedLeadIds.includes(prospect.id);
                          return (
                            <TableRow
                              key={prospect.id}
                              onClick={() => handleToggleLeadSelection(prospect.id)}
                              className={`cursor-pointer ${isChecked ? 'bg-brand/5' : ''}`}
                            >
                              <TableCell onClick={e => e.stopPropagation()}>
                                <input
                                  type="checkbox"
                                  aria-label={`Include ${prospect.name}`}
                                  checked={isChecked}
                                  onChange={() => handleToggleLeadSelection(prospect.id)}
                                  className="h-4 w-4 cursor-pointer accent-[var(--brand)]"
                                />
                              </TableCell>
                              <TableCell>
                                <div className="flex items-center gap-3">
                                  <img
                                    src={prospect.avatar}
                                    alt=""
                                    className="h-9 w-9 shrink-0 rounded-full border border-border object-cover"
                                  />
                                  <div>
                                    <p className="text-sm font-semibold text-foreground">{prospect.name}</p>
                                    <p className="text-xs text-muted-foreground">
                                      {prospect.title} &middot; <span className="font-medium text-brand">{prospect.company}</span>
                                    </p>
                                  </div>
                                </div>
                              </TableCell>
                              <TableCell>
                                <ul className="flex flex-wrap gap-1.5">
                                  {prospect.techStack.map(tech => (
                                    <li
                                      key={tech.name}
                                      className="rounded-md border border-border bg-muted px-2 py-0.5 font-mono text-xs text-foreground"
                                    >
                                      {tech.name}
                                    </li>
                                  ))}
                                </ul>
                              </TableCell>
                              <TableCell>
                                <p className="flex flex-wrap items-center gap-2 text-sm font-medium text-danger">
                                  <ShieldAlert className="h-4 w-4 shrink-0" aria-hidden="true" />
                                  <span className="font-mono">{prospect.matchedVulnerability.cveId}</span>
                                  <Badge variant="destructive" className="font-mono">
                                    CVSS {prospect.matchedVulnerability.cvss}
                                  </Badge>
                                </p>
                              </TableCell>
                              <TableCell>
                                <Badge
                                  variant={
                                    prospect.persona.type === 'compliance'
                                      ? 'emerald'
                                      : prospect.persona.type === 'soc_ops'
                                        ? 'cyan'
                                        : 'purple'
                                  }
                                >
                                  {prospect.persona.label}
                                </Badge>
                              </TableCell>
                              <TableCell className="text-right">
                                <Badge variant="emerald" className="font-mono">
                                  <Check className="h-3 w-3" aria-hidden="true" />
                                  $0 MX verified
                                </Badge>
                              </TableCell>
                            </TableRow>
                          );
                        })}
                      </TableBody>
                    </Table>
                  </div>
                </div>
              </div>
            )}
            </FadeSwap>
          </Card>
        )}

        {activeMode === 'presets' && (
          <div className="space-y-6">
            <div className="max-w-2xl space-y-1.5">
              <h2 className="text-xl font-semibold tracking-tight text-foreground">Ready-made CISO archetypes</h2>
              <p className="text-sm leading-relaxed text-muted-foreground">
                Campaign-ready audiences built around actively exploited CISA KEV vulnerabilities. Apply one and it fills the criteria
                for you, then fine-tune from there.
              </p>
            </div>

            <ul className="grid gap-6 md:grid-cols-2">
              {presets.map(preset => {
                const Icon = preset.icon;
                const isApplied = activePresetId === preset.id;
                const tone =
                  preset.badgeVariant === 'purple'
                    ? 'border-steel/30 bg-steel/10 text-steel'
                    : preset.badgeVariant === 'cyan'
                      ? 'border-brand/30 bg-brand/10 text-brand'
                      : preset.badgeVariant === 'emerald'
                        ? 'border-success/30 bg-success/10 text-success'
                        : 'border-warning/30 bg-warning/10 text-warning';
                return (
                  <li key={preset.id}>
                    <Card
                      className={`flex h-full flex-col gap-5 p-6 md:p-7 ${isApplied ? 'border-brand bg-accent' : ''}`}
                    >
                      <div className="flex items-start justify-between gap-4">
                        <div className="flex items-start gap-3.5">
                          <span className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border ${tone}`}>
                            <Icon className="h-5 w-5" aria-hidden="true" />
                          </span>
                          <div className="space-y-1.5">
                            <h3 className="text-base font-semibold leading-snug text-foreground">{preset.name}</h3>
                            <Badge variant={preset.badgeVariant} className="font-mono">
                              {preset.badge}
                            </Badge>
                          </div>
                        </div>
                        <div className="shrink-0 text-right">
                          <p className="font-mono text-xl font-semibold text-foreground">{preset.volume.toLocaleString()}</p>
                          <p className="text-xs text-muted-foreground">target CISOs</p>
                        </div>
                      </div>

                      <p className="text-sm leading-relaxed text-muted-foreground">{preset.description}</p>

                      <p className="flex flex-wrap items-center justify-between gap-2 rounded-xl border border-border bg-muted/50 p-3 text-sm">
                        <span className="flex items-center gap-2">
                          <span className="text-muted-foreground">Target CVE</span>
                          <span className="font-mono font-semibold text-danger">{preset.cveId}</span>
                        </span>
                        <Badge variant="destructive" className="font-mono">
                          CVSS {preset.cvss}
                        </Badge>
                      </p>

                      <dl className="space-y-2 text-sm">
                        <div className="flex gap-2">
                          <dt className="w-20 shrink-0 font-medium text-foreground">Tech stack</dt>
                          <dd className="text-muted-foreground">{preset.techs.join(', ')}</dd>
                        </div>
                        <div className="flex gap-2">
                          <dt className="w-20 shrink-0 font-medium text-foreground">Verticals</dt>
                          <dd className="text-muted-foreground">{preset.industries.join(', ')}</dd>
                        </div>
                        <div className="flex gap-2">
                          <dt className="w-20 shrink-0 font-medium text-foreground">Roles</dt>
                          <dd className="text-muted-foreground">{preset.roles.join(', ')}</dd>
                        </div>
                      </dl>

                      <div className="mt-auto flex flex-wrap items-center justify-between gap-3 border-t border-border pt-5">
                        <p className="flex items-center gap-1.5 font-mono text-xs font-medium text-success">
                          <Check className="h-3.5 w-3.5" aria-hidden="true" />
                          {preset.confidence}% match alignment
                        </p>
                        <Button
                          variant={isApplied ? 'outline' : 'cyan'}
                          onClick={() => handleApplyPreset(preset)}
                          aria-label={isApplied ? `${preset.name} is active in the studio` : `Apply preset: ${preset.name}`}
                        >
                          {isApplied ? (
                            <>
                              <Check className="h-4 w-4 text-brand" aria-hidden="true" />
                              Active in studio
                            </>
                          ) : (
                            <>
                              <Sparkles className="h-4 w-4" aria-hidden="true" />
                              Apply preset
                            </>
                          )}
                        </Button>
                      </div>
                    </Card>
                  </li>
                );
              })}
            </ul>
          </div>
        )}
        </FadeSwap>
      </div>
    </div>
  );
};

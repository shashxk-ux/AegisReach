import React, { useMemo, useState } from 'react';
import { useApp } from '../../context/AppContext';
import { stepLabel } from '../layout/nav';
import { AutoHeight } from '../ui/motion';
import {
  Button,
  Badge,
  Input,
  Select,
  Field,
  Card,
  PageHeader,
  Dialog,
  ChipGroup,
  Table,
  TableHeader,
  TableBody,
  TableHead,
  TableRow,
  TableCell,
} from '../ui';
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
  X,
  UserX,
  Building2,
  Cpu,
  SlidersHorizontal,
} from 'lucide-react';

const personaVariant = {
  compliance: 'emerald',
  soc_ops: 'cyan',
  vulnerability_mgmt: 'amber',
  technical: 'purple',
} as const;

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
    showToast,
  } = useApp();

  const [icpOpen, setIcpOpen] = useState(false);
  const [industryFilter, setIndustryFilter] = useState<string[]>([]);
  const [techFilter, setTechFilter] = useState<string[]>([]);

  const industryOptions = useMemo(() => Array.from(new Set(prospects.map(p => p.industry))).sort(), [prospects]);
  const techOptions = useMemo(
    () => Array.from(new Set(prospects.flatMap(p => p.techStack.map(t => t.name)))).sort(),
    [prospects]
  );
  const toggleIn = (list: string[], setList: (v: string[]) => void, item: string) =>
    setList(list.includes(item) ? list.filter(i => i !== item) : [...list, item]);

  const query = searchQuery.toLowerCase();
  const filteredProspects = prospects.filter(p => {
    const matchesSearch =
      p.name.toLowerCase().includes(query) ||
      p.company.toLowerCase().includes(query) ||
      p.title.toLowerCase().includes(query) ||
      p.matchedVulnerability.cveId.toLowerCase().includes(query);
    const matchesPersona = personaFilter === 'all' || p.persona.type === personaFilter;
    const matchesSource = sourceFilter === 'all' || p.source === sourceFilter;
    const matchesIndustry = industryFilter.length === 0 || industryFilter.includes(p.industry);
    const matchesTech = techFilter.length === 0 || p.techStack.some(t => techFilter.includes(t.name));
    return matchesSearch && matchesPersona && matchesSource && matchesIndustry && matchesTech;
  });

  const icpFilterCount = industryFilter.length + techFilter.length;
  const hasActiveFilters =
    searchQuery !== '' || personaFilter !== 'all' || sourceFilter !== 'all' || icpFilterCount > 0;

  const handleReviewClick = (id: string) => {
    setSelectedProspectId(id);
    setActiveTab('review');
  };

  const handleBatchCheapPass = () => {
    showToast('info', 'Tier-1 Cheap Pass Complete', 'Syntactically verified 1,420 email formats and MX records at $0 cost.');
  };

  const handleClearFilters = () => {
    setSearchQuery('');
    setPersonaFilter('all');
    setSourceFilter('all');
    setIndustryFilter([]);
    setTechFilter([]);
  };

  return (
    <div className="space-y-8">
      <PageHeader
        eyebrow={stepLabel('prospects')}
        title="Sourced CISO Prospects"
        description="Every record passes a free MX check first. Spend ZoomInfo or Apollo credits only on the CISOs you decide to pursue."
        actions={
          <>
            <Button variant="outline" onClick={handleBatchCheapPass}>
              <CheckCircle className="h-4 w-4 text-success" aria-hidden="true" />
              Run cheap pass ($0)
            </Button>
            <Button variant="cyan" onClick={() => setIcpOpen(true)} aria-haspopup="dialog">
              <Filter className="h-4 w-4" aria-hidden="true" />
              Adjust ICP filters
              {icpFilterCount > 0 && (
                <span className="rounded-md bg-brand-foreground/15 px-1.5 font-mono text-xs">{icpFilterCount}</span>
              )}
            </Button>
          </>
        }
      />

      <section aria-label="Search and filters" className="flex flex-wrap items-end gap-4">
        <Field label="Search prospects" htmlFor="prospect-search" className="min-w-[16rem] flex-1 md:max-w-md">
          <div className="relative">
            <Search
              className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground"
              aria-hidden="true"
            />
            <Input
              id="prospect-search"
              type="search"
              placeholder="Name, company, title or CVE"
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              className="pl-10 pr-10"
            />
            {searchQuery && (
              <button
                type="button"
                onClick={() => setSearchQuery('')}
                aria-label="Clear search"
                className="absolute right-1.5 top-1/2 flex h-8 w-8 -translate-y-1/2 items-center justify-center rounded-lg text-muted-foreground hover:bg-muted hover:text-foreground"
              >
                <X className="h-4 w-4" aria-hidden="true" />
              </button>
            )}
          </div>
        </Field>

        <Field label="Persona" htmlFor="prospect-persona" className="w-full sm:w-56">
          <Select id="prospect-persona" value={personaFilter} onChange={e => setPersonaFilter(e.target.value)}>
            <option value="all">All personas</option>
            <option value="compliance">Compliance-oriented</option>
            <option value="soc_ops">SOC / Ops-oriented</option>
            <option value="vulnerability_mgmt">Vulnerability management</option>
            <option value="technical">Technical / architecture</option>
          </Select>
        </Field>

        <Field label="Source" htmlFor="prospect-source" className="w-full sm:w-48">
          <Select id="prospect-source" value={sourceFilter} onChange={e => setSourceFilter(e.target.value)}>
            <option value="all">All sources</option>
            <option value="ZoomInfo">ZoomInfo</option>
            <option value="Apollo">Apollo</option>
            <option value="Trivly">Trivly scraper</option>
            <option value="CSV Upload">CSV upload</option>
            <option value="XLS Import">XLS import</option>
          </Select>
        </Field>

        {hasActiveFilters && (
          <Button variant="ghost" onClick={handleClearFilters} className="text-muted-foreground">
            Reset filters
          </Button>
        )}
      </section>

      <p role="status" aria-live="polite" className="-mt-4 text-sm text-muted-foreground">
        Showing <span className="font-mono font-medium text-foreground">{filteredProspects.length}</span> of{' '}
        <span className="font-mono">{prospects.length}</span> prospects
      </p>

      {filteredProspects.length === 0 ? (
        <Card className="space-y-4 p-12 text-center">
          <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-2xl bg-muted text-muted-foreground">
            <UserX className="h-6 w-6" aria-hidden="true" />
          </div>
          <h2 className="text-lg font-semibold text-foreground">No prospects match</h2>
          <p className="mx-auto max-w-sm text-sm text-muted-foreground">
            Nothing fits the current search and filters. Loosen them, or reset to see all {prospects.length} prospects.
          </p>
          <Button variant="cyan" onClick={handleClearFilters}>
            Reset all filters
          </Button>
        </Card>
      ) : (
        <Card className="overflow-hidden">
          <AutoHeight>
          <Table label="Sourced CISO prospects" className="min-w-[64rem]">
            <TableHeader>
              <TableRow>
                <TableHead className="min-w-[17rem]">CISO &amp; organization</TableHead>
                <TableHead className="min-w-[11rem]">Persona strategy</TableHead>
                <TableHead className="min-w-[13rem]">Tech stack &amp; CVE hook</TableHead>
                <TableHead className="min-w-[14rem]">Direct contact</TableHead>
                <TableHead className="min-w-[10rem] text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredProspects.map(prospect => (
                <TableRow key={prospect.id} className="group">
                  <TableCell>
                    <div className="flex items-center gap-3">
                      <div className="relative shrink-0">
                        <img
                          src={prospect.avatar}
                          alt=""
                          className="h-11 w-11 rounded-full border border-border object-cover"
                        />
                        <span
                          className="absolute -bottom-0.5 -right-0.5 h-3 w-3 rounded-full border-2 border-card bg-success"
                          aria-hidden="true"
                        />
                      </div>
                      <div className="min-w-0">
                        <div className="flex flex-wrap items-center gap-1.5">
                          <button
                            type="button"
                            onClick={() => openDossier(prospect.id)}
                            className="rounded-md text-left text-sm font-semibold text-foreground underline-offset-4 hover:text-brand hover:underline"
                          >
                            {prospect.name}
                          </button>
                          <Badge variant="secondary">{prospect.source}</Badge>
                        </div>
                        <p className="text-sm text-muted-foreground">{prospect.title}</p>
                        <p className="text-sm font-medium text-brand">{prospect.company}</p>
                      </div>
                    </div>
                  </TableCell>

                  <TableCell>
                    <div className="space-y-1.5">
                      <Badge variant={personaVariant[prospect.persona.type as keyof typeof personaVariant] ?? 'purple'}>
                        <Sparkles className="h-3 w-3" aria-hidden="true" />
                        {prospect.persona.label}
                      </Badge>
                      <p className="text-xs text-muted-foreground">
                        Confidence{' '}
                        <span className="font-mono font-semibold text-foreground">{prospect.persona.confidence}%</span>
                      </p>
                    </div>
                  </TableCell>

                  <TableCell className="max-w-xs">
                    <div className="space-y-2">
                      <ul className="flex flex-wrap gap-1.5" aria-label="Detected tech stack">
                        {prospect.techStack.slice(0, 2).map(tech => (
                          <li
                            key={tech.name}
                            className="rounded-md border border-border bg-muted px-2 py-0.5 font-mono text-xs text-foreground"
                          >
                            {tech.name}
                          </li>
                        ))}
                      </ul>
                      <p className="inline-flex items-center gap-1.5 rounded-md border border-danger/30 bg-danger/10 px-2 py-0.5 text-xs font-medium text-danger">
                        <ShieldAlert className="h-3.5 w-3.5 shrink-0" aria-hidden="true" />
                        <span className="font-mono">{prospect.matchedVulnerability.cveId}</span>
                        <span className="font-mono">CVSS {prospect.matchedVulnerability.cvss}</span>
                      </p>
                    </div>
                  </TableCell>

                  <TableCell className="max-w-[15rem]">
                    {prospect.tier2Enriched.unlocked ? (
                      <div className="min-w-0 space-y-1.5 text-sm">
                        <p className="flex min-w-0 items-center gap-2 font-mono text-foreground">
                          <Mail className="h-3.5 w-3.5 shrink-0 text-brand" aria-hidden="true" />
                          <span className="truncate" title={prospect.tier2Enriched.workEmail}>
                            {prospect.tier2Enriched.workEmail}
                          </span>
                        </p>
                        <p className="flex items-center gap-2 font-mono text-muted-foreground">
                          <Phone className="h-3.5 w-3.5 shrink-0 text-success" aria-hidden="true" />
                          <span>{prospect.tier2Enriched.directPhone}</span>
                        </p>
                      </div>
                    ) : (
                      <div className="space-y-1.5">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => unlockTier2(prospect.id)}
                        aria-label={`Unlock contact details for ${prospect.name}, costs 1 credit`}
                        className="gap-2 border-warning/40 text-warning hover:bg-warning/10"
                      >
                        <Lock className="h-3.5 w-3.5 group-hover:hidden" aria-hidden="true" />
                        <Coins className="hidden h-3.5 w-3.5 group-hover:inline" aria-hidden="true" />
                        Unlock (1 credit)
                      </Button>
                      <p className="flex items-center gap-1.5 text-xs text-muted-foreground">
                        <CheckCircle className="h-3.5 w-3.5 text-success" aria-hidden="true" />
                        MX verified &middot; $0
                      </p>
                      </div>
                    )}
                  </TableCell>

                  <TableCell className="text-right">
                    <div className="flex items-center justify-end gap-2">
                      <Button
                        variant="outline"
                        size="icon"
                        onClick={() => openDossier(prospect.id)}
                        aria-label={`Open research dossier for ${prospect.name}`}
                        title="Open research dossier"
                      >
                        <ExternalLink className="h-4 w-4" aria-hidden="true" />
                      </Button>
                      <Button
                        variant="cyan"
                        size="sm"
                        onClick={() => handleReviewClick(prospect.id)}
                        aria-label={`Review outreach draft for ${prospect.name}`}
                      >
                        Review
                        <ChevronRight className="h-4 w-4" aria-hidden="true" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
          </AutoHeight>
        </Card>
      )}

      <Dialog open={icpOpen} onClose={() => setIcpOpen(false)} label="Adjust ICP filters" variant="modal" className="max-w-2xl">
        <div className="flex max-h-[90dvh] flex-col">
          <div className="flex shrink-0 items-start justify-between gap-4 border-b border-border p-6">
            <div className="space-y-1">
              <h2 className="flex items-center gap-2 text-xl font-semibold tracking-tight text-foreground">
                <SlidersHorizontal className="h-5 w-5 text-brand" aria-hidden="true" />
                Adjust ICP filters
              </h2>
              <p className="text-sm text-muted-foreground">
                Narrow the pipeline by industry and perimeter technology. The list behind this window updates as you choose.
              </p>
            </div>
            <Button variant="ghost" size="icon" onClick={() => setIcpOpen(false)} aria-label="Close filters" className="shrink-0">
              <X className="h-5 w-5" aria-hidden="true" />
            </Button>
          </div>

          <div className="flex-1 divide-y divide-border overflow-y-auto">
            <ChipGroup
              id="pf-industries"
              className="space-y-4 p-6"
              title="Industry"
              icon={Building2}
              iconClass="text-brand"
              items={industryOptions}
              selected={industryFilter}
              onToggle={item => toggleIn(industryFilter, setIndustryFilter, item)}
              onSelectAll={() => setIndustryFilter([...industryOptions])}
              onClear={() => setIndustryFilter([])}
              searching={false}
            />
            <ChipGroup
              id="pf-techs"
              className="space-y-4 p-6"
              title="Perimeter technology"
              icon={Cpu}
              iconClass="text-steel"
              description="Show CISOs whose company runs any of the selected technologies."
              items={techOptions}
              selected={techFilter}
              onToggle={item => toggleIn(techFilter, setTechFilter, item)}
              onSelectAll={() => setTechFilter([...techOptions])}
              onClear={() => setTechFilter([])}
              searching={false}
            />
          </div>

          <p
            role="status"
            className={`shrink-0 border-t border-border px-6 py-3 text-sm ${
              filteredProspects.length === 0 && icpFilterCount > 0 ? 'font-medium text-warning' : 'text-muted-foreground'
            }`}
          >
            {icpFilterCount === 0
              ? `${prospects.length} prospects in the pipeline. Choose filters to narrow them down.`
              : filteredProspects.length === 0
                ? 'No prospects match this combination. Filters across groups combine, so try removing one.'
                : `${filteredProspects.length} of ${prospects.length} prospects match your filters.`}
          </p>

          <div className="flex shrink-0 flex-wrap items-center justify-between gap-3 border-t border-border p-5">
            <div className="flex flex-wrap items-center gap-2">
              <Button
                variant="ghost"
                onClick={() => {
                  setIndustryFilter([]);
                  setTechFilter([]);
                }}
                disabled={icpFilterCount === 0}
                className="text-muted-foreground"
              >
                Reset
              </Button>
              <Button
                variant="outline"
                onClick={() => {
                  setIcpOpen(false);
                  setActiveTab('icp');
                }}
              >
                Open full ICP Studio
              </Button>
            </div>
            <Button variant="cyan" onClick={() => setIcpOpen(false)}>
              Show {filteredProspects.length} {filteredProspects.length === 1 ? 'prospect' : 'prospects'}
            </Button>
          </div>
        </div>
      </Dialog>
    </div>
  );
};

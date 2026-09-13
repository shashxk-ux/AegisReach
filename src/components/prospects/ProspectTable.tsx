import React from 'react';
import { useApp } from '../../context/AppContext';
import { 
  Button, 
  Badge, 
  Input, 
  Card, 
  Table, 
  TableHeader, 
  TableBody, 
  TableHead, 
  TableRow, 
  TableCell 
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
  UserX
} from 'lucide-react';

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

  const handleClearFilters = () => {
    setSearchQuery('');
    setPersonaFilter('all');
    setSourceFilter('all');
  };

  return (
    <div className="space-y-4">
      {/* Top Banner & Quick Metrics */}
      <Card className="p-5">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-lg font-extrabold text-foreground tracking-tight">
                Sourced CISO Prospects
              </h2>
              <Badge variant="cyan" className="font-mono">
                {filteredProspects.length} Available
              </Badge>
            </div>
            <p className="text-xs text-muted-foreground mt-1">
              2-Tier Verification: Cheap MX pass verified for all records. Spend ZoomInfo/Apollo credits only on selected targets.
            </p>
          </div>

          <div className="flex items-center gap-2.5">
            <Button
              variant="outline"
              size="sm"
              onClick={handleBatchCheapPass}
              className="text-xs font-semibold"
            >
              <CheckCircle className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
              <span>Run Cheap Pass ($0)</span>
            </Button>
            <Button
              variant="cyan"
              size="sm"
              onClick={() => setActiveTab('icp')}
              className="text-xs font-bold"
            >
              <Filter className="w-3.5 h-3.5" />
              <span>Adjust ICP Filters</span>
            </Button>
          </div>
        </div>
      </Card>

      {/* Search & Filter Toolbar */}
      <Card className="p-3.5">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-2 flex-1 min-w-[260px]">
            <div className="relative w-full max-w-md">
              <Search className="w-4 h-4 text-muted-foreground absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
              <Input
                type="text"
                aria-label="Search prospects"
                placeholder="Search by CISO name, company, title, CVE..."
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
                className="pl-9 pr-9 text-xs"
              />
              {searchQuery && (
                <button
                  type="button"
                  onClick={() => setSearchQuery('')}
                  aria-label="Clear search query"
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground p-0.5 rounded-full cursor-pointer"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              )}
            </div>
          </div>

          <div className="flex items-center gap-3">
            {/* Persona Filter */}
            <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
              <span className="text-[11px] font-bold">Persona:</span>
              <select
                aria-label="Filter by Persona"
                value={personaFilter}
                onChange={e => setPersonaFilter(e.target.value)}
                className="bg-card border border-input rounded-md px-2.5 py-1.5 text-xs text-foreground font-medium focus:outline-none focus:ring-2 focus:ring-ring cursor-pointer"
              >
                <option value="all">All Personas</option>
                <option value="compliance">Compliance-Oriented</option>
                <option value="soc_ops">SOC / Ops-Oriented</option>
                <option value="vulnerability_mgmt">Vulnerability Mgmt</option>
                <option value="technical">Technical / Architecture</option>
              </select>
            </div>

            {/* Sourcing Channel Filter */}
            <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
              <span className="text-[11px] font-bold">Source:</span>
              <select
                aria-label="Filter by Sourcing Channel"
                value={sourceFilter}
                onChange={e => setSourceFilter(e.target.value)}
                className="bg-card border border-input rounded-md px-2.5 py-1.5 text-xs text-foreground font-medium focus:outline-none focus:ring-2 focus:ring-ring cursor-pointer"
              >
                <option value="all">All Sources</option>
                <option value="ZoomInfo">ZoomInfo</option>
                <option value="Apollo">Apollo</option>
                <option value="Trivly">Trivly Scraper</option>
                <option value="CSV Upload">CSV Upload</option>
                <option value="XLS Import">XLS Import</option>
              </select>
            </div>
          </div>
        </div>
      </Card>

      {/* Main Data Table or Empty State */}
      {filteredProspects.length === 0 ? (
        <Card className="p-12 text-center space-y-3">
          <div className="w-12 h-12 mx-auto rounded-2xl bg-muted flex items-center justify-center text-muted-foreground">
            <UserX className="w-6 h-6" />
          </div>
          <h3 className="text-base font-bold text-foreground">No Prospects Matched</h3>
          <p className="text-xs text-muted-foreground max-w-sm mx-auto">
            No CISOs match your search criteria. Try modifying your search query or reset your filters.
          </p>
          <Button
            variant="cyan"
            size="sm"
            onClick={handleClearFilters}
          >
            Reset All Filters
          </Button>
        </Card>
      ) : (
        <Card className="overflow-hidden">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>CISO & Organization</TableHead>
                <TableHead>Persona Strategy</TableHead>
                <TableHead>Tech Stack & CVE Hook</TableHead>
                <TableHead>Tier-1 Cheap Pass</TableHead>
                <TableHead>Tier-2 Direct Contact</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredProspects.map(prospect => {
                const badgeVariant = 
                  prospect.persona.type === 'compliance'
                    ? 'emerald'
                    : prospect.persona.type === 'soc_ops'
                    ? 'cyan'
                    : prospect.persona.type === 'vulnerability_mgmt'
                    ? 'amber'
                    : 'purple';

                return (
                  <TableRow 
                    key={prospect.id} 
                    className="cursor-pointer group"
                    onClick={() => openDossier(prospect.id)}
                  >
                    {/* CISO & Company */}
                    <TableCell>
                      <div className="flex items-center gap-3">
                        <div className="relative shrink-0">
                          <img
                            src={prospect.avatar}
                            alt={prospect.name}
                            className="w-10 h-10 rounded-full object-cover border border-border shadow-2xs"
                          />
                          <span className="absolute -bottom-0.5 -right-0.5 w-2.5 h-2.5 rounded-full bg-emerald-500 border-2 border-card" />
                        </div>
                        <div className="min-w-0">
                          <div className="font-bold text-foreground flex items-center gap-1.5">
                            <span>{prospect.name}</span>
                            <Badge variant="secondary" className="text-[10px] px-1.5 py-0">
                              {prospect.source}
                            </Badge>
                          </div>
                          <p className="text-[11px] text-muted-foreground truncate">{prospect.title}</p>
                          <p className="text-[11px] text-cyan-600 dark:text-cyan-400 font-semibold truncate mt-0.5">{prospect.company}</p>
                        </div>
                      </div>
                    </TableCell>

                    {/* Persona Strategy */}
                    <TableCell>
                      <div className="space-y-1">
                        <Badge variant={badgeVariant} className="gap-1 text-[11px]">
                          <Sparkles className="w-3 h-3" />
                          <span>{prospect.persona.label}</span>
                        </Badge>
                        <div className="flex items-center gap-1.5 text-[11px] text-muted-foreground">
                          <span>Confidence:</span>
                          <span className="font-mono text-foreground font-bold">{prospect.persona.confidence}%</span>
                        </div>
                      </div>
                    </TableCell>

                    {/* Tech Stack & CVE Hook */}
                    <TableCell className="max-w-xs">
                      <div className="space-y-1.5">
                        <div className="flex flex-wrap gap-1">
                          {prospect.techStack.slice(0, 2).map((tech, idx) => (
                            <span
                              key={idx}
                              className="text-[10px] px-1.5 py-0.5 rounded bg-muted border border-border text-foreground font-mono font-medium"
                            >
                              {tech.name}
                            </span>
                          ))}
                        </div>
                        <div className="inline-flex items-center gap-1.5 text-[11px] px-2 py-0.5 rounded bg-red-500/10 border border-red-500/20 text-red-700 dark:text-red-300 font-semibold">
                          <ShieldAlert className="w-3 h-3 text-red-600 dark:text-red-400 shrink-0" />
                          <span className="font-mono">{prospect.matchedVulnerability.cveId}</span>
                          <span className="text-[10px] font-bold text-red-600 dark:text-red-400">CVSS {prospect.matchedVulnerability.cvss}</span>
                        </div>
                      </div>
                    </TableCell>

                    {/* Tier-1 Cheap Pass */}
                    <TableCell>
                      <div className="space-y-1">
                        <Badge variant="emerald" className="gap-1 text-[10px]">
                          <CheckCircle className="w-3 h-3" />
                          <span>Cheap Pass Active</span>
                        </Badge>
                        <div className="text-[10px] text-muted-foreground flex items-center gap-1.5 font-medium">
                          <span>MX Valid</span>
                          <span>•</span>
                          <span className="text-emerald-600 dark:text-emerald-400 font-semibold">$0 Cost</span>
                        </div>
                      </div>
                    </TableCell>

                    {/* Tier-2 Contact Unlock */}
                    <TableCell onClick={e => e.stopPropagation()}>
                      {prospect.tier2Enriched.unlocked ? (
                        <div className="space-y-1">
                          <div className="flex items-center gap-1.5 text-foreground text-xs font-mono font-medium">
                            <Mail className="w-3 h-3 text-cyan-600 dark:text-cyan-400" />
                            <span className="truncate max-w-[150px]">{prospect.tier2Enriched.workEmail}</span>
                          </div>
                          <div className="flex items-center gap-1.5 text-muted-foreground text-[11px] font-mono">
                            <Phone className="w-3 h-3 text-emerald-600 dark:text-emerald-400" />
                            <span>{prospect.tier2Enriched.directPhone}</span>
                          </div>
                        </div>
                      ) : (
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => unlockTier2(prospect.id)}
                          className="text-amber-700 dark:text-amber-300 border-amber-500/30 hover:bg-amber-500/10 hover:border-amber-500/50 text-xs font-bold gap-1.5 group/btn"
                        >
                          <Lock className="w-3 h-3 text-amber-600 dark:text-amber-400 group-hover/btn:hidden" />
                          <Coins className="w-3 h-3 text-amber-600 dark:text-amber-400 hidden group-hover/btn:inline" />
                          <span>Unlock (1 Credit)</span>
                        </Button>
                      )}
                    </TableCell>

                    {/* Actions */}
                    <TableCell className="text-right" onClick={e => e.stopPropagation()}>
                      <div className="flex items-center justify-end gap-2">
                        <Button
                          variant="outline"
                          size="icon"
                          onClick={() => openDossier(prospect.id)}
                          aria-label="Open AI Research Dossier"
                          title="Open AI Research Dossier"
                          className="h-8 w-8 text-muted-foreground hover:text-cyan-600 dark:hover:text-cyan-300"
                        >
                          <ExternalLink className="w-3.5 h-3.5" />
                        </Button>
                        <Button
                          variant="cyan"
                          size="sm"
                          onClick={() => handleReviewClick(prospect.id)}
                          className="h-8 text-xs font-bold gap-1 px-3"
                        >
                          <span>Review</span>
                          <ChevronRight className="w-3 h-3" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </Card>
      )}
    </div>
  );
};

import React, { useState } from 'react';
import { useApp, TabType } from '../../context/AppContext';
import { Badge, Button } from '../ui';
import { 
  Users, 
  Filter, 
  BrainCircuit, 
  Send, 
  Flame, 
  BarChart3, 
  ShieldCheck, 
  PanelLeftClose, 
  PanelLeftOpen,
  Activity
} from 'lucide-react';

export const Sidebar: React.FC = () => {
  const { activeTab, setActiveTab, prospects } = useApp();
  const [isCollapsed, setIsCollapsed] = useState(false);

  const pendingDraftsCount = prospects.filter(p => p.outreachDraft.status === 'pending_review').length;

  const navItems: Array<{
    id: TabType;
    label: string;
    icon: typeof Users;
    badge: string;
    badgeVariant: 'secondary' | 'cyan' | 'purple' | 'amber' | 'emerald';
  }> = [
    {
      id: 'prospects',
      label: 'Prospect Pipeline',
      icon: Users,
      badge: `${prospects.length} CISOs`,
      badgeVariant: 'secondary',
    },
    {
      id: 'icp',
      label: 'ICP Definition Studio',
      icon: Filter,
      badge: '1,420 Pool',
      badgeVariant: 'cyan',
    },
    {
      id: 'personas',
      label: 'Persona Decision Matrix',
      icon: BrainCircuit,
      badge: '4 Archetypes',
      badgeVariant: 'purple',
    },
    {
      id: 'review',
      label: 'Observer Review Console',
      icon: Send,
      badge: pendingDraftsCount > 0 ? `${pendingDraftsCount} Ready` : 'Synced',
      badgeVariant: pendingDraftsCount > 0 ? 'amber' : 'emerald',
    },
    {
      id: 'accounts',
      label: 'Warmup & Inboxes',
      icon: Flame,
      badge: '98% Health',
      badgeVariant: 'emerald',
    },
    {
      id: 'analytics',
      label: 'Telemetry & Funnel',
      icon: BarChart3,
      badge: '68% Open',
      badgeVariant: 'cyan',
    }
  ];

  return (
    <aside 
      className={`border-r border-border bg-card/60 backdrop-blur-md flex flex-col justify-between shrink-0 h-[calc(100vh-4rem)] sticky top-16 overflow-y-auto transition-all duration-250 ease-in-out select-none ${
        isCollapsed ? 'w-20 p-3' : 'w-76 lg:w-80 p-3.5'
      }`}
    >
      <div className="space-y-4">
        {/* Collapse / Expand Toggle Bar */}
        <div className={`flex items-center ${isCollapsed ? 'justify-center' : 'justify-between px-2'} mb-1`}>
          {!isCollapsed && (
            <span className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest">
              Navigation
            </span>
          )}
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setIsCollapsed(!isCollapsed)}
            aria-label={isCollapsed ? 'Expand Sidebar' : 'Collapse Sidebar'}
            title={isCollapsed ? 'Expand Sidebar' : 'Collapse Sidebar'}
            className="h-8 w-8 text-muted-foreground hover:text-foreground"
          >
            {isCollapsed ? (
              <PanelLeftOpen className="w-4 h-4 text-cyan-600 dark:text-cyan-400" />
            ) : (
              <PanelLeftClose className="w-4 h-4" />
            )}
          </Button>
        </div>

        {/* Navigation Items */}
        <nav aria-label="Main Navigation" className="space-y-1">
          {navItems.map(item => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;
            return (
              <button
                type="button"
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                aria-current={isActive ? 'page' : undefined}
                title={isCollapsed ? item.label : undefined}
                className={`w-full flex items-center rounded-xl text-xs font-semibold transition-all duration-150 group relative cursor-pointer ${
                  isCollapsed ? 'justify-center py-3 px-2' : 'justify-between px-3 py-2.5'
                } ${
                  isActive
                    ? 'bg-accent/70 text-accent-foreground border border-border shadow-xs'
                    : 'text-muted-foreground hover:text-foreground hover:bg-muted/60'
                }`}
              >
                {/* Active Left Accent Bar */}
                {isActive && (
                  <span className="absolute left-0 top-2 bottom-2 w-1 rounded-r-full bg-cyan-600 dark:bg-cyan-400 shadow-xs" />
                )}

                <div className={`flex items-center min-w-0 ${isCollapsed ? 'justify-center' : 'gap-2.5'}`}>
                  <Icon className={`w-4 h-4 shrink-0 transition-colors ${
                    isActive ? 'text-cyan-600 dark:text-cyan-400' : 'text-muted-foreground group-hover:text-foreground'
                  }`} />
                  {!isCollapsed && <span className="truncate whitespace-nowrap">{item.label}</span>}
                </div>

                {!isCollapsed && item.badge && (
                  <Badge variant={item.badgeVariant} className="text-[10px] font-mono font-medium px-1.5 py-0">
                    {item.badge}
                  </Badge>
                )}

                {/* Collapsed active indicator dot */}
                {isCollapsed && isActive && (
                  <span className="absolute right-1.5 top-1/2 -translate-y-1/2 w-1.5 h-1.5 rounded-full bg-cyan-600 dark:bg-cyan-400" />
                )}
              </button>
            );
          })}
        </nav>

        {/* Threat Intelligence Feed Widget */}
        {isCollapsed ? (
          <div 
            className="p-3 rounded-xl bg-card border border-border flex flex-col items-center justify-center relative group cursor-pointer hover:border-emerald-400/50 transition-colors shadow-2xs"
            title="MISP Open Threat Feed: 43 active KEV advisories matched"
            onClick={() => setIsCollapsed(false)}
          >
            <ShieldCheck className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse absolute top-2 right-2" />
          </div>
        ) : (
          <div className="p-3.5 rounded-xl bg-card border border-border space-y-2 shadow-2xs">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-1.5 text-xs font-bold text-foreground">
                <ShieldCheck className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
                <span>MISP Threat Feed</span>
              </div>
              <div className="flex items-center gap-1">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                <span className="text-[10px] font-mono text-emerald-600 dark:text-emerald-400 font-semibold">LIVE</span>
              </div>
            </div>
            <p className="text-[11px] text-muted-foreground leading-relaxed">
              Real-time cross-referencing of tech stacks against <strong>43 active CISA KEV</strong> vulnerabilities.
            </p>
            <div className="pt-1 flex items-center justify-between text-[10px] text-muted-foreground font-mono border-t border-border mt-1">
              <span>Feed: NVD / CISA</span>
              <span className="text-cyan-600 dark:text-cyan-400 font-semibold">100% Synced</span>
            </div>
          </div>
        )}
      </div>

      {/* Footer / Status Indicator */}
      <div className={`pt-3 border-t border-border flex items-center ${isCollapsed ? 'justify-center' : 'justify-between text-xs text-muted-foreground'}`}>
        <div className="flex items-center gap-2">
          <div 
            className="w-7 h-7 rounded-full bg-gradient-to-tr from-cyan-600 to-indigo-600 flex items-center justify-center font-extrabold text-white text-[10px] shrink-0 shadow-xs"
            title="AegisReach Engine"
          >
            AR
          </div>
          {!isCollapsed && (
            <div>
              <div className="font-bold text-foreground text-[11px]">AegisReach 2.4</div>
              <div className="text-[10px] text-emerald-600 dark:text-emerald-400 flex items-center gap-1">
                <Activity className="w-2.5 h-2.5" />
                <span>Engine Healthy</span>
              </div>
            </div>
          )}
        </div>
      </div>
    </aside>
  );
};

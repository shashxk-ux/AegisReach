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
} from 'lucide-react';

export const Sidebar: React.FC = () => {
  const { activeTab, setActiveTab, prospects } = useApp();
  const [isCollapsed, setIsCollapsed] = useState(() => typeof window !== 'undefined' && window.innerWidth < 1024);

  const pendingDraftsCount = prospects.filter(p => p.outreachDraft.status === 'pending_review').length;

  const navItems: Array<{
    id: TabType;
    label: string;
    icon: typeof Users;
    badge: string;
    attention?: boolean;
  }> = [
    { id: 'prospects', label: 'Prospect Pipeline', icon: Users, badge: `${prospects.length} CISOs` },
    { id: 'icp', label: 'ICP Definition Studio', icon: Filter, badge: '1,420' },
    { id: 'personas', label: 'Persona Decision Matrix', icon: BrainCircuit, badge: '4 types' },
    {
      id: 'review',
      label: 'Observer Review Console',
      icon: Send,
      badge: pendingDraftsCount > 0 ? `${pendingDraftsCount} ready` : 'Synced',
      attention: pendingDraftsCount > 0,
    },
    { id: 'accounts', label: 'Warmup & Inboxes', icon: Flame, badge: '98% health' },
    { id: 'analytics', label: 'Telemetry & Funnel', icon: BarChart3, badge: '68% open' },
  ];

  return (
    <aside
      className={`border-r border-border bg-background flex flex-col justify-between shrink-0 h-[calc(100dvh-4rem)] sticky top-16 overflow-y-auto transition-[width,padding] duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] select-none ${
        isCollapsed ? 'w-[4.5rem] p-3' : 'w-[19rem] p-4'
      }`}
    >
      <div className="space-y-6">
        <div className={`flex items-center ${isCollapsed ? 'justify-center' : 'justify-between px-2'}`}>
          {!isCollapsed && (
            <span className="text-[10px] font-medium text-muted-foreground uppercase tracking-[0.14em]">
              Workspace
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
            {isCollapsed ? <PanelLeftOpen className="w-4 h-4" /> : <PanelLeftClose className="w-4 h-4" />}
          </Button>
        </div>

        <nav aria-label="Main Navigation" className="space-y-0.5">
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
                className={`w-full flex items-center rounded-lg text-[13px] font-medium transition-colors duration-200 group relative cursor-pointer ${
                  isCollapsed ? 'justify-center py-3 px-2' : 'justify-between px-3 py-2.5'
                } ${
                  isActive
                    ? 'bg-muted text-foreground'
                    : 'text-muted-foreground hover:text-foreground hover:bg-muted/60'
                }`}
              >
                {isActive && (
                  <span className="absolute left-0 top-2 bottom-2 w-0.5 rounded-full bg-cyan-500 dark:bg-cyan-400" />
                )}

                <div className={`flex items-center min-w-0 ${isCollapsed ? 'justify-center' : 'gap-3'}`}>
                  <Icon
                    className={`w-4 h-4 shrink-0 transition-colors ${
                      isActive ? 'text-cyan-600 dark:text-cyan-400' : 'text-muted-foreground group-hover:text-foreground'
                    }`}
                  />
                  {!isCollapsed && <span className="truncate whitespace-nowrap">{item.label}</span>}
                </div>

                {!isCollapsed &&
                  (item.attention ? (
                    <Badge variant="amber" className="font-mono px-1.5 py-0 whitespace-nowrap shrink-0 ml-2">
                      {item.badge}
                    </Badge>
                  ) : (
                    <span className="font-mono text-[10px] text-muted-foreground tabular whitespace-nowrap shrink-0 ml-2">{item.badge}</span>
                  ))}

                {isCollapsed && item.attention && (
                  <span className="absolute right-2 top-2 w-1.5 h-1.5 rounded-full bg-amber-500" />
                )}
              </button>
            );
          })}
        </nav>

        {isCollapsed ? (
          <button
            type="button"
            className="w-full flex items-center justify-center py-3 rounded-lg text-muted-foreground hover:text-foreground hover:bg-muted/60 transition-colors relative cursor-pointer"
            title="MISP Open Threat Feed: 43 active KEV advisories matched"
            onClick={() => setIsCollapsed(false)}
          >
            <ShieldCheck className="w-4 h-4" />
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse absolute top-2 right-3" />
          </button>
        ) : (
          <section className="border-t border-border pt-5 px-2 space-y-2.5">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 text-xs font-medium text-foreground">
                <ShieldCheck className="w-4 h-4 text-muted-foreground" />
                <span>MISP Threat Feed</span>
              </div>
              <span className="flex items-center gap-1.5 font-mono text-[10px] text-emerald-600 dark:text-emerald-400">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                LIVE
              </span>
            </div>
            <p className="text-xs text-muted-foreground leading-relaxed">
              Tech stacks cross-referenced against <span className="text-foreground font-medium">43 active CISA KEV</span>{' '}
              vulnerabilities.
            </p>
            <div className="flex items-center justify-between font-mono text-[10px] text-muted-foreground">
              <span>NVD / CISA</span>
              <span className="text-foreground">100% synced</span>
            </div>
          </section>
        )}
      </div>

      <div className={`pt-4 border-t border-border flex items-center ${isCollapsed ? 'justify-center' : 'px-2'}`}>
        <div className="flex items-center gap-2.5">
          <div
            className="w-8 h-8 rounded-lg bg-secondary border border-border flex items-center justify-center font-mono font-semibold text-foreground text-[10px] shrink-0"
            title="AegisReach Engine"
          >
            AR
          </div>
          {!isCollapsed && (
            <div className="leading-tight">
              <div className="font-medium text-foreground text-xs">AegisReach 2.4</div>
              <div className="text-[10px] text-muted-foreground flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                <span>Engine healthy</span>
              </div>
            </div>
          )}
        </div>
      </div>
    </aside>
  );
};

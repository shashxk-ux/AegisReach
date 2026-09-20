import React, { useState } from 'react';
import { Button } from '../ui';
import { NavList } from './NavList';
import { PanelLeftClose, PanelLeftOpen, ShieldCheck } from 'lucide-react';

export const Sidebar: React.FC = () => {
  const [isCollapsed, setIsCollapsed] = useState(false);

  return (
    <aside
      aria-label="Workflow sidebar"
      className={`sticky top-[var(--header-h)] hidden h-[calc(100dvh-var(--header-h))] shrink-0 flex-col justify-between overflow-y-auto border-r border-border bg-background transition-[width,padding] duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] lg:flex ${
        isCollapsed ? 'w-[4.75rem] p-3' : 'w-[19.5rem] p-4'
      }`}
    >
      <div className="space-y-6">
        <div className={`flex items-center ${isCollapsed ? 'justify-center' : 'justify-between px-2'}`}>
          {!isCollapsed && (
            <p className="text-xs font-medium uppercase tracking-[0.14em] text-muted-foreground">Workflow</p>
          )}
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setIsCollapsed(c => !c)}
            aria-label={isCollapsed ? 'Expand sidebar' : 'Collapse sidebar'}
            aria-expanded={!isCollapsed}
            className="text-muted-foreground hover:text-foreground"
          >
            {isCollapsed ? (
              <PanelLeftOpen className="h-4 w-4" aria-hidden="true" />
            ) : (
              <PanelLeftClose className="h-4 w-4" aria-hidden="true" />
            )}
          </Button>
        </div>

        <NavList collapsed={isCollapsed} />
      </div>

      {!isCollapsed ? (
        <section aria-label="Threat feed status" className="space-y-2.5 border-t border-border px-2 pt-5">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 text-sm font-medium text-foreground">
              <ShieldCheck className="h-4 w-4 text-muted-foreground" aria-hidden="true" />
              <span>MISP Threat Feed</span>
            </div>
            <span className="flex items-center gap-1.5 font-mono text-xs text-success">
              <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-success" aria-hidden="true" />
              Live
            </span>
          </div>
          <p className="text-sm leading-relaxed text-muted-foreground">
            Tech stacks cross-referenced against{' '}
            <span className="font-medium text-foreground">43 active CISA KEV</span> vulnerabilities.
          </p>
          <p className="flex items-center justify-between font-mono text-xs text-muted-foreground">
            <span>NVD / CISA</span>
            <span className="text-foreground">100% synced</span>
          </p>
        </section>
      ) : (
        <div className="flex justify-center border-t border-border pt-4" title="MISP threat feed: live, 100% synced">
          <ShieldCheck className="h-4 w-4 text-success" aria-label="MISP threat feed live" role="img" />
        </div>
      )}
    </aside>
  );
};

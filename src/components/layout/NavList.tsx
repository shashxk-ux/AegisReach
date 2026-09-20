import React, { useId } from 'react';
import { motion } from 'motion/react';
import { spring } from '../ui/springs';
import { useApp } from '../../context/AppContext';
import { NAV_ITEMS } from './nav';

interface NavListProps {
  collapsed?: boolean;
  onNavigate?: () => void;
}

export const NavList: React.FC<NavListProps> = ({ collapsed = false, onNavigate }) => {
  const { activeTab, setActiveTab, prospects } = useApp();
  const pillId = `${useId()}-nav-pill`;
  const pending = prospects.filter(p => p.outreachDraft.status === 'pending_review').length;

  const meta: Record<string, string> = {
    icp: '1,420 in pool',
    prospects: `${prospects.length} CISOs`,
    personas: '4 archetypes',
    review: pending > 0 ? `${pending} awaiting review` : 'All synced',
    accounts: '98% inbox health',
    analytics: '68% open rate',
  };

  return (
    <nav aria-label="Primary">
      <ol className="space-y-1">
        {NAV_ITEMS.map(item => {
          const Icon = item.icon;
          const isActive = activeTab === item.id;
          const needsAttention = item.id === 'review' && pending > 0;
          return (
            <li key={item.id}>
              <button
                type="button"
                onClick={() => {
                  setActiveTab(item.id);
                  onNavigate?.();
                }}
                aria-current={isActive ? 'page' : undefined}
                aria-label={collapsed ? `Step ${item.step}: ${item.label}` : undefined}
                title={collapsed ? item.label : undefined}
                className={`group relative flex w-full items-center gap-3 rounded-xl text-left transition-colors duration-200 ${
                  collapsed ? 'justify-center p-2' : 'px-2.5 py-2'
                } ${isActive ? 'text-foreground' : 'text-foreground hover:bg-muted'}`}
              >
                {isActive && (
                  <motion.span
                    layoutId={pillId}
                    aria-hidden="true"
                    transition={spring}
                    className="absolute inset-0 rounded-xl border border-brand/50 bg-card shadow-diffuse"
                  >
                    <span className="absolute bottom-2.5 left-0 top-2.5 w-1 rounded-r-full bg-brand" />
                  </motion.span>
                )}
                <span
                  className={`relative flex h-9 w-9 shrink-0 items-center justify-center rounded-lg border transition-colors ${
                    isActive
                      ? 'border-brand/40 bg-accent text-brand'
                      : 'border-border bg-card text-muted-foreground group-hover:text-foreground'
                  }`}
                >
                  <Icon className="h-4 w-4" aria-hidden="true" />
                  {collapsed && needsAttention && (
                    <span className="absolute -right-1 -top-1 h-2.5 w-2.5 rounded-full border-2 border-background bg-warning" />
                  )}
                </span>
                {!collapsed && (
                  <span className="relative min-w-0 flex-1">
                    <span className={`block truncate text-sm ${isActive ? "font-semibold" : "font-medium"}`}>{item.label}</span>
                    <span
                      className={`block truncate text-xs ${
                        needsAttention
                          ? 'font-medium text-warning'
                          : isActive
                            ? 'font-medium text-brand'
                            : 'text-muted-foreground'
                      }`}
                    >
                      Step {item.step} &middot; {meta[item.id]}
                    </span>
                  </span>
                )}
              </button>
            </li>
          );
        })}
      </ol>
    </nav>
  );
};

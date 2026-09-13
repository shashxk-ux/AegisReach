import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { 
  Users, 
  Filter, 
  BrainCircuit, 
  Send, 
  Flame, 
  BarChart3, 
  ShieldCheck,
  PanelLeftClose,
  PanelLeftOpen
} from 'lucide-react';

export const Sidebar: React.FC = () => {
  const { activeTab, setActiveTab, prospects } = useApp();
  const [isCollapsed, setIsCollapsed] = useState(false);

  const pendingDraftsCount = prospects.filter(p => p.outreachDraft.status === 'pending_review').length;

  const navItems = [
    {
      id: 'prospects',
      label: 'Prospect Pipeline',
      icon: Users,
      badge: `${prospects.length} CISOs`,
      badgeColor: 'bg-slate-800 text-slate-300 border-slate-700'
    },
    {
      id: 'icp',
      label: 'ICP Definition Studio',
      icon: Filter,
      badge: '1,420 Pool',
      badgeColor: 'bg-cyan-950/80 text-cyan-400 border-cyan-800/40'
    },
    {
      id: 'personas',
      label: 'Persona Decision Engine',
      icon: BrainCircuit,
      badge: '4 Archetypes',
      badgeColor: 'bg-purple-950/80 text-purple-400 border-purple-800/40'
    },
    {
      id: 'review',
      label: 'Observer Outreach Review',
      icon: Send,
      badge: pendingDraftsCount > 0 ? `${pendingDraftsCount} Ready` : 'Synced',
      badgeColor: pendingDraftsCount > 0 ? 'bg-amber-950/80 text-amber-400 border-amber-800/40' : 'bg-emerald-950/80 text-emerald-400 border-emerald-800/40'
    },
    {
      id: 'accounts',
      label: 'Warmup & Rotation Hub',
      icon: Flame,
      badge: '98% Health',
      badgeColor: 'bg-emerald-950/80 text-emerald-400 border-emerald-800/40'
    },
    {
      id: 'analytics',
      label: 'Funnel & Telemetry',
      icon: BarChart3,
      badge: '68% Open Rate',
      badgeColor: 'bg-blue-950/80 text-blue-400 border-blue-800/40'
    }
  ];

  return (
    <aside 
      className={`border-r border-slate-800/80 bg-slate-950/50 flex flex-col justify-between shrink-0 h-[calc(100vh-4rem)] sticky top-16 overflow-y-auto transition-all duration-300 ease-in-out ${
        isCollapsed ? 'w-20 p-3' : 'w-64 p-4'
      }`}
    >
      <div className="space-y-5">
        {/* Collapse / Expand Toggle Bar */}
        <div className={`flex items-center ${isCollapsed ? 'justify-center' : 'justify-between px-2'} mb-1`}>
          {!isCollapsed && (
            <span className="text-[11px] font-semibold text-slate-500 uppercase tracking-wider">
              Workspace
            </span>
          )}
          <button
            onClick={() => setIsCollapsed(!isCollapsed)}
            title={isCollapsed ? 'Expand Sidebar' : 'Collapse Sidebar'}
            className="p-1.5 rounded-lg text-slate-400 hover:text-slate-100 hover:bg-slate-900 border border-transparent hover:border-slate-800 transition-colors"
          >
            {isCollapsed ? (
              <PanelLeftOpen className="w-4 h-4 text-cyan-400" />
            ) : (
              <PanelLeftClose className="w-4 h-4 text-slate-400" />
            )}
          </button>
        </div>

        {/* Navigation Items */}
        <nav className="space-y-1">
          {navItems.map(item => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id as any)}
                title={isCollapsed ? item.label : undefined}
                className={`w-full flex items-center rounded-xl text-xs font-medium transition-all group relative ${
                  isCollapsed ? 'justify-center py-3 px-2' : 'justify-between px-3 py-2.5'
                } ${
                  isActive
                    ? 'bg-gradient-to-r from-slate-900 to-slate-800 text-white border border-slate-700 shadow-md shadow-black/20'
                    : 'text-slate-400 hover:text-slate-200 hover:bg-slate-900/50'
                }`}
              >
                <div className={`flex items-center min-w-0 ${isCollapsed ? 'justify-center' : 'gap-2.5'}`}>
                  <Icon className={`w-4 h-4 shrink-0 transition-colors ${
                    isActive ? 'text-cyan-400' : 'text-slate-500 group-hover:text-slate-300'
                  }`} />
                  {!isCollapsed && <span className="truncate">{item.label}</span>}
                </div>

                {!isCollapsed && item.badge && (
                  <span className={`text-[10px] font-mono px-1.5 py-0.5 rounded border shrink-0 ${item.badgeColor}`}>
                    {item.badge}
                  </span>
                )}

                {/* Collapsed active indicator dot */}
                {isCollapsed && isActive && (
                  <span className="absolute right-1.5 top-1/2 -translate-y-1/2 w-1.5 h-1.5 rounded-full bg-cyan-400" />
                )}
              </button>
            );
          })}
        </nav>

        {/* Threat Intelligence Feed Widget */}
        {isCollapsed ? (
          <div 
            className="p-3 rounded-xl bg-slate-900/40 border border-slate-800/70 flex flex-col items-center justify-center relative group cursor-pointer"
            title="MISP Open Threat Feed: 43 active KEV advisories matched"
            onClick={() => setIsCollapsed(false)}
          >
            <ShieldCheck className="w-5 h-5 text-emerald-400" />
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse absolute top-2 right-2" />
          </div>
        ) : (
          <div className="p-3.5 rounded-xl bg-slate-900/40 border border-slate-800/70 space-y-2.5">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-1.5 text-xs font-semibold text-slate-300">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                <span>MISP Open Threat Feed</span>
              </div>
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            </div>
            <p className="text-[11px] text-slate-400 leading-relaxed">
              Correlating detected tech stacks with <strong>43 active KEV advisories</strong> in real-time.
            </p>
            <div className="pt-1 flex items-center justify-between text-[10px] text-slate-500 font-mono">
              <span>Sync: Live (NVD / KEV)</span>
              <span className="text-cyan-400">100% Matched</span>
            </div>
          </div>
        )}
      </div>

      {/* Footer / Author Badge */}
      <div className={`pt-4 border-t border-slate-900 flex items-center ${isCollapsed ? 'justify-center' : 'justify-between text-xs text-slate-400'}`}>
        <div className="flex items-center gap-2">
          <div 
            className="w-8 h-8 rounded-full bg-gradient-to-tr from-cyan-500 to-purple-600 flex items-center justify-center font-bold text-white text-[11px] shrink-0 shadow-md shadow-cyan-500/10"
            title="Product Design Demo"
          >
            UX
          </div>
          {!isCollapsed && (
            <div>
              <div className="font-semibold text-slate-200 text-[11px]">Product Design Demo</div>
              <div className="text-[10px] text-slate-500">Cybersecurity B2B SaaS</div>
            </div>
          )}
        </div>
      </div>
    </aside>
  );
};

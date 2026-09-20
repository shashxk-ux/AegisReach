import { Users, Filter, BrainCircuit, Send, Flame, BarChart3, type LucideIcon } from 'lucide-react';
import type { TabType } from '../../context/AppContext';

export interface NavItem {
  id: TabType;
  step: number;
  label: string;
  description: string;
  icon: LucideIcon;
}

/** Ordered as the actual outreach workflow, so the sidebar doubles as a checklist. */
export const NAV_ITEMS: NavItem[] = [
  { id: 'icp', step: 1, label: 'ICP Definition Studio', description: 'Define who you are targeting', icon: Filter },
  { id: 'prospects', step: 2, label: 'Prospect Pipeline', description: 'Review sourced CISOs and unlock contacts', icon: Users },
  { id: 'personas', step: 3, label: 'Persona Decision Matrix', description: 'Choose the messaging archetype', icon: BrainCircuit },
  { id: 'review', step: 4, label: 'Observer Review Console', description: 'Approve drafts before anything sends', icon: Send },
  { id: 'accounts', step: 5, label: 'Warmup & Inboxes', description: 'Keep sending domains healthy', icon: Flame },
  { id: 'analytics', step: 6, label: 'Telemetry & Funnel', description: 'Track opens, replies and suppression', icon: BarChart3 },
];

export const NAV_TOTAL = NAV_ITEMS.length;

export const stepLabel = (id: TabType) => {
  const item = NAV_ITEMS.find(n => n.id === id);
  return item ? `Step ${item.step} of ${NAV_TOTAL}` : undefined;
};

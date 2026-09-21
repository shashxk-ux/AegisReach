import { Users, Filter, BrainCircuit, Send, Flame, BarChart3, type LucideIcon } from 'lucide-react';
import type { TabType } from '../../context/AppContext';

export interface NavItem {
  id: TabType;
  step: number;
  label: string;
  description: string;
  icon: LucideIcon;
  /** What the user is here to do, phrased as an action (used by the getting-started guide) */
  guideTitle: string;
  /** Plain-language instructions for a first-time user */
  guideBody: string;
}

/** Ordered as the actual outreach workflow, so the sidebar doubles as a checklist. */
export const NAV_ITEMS: NavItem[] = [
  {
    id: 'icp',
    step: 1,
    label: 'ICP Definition Studio',
    description: 'Define who you are targeting',
    icon: Filter,
    guideTitle: 'Choose who to target',
    guideBody:
      'Pick the industries, security roles and technologies your ideal customers use, or import your own spreadsheet. When the forecast looks right, click "Load into sourcing pipeline".',
  },
  {
    id: 'prospects',
    step: 2,
    label: 'Prospect Pipeline',
    description: 'Review sourced CISOs and unlock contacts',
    icon: Users,
    guideTitle: 'Review your prospects',
    guideBody:
      'Scan the security leaders matched to your profile. Click a name to read the research dossier, and unlock direct contact details (1 credit each) only for the people worth pursuing.',
  },
  {
    id: 'personas',
    step: 3,
    label: 'Persona Decision Matrix',
    description: 'Choose the messaging archetype',
    icon: BrainCircuit,
    guideTitle: 'Pick the messaging angle',
    guideBody:
      'See how each type of CISO is approached, then use the simulator to preview how the email changes when you switch the persona.',
  },
  {
    id: 'review',
    step: 4,
    label: 'Observer Review Console',
    description: 'Approve drafts before anything sends',
    icon: Send,
    guideTitle: 'Review and send the draft',
    guideBody:
      'Read the AI-written email, edit anything you like, then push it to your Gmail Drafts folder or approve it to send. Nothing is sent until you say so.',
  },
  {
    id: 'accounts',
    step: 5,
    label: 'Warmup & Inboxes',
    description: 'Keep sending domains healthy',
    icon: Flame,
    guideTitle: 'Protect your sending reputation',
    guideBody:
      'Connect the Gmail inboxes you send from and keep an eye on their health, so your emails reach inboxes instead of spam folders.',
  },
  {
    id: 'analytics',
    step: 6,
    label: 'Telemetry & Funnel',
    description: 'Track opens, replies and suppression',
    icon: BarChart3,
    guideTitle: 'Track results',
    guideBody:
      'Watch opens, clicks and replies come in, and add anyone who asks not to be contacted to the suppression list.',
  },
];

export const NAV_TOTAL = NAV_ITEMS.length;

export const stepLabel = (id: TabType) => {
  const item = NAV_ITEMS.find(n => n.id === id);
  return item ? `Step ${item.step} of ${NAV_TOTAL}` : undefined;
};

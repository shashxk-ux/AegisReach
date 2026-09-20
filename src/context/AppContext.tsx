import React, { createContext, useContext, useState } from 'react';
import { Prospect, PersonaType, EmailAccount, FunnelStats } from '../types';
import { INITIAL_PROSPECTS, PERSONA_STRATEGIES, CONNECTED_ACCOUNTS, INITIAL_FUNNEL_STATS } from '../data/mockData';
import confetti from 'canvas-confetti';

interface ToastMessage {
  id: string;
  type: 'success' | 'info' | 'warning';
  title: string;
  description: string;
}

export type TabType = 'prospects' | 'icp' | 'personas' | 'review' | 'accounts' | 'analytics' | 'casestudy';

interface AppContextType {
  prospects: Prospect[];
  selectedProspect: Prospect | null;
  selectedProspectId: string | null;
  setSelectedProspectId: (id: string | null) => void;
  activeTab: TabType;
  setActiveTab: (tab: TabType) => void;
  mode: 'observer' | 'autopilot';
  setMode: (mode: 'observer' | 'autopilot') => void;
  credits: number;
  accounts: EmailAccount[];
  funnelStats: FunnelStats;
  toasts: ToastMessage[];
  showToast: (type: 'success' | 'info' | 'warning', title: string, description: string) => void;
  removeToast: (id: string) => void;
  theme: 'dark' | 'light';
  toggleTheme: () => void;
  unlockTier2: (prospectId: string) => void;
  switchPersona: (prospectId: string, newPersona: PersonaType) => void;
  updateDraft: (prospectId: string, subject: string, body: string) => void;
  syncToGmailDraft: (prospectId: string) => Promise<void>;
  approveAndSendEmail: (prospectId: string) => Promise<void>;
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  personaFilter: string;
  setPersonaFilter: (p: string) => void;
  sourceFilter: string;
  setSourceFilter: (s: string) => void;
  isDrawerOpen: boolean;
  setIsDrawerOpen: (open: boolean) => void;
  openDossier: (prospectId: string) => void;
  closeDossier: () => void;
  importProspects: (newProspects: Prospect[], sourceName?: string) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [theme, setTheme] = useState<'dark' | 'light'>(() => {
    try {
      const saved = localStorage.getItem('aegisreach_theme');
      if (saved === 'light' || saved === 'dark') return saved;
    } catch {
      /* storage unavailable: fall through to the system preference */
    }
    return window.matchMedia?.('(prefers-color-scheme: light)').matches ? 'light' : 'dark';
  });

  React.useEffect(() => {
    const root = document.documentElement;
    if (theme === 'dark') {
      root.classList.add('dark');
      root.classList.remove('light');
    } else {
      root.classList.add('light');
      root.classList.remove('dark');
    }
    try {
      localStorage.setItem('aegisreach_theme', theme);
    } catch {}
  }, [theme]);

  const [prospects, setProspects] = useState<Prospect[]>(INITIAL_PROSPECTS);
  const [selectedProspectId, setSelectedProspectId] = useState<string | null>('pr-101');
  const [activeTab, setActiveTab] = useState<'prospects' | 'icp' | 'personas' | 'review' | 'accounts' | 'analytics' | 'casestudy'>('prospects');
  const [mode, setMode] = useState<'observer' | 'autopilot'>('observer');
  const [credits, setCredits] = useState<number>(1250);
  const [accounts, setAccounts] = useState<EmailAccount[]>(CONNECTED_ACCOUNTS);
  const [funnelStats, setFunnelStats] = useState<FunnelStats>(INITIAL_FUNNEL_STATS);
  const [toasts, setToasts] = useState<ToastMessage[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [personaFilter, setPersonaFilter] = useState('all');
  const [sourceFilter, setSourceFilter] = useState('all');
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  const selectedProspect = prospects.find(p => p.id === selectedProspectId) || prospects[0];

  const showToast = (type: 'success' | 'info' | 'warning', title: string, description: string) => {
    const id = Math.random().toString(36).substring(2, 9);
    setToasts(prev => [...prev, { id, type, title, description }]);
  };

  const toggleTheme = () => {
    setTheme(prev => (prev === 'dark' ? 'light' : 'dark'));
  };

  const removeToast = (id: string) => {
    setToasts(prev => prev.filter(t => t.id !== id));
  };

  const openDossier = (prospectId: string) => {
    setSelectedProspectId(prospectId);
    setIsDrawerOpen(true);
  };

  const closeDossier = () => {
    setIsDrawerOpen(false);
  };

  const unlockTier2 = (prospectId: string) => {
    const prospect = prospects.find(p => p.id === prospectId);
    if (!prospect || prospect.tier2Enriched.unlocked) return;

    if (credits < 1) {
      showToast('warning', 'Insufficient Credits', 'Please replenish your Apollo/ZoomInfo credit balance.');
      return;
    }

    setCredits(prev => prev - 1);

    setProspects(prev => prev.map(p => {
      if (p.id !== prospectId) return p;
      return {
        ...p,
        tier2Enriched: {
          ...p.tier2Enriched,
          unlocked: true,
          unlockedAt: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        }
      };
    }));

    setFunnelStats(prev => ({
      ...prev,
      tier2Unlocked: prev.tier2Unlocked + 1
    }));

    showToast(
      'success',
      'Tier-2 Enrichment Complete',
      `Consumed 1 credit. Unlocked direct dial & verified work email for ${prospect.name}.`
    );
  };

  const switchPersona = (prospectId: string, newPersonaType: PersonaType) => {
    const strategy = PERSONA_STRATEGIES.find(s => s.id === newPersonaType);
    if (!strategy) return;

    setProspects(prev => prev.map(p => {
      if (p.id !== prospectId) return p;

      const techItem = p.techStack[0]?.name || 'Perimeter Gateway';
      const cveId = p.matchedVulnerability.cveId;

      // Dynamically re-synthesize outreach copy based on chosen persona template
      const dynamicSubject = strategy.sampleSubject
        .replace('{{TechStackItem}}', techItem)
        .replace('{{Company}}', p.company)
        .replace('{{CVE_ID}}', cveId);

      const dynamicBody = strategy.sampleBody
        .replace(/{{Name}}/g, p.name.split(' ')[0])
        .replace(/{{Company}}/g, p.company)
        .replace(/{{TechStackItem}}/g, techItem)
        .replace(/{{CVE_ID}}/g, cveId)
        .replace(/{{EPSS}}/g, p.matchedVulnerability.epssScore);

      return {
        ...p,
        persona: {
          type: newPersonaType,
          label: strategy.title,
          confidence: Math.floor(Math.random() * 8) + 90,
          rationale: `Strategically reclassified as ${strategy.title}. Messaging angle recalibrated to prioritize: ${strategy.corePainPoints[0]}.`,
          triggerSignals: [
            ...p.persona.triggerSignals.slice(0, 1),
            `Dynamic Persona Trigger: ${strategy.messagingHook}`
          ],
          recommendedTone: strategy.systemPromptSnippet
        },
        outreachDraft: {
          ...p.outreachDraft,
          subject: dynamicSubject,
          body: dynamicBody,
          previewHook: strategy.messagingHook,
          status: 'pending_review',
          isDraftedInGmail: false
        }
      };
    }));

    showToast(
      'info',
      'Persona Decision Matrix Updated',
      `Re-tuned campaign strategy to "${strategy.title}" with customized CVE angle.`
    );
  };

  const updateDraft = (prospectId: string, subject: string, body: string) => {
    setProspects(prev => prev.map(p => {
      if (p.id !== prospectId) return p;
      return {
        ...p,
        outreachDraft: {
          ...p.outreachDraft,
          subject,
          body,
          lastEdited: 'Just now'
        }
      };
    }));
  };

  const syncToGmailDraft = async (prospectId: string) => {
    const prospect = prospects.find(p => p.id === prospectId);
    if (!prospect) return;

    const fakeDraftId = `draft_${Math.random().toString(36).substring(2, 10)}`;

    setProspects(prev => prev.map(p => {
      if (p.id !== prospectId) return p;
      return {
        ...p,
        outreachDraft: {
          ...p.outreachDraft,
          isDraftedInGmail: true,
          gmailDraftId: fakeDraftId,
          status: 'gmail_draft'
        }
      };
    }));

    showToast(
      'success',
      'Synced to Gmail Drafts',
      `Created draft #${fakeDraftId} in shashank@aegisreach.ai (Observer Mode). Ready for human review.`
    );
  };

  const approveAndSendEmail = async (prospectId: string) => {
    const prospect = prospects.find(p => p.id === prospectId);
    if (!prospect) return;

    setProspects(prev => prev.map(p => {
      if (p.id !== prospectId) return p;
      return {
        ...p,
        outreachDraft: {
          ...p.outreachDraft,
          status: 'sent',
          isDraftedInGmail: true
        }
      };
    }));

    setAccounts(prev => prev.map((acc, idx) => {
      if (idx === 0) {
        return { ...acc, sentToday: acc.sentToday + 1 };
      }
      return acc;
    }));

    setFunnelStats(prev => ({
      ...prev,
      draftsApproved: prev.draftsApproved + 1,
      emailsSent: prev.emailsSent + 1
    }));

    try {
      confetti({
        particleCount: 75,
        spread: 60,
        origin: { y: 0.8 }
      });
    } catch {
      // safe fallback
    }

    showToast(
      'success',
      'Outreach Approved & Dispatched',
      `Personalized email sent to ${prospect.name} (${prospect.tier2Enriched.workEmail || 'verified address'}). Account rotation logged.`
    );
  };

  const importProspects = (newProspects: Prospect[], sourceName: string = 'XLS Spreadsheet') => {
    setProspects(prev => [...newProspects, ...prev]);
    if (newProspects.length > 0) {
      setSelectedProspectId(newProspects[0].id);
    }
    setFunnelStats(prev => ({
      ...prev,
      totalSourced: prev.totalSourced + newProspects.length,
      tier1Validated: prev.tier1Validated + newProspects.length,
    }));

    try {
      confetti({
        particleCount: 65,
        spread: 70,
        origin: { y: 0.6 }
      });
    } catch {
      // safe fallback
    }

    showToast(
      'success',
      `Leads Ingested from ${sourceName}`,
      `Successfully injected ${newProspects.length} verified CISO records directly into Prospect Pipeline with Tier-1 Cheap Pass active ($0).`
    );
  };

  return (
    <AppContext.Provider
      value={{
        prospects,
        selectedProspect,
        selectedProspectId,
        setSelectedProspectId,
        activeTab,
        setActiveTab,
        mode,
        setMode,
        credits,
        accounts,
        funnelStats,
        toasts,
        showToast,
        removeToast,
        unlockTier2,
        switchPersona,
        updateDraft,
        syncToGmailDraft,
        approveAndSendEmail,
        searchQuery,
        setSearchQuery,
        personaFilter,
        setPersonaFilter,
        sourceFilter,
        setSourceFilter,
        theme,
        toggleTheme,
        isDrawerOpen,
        setIsDrawerOpen,
        openDossier,
        closeDossier,
        importProspects
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};

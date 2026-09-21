import React, { useEffect, useState } from 'react';
import { useApp, type TabType } from './AppContext';
import { OnboardingContext } from './onboarding-context';
import { NAV_ITEMS, NAV_TOTAL } from '../components/layout/nav';

const STORAGE_KEY = 'aegisreach_onboarding_v1';

interface Stored {
  welcomeSeen: boolean;
  visited: TabType[];
}

const readStored = (): Stored => {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) {
      const parsed = JSON.parse(raw);
      return {
        welcomeSeen: Boolean(parsed.welcomeSeen),
        visited: Array.isArray(parsed.visited) ? parsed.visited : [],
      };
    }
  } catch {
    /* storage unavailable or corrupt: behave like a first visit */
  }
  return { welcomeSeen: false, visited: [] };
};

export const OnboardingProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { activeTab, setActiveTab } = useApp();
  const [stored, setStored] = useState<Stored>(readStored);
  const [welcomeOpen, setWelcomeOpen] = useState(() => !readStored().welcomeSeen);
  const [guideOpen, setGuideOpen] = useState(false);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(stored));
    } catch {
      /* progress simply will not persist */
    }
  }, [stored]);

  // Count a screen once the user is past the welcome and actually opens it. Derived during
  // render (guarded, so it converges after one pass) rather than synced from an effect.
  const isStep = NAV_ITEMS.some(item => item.id === activeTab);
  if (stored.welcomeSeen && isStep && !stored.visited.includes(activeTab)) {
    setStored(prev => (prev.visited.includes(activeTab) ? prev : { ...prev, visited: [...prev.visited, activeTab] }));
  }

  const closeWelcome = () => {
    setWelcomeOpen(false);
    setStored(prev => ({ ...prev, welcomeSeen: true }));
  };

  const startGuide = () => {
    closeWelcome();
    setActiveTab('icp');
  };

  const restart = () => {
    setGuideOpen(false);
    setStored({ welcomeSeen: false, visited: [] });
    setWelcomeOpen(true);
  };

  return (
    <OnboardingContext.Provider
      value={{
        visited: stored.visited,
        visitedCount: stored.visited.length,
        total: NAV_TOTAL,
        welcomeOpen,
        guideOpen,
        closeWelcome,
        startGuide,
        openGuide: () => setGuideOpen(true),
        closeGuide: () => setGuideOpen(false),
        restart,
      }}
    >
      {children}
    </OnboardingContext.Provider>
  );
};

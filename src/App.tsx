import React, { useEffect, useRef, useState } from 'react';
import { AppProvider, useApp } from './context/AppContext';
import { Header } from './components/layout/Header';
import { Sidebar } from './components/layout/Sidebar';
import { MobileNav } from './components/layout/MobileNav';
import { CommandPalette } from './components/layout/CommandPalette';
import { NAV_ITEMS } from './components/layout/nav';
import { ProspectTable } from './components/prospects/ProspectTable';
import { ProspectDrawer } from './components/prospects/ProspectDrawer';
import { IcpStudio } from './components/icp/IcpStudio';
import { PersonaMatrix } from './components/personas/PersonaMatrix';
import { ObserverReview } from './components/review/ObserverReview';
import { AccountWarmup } from './components/accounts/AccountWarmup';
import { AnalyticsFunnel } from './components/analytics/AnalyticsFunnel';
import { ToastContainer } from './components/ui/ToastContainer';
import { PageTransition } from './components/ui/motion';
import { MotionConfig } from 'motion/react';

const MainContent: React.FC = () => {
  const { activeTab } = useApp();
  const isFirstRender = useRef(true);

  // Route change: update the document title and move focus to the new page heading (WCAG 2.4.2, 2.4.3)
  useEffect(() => {
    const item = NAV_ITEMS.find(n => n.id === activeTab);
    document.title = `${item?.label ?? 'Workspace'} · AegisReach`;
    if (isFirstRender.current) {
      isFirstRender.current = false;
      return;
    }
    window.scrollTo({ top: 0 });
    const timer = window.setTimeout(() => {
      document.querySelector<HTMLElement>('#main h1')?.focus({ preventScroll: true });
    }, 50);
    return () => window.clearTimeout(timer);
  }, [activeTab]);

  return (
    <main id="main" tabIndex={-1} className="min-w-0 flex-1 px-4 py-6 focus:outline-none md:px-8 md:py-10">
      <PageTransition key={activeTab} className="mx-auto w-full max-w-[1400px]">
        {activeTab === 'prospects' && <ProspectTable />}
        {activeTab === 'icp' && <IcpStudio />}
        {activeTab === 'personas' && <PersonaMatrix />}
        {activeTab === 'review' && <ObserverReview />}
        {activeTab === 'accounts' && <AccountWarmup />}
        {activeTab === 'analytics' && <AnalyticsFunnel />}
      </PageTransition>
    </main>
  );
};

const Shell: React.FC = () => {
  const [navOpen, setNavOpen] = useState(false);
  const [paletteOpen, setPaletteOpen] = useState(false);

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if ((event.ctrlKey || event.metaKey) && event.key.toLowerCase() === 'k') {
        event.preventDefault();
        setPaletteOpen(open => !open);
      }
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, []);

  return (
    <div className="flex min-h-[100dvh] flex-col bg-background font-sans text-foreground">
      <a href="#main" className="skip-link">
        Skip to main content
      </a>
      <Header onOpenNav={() => setNavOpen(true)} onOpenPalette={() => setPaletteOpen(true)} />
      <div className="flex flex-1">
        <Sidebar />
        <MainContent />
      </div>
      <MobileNav open={navOpen} onClose={() => setNavOpen(false)} />
      <CommandPalette open={paletteOpen} onClose={() => setPaletteOpen(false)} />
      <ProspectDrawer />
      <ToastContainer />
    </div>
  );
};

export function App() {
  return (
    <AppProvider>
      <MotionConfig reducedMotion="user">
        <Shell />
      </MotionConfig>
    </AppProvider>
  );
}

export default App;

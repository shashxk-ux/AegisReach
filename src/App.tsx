import React from 'react';
import { AppProvider, useApp } from './context/AppContext';
import { Header } from './components/layout/Header';
import { Sidebar } from './components/layout/Sidebar';
import { ProspectTable } from './components/prospects/ProspectTable';
import { ProspectDrawer } from './components/prospects/ProspectDrawer';
import { IcpStudio } from './components/icp/IcpStudio';
import { PersonaMatrix } from './components/personas/PersonaMatrix';
import { ObserverReview } from './components/review/ObserverReview';
import { AccountWarmup } from './components/accounts/AccountWarmup';
import { AnalyticsFunnel } from './components/analytics/AnalyticsFunnel';
import { ToastContainer } from './components/ui/ToastContainer';

const MainContent: React.FC = () => {
  const { activeTab } = useApp();

  return (
    <main className="flex-1 p-6 overflow-y-auto max-h-[calc(100vh-4rem)]">
      {activeTab === 'prospects' && <ProspectTable />}
      {activeTab === 'icp' && <IcpStudio />}
      {activeTab === 'personas' && <PersonaMatrix />}
      {activeTab === 'review' && <ObserverReview />}
      {activeTab === 'accounts' && <AccountWarmup />}
      {activeTab === 'analytics' && <AnalyticsFunnel />}
    </main>
  );
};

export function App() {
  return (
    <AppProvider>
      <div className="min-h-screen bg-slate-100 dark:bg-slate-950 text-slate-900 dark:text-slate-100 flex flex-col font-sans selection:bg-cyan-500/30 selection:text-cyan-200 transition-colors duration-200">
        <Header />
        <div className="flex flex-1 overflow-hidden">
          <Sidebar />
          <MainContent />
        </div>
        <ProspectDrawer />
        <ToastContainer />
      </div>
    </AppProvider>
  );
}

export default App;

import React, { useEffect, useRef } from 'react';
import { ArrowRight, BookOpen, Check, Eye, RotateCcw, X } from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { useOnboarding } from '../../context/use-onboarding';
import { Badge, Button, Dialog } from '../ui';
import { Bar } from '../ui/motion';
import { NAV_ITEMS, NAV_TOTAL } from './nav';

/** Header entry point: always reachable, shows how far along the user is. */
export const GuideButton: React.FC = () => {
  const { openGuide, visitedCount, total } = useOnboarding();
  return (
    <Button
      variant="outline"
      size="sm"
      onClick={openGuide}
      aria-haspopup="dialog"
      aria-label={`Open the getting started guide, ${visitedCount} of ${total} steps visited`}
      className="gap-2"
    >
      <BookOpen className="h-4 w-4 text-brand" aria-hidden="true" />
      <span className="hidden lg:inline">Guide</span>
      <span className="rounded-md bg-secondary px-1.5 font-mono text-xs text-secondary-foreground">
        {visitedCount}/{total}
      </span>
    </Button>
  );
};

/** Shown once, on the very first visit. Explains the app before the user has to figure it out. */
export const WelcomeDialog: React.FC = () => {
  const { welcomeOpen, closeWelcome, startGuide } = useOnboarding();
  const startRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!welcomeOpen) return;
    const timer = window.setTimeout(() => startRef.current?.focus({ preventScroll: true }), 80);
    return () => window.clearTimeout(timer);
  }, [welcomeOpen]);

  return (
    <Dialog open={welcomeOpen} onClose={closeWelcome} label="Welcome to AegisReach" variant="modal" className="max-w-xl">
      <div className="space-y-6 p-6 md:p-8">
        <div className="space-y-2">
          <p className="text-xs font-medium uppercase tracking-[0.14em] text-muted-foreground">Welcome to AegisReach</p>
          <h2 className="text-2xl font-semibold tracking-tight text-foreground">Your first outreach in six steps</h2>
          <p className="text-sm leading-relaxed text-muted-foreground">
            AegisReach finds security leaders whose companies run exposed technology, writes a personal email about the exact
            vulnerability, and lets you review everything before anything is sent.
          </p>
        </div>

        <ol className="space-y-2.5">
          {NAV_ITEMS.map(item => (
            <li key={item.id} className="flex items-center gap-3.5">
              <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-border bg-muted font-mono text-sm font-semibold text-foreground">
                {item.step}
              </span>
              <span className="min-w-0">
                <span className="block text-sm font-medium text-foreground">{item.guideTitle}</span>
                <span className="block text-sm text-muted-foreground">{item.description}</span>
              </span>
            </li>
          ))}
        </ol>

        <p className="flex items-start gap-2.5 rounded-xl border border-border bg-muted/50 p-3.5 text-sm text-muted-foreground">
          <Eye className="mt-0.5 h-4 w-4 shrink-0 text-brand" aria-hidden="true" />
          <span>
            You begin in <strong className="font-semibold text-foreground">Observer mode</strong>: emails are saved as Gmail drafts
            and are never sent without your approval. You can reopen this guide any time from the Guide button.
          </span>
        </p>

        <div className="flex flex-wrap justify-end gap-2.5">
          <Button variant="ghost" onClick={closeWelcome} className="text-muted-foreground">
            Skip for now
          </Button>
          <Button ref={startRef} variant="cyan" onClick={startGuide}>
            Start with step 1
            <ArrowRight className="h-4 w-4" aria-hidden="true" />
          </Button>
        </div>
      </div>
    </Dialog>
  );
};

/** The full checklist, opened from the header or the command palette. */
export const GuideDrawer: React.FC = () => {
  const { guideOpen, closeGuide, visited, visitedCount, total, restart } = useOnboarding();
  const { activeTab, setActiveTab } = useApp();
  const percent = Math.round((visitedCount / total) * 100);

  return (
    <Dialog open={guideOpen} onClose={closeGuide} label="Getting started guide" variant="drawer" className="max-w-lg">
      <div className="flex h-full flex-col">
        <div className="shrink-0 space-y-4 border-b border-border p-6">
          <div className="flex items-start justify-between gap-4">
            <div className="space-y-1">
              <h2 className="flex items-center gap-2 text-xl font-semibold tracking-tight text-foreground">
                <BookOpen className="h-5 w-5 text-brand" aria-hidden="true" />
                Getting started
              </h2>
              <p className="text-sm text-muted-foreground">Six steps from choosing an audience to tracking your first replies.</p>
            </div>
            <Button variant="ghost" size="icon" onClick={closeGuide} aria-label="Close guide" className="shrink-0">
              <X className="h-5 w-5" aria-hidden="true" />
            </Button>
          </div>

          <div className="space-y-2">
            <div className="flex items-baseline justify-between text-sm">
              <span id="guide-progress-label" className="text-muted-foreground">
                Steps visited
              </span>
              <span className="font-mono font-medium text-foreground">
                {visitedCount} of {total}
              </span>
            </div>
            <div
              role="progressbar"
              aria-labelledby="guide-progress-label"
              aria-valuemin={0}
              aria-valuemax={total}
              aria-valuenow={visitedCount}
              aria-valuetext={`${visitedCount} of ${total} steps visited, ${percent} percent`}
              className="h-2.5 overflow-hidden rounded-full border border-border bg-muted"
            >
              <Bar percent={percent} className="h-full rounded-full bg-brand" />
            </div>
          </div>
        </div>

        <div role="region" aria-label="Steps" tabIndex={0} className="flex-1 overflow-y-auto p-6">
          <ol className="space-y-3">
            {NAV_ITEMS.map(item => {
              const done = visited.includes(item.id);
              const current = activeTab === item.id;
              return (
                <li
                  key={item.id}
                  className={`rounded-2xl border p-4 transition-colors ${current ? 'border-brand bg-accent' : 'border-border bg-card'}`}
                >
                  <div className="flex gap-3.5">
                    <span
                      className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full border font-mono text-sm font-semibold ${
                        done ? 'border-success/40 bg-success/10 text-success' : 'border-border bg-muted text-foreground'
                      }`}
                    >
                      {done ? <Check className="h-4 w-4" aria-hidden="true" /> : item.step}
                    </span>
                    <div className="min-w-0 flex-1 space-y-2">
                      <div className="flex flex-wrap items-center gap-x-2 gap-y-1">
                        <h3 className="text-sm font-semibold text-foreground">
                          Step {item.step}: {item.guideTitle}
                        </h3>
                        {done && <span className="text-xs font-medium text-success">Visited</span>}
                        {current && <Badge variant="cyan">You are here</Badge>}
                      </div>
                      <p className="text-sm leading-relaxed text-muted-foreground">{item.guideBody}</p>
                      <Button
                        variant={current ? 'outline' : 'cyan'}
                        size="sm"
                        onClick={() => {
                          setActiveTab(item.id);
                          closeGuide();
                        }}
                        aria-label={`${current ? 'Stay on' : 'Go to'} step ${item.step}: ${item.label}`}
                      >
                        {current ? 'Continue here' : `Go to ${item.label}`}
                        {!current && <ArrowRight className="h-4 w-4" aria-hidden="true" />}
                      </Button>
                    </div>
                  </div>
                </li>
              );
            })}
          </ol>
        </div>

        <div className="flex shrink-0 items-center justify-between gap-3 border-t border-border p-5">
          <p className="text-sm text-muted-foreground">Your progress is saved in this browser.</p>
          <Button variant="ghost" size="sm" onClick={restart} className="text-muted-foreground">
            <RotateCcw className="h-4 w-4" aria-hidden="true" />
            Restart walkthrough
          </Button>
        </div>
      </div>
    </Dialog>
  );
};

/** Sits under every workflow screen so the user always knows what comes next. */
export const NextStepBar: React.FC = () => {
  const { activeTab, setActiveTab } = useApp();
  const { openGuide } = useOnboarding();
  const index = NAV_ITEMS.findIndex(item => item.id === activeTab);
  if (index < 0) return null;
  const next = NAV_ITEMS[index + 1];

  return (
    <aside aria-label="Next step" className="mx-auto mt-14 w-full max-w-[1400px] border-t border-border pt-6">
      {next ? (
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div className="space-y-1">
            <p className="text-xs font-medium uppercase tracking-[0.14em] text-muted-foreground">
              Next step &middot; {next.step} of {NAV_TOTAL}
            </p>
            <p className="text-base font-semibold text-foreground">{next.guideTitle}</p>
            <p className="max-w-xl text-sm text-muted-foreground">{next.description}</p>
          </div>
          <Button variant="cyan" onClick={() => setActiveTab(next.id)}>
            Continue to step {next.step}
            <ArrowRight className="h-4 w-4" aria-hidden="true" />
          </Button>
        </div>
      ) : (
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div className="space-y-1">
            <p className="text-xs font-medium uppercase tracking-[0.14em] text-muted-foreground">You reached the last step</p>
            <p className="max-w-xl text-sm text-muted-foreground">
              That is the whole workflow. Come back to any step from the sidebar, or open the guide to revisit them in order.
            </p>
          </div>
          <Button variant="outline" onClick={openGuide} aria-haspopup="dialog">
            <BookOpen className="h-4 w-4" aria-hidden="true" />
            Open the guide
          </Button>
        </div>
      )}
    </aside>
  );
};

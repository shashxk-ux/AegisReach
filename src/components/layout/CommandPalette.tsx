import React, { useMemo, useState } from 'react';
import { BookOpen, CornerDownLeft, Eye, Moon, Search, Sun, Zap, type LucideIcon } from 'lucide-react';
import { Dialog } from '../ui';
import { useApp } from '../../context/AppContext';
import { useOnboarding } from '../../context/use-onboarding';
import { NAV_ITEMS } from './nav';
import { AutoHeight } from '../ui/motion';

interface Command {
  id: string;
  label: string;
  hint: string;
  group: 'Go to' | 'Actions';
  icon: LucideIcon;
  run: () => void;
}

interface CommandPaletteProps {
  open: boolean;
  onClose: () => void;
}

export const CommandPalette: React.FC<CommandPaletteProps> = ({ open, onClose }) => (
  <Dialog open={open} onClose={onClose} label="Command palette" variant="palette">
    <PaletteBody onClose={onClose} />
  </Dialog>
);

const PaletteBody: React.FC<{ onClose: () => void }> = ({ onClose }) => {
  const { setActiveTab, setMode, showToast, theme, toggleTheme } = useApp();
  const { openGuide } = useOnboarding();
  const [query, setQuery] = useState('');
  const [active, setActive] = useState(0);

  const commands = useMemo<Command[]>(
    () => [
      ...NAV_ITEMS.map<Command>(item => ({
        id: `go-${item.id}`,
        label: item.label,
        hint: `Step ${item.step} · ${item.description}`,
        group: 'Go to',
        icon: item.icon,
        run: () => setActiveTab(item.id),
      })),
      {
        id: 'mode-observer',
        label: 'Switch to Observer mode',
        hint: 'Drafts only, human review before anything sends',
        group: 'Actions',
        icon: Eye,
        run: () => {
          setMode('observer');
          showToast('info', 'Observer Mode Activated', 'Outreach generated as Gmail drafts only. Human review required before sending.');
        },
      },
      {
        id: 'mode-autopilot',
        label: 'Switch to Autopilot mode',
        hint: 'Sends automatically on persona triggers',
        group: 'Actions',
        icon: Zap,
        run: () => {
          setMode('autopilot');
          showToast('warning', 'Autopilot Mode Activated', 'Outreach will be scheduled and dispatched automatically based on persona triggers & warmup pacing.');
        },
      },
      {
        id: 'guide',
        label: 'Open the getting started guide',
        hint: 'Six steps from choosing an audience to your first reply',
        group: 'Actions',
        icon: BookOpen,
        run: openGuide,
      },
      {
        id: 'theme',
        label: theme === 'dark' ? 'Switch to light theme' : 'Switch to dark theme',
        hint: 'Change the color theme',
        group: 'Actions',
        icon: theme === 'dark' ? Sun : Moon,
        run: toggleTheme,
      },
    ],
    [setActiveTab, setMode, showToast, theme, toggleTheme, openGuide]
  );

  const results = commands.filter(c => {
    const q = query.trim().toLowerCase();
    return !q || `${c.label} ${c.hint}`.toLowerCase().includes(q);
  });
  const current = Math.min(active, Math.max(results.length - 1, 0));

  const execute = (command: Command | undefined) => {
    if (!command) return;
    command.run();
    onClose();
  };

  const onKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'ArrowDown') {
      event.preventDefault();
      setActive(results.length ? (current + 1) % results.length : 0);
    } else if (event.key === 'ArrowUp') {
      event.preventDefault();
      setActive(results.length ? (current - 1 + results.length) % results.length : 0);
    } else if (event.key === 'Enter') {
      event.preventDefault();
      execute(results[current]);
    }
  };

  return (
    <div>
      <div className="flex items-center gap-3 border-b border-border px-4">
        <Search className="h-4 w-4 shrink-0 text-muted-foreground" aria-hidden="true" />
        <input
          type="text"
          role="combobox"
          aria-label="Search screens and actions"
          aria-expanded="true"
          aria-controls="command-list"
          aria-autocomplete="list"
          aria-activedescendant={results[current] ? `cmd-${results[current].id}` : undefined}
          value={query}
          onChange={e => {
            setQuery(e.target.value);
            setActive(0);
          }}
          onKeyDown={onKeyDown}
          placeholder="Jump to a screen or run an action"
          className="h-14 w-full bg-transparent text-base text-foreground placeholder:text-muted-foreground focus:outline-none"
        />
        <kbd className="hidden rounded-md border border-border bg-muted px-1.5 py-0.5 font-mono text-xs text-muted-foreground sm:block">
          Esc
        </kbd>
      </div>

      <p role="status" className="sr-only-live">
        {results.length} {results.length === 1 ? 'result' : 'results'}
      </p>

      <AutoHeight>
      {results.length === 0 ? (
        <p className="px-4 py-10 text-center text-sm text-muted-foreground">
          Nothing matches &ldquo;{query}&rdquo;. Try a screen name like &ldquo;review&rdquo; or &ldquo;warmup&rdquo;.
        </p>
      ) : (
        <ul id="command-list" role="listbox" aria-label="Results" className="max-h-[50dvh] overflow-y-auto p-2">
          {results.map((command, index) => {
            const Icon = command.icon;
            const isActive = index === current;
            const showGroup = index === 0 || results[index - 1].group !== command.group;
            return (
              <React.Fragment key={command.id}>
                {showGroup && (
                  <li role="presentation" className="px-3 pb-1 pt-3 text-xs font-medium uppercase tracking-[0.14em] text-muted-foreground">
                    {command.group}
                  </li>
                )}
                <li
                  id={`cmd-${command.id}`}
                  role="option"
                  aria-selected={isActive}
                  onMouseMove={() => setActive(index)}
                  onClick={() => execute(command)}
                  className={`flex cursor-pointer items-center gap-3 rounded-xl px-3 py-2.5 ${
                    isActive ? 'border border-brand/40 bg-accent text-accent-foreground' : 'border border-transparent text-foreground'
                  }`}
                >
                  <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg border border-border bg-card">
                    <Icon className="h-4 w-4" aria-hidden="true" />
                  </span>
                  <span className="min-w-0 flex-1">
                    <span className="block truncate text-sm font-medium">{command.label}</span>
                    <span className={`block truncate text-xs ${isActive ? 'text-accent-foreground' : 'text-muted-foreground'}`}>
                      {command.hint}
                    </span>
                  </span>
                  {isActive && <CornerDownLeft className="h-4 w-4 shrink-0" aria-hidden="true" />}
                </li>
              </React.Fragment>
            );
          })}
        </ul>
      )}
      </AutoHeight>
    </div>
  );
};

import { createContext } from 'react';
import type { TabType } from './AppContext';

export interface OnboardingValue {
  /** Screens the user has opened since finishing the welcome */
  visited: TabType[];
  visitedCount: number;
  total: number;
  welcomeOpen: boolean;
  guideOpen: boolean;
  closeWelcome: () => void;
  /** Dismiss the welcome and jump to step 1 */
  startGuide: () => void;
  openGuide: () => void;
  closeGuide: () => void;
  /** Clear progress and show the welcome again */
  restart: () => void;
}

export const OnboardingContext = createContext<OnboardingValue | null>(null);

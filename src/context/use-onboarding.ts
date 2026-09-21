import { useContext } from 'react';
import { OnboardingContext, type OnboardingValue } from './onboarding-context';

export const useOnboarding = (): OnboardingValue => {
  const value = useContext(OnboardingContext);
  if (!value) throw new Error('useOnboarding must be used within an OnboardingProvider');
  return value;
};

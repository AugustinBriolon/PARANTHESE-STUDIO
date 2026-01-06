import usePerformanceHook from '@/hooks/usePerformance';
import { createContext, ReactNode, useContext } from 'react';

const PerformanceContext = createContext<ReturnType<typeof usePerformanceHook> | null>(null);

export const PerformanceProvider = ({ children }: { children: ReactNode }) => {
  const performance = usePerformanceHook();
  return <PerformanceContext.Provider value={performance}>{children}</PerformanceContext.Provider>;
};

export const usePerformance = () => {
  const ctx = useContext(PerformanceContext);
  if (!ctx) throw new Error('usePerformance must be used within a PerformanceProvider');
  return ctx;
};

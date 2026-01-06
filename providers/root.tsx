import { ReactNode } from 'react';
import { PerformanceProvider } from './performance.provider';
import { QueryProvider } from './query.provider';
import { SmoothScrollProvider } from './smooth-scroll.provider';
import ScreenLoader from '@/components/layout/screen-loader';
import { useIsScreenLoader } from '@/hooks/useIsScreenLoader';

export const AppProvider = ({ children }: { children: ReactNode }) => {
  const isScreenLoader = useIsScreenLoader();

  return (
    <QueryProvider>
      <PerformanceProvider>
        {isScreenLoader && <ScreenLoader />}
        <SmoothScrollProvider>{children}</SmoothScrollProvider>
      </PerformanceProvider>
    </QueryProvider>
  );
};

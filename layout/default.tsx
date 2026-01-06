import Cursor from '@/components/ui/cursor';
import PerformanceIndicator from '@/components/ui/performance-indicator';
import SEO from '@/components/ui/SEO';
import { useEnvironment } from '@/hooks/useEnvironment';
import { usePerformance } from '@/providers/performance.provider';
import { gsap } from 'gsap';
import DrawSVGPlugin from 'gsap/dist/DrawSVGPlugin';
import MorphSVGPlugin from 'gsap/dist/MorphSVGPlugin';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { SplitText } from 'gsap/SplitText';
import { ReactNode, useEffect } from 'react';

gsap.registerPlugin(ScrollTrigger, SplitText, MorphSVGPlugin, DrawSVGPlugin);

const Layout = ({ children }: { children: ReactNode }) => {
  const { isProd } = useEnvironment();
  const { isLoading } = usePerformance();

  useEffect(() => {
    setTimeout(() => {
      ScrollTrigger.refresh();
    }, 100);
  }, [isLoading]);

  return (
    <>
      <SEO />
      <Cursor />
      <div className="relative mx-auto h-dvh max-h-[1920px] w-screen max-w-[1920px] bg-transparent p-2 md:p-4 lg:p-6">
        <div className="flex h-full w-full flex-col justify-between rounded-2xl bg-white p-4 md:p-6 lg:p-8">
          {children}
        </div>
      </div>
      {!isProd && <PerformanceIndicator />}
    </>
  );
};

export default Layout;

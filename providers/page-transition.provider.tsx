import PageTransition from '@/components/layout/page-transition';
import { AnimatePresence } from 'framer-motion';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { usePathname } from 'next/navigation';
import { ReactNode } from 'react';

export const PageTransitionProvider = ({ children }: { children: ReactNode }) => {
  const pathname = usePathname();

  return (
    <AnimatePresence
      mode="wait"
      onExitComplete={() => {
        setTimeout(() => {
          window.scrollTo(0, 0);
          ScrollTrigger.refresh();
        }, 100);
      }}
    >
      <PageTransition key={pathname}>{children}</PageTransition>
    </AnimatePresence>
  );
};

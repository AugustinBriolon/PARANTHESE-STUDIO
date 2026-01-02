import { usePerformance } from '@/providers/performance.provider';
import { motion, Variants } from 'framer-motion';
import { ReactNode } from 'react';

export default function PageTransition({ children }: { children: ReactNode }) {
  const { isLoading } = usePerformance();

  const circleVariants: Variants = {
    initial: {
      width: 0,
      height: 0,
    },
    enter: {
      width: '150vmax',
      height: '150vmax',
      transition: {
        duration: 1,
        ease: [0.72, 0, 0.3, 0.99],
      },
    },
    exit: {
      width: 0,
      height: 0,
      transition: {
        duration: 1,
        ease: [0.72, 0, 0.3, 0.99],
      },
    },
  };

  const anim = (variants: Variants) => {
    return {
      initial: 'initial',
      animate: isLoading ? 'initial' : 'enter',
      exit: 'exit',
      variants,
    };
  };

  return (
    <>
      <motion.div
        className="pointer-events-none fixed top-1/2 left-1/2 z-50 h-[150vmax] w-[150vmax] -translate-x-1/2 -translate-y-1/2 rounded-full shadow-[0_0_0_99999px_#0E0E0E] will-change-[width,height]"
        id="main"
        {...anim(circleVariants)}
      />

      {children}
    </>
  );
}

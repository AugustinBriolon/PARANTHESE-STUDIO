import { useIsScreenLoader } from '@/hooks/useIsScreenLoader';
import { usePerformance } from '@/providers/performance.provider';
import { motion, Variants } from 'framer-motion';
import { ReactNode } from 'react';

export default function PageTransition({ children }: { children: ReactNode }) {
  const { isLoading } = usePerformance();
  const isScreenLoader = useIsScreenLoader();

  const firstBlockVariants: Variants = {
    initial: {
      y: 0,
    },

    enter: {
      y: '-100%',

      transition: {
        duration: 0.8,
        ease: [0.72, 0, 0.3, 0.99],
      },

      transitionEnd: { scaleY: 0, y: '0' },
    },

    exit: {
      scaleY: 1,

      transition: {
        duration: 0.8,
        ease: [0.72, 0, 0.3, 0.99],
      },
    },
  };

  const anim = (variants: Variants) => {
    return {
      initial: 'initial',
      animate: isLoading && !isScreenLoader ? 'initial' : 'enter',
      exit: 'exit',
      variants,
    };
  };

  return (
    <>
      <motion.div
        className="bg-red pointer-events-none fixed top-0 left-0 z-800 h-full w-full origin-bottom"
        {...anim(firstBlockVariants)}
      />
      {children}
    </>
  );
}

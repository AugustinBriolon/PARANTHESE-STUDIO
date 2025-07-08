import { useIsScreenLoader } from '@/hooks/useIsScreenLoader';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import React, { useRef } from 'react';
import { timeToLoad } from '../layout/ScreenLoader';

const AnimatedWord = ({
  children,
  delay = 0,
}: {
  children: React.ReactNode;
  delay?: number;
  href?: string;
}) => {
  const isScreenLoader = useIsScreenLoader();
  const spanRef = useRef(null);

  useGSAP(() => {
    gsap.from(spanRef.current, {
      delay: isScreenLoader ? timeToLoad + delay : delay,
      y: 100,
      scaleY: 0.5,
      duration: 1.5,
      ease: 'power2.out',
    });
  });

  return (
    <div className="overflow-hidden">
      <h2 ref={spanRef} className="inline-block will-change-transform">
        {children}
      </h2>
    </div>
  );
};

export default function AnimatedTitle() {
  return (
    <div className="flex h-full items-center justify-start">
      <div>
        <AnimatedWord>Creative Studio</AnimatedWord>
        <AnimatedWord delay={0.2}>Building not just websites</AnimatedWord>
        <AnimatedWord delay={0.3}>Based in Paris</AnimatedWord>
        <AnimatedWord delay={0.4}>
          <a
            className="group relative pb-1 text-xs md:text-lg"
            href="https://august1.dev/"
            target="_blank"
          >
            By Augustin Briolon
            <div className="absolute bottom-0 left-0 h-px w-full origin-left scale-x-0 rounded-full bg-black transition-all duration-300 will-change-transform group-hover:scale-x-100"></div>
          </a>
        </AnimatedWord>
        <h2 className="sr-only">PARANTHESE STUDIO</h2>
      </div>
    </div>
  );
}

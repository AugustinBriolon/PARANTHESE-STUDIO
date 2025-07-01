import React from 'react';
import { useIsScreenLoader } from '@/hooks/useIsScreenLoader';
import { useGSAP } from '@gsap/react';
import { useRef } from 'react';
import gsap from 'gsap';

const AnimatedWord = ({ text, delay = 0 }: { text: React.ReactNode; delay?: number }) => {
  const isScreenLoader = useIsScreenLoader();
  const spanRef = useRef(null);

  useGSAP(() => {
    gsap.from(spanRef.current, {
      delay: isScreenLoader ? 7 + delay : delay,
      y: 100,
      duration: 1.8,
      ease: 'power2.inOut',
    });
  });

  return (
    <div className="overflow-hidden">
      <h2 ref={spanRef} className="inline-block will-change-transform">
        {text}
      </h2>
    </div>
  );
};

export default function AnimatedTitle() {
  return (
    <div className="flex h-full items-center justify-start">
      <div>
        <AnimatedWord text="Creative Studio" />
        <AnimatedWord delay={0.1} text="Building not just websites" />
        <AnimatedWord delay={0.2} text="Based in Paris" />
        <h2 className="sr-only">PARANTHESE STUDIO</h2>
      </div>
    </div>
  );
}

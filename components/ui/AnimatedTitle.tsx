import React from 'react';
import { useIsScreenLoader } from '@/hooks/useIsScreenLoader';
import { useGSAP } from '@gsap/react';
import { useRef } from 'react';
import gsap from 'gsap';

const AnimatedWord = ({ text, delay = 0 }: { text: React.ReactNode; delay?: number }) => {
  const isScreenLoader = useIsScreenLoader();
  const spanRef = useRef<HTMLSpanElement>(null);

  useGSAP(() => {
    gsap.from(spanRef.current, {
      delay: isScreenLoader ? 7 + delay : delay,
      // delay: delay,
      y: 100,
      duration: 1.8,
      ease: 'power2.inOut',
    });
  });

  return (
    <div className="overflow-hidden">
      <span ref={spanRef} className="inline-block will-change-transform">
        {text}
      </span>
    </div>
  );
};

export default function AnimatedTitle() {
  return (
    <div className="flex h-full items-center justify-start">
      <h2>
        <AnimatedWord text="Creative Studio" />
        <AnimatedWord delay={0.1} text="Building not just websites" />
        <AnimatedWord delay={0.2} text="Based in Paris" />
      </h2>
    </div>
  );
}

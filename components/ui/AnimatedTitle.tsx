import React from 'react';
import { useIsScreenLoader } from '@/hooks/useIsScreenLoader';
import { useGSAP } from '@gsap/react';
import { useRef } from 'react';
import gsap from 'gsap';

const AnimatedWord = ({
  text,
  delay = 0,
  href,
}: {
  text: React.ReactNode;
  delay?: number;
  href?: string;
}) => {
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

  if (href) {
    return (
      <div className="overflow-hidden">
        <a
          ref={spanRef}
          className="group relative inline-block text-xs will-change-transform md:text-lg"
          href={href}
          target="_blank"
        >
          {text}
          <div className="absolute bottom-0 left-0 h-px w-full origin-left scale-x-0 rounded-full bg-black transition-all duration-300 will-change-transform group-hover:scale-x-100"></div>
        </a>
      </div>
    );
  }

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
        <AnimatedWord delay={0.3} href="https://august1.dev/" text="By Augustin Briolon" />
        <h2 className="sr-only">PARANTHESE STUDIO</h2>
      </div>
    </div>
  );
}

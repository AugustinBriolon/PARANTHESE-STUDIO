import { useIsScreenLoader } from '@/hooks/useIsScreenLoader';
import { useGSAP } from '@gsap/react';
import React, { useRef } from 'react';
import { timeToLoad } from '../layout/ScreenLoader';
import gsap from 'gsap';
import SplitText from 'gsap/dist/SplitText';
import { useFontReady } from '@/hooks/useFontReady';

gsap.registerPlugin(SplitText);

export default function AnimatedWord({
  children,
  delay = 0,
}: {
  children: React.ReactNode;
  delay?: number;
  href?: string;
}) {
  const isScreenLoader = useIsScreenLoader();
  const isFontReady = useFontReady();
  const spanRef = useRef(null);

  useGSAP(() => {
    if (!isFontReady) return;

    const split = SplitText.create(spanRef.current, {
      type: 'words',
      mask: 'words',
    });

    gsap.from(split.words, {
      delay: isScreenLoader ? timeToLoad + delay : delay,
      yPercent: 100,
      scaleY: 0.8,
      stagger: 0.03,
      duration: 1,
      ease: 'power4.out',
    });
  }, [isFontReady]);

  return (
    <div className="overflow-hidden">
      <h2 ref={spanRef} className="inline-block will-change-transform">
        {children}
      </h2>
    </div>
  );
}

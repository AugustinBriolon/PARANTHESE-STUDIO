import gsap from 'gsap';
import ReactLenis, { LenisRef } from 'lenis/react';
import { ReactNode, useEffect, useRef } from 'react';

export const SmoothScrollProvider = ({ children }: { children: ReactNode }) => {
  const lenisRef = useRef<LenisRef>(null);

  useEffect(() => {
    const update = (time: number) => {
      lenisRef.current?.lenis?.raf(time * 1000);
    };

    gsap.ticker.add(update);

    return () => gsap.ticker.remove(update);
  }, []);

  return (
    <ReactLenis ref={lenisRef} options={{ autoRaf: false, gestureOrientation: 'vertical' }} root>
      {children}
    </ReactLenis>
  );
};

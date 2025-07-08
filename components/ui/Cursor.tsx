import { useIsScreenLoader } from '@/hooks/useIsScreenLoader';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { useEffect, useRef, useState } from 'react';
import { timeToLoad } from '../layout/ScreenLoader';

export default function Cursor() {
  const circleRef = useRef<HTMLDivElement>(null);
  const [isMobile, setIsMobile] = useState(false);
  const isScreenLoader = useIsScreenLoader();
  const CIRCLE_SIZE = 12;

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  useGSAP(() => {
    if (isMobile) return;
    gsap.set(circleRef.current, { scale: 0, delay: isScreenLoader ? timeToLoad : 0 });
    const handleMouseMove = (e: MouseEvent) => {
      const x = e.clientX - CIRCLE_SIZE / 2;
      const y = e.clientY - CIRCLE_SIZE / 2;
      gsap.to(circleRef.current, {
        x,
        y,
        scale: 1,
        duration: 0.6,
        ease: 'power2.out',
      });
    };
    const handleDown = () => {
      gsap.to(circleRef.current, { scale: 1.5, duration: 0.18, ease: 'power2.out' });
    };
    const handleUp = () => {
      gsap.to(circleRef.current, { scale: 1, duration: 0.18, ease: 'power2.out' });
    };
    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mousedown', handleDown);
    window.addEventListener('mouseup', handleUp);
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mousedown', handleDown);
      window.removeEventListener('mouseup', handleUp);
    };
  }, [isMobile]);

  if (isMobile) return null;

  return (
    <div
      ref={circleRef}
      className="pointer-events-none fixed top-0 left-0 z-[9999] h-3 w-3 rounded-full border-2 border-white bg-black will-change-transform"
    />
  );
}

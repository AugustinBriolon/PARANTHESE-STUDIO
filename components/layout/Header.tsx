import { useIsScreenLoader } from '@/hooks/useIsScreenLoader';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import Image from 'next/image';
import { useRef } from 'react';
import { timeToLoad } from './ScreenLoader';

export default function Header() {
  const isScreenLoader = useIsScreenLoader();
  const logoRef = useRef(null);
  const backgroundRef = useRef(null);

  useGSAP(() => {
    gsap
      .timeline()
      .from(logoRef.current, {
        delay: isScreenLoader ? timeToLoad : 0,
        scaleY: 0.8,
        duration: 1.5,
        ease: 'power2.out',
      })
      .to(
        backgroundRef.current,
        {
          yPercent: -100,
          duration: 1,
          ease: 'power2.out',
        },
        '<',
      );
  }, []);

  return (
    <div className="relative min-h-fit w-full overflow-hidden">
      <Image
        ref={logoRef}
        alt="PARANTHESE STUDIO logo"
        className="mx-auto max-h-60 w-full origin-top will-change-transform select-none"
        draggable={false}
        height={100}
        src="/images/logo.svg"
        width={100}
        priority
      />
      <div ref={backgroundRef} className="absolute inset-0 bg-white"></div>
      <h1 className="sr-only">PARANTHESE STUDIO</h1>
      <p className="sr-only">
        Paranthese Studio is a creative studio based in Paris. We design custom, animated and
        innovative websites that combine design, technology and storytelling.
      </p>
    </div>
  );
}

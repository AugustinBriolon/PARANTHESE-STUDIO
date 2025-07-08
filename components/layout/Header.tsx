import { useIsScreenLoader } from '@/hooks/useIsScreenLoader';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import Image from 'next/image';
import { useRef } from 'react';
import { timeToLoad } from './ScreenLoader';

export default function Header() {
  const isScreenLoader = useIsScreenLoader();
  const logoRef = useRef(null);

  useGSAP(() => {
    gsap.from(logoRef.current, {
      delay: isScreenLoader ? timeToLoad : 0,
      filter: 'blur(10px)',
      scaleY: 0.8,
      y: -150,
      duration: 1.5,
      ease: 'power2.out',
    });
  }, []);

  return (
    <div className="min-h-fit w-full">
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
      <h1 className="sr-only">PARANTHESE STUDIO</h1>
      <p className="sr-only">
        Paranthese Studio is a creative studio based in Paris. We design custom, animated and
        innovative websites that combine design, technology and storytelling.
      </p>
    </div>
  );
}

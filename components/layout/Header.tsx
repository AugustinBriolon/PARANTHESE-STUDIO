import { useIsScreenLoader } from '@/hooks/useIsScreenLoader';
import { useGSAP } from '@gsap/react';
import Image from 'next/image';
import { useRef } from 'react';
import gsap from 'gsap';

export default function Header() {
  const isScreenLoader = useIsScreenLoader();
  const logoRef = useRef(null);

  useGSAP(() => {
    gsap.timeline().from(logoRef.current, {
      delay: isScreenLoader ? 7 : 0,
      opacity: 0,
      y: -50,
      duration: 1.5,
      ease: 'power2.out',
    });
  }, []);

  return (
    <div className="w-full">
      <Image
        ref={logoRef}
        alt="logo"
        className="w-full select-none"
        draggable={false}
        height={100}
        src="/images/logo.svg"
        width={100}
        priority
      />
    </div>
  );
}

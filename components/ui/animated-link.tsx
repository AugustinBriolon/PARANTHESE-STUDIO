import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import Link from 'next/link';
import { useRef } from 'react';

interface AnimatedLinkProps {
  href: string;
  children: string;
  className?: string;
  isJoinUs?: boolean;
}

const AnimatedLink = ({ href, children, className = '', isJoinUs = false }: AnimatedLinkProps) => {
  const linkRef = useRef<HTMLAnchorElement>(null);
  const pathRef = useRef(null);
  const { contextSafe } = useGSAP({ scope: linkRef });

  const ARROW_PATH = 'm9 18 6-6-6-6';
  const PLUS_PATH = 'M5 12h14M12 5v14';

  const getText = (text: string, isTop = false) => {
    return text.split('').map((char, index) => (
      <span key={index} className={isTop ? 'textFromTop' : 'textFromBottom'}>
        {char === ' ' ? '\u00A0' : char}
      </span>
    ));
  };

  const handleMouseEnter = contextSafe(() => {
    if (!linkRef.current) return;

    const topLetters = linkRef.current.querySelectorAll('.textFromTop');
    const bottomLetters = linkRef.current.querySelectorAll('.textFromBottom');

    const tl = gsap.timeline();

    if (pathRef.current && isJoinUs) {
      tl.to(pathRef.current, {
        morphSVG: PLUS_PATH,
        duration: 0.3,
        ease: 'power2.inOut',
      });
    }

    tl.to(
      topLetters,
      {
        yPercent: -100,
        stagger: 0.008,
        ease: 'power2.inOut',
      },
      '<',
    ).to(
      bottomLetters,
      {
        yPercent: 0,
        stagger: 0.008,
        ease: 'power2.inOut',
      },
      '<',
    );
  });

  const handleMouseLeave = contextSafe(() => {
    if (!linkRef.current) return;

    const topLetters = linkRef.current.querySelectorAll('.textFromTop');
    const bottomLetters = linkRef.current.querySelectorAll('.textFromBottom');

    const tl = gsap.timeline();

    if (pathRef.current && isJoinUs) {
      tl.to(pathRef.current, {
        morphSVG: ARROW_PATH,
        duration: 0.3,
        ease: 'power2.inOut',
      });
    }

    tl.to(
      topLetters,
      {
        yPercent: 0,
        stagger: 0.008,
        ease: 'power2.inOut',
      },
      '<',
    );

    tl.to(
      bottomLetters,
      {
        yPercent: 100,
        stagger: 0.008,
        ease: 'power2.inOut',
      },
      '<',
    );
  });

  useGSAP(() => {
    if (!linkRef.current) return;
    const bottomLetters = linkRef.current.querySelectorAll('.textFromBottom');
    gsap.set(bottomLetters, { yPercent: 100 });
  }, []);

  return (
    <Link
      ref={linkRef}
      className={`${className} relative inline-flex items-center overflow-hidden`}
      href={href}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <div className="relative overflow-hidden">
        <span className="inline-flex overflow-hidden">{getText(children, true)}</span>
        <span className="absolute inset-0 inline-flex cursor-pointer overflow-hidden text-xs">
          {getText(children, false)}
        </span>
      </div>
      {isJoinUs && (
        <svg
          className="h-5 w-5"
          fill="none"
          height="24"
          stroke="currentColor"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="1.5"
          viewBox="0 0 24 24"
          width="24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path ref={pathRef} d={ARROW_PATH} id="arrow" />
        </svg>
      )}
    </Link>
  );
};

export default AnimatedLink;

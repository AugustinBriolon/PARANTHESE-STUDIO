import { useIsScreenLoader } from '@/hooks/useIsScreenLoader';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { useRef } from 'react';
import Button from '../ui/Button';
import Time from '../ui/Time';
import { timeToLoad } from './ScreenLoader';

export default function Contact() {
  const isScreenLoader = useIsScreenLoader();
  const linkedinRef = useRef(null);
  const contactButtonRef = useRef<HTMLDivElement>(null);
  const timeRef = useRef<HTMLDivElement>(null);
  const instagramRef = useRef(null);

  useGSAP(() => {
    gsap
      .timeline()
      .from(contactButtonRef.current, {
        delay: isScreenLoader ? timeToLoad + 0.5 : 0.5,
        scale: 0,
        duration: 0.6,
        ease: 'power2.inOut',
      })
      .from(
        linkedinRef.current,
        {
          scale: 0,
          duration: 0.6,
          ease: 'power2.inOut',
        },
        '<0.1',
      )
      .from(
        instagramRef.current,
        {
          scale: 0,
          duration: 0.6,
          ease: 'power2.inOut',
        },
        '<0.1',
      )
      .from(
        timeRef.current,
        {
          scale: 0,
          duration: 0.6,
          ease: 'power2.inOut',
        },
        '<0.1',
      );
  }, []);

  return (
    <div className="flex flex-col-reverse items-start gap-2 md:flex-row md:items-center md:gap-5">
      <Button
        ref={contactButtonRef}
        className="origin-bottom-left will-change-transform"
        href="mailto:hello@paranthese.studio"
      >
        CONTACT
      </Button>
      <div ref={linkedinRef} className="group relative origin-bottom-left will-change-transform">
        <div className="absolute bottom-0 left-0 h-px w-full origin-left scale-x-0 rounded-full bg-black transition-all duration-300 will-change-transform group-hover:scale-x-100"></div>
        <a
          className="text-lg"
          href="https://www.linkedin.com/company/paranthese-studio/"
          target="_blank"
        >
          LINKEDIN
        </a>
      </div>
      <div ref={instagramRef} className="group relative origin-bottom-left will-change-transform">
        <div className="absolute bottom-0 left-0 h-px w-full origin-left scale-x-0 rounded-full bg-black transition-all duration-300 will-change-transform group-hover:scale-x-100"></div>
        <a className="text-lg" href="https://www.instagram.com/paranthese.studio/" target="_blank">
          INSTAGRAM
        </a>
      </div>
      <Time ref={timeRef} />
      <h3 className="sr-only">PARANTHESE STUDIO</h3>
    </div>
  );
}

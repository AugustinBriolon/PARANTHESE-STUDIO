import { useIsScreenLoader } from '@/hooks/useIsScreenLoader';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { useRef } from 'react';
import Button from '../ui/Button';
import Time from '../ui/Time';

export default function Contact() {
  const isScreenLoader = useIsScreenLoader();
  const linkedinRef = useRef(null);
  const contactButtonRef = useRef<HTMLDivElement>(null);
  const timeRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    const tl = gsap.timeline();

    tl.from(contactButtonRef.current, {
      delay: isScreenLoader ? 7 : 0,
      scale: 0,
      duration: 1,
      ease: 'power2.inOut',
    });
    tl.from(
      linkedinRef.current,
      {
        scale: 0,
        duration: 0.6,
        ease: 'power2.inOut',
      },
      '<0.3',
    );
    tl.from(
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
    <div className="flex items-center gap-5">
      <Button
        ref={contactButtonRef}
        className="origin-bottom-left will-change-transform"
        href="mailto:hello@creative-studio.com"
      >
        CONTACT
      </Button>
      <a
        ref={linkedinRef}
        className="origin-bottom-left text-lg will-change-transform"
        href="https://www.linkedin.com/company/paranthese-studio/"
        target="_blank"
      >
        LINKEDIN
      </a>
      <Time ref={timeRef} />
    </div>
  );
}

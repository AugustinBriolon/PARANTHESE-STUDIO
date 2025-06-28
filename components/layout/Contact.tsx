import { useIsScreenLoader } from '@/hooks/useIsScreenLoader';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { useRef } from 'react';
import Button from '../ui/Button';

export default function Contact() {
  const isScreenLoader = useIsScreenLoader();
  const linkedinRef = useRef(null);
  const contactButtonRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    const tl = gsap.timeline();

    tl.from(linkedinRef.current, {
      delay: isScreenLoader ? 7 : 0,
      scale: 0,
      duration: 0.8,
      ease: 'power2.inOut',
    });

    tl.from(
      contactButtonRef.current,
      {
        scale: 0,
        duration: 1,
        ease: 'power2.inOut',
      },
      '<0.2',
    );
  }, []);

  return (
    <div className="flex flex-col justify-end gap-2">
      <a
        ref={linkedinRef}
        className="origin-bottom-left text-lg will-change-transform"
        href="https://www.linkedin.com/company/paranthese-studio/"
        target="_blank"
      >
        LINKEDIN
      </a>
      <Button
        ref={contactButtonRef}
        className="origin-bottom-left will-change-transform"
        href="mailto:hello@creative-studio.com"
      >
        CONTACT
      </Button>
    </div>
  );
}

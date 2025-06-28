import { useIsScreenLoader } from '@/hooks/useIsScreenLoader';
import { useGSAP } from '@gsap/react';
import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import SplitText from 'gsap/SplitText';
import Button from '../ui/Button';
gsap.registerPlugin(SplitText);

export default function LastProject() {
  const isScreenLoader = useIsScreenLoader();
  const videoContainerRef = useRef(null);
  const textRef = useRef(null);
  const projectTitleRef = useRef(null);
  const projectButtonRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const showOverlay = isPlaying || isHovered;

  const tl = gsap.timeline();
  const mm = gsap.matchMedia();

  const openProjectInfoAnimation = () => {
    tl.to(projectTitleRef.current, {
      y: 0,
      duration: 0.8,
      ease: 'power2.out',
    });
    tl.to(
      projectButtonRef.current,
      {
        y: 0,
        duration: 0.8,
        ease: 'power2.out',
      },
      '<+0.2',
    );
  };

  const closeProjectInfoAnimation = () => {
    tl.to(projectTitleRef.current, {
      y: 50,
      duration: 0.8,
      ease: 'power2.out',
    });
    tl.to(
      projectButtonRef.current,
      {
        y: 50,
        duration: 0.8,
        ease: 'power2.out',
        onComplete: () => setIsPlaying(false),
      },
      '<+0.2',
    );
  };

  const playVideoBigScreen = () => {
    if (isPlaying) {
      mm.add('(min-width: 950px)', () => {
        closeProjectInfoAnimation();
        tl.to(
          videoContainerRef.current,
          {
            scale: 1,
            borderRadius: '16px',
            duration: 1,
            ease: 'power2.inOut',
          },
          '+0.2',
        );
      });
      mm.add('(max-width: 950px)', () => {
        closeProjectInfoAnimation();
        tl.to(
          videoContainerRef.current,
          {
            width: '176px',
            borderRadius: '16px',
            duration: 1,
            ease: 'power2.inOut',
          },
          '+0.2',
        );
      });
      return;
    }

    setIsPlaying(true);
    mm.add('(min-width: 950px)', () => {
      tl.to(videoContainerRef.current, {
        scale: 5,
        borderRadius: '3px',
        duration: 1,
        ease: 'power2.inOut',
      });
      openProjectInfoAnimation();
    });
    mm.add('(max-width: 950px)', () => {
      tl.to(videoContainerRef.current, {
        width: 'calc(100% - 50px)',
        borderRadius: '16px',
        duration: 1,
        ease: 'power2.inOut',
      });
      openProjectInfoAnimation();
    });
  };

  useGSAP(() => {
    gsap.set(projectTitleRef.current, { y: 50 });
    gsap.set(projectButtonRef.current, { y: 50 });

    const tl = gsap.timeline();
    tl.from(videoContainerRef.current, {
      delay: isScreenLoader ? 7 : 0,
      scale: 0,
      duration: 1,
      ease: 'power2.inOut',
    });
    const split = SplitText.create(textRef.current, { type: 'chars' });
    tl.from(split.chars, {
      opacity: 0,
      y: 20,
      stagger: 0.02,
      duration: 0.4,
      ease: 'power2.out',
    });
  }, []);

  useEffect(() => {
    if (isPlaying) setIsHovered(true);
    else setIsHovered(false);
  }, [isPlaying]);

  return (
    <div className="flex flex-col items-end justify-end gap-2">
      <div
        className={`fixed z-30 bg-black/95 transition-all duration-300 ${showOverlay ? 'inset-0 opacity-100' : 'invisible inset-1 opacity-0'}`}
        onClick={playVideoBigScreen}
      ></div>

      <div
        className={`absolute top-14 right-14 z-40 flex flex-col items-end justify-start gap-2 ${showOverlay ? 'opacity-100' : 'invisible inset-1 opacity-0'}`}
      >
        <div className="overflow-hidden">
          <p
            ref={projectTitleRef}
            className="text-right text-xl font-medium text-white uppercase md:text-4xl"
          >
            LES RÊVERIES DE L'ORANGERIE
          </p>
        </div>
        <div className="w-fit overflow-hidden">
          <Button
            ref={projectButtonRef}
            href="https://les-reveries-orangerie.vercel.app/"
            variant="white"
          >
            EXPLORE
          </Button>
        </div>
      </div>

      <div className="overflow-hidden">
        <h3 ref={textRef} className="text-sm font-medium">
          LAST REALISATION
        </h3>
      </div>
      <div className="aspect-video h-auto w-44 max-w-full"></div>
      <div
        ref={videoContainerRef}
        className="group absolute right-6 bottom-6 z-50 aspect-video h-auto w-44 max-w-full origin-bottom-right translate-0 cursor-pointer overflow-hidden rounded-2xl md:right-10 md:bottom-10 lg:right-14 lg:bottom-14"
        onClick={playVideoBigScreen}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <div className="relative z-50 aspect-video h-full w-full">
          <video
            aria-hidden="true"
            className="h-full w-full scale-105 object-cover"
            autoPlay
            loop
            muted
            playsInline
          >
            <source src="/videos/orangerie.webm" type="video/webm" />
            <source src="/videos/orangerie.mp4" type="video/mp4" />
          </video>
          <div
            className={`pointer-events-none absolute inset-0 z-10 bg-black/60 transition-opacity duration-500 ${showOverlay ? 'opacity-0' : 'opacity-100 group-hover:opacity-0'}`}
          />
        </div>
      </div>
    </div>
  );
}

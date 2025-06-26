import { useIsScreenLoader } from '@/hooks/useIsScreenLoader';
import { useGSAP } from '@gsap/react';
import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import SplitText from 'gsap/SplitText';
gsap.registerPlugin(SplitText);

export default function LastProject() {
  const isScreenLoader = useIsScreenLoader();
  const videoContainerRef = useRef(null);
  const textRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const showOverlay = isPlaying || isHovered;

  useGSAP(() => {
    const tl = gsap.timeline();
    tl.from(videoContainerRef.current, {
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

  const playVideoBigScreen = () => {
    const tl = gsap.timeline();
    if (isPlaying) {
      tl.to(videoContainerRef.current, {
        scale: 1,
        borderRadius: '16px',
        duration: 1,
        ease: 'power2.inOut',
        onComplete: () => setIsPlaying(false),
      });
      return;
    }
    setIsPlaying(true);
    tl.to(videoContainerRef.current, {
      scale: 5,
      borderRadius: '3px',
      duration: 1,
      ease: 'power2.inOut',
    });
  };

  useEffect(() => {
    if (isPlaying) setIsHovered(true);
    else setIsHovered(false);
  }, [isPlaying]);

  return (
    <div className="flex flex-col items-end justify-end gap-2">
      <div
        className={`fixed inset-0 z-40 bg-black/90 transition-opacity duration-300 ${showOverlay ? 'opacity-100' : 'opacity-0'}`}
        onClick={playVideoBigScreen}
      ></div>
      <div className="overflow-hidden">
        <p ref={textRef} className="text-sm font-medium">
          LAST REALISATION
        </p>
      </div>
      <div className="aspect-video h-auto w-44 max-w-full rounded-2xl bg-black/10"></div>
      <div
        ref={videoContainerRef}
        className="group absolute right-14 bottom-14 z-50 aspect-video h-auto w-44 max-w-full origin-bottom-right translate-0 cursor-pointer overflow-hidden rounded-2xl"
        onClick={playVideoBigScreen}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <div className="relative z-50 aspect-video h-full w-full">
          <video className="h-full w-full scale-105 object-cover" autoPlay loop muted playsInline>
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

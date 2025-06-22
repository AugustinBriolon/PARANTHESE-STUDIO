import { useIsScreenLoader } from '@/hooks/useIsScreenLoader';
import { useScrollLock } from '@/hooks/useToggleScroll';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { DrawSVGPlugin } from 'gsap/DrawSVGPlugin';
import { MorphSVGPlugin } from 'gsap/MorphSVGPlugin';
import { useRef } from 'react';
import SplitText from 'gsap/SplitText';

gsap.registerPlugin(SplitText, DrawSVGPlugin, MorphSVGPlugin);

const curvePathD =
  'M110 353C110 353 77.6526 332.5 53.5001 299.5C29.3477 266.5 21.4362 237.121 22 194.5C22.5638 151.879 24.5 124 51 87C77.5 50 110 29.5 110 29.5';
const initialPathD = 'M21 364V192.5V21';

const ScreenLoader = () => {
  const { lockScroll } = useScrollLock();
  const isScreenLoader = useIsScreenLoader();
  const screenLoaderRef = useRef(null);
  const mainTextRef = useRef(null);
  const parantheseContainerLeftRef = useRef(null);
  const parantheseContainerRightRef = useRef(null);
  const parantheseSVGLeftRef = useRef(null);
  const parantheseSVGRightRef = useRef(null);
  const paranthesePathRightRef = useRef(null);
  const paranthesePathLefttRef = useRef(null);
  const divLeftRef = useRef(null);
  const divRightRef = useRef(null);

  useGSAP(() => {
    isScreenLoader && lockScroll(true);
  }, [isScreenLoader]);

  useGSAP(
    () => {
      if (!parantheseSVGLeftRef.current || !parantheseSVGRightRef.current) {
        return;
      }

      const tl = gsap.timeline();
      const split = SplitText.create(mainTextRef.current, {
        type: 'chars',
      });

      tl.from(
        parantheseContainerLeftRef.current,
        {
          delay: 0.5,
          opacity: 0,
          y: 100,
          duration: 1,
          ease: 'power2.inOut',
        },
        '<',
      );

      tl.from(
        split.chars,
        {
          stagger: 0.05,
          opacity: 0,
          y: 100,
          duration: 1,
          ease: 'power2.inOut',
        },
        '-=0.8',
      );

      tl.from(
        parantheseContainerRightRef.current,
        {
          opacity: 0,
          y: 100,
          duration: 1,
          ease: 'power2.inOut',
        },
        '-=0.8',
      );

      tl.to(
        mainTextRef.current,
        {
          scale: 0.8,
          opacity: 0,
          duration: 1,
          ease: 'power2.inOut',
        },
        '+=0.5',
      );

      tl.to(
        [paranthesePathRightRef.current, paranthesePathLefttRef.current],
        {
          morphSVG: initialPathD,
          duration: 0.8,
          ease: 'power2.inOut',
        },
        '<',
      );

      tl.to(
        parantheseContainerLeftRef.current,
        {
          x: 490,
          duration: 1,
          ease: 'power2.inOut',
        },
        '<',
      );

      tl.to(
        parantheseContainerRightRef.current,
        {
          x: -490,
          duration: 1,
          ease: 'power2.inOut',
        },
        '<',
      );
      tl.to(
        [parantheseSVGLeftRef.current, parantheseSVGRightRef.current],
        {
          scaleY: 8,
          duration: 1,
          ease: 'power2.inOut',
        },
        '<',
      );

      tl.to(parantheseContainerLeftRef.current, {
        x: -150,
        scaleX: 80,
        duration: 1.5,
        ease: 'power2.inOut',
      });
      tl.to(
        parantheseContainerRightRef.current,
        {
          x: 150,
          scaleX: 80,
          duration: 1.5,
          ease: 'power2.inOut',
        },
        '<',
      );
      tl.to(
        divLeftRef.current,
        {
          xPercent: -110,
          duration: 1,
          ease: 'power2.inOut',
        },
        '<',
      );
      tl.to(
        divRightRef.current,
        {
          xPercent: 110,
          duration: 1,
          ease: 'power2.inOut',
        },
        '<',
      );
    },
    { dependencies: [isScreenLoader] },
  );

  return (
    <div
      ref={screenLoaderRef}
      className="fixed top-1/2 left-1/2 z-[970] flex h-screen w-screen -translate-x-1/2 -translate-y-1/2 items-center justify-center"
    >
      <div ref={parantheseContainerLeftRef}>
        <svg
          ref={parantheseSVGLeftRef}
          className="w-auto"
          fill="none"
          height="150"
          viewBox="0 0 139 382"
          width="110"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            ref={paranthesePathLefttRef}
            d={curvePathD}
            stroke="black"
            strokeLinecap="square"
            strokeWidth="20"
          />
        </svg>
      </div>
      <div className="overflow-hidden">
        <h1 ref={mainTextRef} className="text-8xl">
          Paranthese Studio
        </h1>
      </div>
      <div ref={parantheseContainerRightRef}>
        <svg
          ref={parantheseSVGRightRef}
          className="w-auto rotate-180"
          fill="none"
          height="150"
          viewBox="0 0 139 382"
          width="110"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            ref={paranthesePathRightRef}
            d={curvePathD}
            stroke="black"
            strokeLinecap="square"
            strokeWidth="20"
          />
        </svg>
      </div>
      <div ref={divLeftRef} className="absolute bottom-0 left-0 -z-1 h-full w-1/2 bg-white"></div>
      <div ref={divRightRef} className="absolute right-0 bottom-0 -z-1 h-full w-1/2 bg-white"></div>
    </div>
  );
};

export default ScreenLoader;

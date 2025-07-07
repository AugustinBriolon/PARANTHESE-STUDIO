import { useIsScreenLoader } from '@/hooks/useIsScreenLoader';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { DrawSVGPlugin } from 'gsap/DrawSVGPlugin';
import { MorphSVGPlugin } from 'gsap/MorphSVGPlugin';
import SplitText from 'gsap/SplitText';
import { useRef } from 'react';

gsap.registerPlugin(SplitText, DrawSVGPlugin, MorphSVGPlugin);

const initialPath =
  'M117 377.8C83.4 361.533 55.5333 337 33.4 304.2C11.5333 271.4 0.600001 233 0.600001 189C0.600001 145 11.5333 106.6 33.4 73.8C55.5333 41 83.4 16.4667 117 0.199994L135.8 33C107.533 47.9333 84.7333 68.8667 67.4 95.8C50.0667 122.467 41.4 153.533 41.4 189C41.4 224.467 50.0667 255.667 67.4 282.6C84.7333 309.267 107.533 330.067 135.8 345L117 377.8Z';
const transformedPath = 'M0 378V0H40V378H0Z';

const ScreenLoader = () => {
  const isScreenLoader = useIsScreenLoader();
  const screenLoaderRef = useRef(null);
  const mainTextRef = useRef(null);
  const textContainerRef = useRef(null);
  const parantheseRefs = {
    left: {
      svg: useRef(null),
      path: useRef(null),
    },
    right: {
      svg: useRef(null),
      path: useRef(null),
    },
  };
  const transitionDivRefs = {
    left: useRef(null),
    right: useRef(null),
  };

  const backgroundRef = useRef(null);

  useGSAP(
    () => {
      // if (!parantheseSVGLeftRef.current || !parantheseSVGRightRef.current) {
      //   return;
      // }

      const tl = gsap.timeline();
      const split = SplitText.create(mainTextRef.current, {
        type: 'chars',
      });

      tl.from(
        parantheseRefs.left.svg.current,
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
        parantheseRefs.right.svg.current,
        {
          opacity: 0,
          y: 100,
          duration: 1,
          ease: 'power2.inOut',
        },
        '-=0.8',
      );

      tl.addLabel('tranformParanthese');

      tl.to(
        textContainerRef.current,
        {
          width: 0,
          duration: 1,
          ease: 'power2.inOut',
        },
        'tranformParanthese',
      );

      tl.to(
        [parantheseRefs.left.path.current, parantheseRefs.right.path.current],
        {
          morphSVG: transformedPath,
          duration: 0.8,
          ease: 'power2.inOut',
        },
        'tranformParanthese',
      );

      tl.to(
        [transitionDivRefs.left.current, transitionDivRefs.right.current],
        {
          display: 'block',
          scaleY: 50,
          duration: 1,
          ease: 'power2.inOut',
        },
        '>0.1',
      );

      tl.to(
        [parantheseRefs.left.svg.current, parantheseRefs.right.svg.current],
        {
          display: 'none',
          opacity: 0,
          duration: 0,
        },
        '<0.1',
      );

      tl.to([transitionDivRefs.left.current, transitionDivRefs.right.current], {
        scaleX: 100,
        duration: 1,
        ease: 'power2.inOut',
      });

      tl.set(backgroundRef.current, {
        display: 'none',
        opacity: 0,
        duration: 0,
      });

      tl.to([transitionDivRefs.left.current, transitionDivRefs.right.current], {
        x: (i) => [-1100, 1100][i],
        duration: 1,
        ease: 'power2.inOut',
      });

      tl.to(screenLoaderRef.current, {
        display: 'none',
        duration: 0,
      });
    },
    { dependencies: [isScreenLoader] },
  );

  return (
    <div
      ref={screenLoaderRef}
      className="fixed inset-0 z-[999999] flex items-center justify-center"
    >
      <div className="relative flex items-center justify-center">
        <svg
          ref={parantheseRefs.left.svg}
          className="svg-as-h1 absolute left-0 h-20 w-auto origin-right will-change-transform"
          fill="#0E0E0E"
          height="378"
          viewBox="0 0 136 378"
          width="136"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path ref={parantheseRefs.left.path} d={initialPath} />
        </svg>

        <div className="fixed top-1/2 left-1/2 z-1 -translate-1/2">
          <div
            ref={transitionDivRefs.left}
            className="svg-as-h1 hidden w-2 origin-right bg-black will-change-transform md:w-4"
          ></div>
        </div>

        <div ref={textContainerRef} className="flex justify-center overflow-hidden">
          <h1 ref={mainTextRef} className="text-center whitespace-nowrap">
            <span className="w-4 md:w-10"></span>
            Paranthese Studio
            <span className="w-4 md:w-10"></span>
          </h1>
        </div>

        <div className="fixed top-1/2 left-1/2 z-1 -translate-1/2">
          <div
            ref={transitionDivRefs.right}
            className="svg-as-h1 hidden w-2 origin-left bg-black will-change-transform md:w-4"
          ></div>
        </div>

        <svg
          ref={parantheseRefs.right.svg}
          className="svg-as-h1 absolute right-0 h-20 w-auto rotate-180 will-change-transform"
          fill="#0E0E0E"
          height="378"
          viewBox="0 0 136 378"
          width="136"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path ref={parantheseRefs.right.path} d={initialPath} />
        </svg>
      </div>
      <div ref={backgroundRef} className="absolute right-0 bottom-0 -z-1 h-full w-full bg-white" />
    </div>
  );
};

export default ScreenLoader;

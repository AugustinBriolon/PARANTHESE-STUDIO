import { useFontReady } from '@/hooks/useFontReady';
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

export const timeToLoad = 4.5;

const ScreenLoader = () => {
  const isScreenLoader = useIsScreenLoader();
  const isFontReady = useFontReady();
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
      if (!isFontReady) return;

      const split = SplitText.create(mainTextRef.current, {
        type: 'chars',
      });

      gsap
        .timeline()
        .fromTo(
          parantheseRefs.left.svg.current,
          {
            opacity: 0,
            y: 50,
          },
          {
            delay: 0.5,
            opacity: 1,
            y: 0,
            duration: 0.5,
            ease: 'power4.out',
          },
        )
        .set(
          mainTextRef.current,
          {
            opacity: 1,
          },
          '-=0.5',
        )
        .fromTo(
          split.chars,
          {
            y: 100,
          },
          {
            y: 0,
            stagger: 0.02,
            duration: 0.8,
            ease: 'power4.out',
          },
          '<',
        )
        .fromTo(
          parantheseRefs.right.svg.current,
          {
            opacity: 0,
            y: 50,
          },
          {
            opacity: 1,
            y: 0,
            duration: 0.5,
            ease: 'power4.out',
          },
          '-=0.6',
        )
        .addLabel('tranformParanthese')
        .to(
          textContainerRef.current,
          {
            width: 0,
            duration: 0.8,
            ease: 'power2.inOut',
          },
          'tranformParanthese',
        )
        .to(
          [parantheseRefs.left.path.current, parantheseRefs.right.path.current],
          {
            morphSVG: transformedPath,
            duration: 0.8,
            ease: 'power2.inOut',
          },
          'tranformParanthese',
        )
        .to(
          [parantheseRefs.left.svg.current, parantheseRefs.right.svg.current],
          {
            x: (i) => ['-15%', '15%'][i],
            duration: 0.8,
          },
          'tranformParanthese',
        )
        .to(
          [transitionDivRefs.left.current, transitionDivRefs.right.current],
          {
            display: 'block',
            scaleY: 50,
            duration: 1,
            ease: 'power2.inOut',
          },
          '>-0.03',
        )
        .set([parantheseRefs.left.svg.current, parantheseRefs.right.svg.current], {
          display: 'none',
        })
        .to(
          [transitionDivRefs.left.current, transitionDivRefs.right.current],
          {
            scaleX: 100,
            duration: 1,
            ease: 'power2.inOut',
          },
          '<-0.5',
        )
        .set(backgroundRef.current, {
          display: 'none',
        })
        .to([transitionDivRefs.left.current, transitionDivRefs.right.current], {
          x: (i) => [-1100, 1100][i],
          duration: 1,
          ease: 'power2.inOut',
        })
        .set(screenLoaderRef.current, {
          display: 'none',
          duration: 0,
        });
    },
    { dependencies: [isScreenLoader, isFontReady] },
  );

  return (
    <div
      ref={screenLoaderRef}
      className="fixed inset-0 z-[999999] flex items-center justify-center"
    >
      <div className="relative flex items-center justify-center">
        <svg
          ref={parantheseRefs.left.svg}
          className="svg-as-h1 absolute left-0 h-20 w-auto origin-right opacity-0 will-change-transform"
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
            className="svg-as-h1 hidden w-1 origin-right bg-black will-change-transform md:w-2 lg:w-3"
          ></div>
        </div>

        <div ref={textContainerRef} className="flex justify-center overflow-hidden">
          <h1 ref={mainTextRef} className="text-center whitespace-nowrap opacity-0">
            <span className="w-4 md:w-10"></span>
            Paranthese Studio
            <span className="w-4 md:w-10"></span>
          </h1>
        </div>

        <div className="fixed top-1/2 left-1/2 z-1 -translate-1/2">
          <div
            ref={transitionDivRefs.right}
            className="svg-as-h1 hidden w-1 origin-left bg-black will-change-transform md:w-2 lg:w-3"
          ></div>
        </div>

        <svg
          ref={parantheseRefs.right.svg}
          className="svg-as-h1 absolute right-0 h-20 w-auto rotate-180 opacity-0 will-change-transform"
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

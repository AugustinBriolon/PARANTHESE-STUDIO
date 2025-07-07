import { useIsScreenLoader } from '@/hooks/useIsScreenLoader';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { DrawSVGPlugin } from 'gsap/DrawSVGPlugin';
import { MorphSVGPlugin } from 'gsap/MorphSVGPlugin';
import SplitText from 'gsap/SplitText';
import { useRef } from 'react';

gsap.registerPlugin(SplitText, DrawSVGPlugin, MorphSVGPlugin);

const initialPathDLeft =
  'M117 377.8C83.4 361.533 55.5333 337 33.4 304.2C11.5333 271.4 0.600001 233 0.600001 189C0.600001 145 11.5333 106.6 33.4 73.8C55.5333 41 83.4 16.4667 117 0.199994L135.8 33C107.533 47.9333 84.7333 68.8667 67.4 95.8C50.0667 122.467 41.4 153.533 41.4 189C41.4 224.467 50.0667 255.667 67.4 282.6C84.7333 309.267 107.533 330.067 135.8 345L117 377.8Z';
const initialPathDRight =
  'M0.800049 344.999C29.0667 330.066 51.8667 309.266 69.2001 282.599C86.5334 255.666 95.2001 224.466 95.2001 188.999C95.2001 153.533 86.5334 122.466 69.2001 95.7992C51.8667 68.8659 29.0667 47.9326 0.800049 32.9992L19.6 0.199219C53.2001 16.4659 80.9334 40.9992 102.8 73.7992C124.933 106.599 136 144.999 136 188.999C136 232.999 124.933 271.399 102.8 304.199C80.9334 336.999 53.2001 361.533 19.6 377.799L0.800049 344.999Z';
const transformedPath = 'M0 378V0H40V378H0Z';

const ScreenLoader = () => {
  const isScreenLoader = useIsScreenLoader();
  const screenLoaderRef = useRef(null);
  const mainTextRef = useRef(null);
  const parantheseSVGLeftRef = useRef(null);
  const parantheseSVGRightRef = useRef(null);
  const paranthesePathRightRef = useRef(null);
  const paranthesePathLefttRef = useRef(null);
  const divLeftRef = useRef(null);
  const divRightRef = useRef(null);
  const divSVGLeftRef = useRef(null);
  const divSVGRightRef = useRef(null);

  useGSAP(
    () => {
      if (!parantheseSVGLeftRef.current || !parantheseSVGRightRef.current) {
        return;
      }

      const tl = gsap.timeline();
      const split = SplitText.create(mainTextRef.current, {
        type: 'chars',
      });

      tl.to(mainTextRef.current, {
        opacity: 1,
        duration: 1,
        ease: 'power2.inOut',
      });

      tl.from(
        parantheseSVGLeftRef.current,
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
        parantheseSVGRightRef.current,
        {
          opacity: 0,
          y: 100,
          duration: 1,
          ease: 'power2.inOut',
        },
        '-=0.8',
      );

      tl.addLabel('tranformParanthese');

      const { chars } = split;
      const customOrder = [];
      let left = 0;
      let right = chars.length - 1;
      while (left <= right) {
        if (left === right) {
          customOrder.push(chars[left]);
        } else {
          customOrder.push(chars[left], chars[right]);
        }
        left++;
        right--;
      }

      tl.to(
        customOrder,
        {
          stagger: 0.02,
          opacity: 0,
          duration: 0.5,
          ease: 'power2.inOut',
        },
        'tranformParanthese',
      );

      tl.to(
        [paranthesePathRightRef.current, paranthesePathLefttRef.current],
        {
          morphSVG: transformedPath,
          duration: 0.8,
          ease: 'power2.inOut',
        },
        'tranformParanthese',
      );

      tl.to(
        [parantheseSVGLeftRef.current, parantheseSVGRightRef.current],
        {
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          duration: 1,
          ease: 'power2.inOut',
        },
        'tranformParanthese',
      );

      tl.to([divSVGLeftRef.current, divSVGRightRef.current], {
        display: 'block',
        scaleY: 30,
        duration: 1,
        ease: 'power2.inOut',
      });

      tl.to(
        [parantheseSVGLeftRef.current, parantheseSVGRightRef.current],
        {
          opacity: 0,
          duration: 0,
          display: 'none',
          ease: 'power2.inOut',
        },
        '<',
      );

      tl.to([divSVGLeftRef.current, divSVGRightRef.current], {
        scaleX: 100,
        duration: 1,
        ease: 'power2.inOut',
      });

      tl.set([divLeftRef.current, divRightRef.current], {
        display: 'none',
        opacity: 0,
      });

      tl.to([divSVGLeftRef.current, divSVGRightRef.current], {
        x: (i) => [-1100, 1100][i],
        duration: 1,
        ease: 'power2.inOut',
      });

      tl.to(screenLoaderRef.current, {
        display: 'none',
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
          ref={parantheseSVGLeftRef}
          className="svg-as-h1 absolute left-[-5%] h-20 w-auto origin-right will-change-transform"
          fill="black"
          height="378"
          viewBox="0 0 136 378"
          width="136"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path ref={paranthesePathLefttRef} d={initialPathDLeft} />
        </svg>
        <div className="absolute top-1/2 left-[47%] z-1 translate-x-1/2 -translate-y-1/2">
          <div
            ref={divSVGLeftRef}
            className="svg-as-h1 hidden w-[3px] origin-right bg-black will-change-transform md:w-[10.58px]"
          ></div>
        </div>

        <div className="overflow-hidden">
          <h1 ref={mainTextRef} className="opacity-0">
            Paranthese Studio
          </h1>
        </div>

        <div className="absolute top-1/2 left-[47%] z-1 translate-x-1/2 -translate-y-1/2">
          <div
            ref={divSVGRightRef}
            className="svg-as-h1 hidden w-[3px] origin-left bg-black will-change-transform md:w-[10.58px]"
          ></div>
        </div>

        <svg
          ref={parantheseSVGRightRef}
          className="svg-as-h1 absolute right-[-5%] h-20 w-auto origin-left will-change-transform"
          fill="black"
          height="378"
          viewBox="0 0 136 378"
          width="136"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path ref={paranthesePathRightRef} d={initialPathDRight} />
        </svg>
      </div>
      <div ref={divLeftRef} className="absolute bottom-0 left-0 -z-1 h-full w-1/2 bg-white" />
      <div ref={divRightRef} className="absolute right-0 bottom-0 -z-1 h-full w-1/2 bg-white" />
    </div>
  );
};

export default ScreenLoader;

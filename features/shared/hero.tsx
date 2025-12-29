import { usePerformance } from '@/providers/performance.provider';
import { PERFORMANCE_LEVEL } from '@/hooks/usePerformance';
import { useGSAP } from '@gsap/react';
import { gsap } from 'gsap';
import { SplitText } from 'gsap/SplitText';
import { useRef, useState } from 'react';

const Hero = () => {
  const screenLoaderRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLDivElement>(null);
  const joinUsRef = useRef<HTMLDivElement>(null);
  const textTopRef = useRef<HTMLDivElement>(null);
  const textBottomRef = useRef<HTMLDivElement>(null);
  const [isAnimationFinished, setIsAnimationFinished] = useState(false);
  const { isLoading, performanceLevel } = usePerformance();

  const { contextSafe } = useGSAP();

  const loaderAnimation = contextSafe(() => {
    const children = titleRef.current?.querySelectorAll('svg') || [];

    gsap
      .timeline()
      .set(titleRef.current, {
        scale: 1.4,
      })
      .from(children, {
        delay: 0.4,
        yPercent: 100,
        duration: 1.6,
        ease: 'power4.out',
        stagger: 0.05,
        onComplete: () => {
          setIsAnimationFinished(true);
        },
      })
      .to(titleRef.current, {
        scale: 1,
        duration: 1.6,
        ease: 'power4.inOut',
      });
  });

  const revealAnimation = contextSafe(() => {
    const joinUs = joinUsRef.current;
    const textTop = textTopRef.current?.querySelectorAll('.based-text') || [];
    const textBottom = textBottomRef.current?.querySelector('.description-text') || '';
    const copyright = textBottomRef.current?.querySelector('.copyright-text') || '';

    const splitDescription = SplitText.create(textBottom, {
      type: 'lines, words',
      mask: 'lines',
    });

    gsap
      .timeline()
      .to(
        screenLoaderRef.current,
        {
          delay: 0.4,
          yPercent: -100,
          duration: 1.5,
          ease: 'power4.inOut',
          onComplete: () => {
            if (screenLoaderRef.current) {
              gsap.set(screenLoaderRef.current, { display: 'none' });
            }
            gsap.to(titleRef.current, {
              zIndex: 5,
            });
          },
        },
        '<',
      )
      .from(
        [splitDescription.lines, copyright],
        {
          yPercent: 100,
          duration: 1.2,
          ease: 'power2.out',
          stagger: 0.05,
        },
        '<+=0.4',
      )
      .from(
        [joinUs, textTop],
        {
          ...(performanceLevel === PERFORMANCE_LEVEL.HIGH
            ? {
                filter: 'blur(10px)',
              }
            : {
                opacity: 0,
              }),
          duration: 1.2,
          ease: 'power4.out',
          stagger: 0.05,
        },
        '<+=0.2',
      );
  });

  useGSAP(() => {
    loaderAnimation();
  }, []);

  useGSAP(() => {
    if (isAnimationFinished && !isLoading) {
      revealAnimation();
    }
  }, [isAnimationFinished, isLoading]);

  return (
    <div className="h-dvh w-full bg-[url('/images/hero.png')] bg-cover bg-center px-4 py-[90px]">
      <div className="mx-auto flex h-full max-w-[1440px] flex-col justify-between">
        <div className="flex h-[inherit] flex-col items-start justify-center gap-16 md:h-auto md:flex-row md:items-end md:justify-between md:gap-0">
          <div className="flex w-full flex-col items-end gap-4 md:w-auto md:flex-row md:gap-0">
            <h1
              ref={titleRef}
              aria-label="DRIFT RUNNING CLUB/"
              className="z-11 flex origin-top-right flex-col items-end gap-1 text-white md:origin-top-left"
            >
              <div className="overflow-hidden">
                <svg
                  className="max-h-[20vw] w-auto"
                  fill="none"
                  height="198"
                  viewBox="0 0 549 198"
                  width="549"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M0 0H38.4521C63.2731 0 80.0374 1.13932 88.7451 3.41797C97.5342 5.69661 104.207 9.4401 108.765 14.6484C113.322 19.8568 116.17 25.6755 117.31 32.1045C118.449 38.4521 119.019 50.9847 119.019 69.7021V138.916C119.019 156.657 118.164 168.538 116.455 174.561C114.827 180.501 111.938 185.181 107.788 188.599C103.638 191.935 98.5107 194.295 92.4072 195.679C86.3037 196.981 77.1077 197.632 64.8193 197.632H0V0ZM51.3916 33.8135V163.818C58.7972 163.818 63.3545 162.354 65.0635 159.424C66.7725 156.413 67.627 148.315 67.627 135.132V58.3496C67.627 49.3978 67.3421 43.6605 66.7725 41.1377C66.2028 38.6149 64.9007 36.7839 62.8662 35.6445C60.8317 34.4238 57.0068 33.8135 51.3916 33.8135ZM138.184 0H174.561C198.812 0 215.21 0.935872 223.755 2.80762C232.381 4.67936 239.38 9.48079 244.751 17.2119C250.203 24.8617 252.93 37.1094 252.93 53.9551C252.93 69.3359 251.017 79.6712 247.192 84.9609C243.368 90.2507 235.84 93.4245 224.609 94.4824C234.782 97.0052 241.618 100.382 245.117 104.614C248.617 108.846 250.773 112.752 251.587 116.333C252.482 119.832 252.93 129.557 252.93 145.508V197.632H205.2V131.958C205.2 121.379 204.346 114.827 202.637 112.305C201.009 109.782 196.655 108.521 189.575 108.521V197.632H138.184V0ZM189.575 33.8135V77.7588C195.353 77.7588 199.382 76.9857 201.66 75.4395C204.02 73.8118 205.2 68.6442 205.2 59.9365V49.0723C205.2 42.806 204.061 38.6963 201.782 36.7432C199.585 34.79 195.516 33.8135 189.575 33.8135ZM324.341 0V197.632H272.949V0H324.341ZM344.971 0H432.007V39.5508H396.362V77.0264H428.101V114.624H396.362V197.632H344.971V0ZM548.096 0V39.5508H517.578V197.632H466.187V39.5508H435.791V0H548.096Z"
                    fill="white"
                  />
                </svg>
              </div>
              <div className="overflow-hidden">
                <svg
                  className="max-h-[20vw] w-auto"
                  fill="none"
                  height="202"
                  viewBox="0 0 387 202"
                  width="387"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M0 0H36.377C60.6283 0 77.0264 0.935872 85.5713 2.80762C94.1976 4.67936 101.196 9.48079 106.567 17.2119C112.02 24.8617 114.746 37.1094 114.746 53.9551C114.746 69.3359 112.834 79.6712 109.009 84.9609C105.184 90.2507 97.6562 93.4245 86.4258 94.4824C96.5983 97.0052 103.434 100.382 106.934 104.614C110.433 108.846 112.59 112.752 113.403 116.333C114.299 119.832 114.746 129.557 114.746 145.508V197.632H67.0166V131.958C67.0166 121.379 66.1621 114.827 64.4531 112.305C62.8255 109.782 58.4717 108.521 51.3916 108.521V197.632H0V0ZM51.3916 33.8135V77.7588C57.1696 77.7588 61.1979 76.9857 63.4766 75.4395C65.8366 73.8118 67.0166 68.6442 67.0166 59.9365V49.0723C67.0166 42.806 65.8773 38.6963 63.5986 36.7432C61.4014 34.79 57.3324 33.8135 51.3916 33.8135ZM251.587 0V132.08C251.587 147.054 251.099 157.593 250.122 163.696C249.146 169.718 246.257 175.944 241.455 182.373C236.654 188.721 230.306 193.563 222.412 196.899C214.6 200.155 205.363 201.782 194.702 201.782C182.902 201.782 172.485 199.829 163.452 195.923C154.419 192.017 147.664 186.93 143.188 180.664C138.713 174.398 136.068 167.806 135.254 160.889C134.44 153.89 134.033 139.242 134.033 116.943V0H185.425V148.193C185.425 156.82 185.872 162.354 186.768 164.795C187.744 167.155 189.657 168.335 192.505 168.335C195.76 168.335 197.835 167.033 198.73 164.429C199.707 161.743 200.195 155.477 200.195 145.63V0H251.587ZM386.23 0V197.632H341.187L314.453 107.788V197.632H271.484V0H314.453L343.262 88.9893V0H386.23Z"
                    fill="white"
                  />
                </svg>
              </div>
              <div className="overflow-hidden">
                <svg
                  className="max-h-[20vw] w-auto"
                  fill="none"
                  height="206"
                  viewBox="0 0 598 206"
                  width="598"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M121.46 90.332H70.0684V55.9082C70.0684 45.8984 69.4987 39.6729 68.3594 37.2314C67.3014 34.7087 64.9007 33.4473 61.1572 33.4473C56.9255 33.4473 54.2399 34.9528 53.1006 37.9639C51.9613 40.9749 51.3916 47.4854 51.3916 57.4951V149.292C51.3916 158.895 51.9613 165.161 53.1006 168.091C54.2399 171.021 56.8034 172.485 60.791 172.485C64.6159 172.485 67.098 171.021 68.2373 168.091C69.458 165.161 70.0684 158.285 70.0684 147.461V122.681H121.46V130.371C121.46 150.798 119.995 165.283 117.065 173.828C114.217 182.373 107.829 189.86 97.9004 196.289C88.0534 202.718 75.887 205.933 61.4014 205.933C46.346 205.933 33.9355 203.206 24.1699 197.754C14.4043 192.301 7.93457 184.774 4.76074 175.171C1.58691 165.487 0 150.96 0 131.592V73.8525C0 59.611 0.488281 48.9502 1.46484 41.8701C2.44141 34.7087 5.3304 27.832 10.1318 21.2402C15.0146 14.6484 21.7285 9.48079 30.2734 5.7373C38.8997 1.91243 48.7874 0 59.9365 0C75.0732 0 87.5651 2.92969 97.4121 8.78906C107.259 14.6484 113.729 21.9727 116.821 30.7617C119.914 39.4694 121.46 53.0599 121.46 71.5332V90.332ZM191.284 4.15039V162.231H222.534V201.782H139.893V4.15039H191.284ZM351.929 4.15039V136.23C351.929 151.204 351.44 161.743 350.464 167.847C349.487 173.869 346.598 180.094 341.797 186.523C336.995 192.871 330.648 197.713 322.754 201.05C314.941 204.305 305.705 205.933 295.044 205.933C283.244 205.933 272.827 203.979 263.794 200.073C254.761 196.167 248.006 191.081 243.53 184.814C239.054 178.548 236.41 171.956 235.596 165.039C234.782 158.04 234.375 143.392 234.375 121.094V4.15039H285.767V152.344C285.767 160.97 286.214 166.504 287.109 168.945C288.086 171.305 289.998 172.485 292.847 172.485C296.102 172.485 298.177 171.183 299.072 168.579C300.049 165.894 300.537 159.627 300.537 149.78V4.15039H351.929ZM371.826 4.15039H423.096C439.29 4.15039 451.538 5.41178 459.839 7.93457C468.221 10.4574 474.976 15.5843 480.103 23.3154C485.229 30.9652 487.793 43.335 487.793 60.4248C487.793 71.9808 485.962 80.0374 482.3 84.5947C478.719 89.152 471.598 92.6514 460.938 95.0928C472.819 97.7783 480.876 102.254 485.107 108.521C489.339 114.705 491.455 124.227 491.455 137.085V155.396C491.455 168.742 489.909 178.63 486.816 185.059C483.805 191.488 478.963 195.882 472.29 198.242C465.617 200.602 451.945 201.782 431.274 201.782H371.826V4.15039ZM423.218 37.9639V81.9092C425.415 81.8278 427.124 81.7871 428.345 81.7871C433.39 81.7871 436.605 80.5664 437.988 78.125C439.372 75.6022 440.063 68.4814 440.063 56.7627C440.063 50.5778 439.494 46.2646 438.354 43.8232C437.215 41.3005 435.71 39.7135 433.838 39.0625C432.048 38.4115 428.507 38.0452 423.218 37.9639ZM423.218 112.671V167.969C430.461 167.725 435.059 166.585 437.012 164.551C439.046 162.516 440.063 157.511 440.063 149.536V131.104C440.063 122.64 439.168 117.513 437.378 115.723C435.588 113.932 430.868 112.915 423.218 112.671ZM597.168 0.366211L538.574 205.566H501.221L560.181 0.366211H597.168Z"
                    fill="white"
                  />
                </svg>
              </div>
            </h1>
            <p
              ref={joinUsRef}
              className="flex items-center justify-center gap-3 text-xs text-white"
            >
              <span>[</span>
              JOIN THE DRIFT
              <span>]</span>
            </p>
          </div>
          <div ref={textTopRef} className="text-xs text-white">
            <p className="based-text">BASED IN NEW</p>
            <div className="flex items-center justify-between">
              <p className="based-text">YORK CITY</p>
              <div className="h-px w-4 bg-white"></div>
            </div>
          </div>
        </div>
        <div ref={textBottomRef} className="flex items-center justify-between">
          <p className="description-text max-w-xs text-xs text-white">
            RUN WITH THE NIGHT, DRIFT WITH THE RYTHM, AND LET THE CITY CARRY YOUR FOWAED.
          </p>
          <div className="overflow-hidden">
            <p className="copyright-text text-xs text-white">© 2025</p>
          </div>
        </div>
      </div>
      <div
        ref={screenLoaderRef}
        className="fixed inset-0 z-10 flex items-center justify-center bg-black"
      ></div>
    </div>
  );
};

export default Hero;

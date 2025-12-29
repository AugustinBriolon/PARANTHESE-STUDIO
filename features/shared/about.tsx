import FullWidthTitle from '@/components/shared/full-width-title';
import { IconPlus, IconRunTrace } from '@/components/ui/icons';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import SplitText from 'gsap/dist/SplitText';
import { useRef, useState } from 'react';

const About = () => {
  const aboutRef = useRef<HTMLDivElement | null>(null);
  const runTraceRef = useRef<SVGSVGElement | null>(null);
  const runBottomContentRef = useRef<HTMLDivElement | null>(null);
  const aboutTextRef = useRef(null);
  const [counter, setCounter] = useState(0);

  const { contextSafe } = useGSAP();

  const runTraceAnimation = contextSafe(() => {
    if (!aboutRef.current || !runTraceRef.current) return;

    const path = runTraceRef.current?.querySelector('#path') as SVGPathElement | null;
    if (path) {
      const pathLength = path.getTotalLength();
      path.style.strokeDasharray = `${pathLength}`;
      path.style.strokeDashoffset = `-${pathLength}`;

      gsap.to(path, {
        strokeDashoffset: 0,
        ease: 'none',
        scrollTrigger: {
          trigger: aboutRef.current,
          start: 'top 40%',
          end: 'bottom 80%',
          scrub: true,
          // markers: true,
        },
      });
    }
  });

  const revealAnimation = contextSafe(() => {
    document.fonts.ready.then(() => {
      const splitAboutText = SplitText.create(aboutTextRef.current, {
        type: 'lines, words',
        mask: 'lines',
      });

      gsap
        .timeline({
          scrollTrigger: {
            trigger: aboutRef.current,
            start: 'top 30%',
            // markers: true,
          },
        })
        .from(splitAboutText.lines, {
          yPercent: 100,
          duration: 1.5,
          ease: 'power3.out',
          stagger: 0.05,
        });
    });

    if (!runBottomContentRef.current) return;
    const fullText = runBottomContentRef.current.querySelector('.full-text');
    const bottomText = runBottomContentRef.current.querySelectorAll('.bottom-text');

    gsap
      .timeline({
        scrollTrigger: {
          trigger: aboutRef.current,
          start: 'top 10%',
          // markers: true,
        },
      })
      .from(fullText, {
        yPercent: 100,
        duration: 1.5,
        ease: 'power3.out',
      })
      .to(
        { value: 0 },
        {
          value: 100380,
          onUpdate: function () {
            setCounter(Math.round(this.targets()[0].value));
          },
          duration: 1.5,
          ease: 'power3.out',
        }, '<',
      )
      .from(
        bottomText,
        {
          yPercent: 30,
          opacity: 0,
          duration: 1,
          ease: 'power2.inOut',
          stagger: 0.05,
        },
        '<+=0.5',
      );
  });

  useGSAP(() => {
    runTraceAnimation();
    revealAnimation();
  }, []);

  return (
    <div ref={aboutRef} className="mx-auto min-h-dvh w-full max-w-[1440px] px-4 py-16" id="about">
      <div className="flex h-auto flex-col items-start gap-8 lg:h-1/3 lg:flex-row">
        <div className="flex-1">
          <p className="text-white">ABOUT</p>
        </div>
        <div className="flex flex-1 items-start gap-2">
          <IconPlus className="text-red h-6 w-6 shrink-0 rotate-45" />
          <p ref={aboutTextRef} className="text-white">
            DRIFT WAS BORN IN 2021 ON THE RESTLESS STREETS OF NEW YORK CITY - UNDER THE LIGHTS OF
            THE BROOKLYN BRIDGE, WITH THE EAST RIVER BREEZE CUTTING THROUGH THE NIGHT. IT STARTED
            WITH A FEW FRIENDS WEAVING THROUGH WILLIAMSBURG, RUNNING WITHOUT WATCHES, JUST A
            BLUETOOTH SPEAKER AND A SHARED NEED TO MOVE. WE WEREN'T TRYING TO WIN ANYTHING. WE WERE
            CHASING SOMETHING ELSE - RHYTHM, RELEASE, REAL CONNECTION.
          </p>
        </div>
      </div>
      <div
        ref={runBottomContentRef}
        className="relative mt-16 flex h-auto w-full flex-col items-center justify-center gap-8 lg:mt-0 lg:h-2/3 lg:gap-0"
      >
        <div className="w-full overflow-hidden">
          <FullWidthTitle
            className="text-gray font-impact full-text"
            finalValue={100380}
            value={counter}
            isNumberFlow
          >
            <span className="text-gray font-impact">KM</span>
          </FullWidthTitle>
        </div>
        <div className="flex w-full flex-col justify-between gap-8 text-white lg:flex-row lg:items-center">
          <p className="bottom-text text-left text-balance">
            TOGETHER WE'VE TURNED MILES MEMOERIES,
          </p>
          <p className="bottom-text text-right text-balance">
            AND RUN INTO STORIES THAT NEVER END.
          </p>
        </div>
        <IconRunTrace ref={runTraceRef} className="absolute inset-0 -z-1 h-auto w-full" />
      </div>
    </div>
  );
};

export default About;

import RunCard from '@/components/ui/run-card';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import SplitText from 'gsap/dist/SplitText';
import { useRef } from 'react';

const runCard = [
  {
    index: 1,
    img: '/images/runs/run-1.webp',
    title: 'TUESDAY',
    description: 'NIGHT SHIFT',
  },
  {
    index: 2,
    img: '/images/runs/run-2.webp',
    title: 'SATURDAY',
    description: 'LONG RUN',
  },
  {
    index: 3,
    img: '/images/runs/run-3.webp',
    title: 'FREE DRIFT',
    description: 'RUNS',
  },
];

const Runs = () => {
  const runsRef = useRef<HTMLDivElement | null>(null);
  const runsTitleRef = useRef<HTMLDivElement | null>(null);
  const runsCardsRef = useRef<HTMLDivElement | null>(null);
  const { contextSafe } = useGSAP();

  const revealAnimation = contextSafe(() => {
    const title = runsTitleRef.current?.querySelectorAll('.title');
    const paragraph = runsTitleRef.current?.querySelector('.paragraph');
    const cards = runsCardsRef.current?.querySelectorAll('.card-run');

    if (!paragraph) return;
    document.fonts.ready.then(() => {
      const splitParagraph = SplitText.create(paragraph, {
        type: 'lines, words',
        mask: 'lines',
      });
      gsap
        .timeline({
          scrollTrigger: {
            trigger: runsRef.current,
            start: 'top 30%',
          },
        })
        .from(title || [], {
          yPercent: 100,
          duration: 0.8,
          stagger: 0.05,
          ease: 'power3.out',
        })
        .from(
          splitParagraph.lines,
          {
            yPercent: 100,
            duration: 1.2,
            ease: 'power3.out',
            stagger: 0.05,
          },
          '<',
        )
        .from(
          cards || [],
          {
            yPercent: 30,
            opacity: 0,
            duration: 0.8,
            stagger: 0.05,
            ease: 'power3.out',
          },
          '<+=0.5',
        );
    });
  });

  const parallaxAnimation = contextSafe(() => {
    const cards = runsCardsRef.current?.querySelectorAll('.card-img');
    if (!cards || cards.length === 0) return;

    gsap.set(cards, { scale: 1.05 });

    gsap.to(cards, {
      yPercent: 5,
      ease: 'none',
      scrollTrigger: {
        trigger: runsRef.current,
        start: 'top bottom',
        end: 'bottom top',
        // markers: true,
        scrub: true,
      },
    });
  });

  useGSAP(() => {
    revealAnimation();
    parallaxAnimation();
  }, []);

  return (
    <div ref={runsRef} className="mx-auto min-h-dvh w-full max-w-[1440px] px-4 py-16" id="runs">
      <div ref={runsTitleRef} className="text-white">
        <div className="overflow-hidden">
          <p className="font-impact! title text-7xl">WE RUNTHE CITY - FROM</p>
        </div>
        <div className="flex flex-col items-end gap-2 md:flex-row">
          <div className="overflow-hidden">
            <p className="title font-impact! text-7xl text-pretty lg:min-w-fit">
              SUNRISE TO MIDNIGHT./
            </p>
          </div>
          <p className="font-bounded paragraph max-w-[170px] text-xs">
            WEEKLY RUNS WEAVING BRIDGES, RIVERSIDES, CORNERS OF NEW YORK. AND THROUGH HIDDEN
          </p>
        </div>
      </div>
      <div
        ref={runsCardsRef}
        className="mt-16 grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4"
      >
        <div className="col-span-1 flex items-end justify-start">
          <p className="text-red text-md flex items-center justify-center gap-3 font-medium">
            <span>[</span>
            UPCOMING RUN
            <span>]</span>
          </p>
        </div>
        {runCard.map((card) => (
          <RunCard key={card.index} {...card} />
        ))}
      </div>
    </div>
  );
};

export default Runs;

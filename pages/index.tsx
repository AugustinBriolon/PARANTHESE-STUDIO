import Header from '@/components/layout/Header';
import LastProject from '@/components/layout/LastProject';
import AnimatedTitle from '@/components/layout/AnimatedTitle';
import Contact from '@/components/layout/Contact';

export default function Home() {
  return (
    <>
      <Header />
      <AnimatedTitle />
      <div className="flex items-end justify-between gap-2 sm:gap-10">
        <Contact />
        <LastProject />
      </div>
    </>
  );
}

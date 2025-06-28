import Header from '@/components/layout/Header';
import LastProject from '@/components/layout/LastProject';
import AnimatedTitle from '@/components/ui/AnimatedTitle';
import Contact from '@/components/ui/Contact';

export default function Home() {
  return (
    <>
      <Header />
      <AnimatedTitle />
      <div className="flex justify-between gap-2 sm:gap-10">
        <Contact />
        <LastProject />
      </div>
    </>
  );
}

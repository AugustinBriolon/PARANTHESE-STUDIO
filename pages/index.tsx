import Header from '@/components/layout/header';
import AnimatedTitle from '@/components/layout/animated-title';
import Contact from '@/components/shared/contact';
import LastProject from '@/components/layout/last-project';

export default function Page() {
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

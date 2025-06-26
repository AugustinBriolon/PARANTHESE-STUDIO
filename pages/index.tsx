import Header from '@/components/layout/Header';
import LastProject from '@/components/layout/LastProject';
import { useIsScreenLoader } from '@/hooks/useIsScreenLoader';

export default function Home() {
  const isScreenLoader = useIsScreenLoader();

  return (
    <>
      <Header />
      <div className="flex h-full items-center justify-start">
        <h2>
          Creative Studio <br />
          specialized in immersive <br />
          experiences beyond boundaries.
        </h2>
      </div>
      <LastProject />
    </>
  );
}

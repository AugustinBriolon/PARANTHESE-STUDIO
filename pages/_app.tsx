import PageTransition from '@/components/layout/page-transition';
import Layout from '@/layout/default';
import { AppProvider } from '@/providers/root';
import '@/styles/main.scss';
import '@/styles/tailwind.css';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { AnimatePresence } from 'motion/react';
import { AppProps } from 'next/app';
import { useRouter } from 'next/router';

export default function App({ Component, pageProps }: AppProps) {
  const router = useRouter();
  const [pageKey] = router.asPath.split('?');
  console.log(router, pageKey);

  return (
    <>
      <AppProvider>
        <Layout>
          <AnimatePresence
            initial={false}
            mode="wait"
            onExitComplete={() => {
              setTimeout(() => {
                window.scrollTo(0, 0);
                ScrollTrigger.refresh();
              }, 100);
            }}
          >
            <PageTransition key={pageKey}>
              <Component {...pageProps} />
            </PageTransition>
          </AnimatePresence>
        </Layout>
      </AppProvider>
    </>
  );
}

import '@/styles/globals.css';
import type { AppProps } from 'next/app';
import ScreenLoader from '@/components/layout/ScreenLoader';
import { useIsScreenLoader } from '@/hooks/useIsScreenLoader';
import { useScrollLock } from '@/hooks/useToggleScroll';
import { ReactElement, ReactNode, useEffect } from 'react';
import { NextPage } from 'next';
import Layout from '@/layout/default';

export type NextPageWithLayout = NextPage & {
  getLayout?: (page: ReactElement) => ReactNode;
};

type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout;
};

export default function App({ Component, pageProps }: AppPropsWithLayout) {
  const isScreenLoader = useIsScreenLoader();
  const { lockScroll } = useScrollLock();

  const getLayout = Component.getLayout || ((page) => <Layout>{page}</Layout>);

  useEffect(() => {
    if (isScreenLoader) {
      lockScroll(true);
    } else {
      lockScroll(false);
    }
  }, [isScreenLoader]);

  return (
    <>
      <ScreenLoader />
      {getLayout(<Component {...pageProps} />)}
    </>
  );
}

import ScreenLoader from '@/components/layout/ScreenLoader';
import { useIsScreenLoader } from '@/hooks/useIsScreenLoader';
import Layout from '@/layout/default';
import '@/styles/main.scss';
import '@/styles/tailwind.css';
import { NextPage } from 'next';
import type { AppProps } from 'next/app';
import { ReactElement, ReactNode } from 'react';

export type NextPageWithLayout = NextPage & {
  getLayout?: (page: ReactElement) => ReactNode;
};

type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout;
};

export default function App({ Component, pageProps }: AppPropsWithLayout) {
  const isScreenLoader = useIsScreenLoader();

  const getLayout = Component.getLayout || ((page) => <Layout>{page}</Layout>);

  return (
    <>
      {isScreenLoader && <ScreenLoader />}
      {getLayout(<Component {...pageProps} />)}
    </>
  );
}

import Head from 'next/head';
import { useRouter } from 'next/router';

interface SEOProps {
  title?: string;
  description?: string;
  image?: string;
  url?: string;
  type?: string;
}

const SEO = ({
  title = 'PARANTHESE STUDIO',
  description = '',
  image = '/og-image.png',
  url = 'https://paranthese.studio',
  type = 'website',
}: SEOProps) => {
  const { asPath } = useRouter();

  return (
    <Head>
      <title>{title}</title>
      <meta content="en" name="language" />
      <meta content="en" httpEquiv="content-language" />
      <meta charSet="utf-8" />
      <meta content="width=device-width, initial-scale=1" name="viewport" />
      <meta content={description} name="description" />
      <meta content="telephone=no" name="format-detection" />
      <meta content="default" name="referrer" />

      {/* Indexation contrôlée */}
      <meta content="index, follow" name="robots" />

      {/* Canonical link */}
      <link key="canonical" href={'https://paranthese.studio' + asPath} rel="canonical" />

      {/* OpenGraph Tags */}
      <meta content={title} property="og:title" />
      <meta content={description} property="og:description" />
      <meta content={`${url}${image}`} property="og:image" />
      <meta content={url} property="og:url" />
      <meta content={type} property="og:type" />
      <meta content="PARANTHESE STUDIO" property="og:site_name" />
      <meta content="en_US" property="og:locale" />

      {/* Twitter Card */}
      <meta content="summary_large_image" name="twitter:card" />
      <meta content={title} name="twitter:title" />
      <meta content={description} name="twitter:description" />
      <meta content={`${url}${image}`} name="twitter:image" />

      {/* Keywords */}
      <meta
        content="PARANTHESE STUDIO, Augustin BRIOLON, creative studio, Paris, France, websites, sites, web, web experiences, design, development, animation, 3D, nextjs, gsap, threejs, unique, brands, agencies, studio"
        name="keywords"
      />

      {/* Favicon */}
      <link href="/favicon/favicon-96x96.png" rel="icon" sizes="96x96" type="image/png" />
      <link href="/favicon/favicon.svg" rel="icon" type="image/svg+xml" />
      <link href="/favicon/favicon.ico" rel="shortcut icon" />
      <link href="/favicon/apple-touch-icon.png" rel="apple-touch-icon" sizes="180x180" />
      <meta content="PARANTHESE STUDIO" name="apple-mobile-web-app-title" />
      <link href="/favicon/site.webmanifest" rel="manifest" />
    </Head>
  );
};

export default SEO;

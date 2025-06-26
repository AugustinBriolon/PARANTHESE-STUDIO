import Head from 'next/head';

const SEO = ({
  title = 'PARANTHESE STUDIO',
  description = 'Creative studio based in Paris, France, founded by Augustin Briolon. We create unique web experiences for brands and agencies.',
  image = '/ogimage.webp',
  url = 'https://paranthese.studio/',
}) => {
  return (
    <Head>
      <meta charSet="utf-8" />
      <meta content="width=device-width, initial-scale=1" name="viewport" />
      <meta content="#0E0E0E" name="msapplication-TileColor" />
      <meta content="#F9F8F6" name="theme-color" />
      <title>{title}</title>

      <meta content={title} name="apple-mobile-web-app-title" />
      <meta content="yes" name="mobile-web-app-capable" />
      <meta content="yes" name="apple-mobile-web-app-capable" />
      <meta content="black-translucent" name="apple-mobile-web-app-status-bar-style" />
      <meta content={description} name="description" />
      <meta
        content="paranthese studio, Augustin Briolon, creative studio, Paris, France, websites, sites, web, web experiences, design, development, animation, 3D, nextjs, gsap, threejs, unique, brands, agencies"
        name="keyword"
      />
      <meta content="notranslate" name="google" />

      {/* OGTAGS */}
      <meta content="PARANTHESE STUDIO" property="og:site_name" />
      <meta content={title} property="og:title" />
      <meta content="fr_FR" property="og:locale" />
      <meta content={description} property="og:description" />
      <meta content={image} property="og:image" />
      <meta content={url} property="og:url" />
      <meta content="PARANTHESE STUDIO" property="og:bsite" />

      {/* TWITTER CARDS  */}
      <meta content="summary_large_image" property="twitter:card" />
      <meta content="@ParantheseStudio" property="twitter:creator" />
      <meta content="PARANTHESE STUDIO" property="twitter:title" />
      <meta content={description} property="twitter:description" />
      <meta content={image} property="twitter:image" />
      <meta content={url} property="twitter:url" />
      <meta content="@ParantheseStudio" property="twitter:site" />
      <meta content="paranthese.studio" property="twitter:domain" />

      {/* FONT */}
      <link
        as="font"
        crossOrigin="anonymous"
        fetchPriority="high"
        href="/font/borna/borna.ttf"
        rel="preload"
        type="font/ttf"
      />

      {/* FAVICON */}
      <link href="/favicon/favicon-96x96.png" rel="icon" sizes="96x96" type="image/png" />
      <link href="/favicon/favicon.svg" rel="icon" type="image/svg+xml" />
      <link href="/favicon/favicon.ico" rel="shortcut icon" />
      <link href="/favicon/apple-touch-icon.png" rel="apple-touch-icon" sizes="180x180" />
      <meta content="PARANTHESE STUDIO" name="apple-mobile-web-app-title" />
      <link href="/favicon/site.webmanifest" rel="manifest" />

      {/* SEO */}
      <link href={url} rel="canonical" />
    </Head>
  );
};

export default SEO;

import Head from 'next/head';

const SEO = ({
  title = 'PARANTHESE STUDIO | Creative Studio',
  description = 'Based in Paris, Paranthese Studio creates tailor-made digital experiences that blend creativity, design, and technology to help brands stand out online.',
  image = '/images/ogimage.webp',
  url = 'https://www.paranthese.studio/',
}) => {
  return (
    <Head>
      <meta charSet="utf-8" />
      <meta content="width=device-width, initial-scale=1" name="viewport" />
      <meta content="#F9F8F6" name="msapplication-TileColor" />
      <meta content="#0E0E0E" name="theme-color" />
      <title>{title}</title>

      <meta content={title} name="apple-mobile-web-app-title" />
      <meta content="yes" name="mobile-web-app-capable" />
      <meta content="yes" name="apple-mobile-web-app-capable" />
      <meta content="black-translucent" name="apple-mobile-web-app-status-bar-style" />
      <meta content={description} name="description" />
      <meta content="notranslate" name="google" />

      {/* OGTAGS */}
      <meta content="PARANTHESE STUDIO" property="og:site_name" />
      <meta content={title} property="og:title" />
      <meta content="fr_FR" property="og:locale" />
      <meta content={description} property="og:description" />
      <meta content={image} property="og:image" />
      <meta content={url} property="og:url" />
      <meta content="website" property="og:type" />

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
      <meta content="index, follow" name="robots" />

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'Organization',
            '@id': 'https://paranthese.studio/',
            name: 'Paranthese Studio',
            url,
            logo: `${url}/favicon/favicon.svg`,
            sameAs: ['https://www.linkedin.com/company/paranthese-studio'],
            founder: {
              '@type': 'Person',
              name: 'Augustin Briolon',
            },
            address: {
              '@type': 'PostalAddress',
              addressCountry: 'FR',
              addressLocality: 'Paris',
            },
            description,
          }),
        }}
      />
    </Head>
  );
};

export default SEO;

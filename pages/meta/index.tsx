import Head from 'next/head';

export default function Meta() {
  return (
    <>
      <Head>
        <title>Paranthese Studio · Creative Web Studio in Paris</title>
        <meta
          content="Paranthese Studio is a creative web studio based in Paris, building custom-made, immersive, and animated websites using GSAP, WebGL, and modern front-end technologies."
          name="description"
        />
        <link href="https://paranthese.studio/meta" rel="canonical" />
      </Head>

      <main className="no-scrollbar mx-auto max-w-3xl overflow-scroll p-8">
        <h1>Creative Web Studio based in Paris</h1>
        <p>
          Paranthese Studio is a digital creative studio specialized in building immersive,
          animated, and high-performance websites. We combine minimal design, smooth animations, and
          cutting-edge front-end development to create unique online experiences.
        </p>

        <h2>What we do</h2>
        <ul>
          <li>GSAP-based animations and interactive storytelling</li>
          <li>High-quality front-end development with React, Next.js, Tailwind CSS</li>
          <li>Custom UX/UI design aligned with brand identity</li>
          <li>WebGL, Three.js, and creative coding for digital experiences</li>
        </ul>

        <h2>Our approach</h2>
        <p>
          We craft tailor-made websites where design meets performance and interactivity. Each
          project is a close collaboration with the client to deliver a distinctive and memorable
          digital presence.
        </p>

        <h2>Working globally</h2>
        <p>
          Although based in Paris, we work with international clients across industries. If you're
          looking for a partner to bring a creative, bold and technically advanced project to life,
          Paranthese Studio is ready to collaborate.
        </p>

        <h2>Keywords</h2>
        <p>
          Creative Web Studio · GSAP Portfolio · Web Animation · Paris Design Studio · Interactive
          Website · Custom Web Experiences · Front-End Developer · Immersive Web Design · React +
          GSAP Experts · WebGL Agency
        </p>
      </main>
    </>
  );
}

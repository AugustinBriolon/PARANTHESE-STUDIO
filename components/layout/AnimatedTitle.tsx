import AnimatedWord from '../ui/AnimateWord';

export default function AnimatedTitle() {
  return (
    <div className="flex flex-1 items-center justify-start">
      <div>
        <AnimatedWord delay={0.1}>Creative Studio</AnimatedWord>
        <AnimatedWord delay={0.2}>Not just websites</AnimatedWord>
        <AnimatedWord delay={0.3}>Based in Paris</AnimatedWord>
        <AnimatedWord delay={0.4}>
          <a
            className="group relative pb-1 text-xs md:text-lg"
            href="https://august1.dev/"
            target="_blank"
          >
            By Augustin Briolon
            <div className="absolute bottom-0 left-0 h-px w-full origin-left scale-x-0 rounded-full bg-black transition-all duration-300 will-change-transform group-hover:scale-x-100"></div>
          </a>
        </AnimatedWord>
        <h2 className="sr-only">PARANTHESE STUDIO</h2>
      </div>
    </div>
  );
}

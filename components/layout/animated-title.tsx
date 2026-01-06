import AnimatedWord from '@/components/shared/animated-word';

export default function AnimatedTitle() {
  return (
    <div className="flex flex-1 items-center justify-start">
      <div>
        <AnimatedWord delay={0.1}>Creative Studio</AnimatedWord>
        <AnimatedWord delay={0.2}>Not just websites</AnimatedWord>
        <AnimatedWord delay={0.3}>Based in Paris</AnimatedWord>
        <h2 className="sr-only">PARANTHESE STUDIO</h2>
      </div>
    </div>
  );
}

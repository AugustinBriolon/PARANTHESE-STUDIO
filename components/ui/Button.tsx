import React, { forwardRef, useRef } from 'react';
import gsap from 'gsap';

interface ButtonProps {
  children: React.ReactNode;
  variant?: 'black' | 'white';
  className?: string;
  href?: string;
}

const Button = forwardRef<HTMLDivElement, ButtonProps>(
  ({ children, variant = 'black', className = '', href }, ref) => {
    const baseClasses = 'cursor-pointer rounded-full px-4 py-1.5 sm:px-6 sm:py-1.5 min-h-[2.5em]';
    const variantClasses =
      variant === 'white' ? 'bg-white border border-black text-black' : 'bg-black text-white';

    const textRef = useRef<HTMLSpanElement>(null);
    const hoverTextRef = useRef<HTMLSpanElement>(null);

    const handleMouseEnter = () => {
      gsap.set(textRef.current, { y: 0, opacity: 1 });
      gsap.set(hoverTextRef.current, { y: 10, opacity: 0 });
      if (!children) return;
      const tl = gsap.timeline();
      tl.to(textRef.current, {
        y: -10,
        opacity: 0,
        duration: 0.4,
        ease: 'power2.inOut',
      });
      tl.to(
        hoverTextRef.current,
        {
          y: 0,
          opacity: 1,
          duration: 0.2,
          ease: 'power2.inOut',
        },
        '<0.2',
      );
    };

    return (
      <div
        ref={ref}
        className={`group relative inline-block align-middle ${baseClasses} ${variantClasses} ${className}`}
        onMouseEnter={handleMouseEnter}
        onClick={() => {
          if (href) {
            window.open(href, '_blank');
          }
        }}
      >
        <div
          className={`absolute top-1/2 left-1/2 -z-10 h-10 w-full -translate-x-1/2 -translate-y-1/2 rounded-full transition-all duration-300 group-hover:scale-105 ${variantClasses}`}
        ></div>
        <span
          aria-hidden="true"
          className="pointer-events-none invisible block h-0"
          style={{ position: 'static', height: 0 }}
        >
          {children}
        </span>
        <span
          ref={textRef}
          className={`absolute top-1/2 right-0 left-0 -translate-y-1/2 opacity-100 transition-none ${
            variant === 'white' ? 'text-black' : 'text-white'
          } flex items-center justify-center font-medium whitespace-nowrap uppercase`}
        >
          {children}
        </span>
        {children && (
          <span
            ref={hoverTextRef}
            className={`absolute top-1/2 right-0 left-0 -translate-y-1/2 opacity-0 transition-none ${
              variant === 'white' ? 'text-black' : 'text-white'
            } flex items-center justify-center font-medium whitespace-nowrap uppercase`}
          >
            {children}
          </span>
        )}
      </div>
    );
  },
);

Button.displayName = 'Button';

export default Button;

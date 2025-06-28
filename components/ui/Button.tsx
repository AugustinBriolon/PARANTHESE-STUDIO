import React, { forwardRef } from 'react';

interface ButtonProps {
  children: React.ReactNode;
  variant?: 'black' | 'white';
  className?: string;
  href?: string;
}

const Button = forwardRef<HTMLDivElement, ButtonProps>(
  ({ children, variant = 'black', className = '', href }, ref) => {
    const baseClasses = 'w-fit cursor-pointer rounded-full px-6 py-1.5';
    const variantClasses =
      variant === 'white' ? 'bg-white border border-black text-black' : 'bg-black text-white';

    return (
      <div
        ref={ref}
        className={`${baseClasses} ${variantClasses} ${className}`}
        onClick={() => {
          if (href) {
            window.open(href, '_blank');
          }
        }}
      >
        <span
          className={`${variant === 'white' ? 'text-black' : 'text-white'} font-medium uppercase`}
        >
          {children}
        </span>
      </div>
    );
  },
);

Button.displayName = 'Button';

export default Button;

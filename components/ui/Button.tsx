import React from 'react';

interface ButtonProps {
  children: React.ReactNode;
  variant?: 'black' | 'white';
  className?: string;
}

export default function Button({ children, variant = 'black', className = '' }: ButtonProps) {
  const baseClasses = 'w-fit cursor-pointer rounded-full px-6 py-1.5';
  const variantClasses =
    variant === 'white' ? 'bg-white border border-black text-black' : 'bg-black text-white';

  return (
    <div className={`${baseClasses} ${variantClasses} ${className}`}>
      <span
        className={`${variant === 'white' ? 'text-black' : 'text-white'} font-medium uppercase`}
      >
        {children}
      </span>
    </div>
  );
}

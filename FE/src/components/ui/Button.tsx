import * as React from 'react';
import { cn } from '@/lib/utils';

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost' | 'danger' | 'success';
  size?: 'sm' | 'md' | 'lg';
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = 'primary', size = 'md', onClick, ...props }, ref) => {
    const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
      const button = e.currentTarget;
      const rect = button.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      
      const diameter = Math.max(rect.width, rect.height);

      const span = document.createElement('span');
      
      const isColored = variant === 'primary' || variant === 'danger' || variant === 'success';
      const bgColor = isColored ? 'rgba(255,255,255,0.3)' : 'rgba(0,0,0,0.1)';
      
      span.className = 'ripple-effect absolute rounded-full pointer-events-none';
      span.style.width = `${diameter}px`;
      span.style.height = `${diameter}px`;
      span.style.marginTop = `${-diameter / 2}px`;
      span.style.marginLeft = `${-diameter / 2}px`;
      span.style.left = `${x}px`;
      span.style.top = `${y}px`;
      span.style.backgroundColor = bgColor;
      span.style.animation = 'ripple 600ms linear';
      
      button.appendChild(span);
      setTimeout(() => span.remove(), 600);

      onClick?.(e);
    };

    return (
      <button
        ref={ref}
        onClick={handleClick}
        className={cn(
          'inline-flex items-center justify-center rounded-md font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-primary)] disabled:pointer-events-none disabled:opacity-50 cursor-pointer overflow-hidden relative active:scale-[0.98]',
          {
            'bg-[var(--color-primary)] text-white hover:bg-blue-600': variant === 'primary',
            'bg-slate-100 text-[var(--color-text-primary)] hover:bg-slate-200': variant === 'secondary',
            'border border-[var(--color-border)] bg-transparent hover:bg-slate-100': variant === 'outline',
            'bg-transparent hover:bg-slate-100': variant === 'ghost',
            'bg-[var(--color-danger)] text-white hover:bg-red-600': variant === 'danger',
            'bg-[var(--color-success)] text-white hover:bg-emerald-600': variant === 'success',
            'h-8 px-3 text-xs': size === 'sm',
            'h-10 px-4 py-2 text-sm': size === 'md',
            'h-12 px-8 text-base': size === 'lg',
          },
          className
        )}
        {...props}
      />
    );
  }
);
Button.displayName = 'Button';

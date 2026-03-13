import * as React from 'react';
import { cn } from '@/lib/utils';

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost' | 'danger' | 'success';
  size?: 'sm' | 'md' | 'lg';
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = 'primary', size = 'md', ...props }, ref) => {
    return (
      <button
        ref={ref}
        className={cn(
          'inline-flex items-center justify-center rounded-md font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-primary)] disabled:pointer-events-none disabled:opacity-50 cursor-pointer',
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

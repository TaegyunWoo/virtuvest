import * as React from 'react';
import { cn } from '@/lib/utils';

export interface BadgeProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: 'default' | 'success' | 'danger' | 'outline';
}

export function Badge({ className, variant = 'default', ...props }: BadgeProps) {
  return (
    <div
      className={cn(
        'inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold transition-colors shadow-sm focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2',
        {
          'bg-[var(--color-primary)] text-white hover:bg-blue-600': variant === 'default',
          'bg-[var(--color-success)] text-white': variant === 'success',
          'bg-[var(--color-danger)] text-white': variant === 'danger',
          'text-[var(--color-text-primary)] border border-[var(--color-border)]': variant === 'outline',
        },
        className
      )}
      {...props}
    />
  );
}

import * as React from 'react';
import { TrendingUp } from 'lucide-react';
import { cn } from '@/lib/utils';

export interface LogoProps extends React.HTMLAttributes<HTMLDivElement> {
  size?: 'sm' | 'md' | 'lg';
  collapsed?: boolean;
}

export function Logo({ size = 'md', collapsed = false, className, ...props }: LogoProps) {
  const sizeClasses = {
    sm: 'text-lg',
    md: 'text-xl',
    lg: 'text-2xl',
  };

  const iconSizes = {
    sm: 16,
    md: 20,
    lg: 24,
  };

  return (
    <div
      className={cn('inline-flex items-center gap-2 font-bold text-[var(--color-primary)]', className)}
      {...props}
    >
      <TrendingUp size={iconSizes[size]} className="flex-shrink-0" />
      {!collapsed && (
        <span className={cn('flex items-center', sizeClasses[size])}>
          <span className="font-normal">Virtu</span>
          <span className="font-bold">Vest</span>
        </span>
      )}
    </div>
  );
}

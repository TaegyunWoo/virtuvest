import * as React from 'react';
import { cn } from '@/lib/utils';

export const Skeleton = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement> & {
    width?: string;
    height?: string;
  }
>(({ className, width = '100%', height = '16px', ...props }, ref) => (
  <div
    ref={ref}
    className={cn('animate-skeleton rounded bg-[#E2E8F0]', className)}
    style={{
      width,
      height,
    }}
    {...props}
  />
));
Skeleton.displayName = 'Skeleton';

export const SkeletonCard = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div ref={ref} className={cn('space-y-4 p-6', className)} {...props}>
      <div className="animate-skeleton rounded bg-[#E2E8F0]" style={{ height: '24px', width: '33%' }} />
      <div className="space-y-3">
        <div className="animate-skeleton rounded bg-[#E2E8F0]" style={{ height: '16px', width: '100%' }} />
        <div className="animate-skeleton rounded bg-[#E2E8F0]" style={{ height: '16px', width: '83%' }} />
        <div className="animate-skeleton rounded bg-[#E2E8F0]" style={{ height: '16px', width: '66%' }} />
      </div>
    </div>
  )
);
SkeletonCard.displayName = 'SkeletonCard';

export const SkeletonTable = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div ref={ref} className={cn('space-y-2', className)} {...props}>
      <div className="flex gap-4">
        {Array.from({ length: 5 }).map((_, i) => (
          <div key={`header-${i}`} className="animate-skeleton rounded bg-[#E2E8F0] flex-1" style={{ height: '32px' }} />
        ))}
      </div>
      {Array.from({ length: 5 }).map((_, rowIndex) => (
        <div key={`row-${rowIndex}`} className="flex gap-4">
          {Array.from({ length: 5 }).map((_, colIndex) => (
            <div key={`col-${colIndex}`} className="animate-skeleton rounded bg-[#E2E8F0] flex-1" style={{ height: '24px' }} />
          ))}
        </div>
      ))}
    </div>
  )
);
SkeletonTable.displayName = 'SkeletonTable';

export const SkeletonChart = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div
      ref={ref}
      className={cn('animate-skeleton rounded bg-[#E2E8F0]', className)}
      style={{ height: '300px', width: '100%' }}
      {...props}
    />
  )
);
SkeletonChart.displayName = 'SkeletonChart';

export const SkeletonStatCard = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div ref={ref} className={cn('space-y-3 p-6', className)} {...props}>
      <div className="animate-skeleton rounded bg-[#E2E8F0]" style={{ height: '16px', width: '50%' }} />
      <div className="animate-skeleton rounded bg-[#E2E8F0]" style={{ height: '32px', width: '100%' }} />
      <div className="animate-skeleton rounded bg-[#E2E8F0]" style={{ height: '12px', width: '33%' }} />
    </div>
  )
);
SkeletonStatCard.displayName = 'SkeletonStatCard';

import { Outlet } from 'react-router-dom';
import { Logo } from '@/components/ui/Logo';

export function AuthLayout() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-[var(--color-background)] p-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <Logo size="lg" />
          <p className="text-[var(--color-text-secondary)] mt-2">안전하고 스마트한 모의 투자</p>
        </div>
        <Outlet />
      </div>
    </div>
  );
}

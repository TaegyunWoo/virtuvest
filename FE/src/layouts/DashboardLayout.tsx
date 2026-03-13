import { useState } from 'react';
import { Outlet, NavLink, useNavigate } from 'react-router-dom';
import { LayoutDashboard, Search, PieChart, History, Menu, X, LogOut, User } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Logo } from '@/components/ui/Logo';
import { PageTransition } from '@/components/ui/PageTransition';
import { user } from '@/data/mockData';

const navItems = [
  { to: '/', label: '대시보드', icon: LayoutDashboard },
  { to: '/stocks', label: '종목 검색', icon: Search },
  { to: '/portfolio', label: '포트폴리오', icon: PieChart },
  { to: '/transactions', label: '거래 내역', icon: History },
];

export function DashboardLayout() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const navigate = useNavigate();

  const handleLogout = () => {
    navigate('/login');
  };

  return (
    <div className="min-h-screen bg-[var(--color-background)] flex flex-col md:flex-row">
      <div className="md:hidden flex items-center justify-between p-4 bg-[var(--color-surface)] border-b border-[var(--color-border)] z-20">
        <Logo size="sm" />
        <button onClick={() => setIsSidebarOpen(!isSidebarOpen)} className="p-2">
          {isSidebarOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      <aside
        className={cn(
          "fixed inset-y-0 left-0 z-10 w-64 bg-gradient-to-b from-[#1E293B] to-[#0F172A] transform transition-transform duration-200 ease-in-out md:relative md:translate-x-0",
          isSidebarOpen ? "translate-x-0" : "-translate-x-full"
        )}
      >
        <div className="hidden md:flex p-6 items-center border-b border-white/10">
          <Logo size="md" />
        </div>

        <div className="p-4 flex flex-col gap-2 mt-16 md:mt-0">
          {navItems.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              onClick={() => setIsSidebarOpen(false)}
              className={({ isActive }) =>
                cn(
                  "flex items-center gap-3 px-4 py-3 rounded-lg transition-colors",
                  isActive 
                    ? "bg-white/15 text-white" 
                    : "text-slate-400 hover:bg-white/10 hover:text-white"
                )
              }
            >
              <item.icon size={20} />
              <span className="font-medium">{item.label}</span>
            </NavLink>
          ))}
        </div>
      </aside>

      {isSidebarOpen && (
        <div 
          className="fixed inset-0 bg-black/20 z-0 md:hidden"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}

      <main className="flex-1 flex flex-col min-h-screen md:min-h-0 overflow-hidden">
        <header className="hidden md:flex h-16 bg-[var(--color-surface)] border-b border-[var(--color-border)] items-center justify-end px-8 shrink-0">
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2 text-[var(--color-text-secondary)]">
              <User size={18} />
              <span className="text-sm font-medium">{user.nickname}님</span>
            </div>
            <button 
              onClick={handleLogout}
              className="p-2 text-[var(--color-text-secondary)] hover:text-[var(--color-danger)] transition-colors cursor-pointer"
            >
              <LogOut size={18} />
            </button>
          </div>
        </header>

        <div className="flex-1 overflow-auto p-4 md:p-8">
          <div className="max-w-7xl mx-auto space-y-6">
            <PageTransition>
              <Outlet />
            </PageTransition>
          </div>
        </div>
      </main>
    </div>
  );
}

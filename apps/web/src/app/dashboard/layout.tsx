'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { useAuth } from '@/lib/auth-context';
import { SparkleIcon } from '@/components/landing/SparkleIcon';

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const { user, loading, logout } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading && !user) {
      router.push('/login');
    }
  }, [user, loading, router]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[var(--bg-alt)]">
        <div className="text-[var(--text-secondary)]">Загрузка...</div>
      </div>
    );
  }

  if (!user) return null;

  return (
    <div className="min-h-screen bg-[var(--bg-alt)]">
      <nav className="fixed top-0 left-0 right-0 z-[1000] px-6 h-16 flex items-center bg-white/90 backdrop-blur-[20px] border-b border-[var(--border)]">
        <div className="max-w-[1200px] w-full mx-auto flex items-center justify-between">
          <Link href="/dashboard" className="flex items-center gap-3 no-underline text-[var(--text-primary)]">
            <div className="w-9 h-9 rounded-full grid place-items-center shadow-[inset_0_0_3px_0_#fff]" style={{ background: 'linear-gradient(0deg, #b1a3ff, #ff1418 80%)' }}>
              <SparkleIcon size={18} className="text-white" />
            </div>
            <div className="font-semibold text-base tracking-tight">
              Spotlight <span className="font-normal text-[var(--text-tertiary)]">/ Личный кабинет</span>
            </div>
          </Link>
          <div className="flex items-center gap-6">
            <Link href="/" className="text-sm text-[var(--text-secondary)] no-underline font-medium hover:text-[var(--text-primary)] transition-colors">
              На главную
            </Link>
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-full bg-[var(--bg-alt)] border border-[var(--border)] grid place-items-center text-xs font-bold text-[var(--text-secondary)]">
                {user.name.charAt(0).toUpperCase()}
              </div>
              <span className="text-sm font-medium text-[var(--text-primary)] hidden sm:inline">{user.name}</span>
              <button
                onClick={async () => { await logout(); router.push('/'); }}
                className="text-sm text-[var(--text-tertiary)] hover:text-alfa-red transition-colors bg-transparent border-none cursor-pointer"
              >
                Выйти
              </button>
            </div>
          </div>
        </div>
      </nav>
      <main className="pt-16">
        {children}
      </main>
    </div>
  );
}

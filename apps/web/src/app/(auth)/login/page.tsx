'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { useAuth } from '@/lib/auth-context';
import { SparkleIcon } from '@/components/landing/SparkleIcon';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    const result = await login(email, password);
    setLoading(false);
    if (result.success) {
      router.push('/dashboard');
    } else {
      setError(result.error || 'Ошибка входа');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[var(--bg-alt)] px-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <Link href="/" className="inline-flex items-center gap-3 no-underline text-[var(--text-primary)] mb-6">
            <div className="w-10 h-10 rounded-full grid place-items-center shadow-[inset_0_0_3px_0_#fff]" style={{ background: 'linear-gradient(0deg, #b1a3ff, #ff1418 80%)' }}>
              <SparkleIcon size={20} className="text-white" />
            </div>
            <span className="font-semibold text-lg tracking-tight">Нейропомощник</span>
          </Link>
          <h1 className="text-2xl font-bold text-[var(--text-primary)] mb-2">Вход в личный кабинет</h1>
          <p className="text-sm text-[var(--text-secondary)]">Войдите для управления подключением</p>
        </div>

        <form onSubmit={handleSubmit} className="bg-white rounded-[var(--radius-lg)] border border-[var(--border)] shadow-card p-8">
          {error && (
            <div className="mb-4 px-4 py-3 rounded-xl bg-[rgba(239,49,36,0.06)] border border-[rgba(239,49,36,0.15)] text-sm text-alfa-red">
              {error}
            </div>
          )}

          <div className="mb-4">
            <label className="block text-sm font-medium text-[var(--text-primary)] mb-1.5">Email</label>
            <input
              type="email"
              value={email}
              onChange={e => setEmail(e.target.value)}
              required
              className="w-full px-4 py-3 rounded-xl border border-[var(--border)] bg-[var(--bg-alt)] text-sm text-[var(--text-primary)] focus:outline-none focus:border-alfa-red focus:ring-2 focus:ring-[rgba(239,49,36,0.15)] transition-all placeholder:text-[var(--text-tertiary)]"
              placeholder="user@company.ru"
            />
          </div>

          <div className="mb-6">
            <label className="block text-sm font-medium text-[var(--text-primary)] mb-1.5">Пароль</label>
            <input
              type="password"
              value={password}
              onChange={e => setPassword(e.target.value)}
              required
              className="w-full px-4 py-3 rounded-xl border border-[var(--border)] bg-[var(--bg-alt)] text-sm text-[var(--text-primary)] focus:outline-none focus:border-alfa-red focus:ring-2 focus:ring-[rgba(239,49,36,0.15)] transition-all placeholder:text-[var(--text-tertiary)]"
              placeholder="Введите пароль"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3.5 rounded-xl bg-alfa-red text-white font-semibold text-sm hover:bg-alfa-red-hover transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? 'Входим...' : 'Войти'}
          </button>

          <p className="text-center text-sm text-[var(--text-secondary)] mt-5">
            Нет аккаунта?{' '}
            <Link href="/register" className="text-alfa-red no-underline font-medium hover:underline">
              Зарегистрироваться
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
}

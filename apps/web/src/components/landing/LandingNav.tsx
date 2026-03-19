'use client';

import Link from 'next/link';
import { SparkleIcon } from './SparkleIcon';

export function LandingNav() {
  return (
    <nav className="fixed top-0 left-0 right-0 z-[1000] px-6 h-16 flex items-center bg-white/85 backdrop-blur-[20px] border-b border-[var(--border)]">
      <div className="max-w-[1200px] w-full mx-auto flex items-center justify-between">
        <a href="#" className="flex items-center gap-3 no-underline text-[var(--text-primary)]">
          <div className="w-9 h-9 rounded-full grid place-items-center shadow-[inset_0_0_3px_0_#fff]" style={{ background: 'linear-gradient(0deg, #b1a3ff, #ff1418 80%)' }}>
            <SparkleIcon size={18} className="text-white" />
          </div>
          <div className="font-semibold text-base tracking-tight">
            Альфа-Бизнес <span className="font-normal text-[var(--text-tertiary)] ml-0.5">/ Нейропомощник</span>
          </div>
        </a>
        <div className="hidden md:flex items-center gap-8">
          <a href="#scenarios" className="text-sm text-[var(--text-secondary)] no-underline font-medium hover:text-[var(--text-primary)] transition-colors">Сценарии</a>
          <a href="#demo" className="text-sm text-[var(--text-secondary)] no-underline font-medium hover:text-[var(--text-primary)] transition-colors">Демо</a>
          <a href="#roadmap" className="text-sm text-[var(--text-secondary)] no-underline font-medium hover:text-[var(--text-primary)] transition-colors">Подключение</a>
          <a href="#contacts" className="text-sm text-[var(--text-secondary)] no-underline font-medium hover:text-[var(--text-primary)] transition-colors">Контакты</a>
          <a href="#why" className="text-sm text-[var(--text-secondary)] no-underline font-medium hover:text-[var(--text-primary)] transition-colors">Бенефиты</a>
        </div>
        <Link
          href="/dashboard"
          className="inline-flex items-center gap-2 px-5 py-2.5 bg-alfa-red text-white rounded-[10px] text-sm font-medium no-underline hover:bg-alfa-red-hover hover:-translate-y-px transition-all"
        >
          Личный кабинет
        </Link>
      </div>
    </nav>
  );
}

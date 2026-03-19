'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { api } from '@/lib/api';

interface TeamWithOnboardings {
  id: string;
  name: string;
  product: string;
  description: string;
  onboardings: { id: string; currentStep: number; status: string }[];
}

interface OnboardingFull {
  id: string;
  currentStep: number;
  status: string;
  team: { id: string; name: string; product: string };
  steps: { stepNumber: number; status: string; completedAt: string | null }[];
  createdAt: string;
  updatedAt: string;
}

export default function DashboardPage() {
  const [teams, setTeams] = useState<TeamWithOnboardings[]>([]);
  const [onboardings, setOnboardings] = useState<OnboardingFull[]>([]);
  const [loading, setLoading] = useState(true);
  const [showNewTeam, setShowNewTeam] = useState(false);
  const [teamName, setTeamName] = useState('');
  const [teamProduct, setTeamProduct] = useState('');
  const [teamDesc, setTeamDesc] = useState('');
  const [creating, setCreating] = useState(false);
  const router = useRouter();

  const fetchData = async () => {
    const [teamsRes, onbRes] = await Promise.all([api.teams.list(), api.onboardings.list()]);
    if (teamsRes.success) setTeams(teamsRes.data as TeamWithOnboardings[]);
    if (onbRes.success) setOnboardings(onbRes.data as OnboardingFull[]);
    setLoading(false);
  };

  useEffect(() => { fetchData(); }, []);

  const handleCreateTeam = async (e: React.FormEvent) => {
    e.preventDefault();
    setCreating(true);
    const res = await api.teams.create({ name: teamName, product: teamProduct, description: teamDesc });
    if (res.success) {
      setShowNewTeam(false);
      setTeamName(''); setTeamProduct(''); setTeamDesc('');
      fetchData();
    }
    setCreating(false);
  };

  const handleStartOnboarding = async (teamId: string) => {
    const res = await api.onboardings.create(teamId);
    if (res.success && res.data) {
      const data = res.data as OnboardingFull;
      router.push(`/dashboard/onboarding/${data.id}`);
    }
  };

  if (loading) {
    return <div className="max-w-[1200px] mx-auto px-6 py-12 text-[var(--text-secondary)]">Загрузка...</div>;
  }

  return (
    <div className="max-w-[1200px] mx-auto px-6 py-12">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold text-[var(--text-primary)] mb-2">Мои подключения</h1>
          <p className="text-[var(--text-secondary)]">Управляйте процессом интеграции ваших продуктов в Spotlight</p>
        </div>
        <button
          onClick={() => setShowNewTeam(true)}
          className="px-5 py-2.5 bg-alfa-red text-white rounded-xl text-sm font-semibold hover:bg-alfa-red-hover transition-colors"
        >
          + Новая команда
        </button>
      </div>

      {showNewTeam && (
        <div className="mb-8 bg-white border border-[var(--border)] rounded-[var(--radius-lg)] p-6 shadow-card">
          <h3 className="text-lg font-bold mb-4 text-[var(--text-primary)]">Создание команды</h3>
          <form onSubmit={handleCreateTeam} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-[var(--text-primary)] mb-1.5">Название команды</label>
              <input value={teamName} onChange={e => setTeamName(e.target.value)} required placeholder="Команда Тарифов"
                className="w-full px-4 py-3 rounded-xl border border-[var(--border)] bg-[var(--bg-alt)] text-sm focus:outline-none focus:border-alfa-red focus:ring-2 focus:ring-[rgba(239,49,36,0.15)] transition-all placeholder:text-[var(--text-tertiary)]" />
            </div>
            <div>
              <label className="block text-sm font-medium text-[var(--text-primary)] mb-1.5">Продукт</label>
              <input value={teamProduct} onChange={e => setTeamProduct(e.target.value)} required placeholder="Тарифы и остатки"
                className="w-full px-4 py-3 rounded-xl border border-[var(--border)] bg-[var(--bg-alt)] text-sm focus:outline-none focus:border-alfa-red focus:ring-2 focus:ring-[rgba(239,49,36,0.15)] transition-all placeholder:text-[var(--text-tertiary)]" />
            </div>
            <div>
              <label className="block text-sm font-medium text-[var(--text-primary)] mb-1.5">Описание</label>
              <textarea value={teamDesc} onChange={e => setTeamDesc(e.target.value)} placeholder="Краткое описание продукта..." rows={3}
                className="w-full px-4 py-3 rounded-xl border border-[var(--border)] bg-[var(--bg-alt)] text-sm focus:outline-none focus:border-alfa-red focus:ring-2 focus:ring-[rgba(239,49,36,0.15)] transition-all resize-none placeholder:text-[var(--text-tertiary)]" />
            </div>
            <div className="flex gap-3">
              <button type="submit" disabled={creating} className="px-6 py-2.5 bg-alfa-red text-white rounded-xl text-sm font-semibold hover:bg-alfa-red-hover transition-colors disabled:opacity-50">
                {creating ? 'Создаём...' : 'Создать'}
              </button>
              <button type="button" onClick={() => setShowNewTeam(false)} className="px-6 py-2.5 border border-[var(--border)] rounded-xl text-sm font-medium text-[var(--text-secondary)] hover:bg-[var(--bg-subtle)] transition-colors bg-transparent cursor-pointer">
                Отмена
              </button>
            </div>
          </form>
        </div>
      )}

      {onboardings.length > 0 && (
        <div className="mb-10">
          <h2 className="text-xl font-bold text-[var(--text-primary)] mb-4">Активные подключения</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {onboardings.map(onb => {
              const completedSteps = onb.steps.filter(s => s.status === 'completed').length;
              const totalSteps = onb.steps.length;
              const progress = Math.round((completedSteps / totalSteps) * 100);
              return (
                <Link
                  key={onb.id}
                  href={`/dashboard/onboarding/${onb.id}`}
                  className="bg-white border border-[var(--border)] rounded-[var(--radius-lg)] p-6 shadow-card hover:border-[var(--border-hover)] hover:-translate-y-0.5 hover:shadow-card-md transition-all no-underline"
                >
                  <div className="flex items-center justify-between mb-3">
                    <span className="font-bold text-[var(--text-primary)]">{onb.team.product}</span>
                    <span className={`text-xs font-semibold px-2.5 py-0.5 rounded-full ${
                      onb.status === 'completed'
                        ? 'bg-[rgba(48,209,88,0.08)] text-[#1B9E3E]'
                        : 'bg-[rgba(239,49,36,0.06)] text-alfa-red'
                    }`}>
                      {onb.status === 'completed' ? 'Завершено' : 'В процессе'}
                    </span>
                  </div>
                  <div className="text-sm text-[var(--text-secondary)] mb-3">{onb.team.name}</div>
                  <div className="mb-2 flex items-center justify-between text-xs text-[var(--text-tertiary)]">
                    <span>Прогресс</span>
                    <span>{completedSteps} / {totalSteps} шагов</span>
                  </div>
                  <div className="w-full h-2 bg-[var(--bg-alt)] rounded-full overflow-hidden">
                    <div className="h-full bg-alfa-red rounded-full transition-all" style={{ width: `${progress}%` }} />
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      )}

      {teams.length > 0 && (
        <div>
          <h2 className="text-xl font-bold text-[var(--text-primary)] mb-4">Мои команды</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {teams.map(team => (
              <div key={team.id} className="bg-white border border-[var(--border)] rounded-[var(--radius-lg)] p-6 shadow-card">
                <div className="font-bold text-[var(--text-primary)] mb-1">{team.name}</div>
                <div className="text-sm text-[var(--text-secondary)] mb-1">{team.product}</div>
                {team.description && <div className="text-xs text-[var(--text-tertiary)] mb-4">{team.description}</div>}
                {team.onboardings.length === 0 ? (
                  <button
                    onClick={() => handleStartOnboarding(team.id)}
                    className="w-full py-2.5 rounded-xl bg-alfa-red text-white text-sm font-semibold hover:bg-alfa-red-hover transition-colors"
                  >
                    Начать подключение
                  </button>
                ) : (
                  <div className="text-xs text-[var(--text-tertiary)]">
                    Подключений: {team.onboardings.length}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {teams.length === 0 && onboardings.length === 0 && (
        <div className="text-center py-16">
          <div className="w-16 h-16 rounded-full bg-[var(--bg-alt)] grid place-items-center mx-auto mb-4">
            <svg width={32} height={32} viewBox="0 0 24 24" fill="none" stroke="var(--text-tertiary)" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round">
              <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" /><circle cx="9" cy="7" r="4" /><path d="M23 21v-2a4 4 0 0 0-3-3.87" /><path d="M16 3.13a4 4 0 0 1 0 7.75" />
            </svg>
          </div>
          <h3 className="text-lg font-bold text-[var(--text-primary)] mb-2">Пока нет команд</h3>
          <p className="text-sm text-[var(--text-secondary)] mb-6">Создайте команду, чтобы начать подключение к Spotlight</p>
          <button
            onClick={() => setShowNewTeam(true)}
            className="px-6 py-3 bg-alfa-red text-white rounded-xl text-sm font-semibold hover:bg-alfa-red-hover transition-colors"
          >
            Создать команду
          </button>
        </div>
      )}
    </div>
  );
}

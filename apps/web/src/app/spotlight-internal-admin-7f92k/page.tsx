'use client';

import { useEffect, useMemo, useState } from 'react';
import { api } from '@/lib/api';

type AdminStep = {
  id: string;
  stepNumber: number;
  status: string;
  formData: Record<string, unknown>;
  artifacts: Record<string, unknown>;
  completedAt: string | null;
};

type AdminSkill = {
  id: string;
  currentStep: number;
  status: string;
  createdAt: string;
  updatedAt: string;
  team: {
    id: string;
    name: string;
    product: string;
    description: string;
    owner: {
      id: string;
      name: string;
      email: string;
      role: string;
      createdAt: string;
    };
  };
  steps: AdminStep[];
};

export default function InternalAdminSkillsPage() {
  const [skills, setSkills] = useState<AdminSkill[]>([]);
  const [selectedSkillId, setSelectedSkillId] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const load = async () => {
      setLoading(true);
      setError('');
      try {
        const res = await api.admin.listSkills();
        if (!res.success) {
          setError(res.error || 'Не удалось загрузить карточки');
          return;
        }
        const data = (res.data as AdminSkill[]) || [];
        setSkills(data);
        if (data.length > 0) setSelectedSkillId(data[0].id);
      } catch {
        setError('Не удалось загрузить карточки');
      } finally {
        setLoading(false);
      }
    };
    void load();
  }, []);

  const selected = useMemo(
    () => skills.find((s) => s.id === selectedSkillId) || null,
    [skills, selectedSkillId]
  );

  return (
    <main className="min-h-screen bg-[var(--bg-alt)]">
      <div className="max-w-[1400px] mx-auto px-6 py-10">
        <header className="mb-6">
          <h1 className="text-3xl font-bold text-[var(--text-primary)]">Внутренняя админка навыков</h1>
          <p className="text-sm text-[var(--text-secondary)] mt-2">
            Просмотр всех карточек подключения и деталей шагов по всем аккаунтам.
          </p>
        </header>

        {loading && <div className="text-[var(--text-secondary)]">Загрузка...</div>}
        {error && (
          <div className="px-4 py-3 rounded-xl bg-[rgba(239,49,36,0.06)] border border-[rgba(239,49,36,0.15)] text-sm text-alfa-red">
            {error}
          </div>
        )}

        {!loading && !error && (
          <div className="grid grid-cols-1 lg:grid-cols-[420px_1fr] gap-6">
            <section className="bg-white border border-[var(--border)] rounded-[var(--radius-lg)] shadow-card overflow-hidden">
              <div className="px-4 py-3 border-b border-[var(--border)] bg-[var(--bg-alt)] flex items-center justify-between">
                <span className="text-xs uppercase tracking-wider font-semibold text-[var(--text-tertiary)]">
                  Все карточки
                </span>
                <span className="text-xs text-[var(--text-tertiary)]">{skills.length}</span>
              </div>

              <div className="max-h-[75vh] overflow-y-auto">
                {skills.map((skill) => {
                  const completedCount = skill.steps.filter((s) => s.status === 'completed').length;
                  return (
                    <button
                      key={skill.id}
                      onClick={() => setSelectedSkillId(skill.id)}
                      className={`w-full text-left px-4 py-4 border-b border-[var(--border)] last:border-b-0 transition-colors ${
                        selectedSkillId === skill.id ? 'bg-[rgba(239,49,36,0.04)]' : 'hover:bg-[var(--bg-alt)]'
                      }`}
                    >
                      <div className="flex items-start justify-between gap-3">
                        <div>
                          <div className="text-sm font-semibold text-[var(--text-primary)]">{skill.team.product}</div>
                          <div className="text-xs text-[var(--text-secondary)] mt-1">{skill.team.name}</div>
                          <div className="text-xs text-[var(--text-tertiary)] mt-1">{skill.team.owner.email}</div>
                        </div>
                        <span
                          className={`text-[10px] px-2 py-0.5 rounded-full font-semibold ${
                            skill.status === 'completed'
                              ? 'bg-[rgba(48,209,88,0.1)] text-[#1B9E3E]'
                              : 'bg-[rgba(239,49,36,0.08)] text-alfa-red'
                          }`}
                        >
                          {skill.status === 'completed' ? 'Завершено' : 'В процессе'}
                        </span>
                      </div>
                      <div className="mt-3">
                        <div className="flex items-center justify-between text-[11px] text-[var(--text-tertiary)] mb-1">
                          <span>Прогресс</span>
                          <span>{completedCount}/{skill.steps.length}</span>
                        </div>
                        <div className="w-full h-1.5 bg-[var(--bg-alt)] rounded-full overflow-hidden">
                          <div
                            className="h-full bg-alfa-red rounded-full"
                            style={{ width: `${(completedCount / Math.max(skill.steps.length, 1)) * 100}%` }}
                          />
                        </div>
                      </div>
                    </button>
                  );
                })}
              </div>
            </section>

            <section className="bg-white border border-[var(--border)] rounded-[var(--radius-lg)] shadow-card overflow-hidden">
              {!selected && (
                <div className="p-8 text-[var(--text-secondary)]">Выберите карточку слева</div>
              )}

              {selected && (
                <>
                  <div className="px-6 py-5 border-b border-[var(--border)]">
                    <div className="flex items-center justify-between gap-4 flex-wrap">
                      <h2 className="text-xl font-bold text-[var(--text-primary)]">{selected.team.product}</h2>
                      <span className="text-xs text-[var(--text-tertiary)]">
                        Обновлено: {new Date(selected.updatedAt).toLocaleString('ru-RU')}
                      </span>
                    </div>
                    <div className="mt-2 text-sm text-[var(--text-secondary)]">{selected.team.name}</div>
                    <div className="mt-1 text-xs text-[var(--text-tertiary)]">
                      Владелец: {selected.team.owner.name} ({selected.team.owner.email})
                    </div>
                    {selected.team.description && (
                      <div className="mt-2 text-sm text-[var(--text-secondary)]">{selected.team.description}</div>
                    )}
                  </div>

                  <div className="p-6 space-y-4 max-h-[75vh] overflow-y-auto">
                    {selected.steps.map((step) => (
                      <details
                        key={step.id}
                        className="border border-[var(--border)] rounded-xl overflow-hidden bg-[var(--bg-alt)]"
                      >
                        <summary className="list-none cursor-pointer px-4 py-3 flex items-center justify-between">
                          <div className="flex items-center gap-3">
                            <span className="w-6 h-6 rounded-full bg-white border border-[var(--border)] text-xs grid place-items-center font-semibold text-[var(--text-secondary)]">
                              {step.stepNumber}
                            </span>
                            <span className="text-sm font-medium text-[var(--text-primary)]">
                              Шаг {step.stepNumber}
                            </span>
                          </div>
                          <span
                            className={`text-[10px] px-2 py-0.5 rounded-full font-semibold ${
                              step.status === 'completed'
                                ? 'bg-[rgba(48,209,88,0.1)] text-[#1B9E3E]'
                                : step.status === 'in_progress'
                                  ? 'bg-[rgba(0,122,255,0.1)] text-[#007AFF]'
                                  : step.status === 'active'
                                    ? 'bg-[rgba(239,49,36,0.1)] text-alfa-red'
                                    : 'bg-white text-[var(--text-tertiary)] border border-[var(--border)]'
                            }`}
                          >
                            {step.status}
                          </span>
                        </summary>

                        <div className="px-4 pb-4 space-y-3">
                          <div>
                            <div className="text-xs uppercase tracking-wider font-semibold text-[var(--text-tertiary)] mb-1">
                              Form Data
                            </div>
                            <pre className="text-xs p-3 rounded-lg bg-white border border-[var(--border)] overflow-x-auto text-[var(--text-secondary)]">
                              {JSON.stringify(step.formData, null, 2)}
                            </pre>
                          </div>

                          <div>
                            <div className="text-xs uppercase tracking-wider font-semibold text-[var(--text-tertiary)] mb-1">
                              Artifacts
                            </div>
                            <pre className="text-xs p-3 rounded-lg bg-white border border-[var(--border)] overflow-x-auto text-[var(--text-secondary)]">
                              {JSON.stringify(step.artifacts, null, 2)}
                            </pre>
                          </div>
                        </div>
                      </details>
                    ))}
                  </div>
                </>
              )}
            </section>
          </div>
        )}
      </div>
    </main>
  );
}

'use client';

import { useMemo, useState } from 'react';
import { FadeUp } from './FadeUp';

const scenarioCards = [
  {
    title: 'Тарифы',
    query: 'Какой у меня тариф? Какой будет комиссия за перевод в 500 тыс?',
    video: '/demo/tariff.mov',
  },
  {
    title: 'Контроль и управление незавершенными операциями',
    query: 'Какой у меня статус по операциям? Кто мне должен?',
    video: '/demo/invoice.mov',
  },
  {
    title: 'Финансовая аналитика по счету',
    query: 'Проанализируй мои расходы за месяц',
    video: '/demo/sbp-transfer.mov',
  },
  {
    title: 'Блокировка счёта',
    query: 'Мой счёт заблокирован, что делать?',
    video: '/demo/sbp-transfer.mov',
  },
];

export function Scenarios() {
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
  const selected = useMemo(
    () => (selectedIndex === null ? null : scenarioCards[selectedIndex]),
    [selectedIndex],
  );

  return (
    <section className="py-24 bg-[linear-gradient(180deg,var(--bg)_0%,var(--bg-alt)_100%)]" id="scenarios">
      <div className="max-w-[1200px] mx-auto px-6">
        <FadeUp className="text-center mb-16">
          <div className="mb-4">
            <span className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-[13px] font-medium bg-[var(--bg-subtle)] text-[var(--text-secondary)] border border-[var(--border)]">
              Демо навыков
            </span>
          </div>
          <h2 className="text-[clamp(32px,4vw,48px)] font-extrabold tracking-tight leading-[1.1] mb-4 text-[var(--text-primary)]">
            Кто уже работает с нами
          </h2>
          <p className="text-lg text-[var(--text-secondary)] max-w-[600px] mx-auto leading-relaxed">
            Смотрите демо продуктов которые будут в Spotlight
          </p>
        </FadeUp>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {scenarioCards.map((card, i) => (
            <FadeUp key={card.title} delay={i * 0.08}>
              <button
                type="button"
                onClick={() => setSelectedIndex(i)}
                className="w-full bg-white border border-[var(--border)] rounded-[var(--radius-lg)] overflow-hidden shadow-card hover:border-[var(--border-hover)] hover:-translate-y-1.5 hover:shadow-card-lg transition-all text-left"
              >
                <div className="aspect-[16/9] bg-black/85 relative">
                  <video muted loop autoPlay playsInline className="w-full h-full object-cover opacity-85">
                    <source src={card.video} type="video/quicktime" />
                    <source src={card.video} type="video/mp4" />
                  </video>
                  <div className="absolute inset-0 grid place-items-center bg-black/30">
                    <div className="w-[72px] h-[72px] rounded-full bg-white/90 grid place-items-center">
                      <svg width="28" height="28" viewBox="0 0 24 24" fill="currentColor" className="text-[var(--text-primary)] ml-1">
                        <polygon points="8,5 20,12 8,19" />
                      </svg>
                    </div>
                  </div>
                </div>
                <div className="p-6">
                  <div className="text-lg font-bold text-[var(--text-primary)] mb-2">{card.title}</div>
                  <div className="text-sm text-[var(--text-secondary)] leading-relaxed">💬 {card.query}</div>
                </div>
              </button>
            </FadeUp>
          ))}
        </div>
      </div>

      {selected && (
        <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4">
          <button
            type="button"
            className="absolute inset-0 bg-black/80 backdrop-blur-sm"
            aria-label="Закрыть демо"
            onClick={() => setSelectedIndex(null)}
          />
          <div className="relative w-full max-w-[960px] bg-white rounded-[var(--radius-xl)] overflow-hidden shadow-[0_32px_80px_rgba(0,0,0,0.4)]">
            <div className="flex items-center justify-between px-6 py-5 border-b border-[var(--border)]">
              <div className="text-lg font-bold text-[var(--text-primary)]">{selected.title}</div>
              <button
                type="button"
                className="w-10 h-10 rounded-full bg-[var(--bg-subtle)] hover:bg-[rgba(239,49,36,0.08)] transition-colors"
                aria-label="Закрыть"
                onClick={() => setSelectedIndex(null)}
              >
                ✕
              </button>
            </div>
            <div className="bg-black">
              <video controls autoPlay playsInline className="w-full max-h-[70vh] object-contain">
                <source src={selected.video} type="video/quicktime" />
                <source src={selected.video} type="video/mp4" />
              </video>
            </div>
            <div className="px-6 py-4 bg-[var(--bg-alt)] border-t border-[var(--border)] text-sm text-[var(--text-secondary)]">
              <span className="font-semibold text-[var(--text-primary)]">Клиент спрашивает:</span> {selected.query}
            </div>
          </div>
        </div>
      )}
    </section>
  );
}

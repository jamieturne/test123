import { FadeUp } from './FadeUp';

const metrics = [
  { value: '+35%', label: 'обращений через новый\nAI-канал' },
  { value: '−20%', label: 'нагрузки на поддержку\nпо типовым вопросам' },
  { value: '3×', label: 'выше конверсия\nв целевое действие' },
  { value: '+15%', label: 'рост Retention D7\nпользователей Spotlight' },
];

export function Metrics() {
  return (
    <section className="bg-[var(--bg-alt)] border-t border-b border-[var(--border)]">
      <div className="max-w-[1200px] mx-auto px-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
          {metrics.map((m, i) => (
            <FadeUp key={i} delay={i * 0.1} className={`py-12 px-8 text-center relative hover:bg-[rgba(239,49,36,0.02)] transition-colors ${i < metrics.length - 1 ? 'lg:border-r lg:border-[var(--border)]' : ''}`}>
              <div className="text-5xl font-extrabold tracking-tight leading-none mb-2">
                <span className="bg-gradient-to-br from-alfa-red to-[#FF6B5A] bg-clip-text text-transparent">{m.value}</span>
              </div>
              <div className="text-sm text-[var(--text-secondary)] leading-relaxed whitespace-pre-line">{m.label}</div>
            </FadeUp>
          ))}
        </div>
      </div>
    </section>
  );
}

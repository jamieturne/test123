import { FadeUp } from './FadeUp';
import { ROADMAP_STEPS } from '@spotlight/shared';

export function Roadmap() {
  return (
    <section className="py-24 relative" id="roadmap">
      <div className="max-w-[1200px] mx-auto px-6">
        <FadeUp className="text-center mb-16">
          <div className="mb-4">
            <span className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-[13px] font-medium bg-[rgba(48,209,88,0.08)] text-[#1B9E3E] border border-[rgba(48,209,88,0.2)]">
              Хочу добавить свой продукт
            </span>
          </div>
          <h2 className="text-[clamp(32px,4vw,48px)] font-extrabold tracking-tight leading-[1.1] mb-4 text-[var(--text-primary)]">
            Roadmap подключения
          </h2>
          <p className="text-lg text-[var(--text-secondary)] max-w-[640px] mx-auto leading-relaxed">
            {ROADMAP_STEPS.length} фаз от идеи до&nbsp;продакшена. Простой сценарий — 1&nbsp;спринт, сложный — 2-3.
          </p>
        </FadeUp>

        <div className="max-w-[900px] mx-auto relative pl-7">
          <div className="absolute left-[15px] top-0 bottom-0 w-0.5 bg-[var(--border)]" />

          {ROADMAP_STEPS.map((step, i) => (
            <FadeUp key={step.number} delay={i * 0.06} className="relative flex gap-6 mb-6 last:mb-0 pl-4 group">
              <div className={`absolute -left-7 top-0.5 w-7 h-7 rounded-full grid place-items-center text-xs font-bold z-[2] transition-all border-2 ${
                i === 0
                  ? 'bg-alfa-red border-alfa-red text-white'
                  : 'bg-white border-[var(--border-hover)] text-[var(--text-secondary)] group-hover:border-alfa-red group-hover:text-alfa-red'
              }`}>
                {step.number}
              </div>
              <div className={`flex-1 bg-white border rounded-[var(--radius-md)] px-6 py-5 shadow-card transition-all group-hover:border-[var(--border-hover)] group-hover:shadow-card-md ${
                i === 0 ? 'border-[var(--border-active)] shadow-[0_2px_12px_rgba(239,49,36,0.06)]' : 'border-[var(--border)]'
              }`}>
                <div className="flex items-center justify-between gap-3 mb-1 flex-wrap">
                  <span className="text-base font-bold text-[var(--text-primary)]">
                    Фаза {step.number}. {step.title}
                  </span>
                  {step.timeline && (
                    <span className="text-xs font-semibold text-alfa-red bg-[rgba(239,49,36,0.06)] px-2.5 py-0.5 rounded-full whitespace-nowrap">
                      {step.timeline}
                    </span>
                  )}
                </div>
                {step.subtitle && (
                  <div className="text-[13px] text-[var(--text-secondary)] font-medium mb-2">{step.subtitle}</div>
                )}
                {step.responsible && (
                  <div className="text-xs text-[var(--text-tertiary)]">Ответственный: {step.responsible}</div>
                )}
              </div>
            </FadeUp>
          ))}
        </div>
      </div>
    </section>
  );
}

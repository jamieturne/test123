import { FadeUp } from './FadeUp';

const slides = [
  { title: 'Spotlight - слайд 1', subtitle: 'Витрина возможностей Spotlight' },
  { title: 'Spotlight - слайд 2', subtitle: 'Пользовательские сценарии в АБ и АБМ' },
  { title: 'Spotlight - слайд 3', subtitle: 'Путь подключения продукта' },
  { title: 'Spotlight - слайд 4', subtitle: 'Интеграция через AI Flow и MCP' },
  { title: 'Spotlight - слайд 5', subtitle: 'Контакты и поддержка команды' },
];

export function Benefits() {
  return (
    <section className="py-24 bg-white" id="why">
      <div className="max-w-[1200px] mx-auto px-6">
        <FadeUp className="text-center mb-16">
          <div className="mb-4">
            <span className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-[13px] font-medium bg-[var(--bg-subtle)] text-[var(--text-secondary)] border border-[var(--border)]">
              О продукте
            </span>
          </div>
          <h2 className="text-[clamp(32px,4vw,48px)] font-extrabold tracking-tight leading-[1.1] mb-4 text-[var(--text-primary)]">
            Про Spotlight
          </h2>
          <p className="text-lg text-[var(--text-secondary)] max-w-[600px] mx-auto leading-relaxed">
            Узнайте больше о возможностях платформы и преимуществах подключения
          </p>
        </FadeUp>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
          {slides.map((slide, i) => (
            <FadeUp key={slide.title} delay={i * 0.08} className="rounded-[var(--radius-lg)] overflow-hidden shadow-card border border-[var(--border)]">
              <div className="aspect-[16/9] p-6 flex flex-col justify-end bg-gradient-to-br from-[#ffe9e7] via-[#f7f7fb] to-[#ecebff]">
                <div className="text-base font-bold text-[var(--text-primary)]">{slide.title}</div>
                <div className="text-sm text-[var(--text-secondary)] mt-2">{slide.subtitle}</div>
              </div>
            </FadeUp>
          ))}
        </div>
      </div>
    </section>
  );
}

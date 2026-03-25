import { FadeUp } from './FadeUp';

export function CTA() {
  return (
    <section className="py-28 text-center relative overflow-hidden bg-white" id="connect">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px]" style={{ background: 'radial-gradient(ellipse, rgba(239,49,36,0.05) 0%, transparent 70%)' }} />
      <FadeUp className="relative z-10">
        <h2 className="text-[clamp(32px,4vw,52px)] font-extrabold tracking-tight mb-4 leading-[1.1] text-[var(--text-primary)]">
          Готовы подключиться?
        </h2>
        <p className="text-lg text-[var(--text-secondary)] mb-10 max-w-[500px] mx-auto">
          Встройте свой продукт в главную строку банка. Соберите сценарии, реализуйте MCP - и ваш навык появится в Spotlight. Мы поможем на каждом шаге.
        </p>
        <div className="flex gap-4 justify-center flex-wrap">
          <a href="mailto:spotlight-platform@alfaintra.net?subject=[Подключение к Spotlight]" className="inline-flex items-center justify-center gap-2.5 px-8 py-4 rounded-[14px] text-base font-semibold no-underline bg-alfa-red text-white shadow-[0_4px_24px_rgba(239,49,36,0.25)] hover:bg-alfa-red-hover hover:-translate-y-0.5 transition-all">
            Написать команде Spotlight
          </a>
          <a href="#demo" className="inline-flex items-center justify-center gap-2.5 px-8 py-4 rounded-[14px] text-base font-semibold no-underline bg-transparent text-[var(--text-primary)] border border-[var(--border-hover)] hover:bg-[var(--bg-subtle)] hover:-translate-y-0.5 transition-all">
            Смотреть документацию
          </a>
        </div>
      </FadeUp>
    </section>
  );
}

import { FadeUp } from './FadeUp';

export function Demo() {
  return (
    <section className="py-24 bg-[var(--bg-alt)]" id="demo">
      <div className="max-w-[1200px] mx-auto px-6">
        <FadeUp className="text-center mb-16">
          <div className="mb-4">
            <span className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-[13px] font-medium bg-[var(--bg-subtle)] text-[var(--text-secondary)] border border-[var(--border)]">
              Демо и&nbsp;документация
            </span>
          </div>
          <h2 className="text-[clamp(32px,4vw,48px)] font-extrabold tracking-tight leading-[1.1] mb-4 text-[var(--text-primary)]">
            Посмотрите, как это устроено
          </h2>
          <p className="text-lg text-[var(--text-secondary)] max-w-[600px] mx-auto leading-relaxed">
            Видео-демо работы Spotlight, инструкция по&nbsp;AI&nbsp;Flow и&nbsp;полная документация для&nbsp;подключения
          </p>
        </FadeUp>

        <FadeUp className="mb-12 max-w-5xl mx-auto">
          <div className="rounded-[var(--radius-lg)] overflow-hidden border border-[var(--border)] shadow-card-lg bg-black">
            {/* 16:9 — блок демо всегда в киношной пропорции */}
            <div className="relative w-full aspect-[16/9]">
              <video
                controls
                playsInline
                tabIndex={-1}
                className="absolute inset-0 w-full h-full object-contain bg-black"
              >
                <source src="/demo/sbp-transfer.mov" type="video/quicktime" />
                <source src="/demo/sbp-transfer.mov" type="video/mp4" />
              </video>
            </div>
          </div>
        </FadeUp>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {[
            { title: 'AI Flow — инструкция', desc: 'Как создать сценарий в\u00a0визуальном конструкторе, подключить MCP-сервер и\u00a0протестировать.', link: 'Смотреть инструкцию', color: 'var(--blue)', bg: 'rgba(0,122,255,0.08)', border: 'rgba(0,122,255,0.15)' },
            { title: 'Полная документация', desc: 'CookBook, шаблоны MCP-серверов (Java/Python), карточка навыка, описание API-контрактов.', link: 'Открыть Confluence', color: 'var(--purple)', bg: 'rgba(175,82,222,0.08)', border: 'rgba(175,82,222,0.15)' },
            { title: 'О нас — команда Spotlight', desc: 'Платформа, шаблоны, чат поддержки, персональный контакт. Помогаем от\u00a0карточки до\u00a0продакшена.', link: 'Связаться с командой', color: 'var(--alfa-red)', bg: 'rgba(239,49,36,0.08)', border: 'rgba(239,49,36,0.15)' },
          ].map((item, i) => (
            <FadeUp key={i} delay={i * 0.1} className="bg-white border border-[var(--border)] rounded-[var(--radius-md)] p-7 no-underline text-[var(--text-primary)] shadow-card hover:border-[var(--border-hover)] hover:-translate-y-1 hover:shadow-card-lg transition-all flex flex-col gap-4 cursor-pointer">
              <div className="w-12 h-12 rounded-xl flex items-center justify-center" style={{ background: item.bg, border: `1px solid ${item.border}` }}>
                <svg width={22} height={22} viewBox="0 0 24 24" fill="none" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" style={{ stroke: item.color }}>
                  <circle cx="12" cy="12" r="10" />
                  <polygon points="10 8 16 12 10 16 10 8" />
                </svg>
              </div>
              <div className="text-base font-bold">{item.title}</div>
              <div className="text-[13px] text-[var(--text-secondary)] leading-relaxed">{item.desc}</div>
              <div className="text-[13px] font-semibold text-alfa-red flex items-center gap-1.5">
                {item.link}
                <svg width={14} height={14} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
                  <line x1="5" y1="12" x2="19" y2="12" /><polyline points="12 5 19 12 12 19" />
                </svg>
              </div>
            </FadeUp>
          ))}
        </div>
      </div>
    </section>
  );
}

import { FadeUp } from './FadeUp';

const scenarioCards = [
  {
    title: 'Тарифы и\u00a0остатки',
    query: '«Какой у меня тариф и сколько на счёте?»',
    response: 'AI определяет навык → вызывает API тарифов и\u00a0счетов → отвечает: <strong>тариф «Быстрые платежи», остаток 1\u00a0247\u00a0500 ₽</strong>, дата следующего списания.',
    video: '/demo/tariff.mov',
    footer: 'Без Spotlight: найти раздел «Тарифы» → открыть счёт → посмотреть детали',
    iconColor: 'rgba(0,122,255,0.08)',
    iconBorder: 'rgba(0,122,255,0.15)',
    iconStroke: 'var(--blue)',
    iconPath: '<rect x="2" y="5" width="20" height="14" rx="2"/><line x1="2" y1="10" x2="22" y2="10"/>',
  },
  {
    title: 'Перевод по\u00a0СБП',
    query: '«Переведи 50 000 по СБП на +7 900 123-45-67»',
    response: 'AI парсит сумму и\u00a0номер → подготавливает перевод → клиент нажимает <strong>«Подтвердить»</strong> прямо в\u00a0чате.',
    video: '/demo/sbp-transfer.mov',
    footer: 'Без Spotlight: «Платежи» → «Новый» → «СБП» → заполнить форму → подтвердить',
    iconColor: 'rgba(48,209,88,0.08)',
    iconBorder: 'rgba(48,209,88,0.15)',
    iconStroke: 'var(--green)',
    iconPath: '<line x1="12" y1="1" x2="12" y2="23"/><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/>',
  },
  {
    title: 'Выставление счетов',
    query: '«Выстави счёт ООО "Рога и Копыта" на 150 000 ₽ за консалтинг»',
    response: 'AI находит контрагента → заполняет реквизиты → формирует счёт → <strong>счёт готов, подпишите</strong>.',
    video: '/demo/invoice.mov',
    footer: 'Без Spotlight: «Счета» → «Создать» → выбрать контрагента → заполнить 7 полей',
    iconColor: 'rgba(255,159,10,0.08)',
    iconBorder: 'rgba(255,159,10,0.15)',
    iconStroke: 'var(--orange)',
    iconPath: '<path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/>',
  },
  {
    title: 'Блокировка счёта',
    query: '«Мой счёт заблокирован, что делать?»',
    response: 'AI проверяет статус → определяет причину → выдаёт <strong>пошаговую инструкцию</strong> по разблокировке с\u00a0перечнем документов.',
    video: '/demo/block-account.mov',
    footer: 'Без Spotlight: звонок в поддержку → ожидание → переключение на специалиста',
    iconColor: 'rgba(239,49,36,0.08)',
    iconBorder: 'rgba(239,49,36,0.15)',
    iconStroke: 'var(--alfa-red)',
    iconPath: '<rect x="3" y="11" width="18" height="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/>',
  },
];

export function Scenarios() {
  return (
    <section className="py-24 relative" id="scenarios">
      <div className="max-w-[1200px] mx-auto px-6">
        <FadeUp className="text-center mb-16">
          <div className="mb-4">
            <span className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-[13px] font-medium bg-[var(--bg-subtle)] text-[var(--text-secondary)] border border-[var(--border)]">
              Сценарии для демо
            </span>
          </div>
          <h2 className="text-[clamp(32px,4vw,48px)] font-extrabold tracking-tight leading-[1.1] mb-4 text-[var(--text-primary)]">
            Как это работает для&nbsp;клиента
          </h2>
          <p className="text-lg text-[var(--text-secondary)] max-w-[600px] mx-auto leading-relaxed">
            Клиент пишет запрос — Spotlight понимает контекст, вызывает нужный навык и&nbsp;возвращает ответ
          </p>
        </FadeUp>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {scenarioCards.map((card, i) => (
            <FadeUp key={i} delay={i * 0.1} className="bg-white border border-[var(--border)] rounded-[var(--radius-lg)] overflow-hidden shadow-card hover:border-[var(--border-hover)] hover:-translate-y-1 hover:shadow-card-lg transition-all">
              <div className="px-6 pt-6 flex items-center gap-3">
                <div className="w-10 h-10 rounded-[10px] flex items-center justify-center flex-shrink-0" style={{ background: card.iconColor, border: `1px solid ${card.iconBorder}` }}>
                  <svg width={20} height={20} viewBox="0 0 24 24" fill="none" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" style={{ stroke: card.iconStroke }} dangerouslySetInnerHTML={{ __html: card.iconPath }} />
                </div>
                <span className="text-sm font-semibold text-[var(--text-primary)]">{card.title}</span>
              </div>
              <div className="px-6 py-4">
                <div className="bg-[var(--bg-alt)] border border-[var(--border)] rounded-xl px-4 py-3 mb-3">
                  <div className="text-[10px] font-bold uppercase tracking-widest text-[var(--text-tertiary)] mb-1">Клиент спрашивает</div>
                  <div className="text-sm text-[var(--text-secondary)] italic">{card.query}</div>
                </div>
                <div className="text-[13px] text-[var(--text-secondary)] leading-relaxed [&_strong]:text-[var(--text-primary)] [&_strong]:font-semibold" dangerouslySetInnerHTML={{ __html: card.response }} />
              </div>
              <div className="px-4 pb-4">
                <div className="w-full rounded-xl overflow-hidden border border-[var(--border)] bg-[var(--bg-alt)]">
                  <video autoPlay muted loop playsInline className="w-full block rounded-[11px]">
                    <source src={card.video} type="video/quicktime" />
                    <source src={card.video} type="video/mp4" />
                  </video>
                </div>
              </div>
              <div className="px-6 py-3 border-t border-[var(--border)] flex items-center gap-2">
                <span className="text-xs">⚡</span>
                <span className="text-xs text-[var(--text-tertiary)]">{card.footer}</span>
              </div>
            </FadeUp>
          ))}
        </div>
      </div>
    </section>
  );
}

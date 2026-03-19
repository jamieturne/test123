import { FadeUp } from './FadeUp';

const benefits = [
  { title: 'Новый AI-канал бесплатно', text: 'Все пользователи Альфа-Бизнес получают доступ к\u00a0вашему продукту через диалог с\u00a0AI. Spotlight уже встроен в\u00a0интернет-банк.', colorClass: 'red', icon: '<path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z"/>' },
  { title: 'Меньше нагрузка на саппорт', text: 'Типовые вопросы — статусы, остатки, тарифы — решает AI. Минус 20% обращений в\u00a0поддержку без потери качества.', colorClass: 'green', icon: '<polyline points="23 6 13.5 15.5 8.5 10.5 1 18"/><polyline points="17 6 23 6 23 12"/>' },
  { title: 'Конверсия ×3', text: 'AI подводит клиента к\u00a0действию в\u00a0контексте разговора. Конверсия в\u00a0целевое действие в\u00a03\u00a0раза выше.', colorClass: 'blue', icon: '<circle cx="12" cy="12" r="10"/><path d="M12 8v4l3 3"/>' },
  { title: 'Экстра-сценарии', text: 'Сценарии, невозможные в\u00a0обычном UI: «Почему мой счёт заблокирован?», «Выстави счёт контрагенту», «Какой тариф выгоднее?»', colorClass: 'orange', icon: '<rect x="3" y="3" width="18" height="18" rx="2" ry="2"/><line x1="3" y1="9" x2="21" y2="9"/><line x1="9" y1="21" x2="9" y2="9"/>' },
  { title: '1 спринт, 1 разработчик', text: 'Не нужно переписывать API. Оборачиваете готовые ручки в\u00a0MCP-сервер по\u00a0шаблону.', colorClass: 'purple', icon: '<path d="M12 20V10"/><path d="M18 20V4"/><path d="M6 20v-4"/>' },
  { title: 'Удержание клиентов', text: 'Клиенту нужно меньше действий — он\u00a0не\u00a0уходит, не\u00a0найдя функцию. Retention D7 выше на\u00a015%.', colorClass: 'cyan', icon: '<path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/>' },
];

const colorMap: Record<string, { bg: string; border: string; stroke: string }> = {
  red: { bg: 'rgba(239,49,36,0.08)', border: 'rgba(239,49,36,0.15)', stroke: 'var(--alfa-red)' },
  green: { bg: 'rgba(48,209,88,0.08)', border: 'rgba(48,209,88,0.15)', stroke: 'var(--green)' },
  blue: { bg: 'rgba(0,122,255,0.08)', border: 'rgba(0,122,255,0.15)', stroke: 'var(--blue)' },
  orange: { bg: 'rgba(255,159,10,0.08)', border: 'rgba(255,159,10,0.15)', stroke: 'var(--orange)' },
  purple: { bg: 'rgba(175,82,222,0.08)', border: 'rgba(175,82,222,0.15)', stroke: 'var(--purple)' },
  cyan: { bg: 'rgba(50,173,230,0.08)', border: 'rgba(50,173,230,0.15)', stroke: 'var(--cyan)' },
};

export function Benefits() {
  return (
    <section className="py-24" id="why">
      <div className="max-w-[1200px] mx-auto px-6">
        <FadeUp className="text-center mb-16">
          <div className="mb-4">
            <span className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-[13px] font-medium bg-[var(--bg-subtle)] text-[var(--text-secondary)] border border-[var(--border)]">
              Зачем подключать продукт
            </span>
          </div>
          <h2 className="text-[clamp(32px,4vw,48px)] font-extrabold tracking-tight leading-[1.1] mb-4 text-[var(--text-primary)]">
            Мотивация и&nbsp;бенефиты
          </h2>
          <p className="text-lg text-[var(--text-secondary)] max-w-[600px] mx-auto leading-relaxed">
            Что получает ваша команда и&nbsp;ваши клиенты, когда продукт становится навыком Spotlight
          </p>
        </FadeUp>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {benefits.map((b, i) => {
            const c = colorMap[b.colorClass];
            return (
              <FadeUp key={i} delay={i * 0.08} className="bg-white border border-[var(--border)] rounded-[var(--radius-lg)] px-7 py-9 shadow-card relative overflow-hidden hover:border-[var(--border-hover)] hover:-translate-y-1 hover:shadow-card-lg transition-all group">
                <div className="absolute top-0 left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-alfa-red to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                <div className="w-[52px] h-[52px] rounded-[14px] flex items-center justify-center mb-5" style={{ background: c.bg, border: `1px solid ${c.border}` }}>
                  <svg width={24} height={24} viewBox="0 0 24 24" fill="none" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" style={{ stroke: c.stroke }} dangerouslySetInnerHTML={{ __html: b.icon }} />
                </div>
                <div className="text-lg font-bold mb-2.5 text-[var(--text-primary)]">{b.title}</div>
                <div className="text-sm text-[var(--text-secondary)] leading-relaxed">{b.text}</div>
              </FadeUp>
            );
          })}
        </div>
      </div>
    </section>
  );
}

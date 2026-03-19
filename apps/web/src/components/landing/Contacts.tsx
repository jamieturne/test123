import { FadeUp } from './FadeUp';

const contacts = [
  { question: 'Согласование сценариев, карточка навыка', contact: 'spotlight-platform@alfaintra.net', isEmail: true },
  { question: 'Репозитории, деплой MCP-серверов', contact: 'mcphub_support@alfaintra.net', isEmail: true },
  { question: 'Code review MCP-серверов', contact: 'Васин Артем Г., Давидович Михаил Б.', isEmail: false },
  { question: 'Сетевые доступы', contact: 'Луцюк Павел Александрович', isEmail: false },
  { question: 'Быстрые вопросы по интеграции', contact: 'Чат «Spotlight + КП», Степин А.', isEmail: false },
];

export function Contacts() {
  return (
    <section className="py-24 bg-[var(--bg-alt)]" id="contacts">
      <div className="max-w-[1200px] mx-auto px-6">
        <FadeUp className="text-center mb-16">
          <div className="mb-4">
            <span className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-[13px] font-medium bg-[var(--bg-subtle)] text-[var(--text-secondary)] border border-[var(--border)]">
              Контакты
            </span>
          </div>
          <h2 className="text-[clamp(32px,4vw,48px)] font-extrabold tracking-tight leading-[1.1] mb-4 text-[var(--text-primary)]">
            Куда обращаться
          </h2>
        </FadeUp>

        <FadeUp className="max-w-[800px] mx-auto bg-white border border-[var(--border)] rounded-[var(--radius-lg)] overflow-hidden shadow-card">
          <table className="w-full border-collapse">
            <thead>
              <tr>
                <th className="text-left px-6 py-4 text-xs font-bold uppercase tracking-wider text-[var(--text-tertiary)] bg-[var(--bg-alt)] border-b border-[var(--border)]">Вопрос</th>
                <th className="text-left px-6 py-4 text-xs font-bold uppercase tracking-wider text-[var(--text-tertiary)] bg-[var(--bg-alt)] border-b border-[var(--border)]">Куда обращаться</th>
              </tr>
            </thead>
            <tbody>
              {contacts.map((c, i) => (
                <tr key={i} className={i < contacts.length - 1 ? 'border-b border-[var(--border)]' : ''}>
                  <td className="px-6 py-3.5 text-sm text-[var(--text-primary)] font-medium align-top">{c.question}</td>
                  <td className="px-6 py-3.5 text-sm text-[var(--text-secondary)] align-top">
                    {c.isEmail ? (
                      <a href={`mailto:${c.contact}`} className="text-alfa-red no-underline hover:text-[#FF6B5A] hover:underline transition-colors">{c.contact}</a>
                    ) : c.contact}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </FadeUp>

        <FadeUp className="mt-4 max-w-[800px] mx-auto px-6 py-4 bg-[rgba(255,159,10,0.06)] border border-[rgba(255,159,10,0.15)] rounded-[var(--radius-sm)] text-[13px] text-[var(--text-secondary)] flex items-center gap-2.5">
          <svg width={20} height={20} viewBox="0 0 24 24" fill="none" stroke="var(--orange)" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" className="flex-shrink-0">
            <circle cx="12" cy="12" r="10" /><line x1="12" y1="8" x2="12" y2="12" /><line x1="12" y1="16" x2="12.01" y2="16" />
          </svg>
          <span>Все коммуникации по подключению ведите в&nbsp;одной ветке переписки или одном тикете Jira.</span>
        </FadeUp>
      </div>
    </section>
  );
}

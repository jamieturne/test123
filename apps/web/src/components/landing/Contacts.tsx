import { FadeUp } from './FadeUp';

const contacts = [
  { question: 'PO Spotlight', contact: 'Сумина Анастасия', isEmail: false },
  { question: 'PO Alfagen', contact: 'Роздобара Евгений', isEmail: false },
  { question: 'Техлид LLM/MCP', contact: 'Стёпин Андрей', isEmail: false },
  { question: 'Бизнес-аналитик', contact: 'Калашникова Светлана', isEmail: false },
  { question: 'Подключайтесь в канал Rocket Chat', contact: 'Канал Spotlight', isEmail: false, link: 'https://go.rocket.chat/invite?host=rc.alfa-bank.net&path=invite%2FYvrQS9' },
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
            Наша команда
          </h2>
        </FadeUp>

        <FadeUp className="max-w-[800px] mx-auto bg-white border border-[var(--border)] rounded-[var(--radius-lg)] overflow-hidden shadow-card">
          <table className="w-full border-collapse">
            <thead>
              <tr>
                <th className="text-left px-6 py-4 text-xs font-bold uppercase tracking-wider text-[var(--text-tertiary)] bg-[var(--bg-alt)] border-b border-[var(--border)]">Роль</th>
                <th className="text-left px-6 py-4 text-xs font-bold uppercase tracking-wider text-[var(--text-tertiary)] bg-[var(--bg-alt)] border-b border-[var(--border)]">Куда обращаться</th>
              </tr>
            </thead>
            <tbody>
              {contacts.map((c, i) => (
                <tr key={i} className={i < contacts.length - 1 ? 'border-b border-[var(--border)]' : ''}>
                  <td className="px-6 py-3.5 text-sm text-[var(--text-primary)] font-medium align-top">{c.question}</td>
                  <td className="px-6 py-3.5 text-sm text-[var(--text-secondary)] align-top">
                    {'link' in c && c.link ? (
                      <a href={c.link} target="_blank" rel="noopener noreferrer" className="text-alfa-red no-underline hover:text-[#FF6B5A] hover:underline transition-colors">{c.contact}</a>
                    ) : c.isEmail ? (
                      <a href={`mailto:${c.contact}`} className="text-alfa-red no-underline hover:text-[#FF6B5A] hover:underline transition-colors">{c.contact}</a>
                    ) : c.contact}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </FadeUp>
      </div>
    </section>
  );
}

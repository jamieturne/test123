import { FadeUp } from './FadeUp';

const roadmapSteps = [
  {
    number: '0',
    title: 'Выбор сценария',
    timeline: '1–3 дня',
    responsible: 'PO / Stream Lead',
    desc: 'Выберите 1-3 сценария (например: «покажи операции», «какой тариф»), определите перечень доступных API',
  },
  {
    number: '1',
    title: 'Заполнение карточки навыка',
    timeline: '10 минут',
    responsible: 'PO + Системный аналитик',
    desc: 'Заполните',
    linkText: 'карточку навыка',
    link: 'https://confluence.moscow.alfaintra.net/pages/viewpage.action?pageId=3197658221',
    descAfter: ' (название, команда, контакты, сценарии, API)',
  },
  {
    number: '2',
    title: 'Получение доступов в AI Flow',
    timeline: '1 день',
    responsible: 'Разработчик',
    desc: 'Оформите',
    linkText: 'заявку на получение доступа в AI Flow',
    link: 'https://confluence.moscow.alfaintra.net/pages/viewpage.action?pageId=3197665264',
    descAfter: ' для создания сценариев',
  },
  {
    number: '3',
    title: 'Создание MCP-сервера',
    timeline: '1–2 спринта',
    responsible: 'Разработчик',
    linkText: 'Создание MCP по шаблону (Java/Python)',
    link: 'https://confluence.moscow.alfaintra.net/pages/viewpage.action?pageId=3201237474',
    descAfter: ', локальное тестирование',
  },
  {
    number: '4',
    title: 'Публикация на MCP Platform',
    timeline: '2–3 дня',
    responsible: 'Разработчик',
    linkText: 'Ревью от MCP платформы',
    link: 'https://confluence.moscow.alfaintra.net/pages/viewpage.action?pageId=3201237459',
    descAfter: ', деплой в test/prod через тикет в Jira',
  },
  {
    number: '5',
    title: 'Создание сценария в AI Flow',
    timeline: '1 день',
    responsible: 'Разработчик',
    linkText: 'Создание сценария в AI Flow',
    link: 'https://confluence.moscow.alfaintra.net/pages/viewpage.action?pageId=3201239119',
    descAfter: ', настройка MCP, тестирование бизнес сценариев',
  },
  {
    number: '6',
    title: 'Тестирование',
    timeline: '2–3 дня',
    responsible: 'Разработчик + Команда Spotlight + PO',
    desc: 'Тестирование на testlink, проверка сценариев, поэтапная раскатка на пользователей',
  },
  {
    number: '7',
    title: 'Релиз',
    timeline: '1–2 дня',
    responsible: 'PO + Команда Spotlight',
    desc: 'Согласование даты релиза, определение аудитории раскатки',
  },
  {
    number: '8',
    title: 'Вы в Spotlight!',
    timeline: '',
    responsible: '',
    desc: 'Можно обновлять свой навык и добавлять новые',
  },
];

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
            Как подключить свой продукт
          </h2>
        </FadeUp>

        <div className="max-w-[900px] mx-auto relative pl-7">
          <div className="absolute left-[15px] top-0 bottom-0 w-0.5 bg-[var(--border)]" />

          {roadmapSteps.map((step, i) => (
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
                    {step.title}
                  </span>
                  {step.timeline && (
                    <span className="text-xs font-semibold text-alfa-red bg-[rgba(239,49,36,0.06)] px-2.5 py-0.5 rounded-full whitespace-nowrap">
                      {step.timeline}
                    </span>
                  )}
                </div>
                {step.responsible && (
                  <div className="text-xs text-[var(--text-tertiary)] mb-2">Ответственный: {step.responsible}</div>
                )}
                <div className="text-sm text-[var(--text-secondary)] leading-relaxed">
                  {step.desc && <span>{step.desc}{step.linkText ? ' ' : ''}</span>}
                  {step.linkText && step.link && (
                    <a
                      href={step.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-alfa-red no-underline hover:text-[#FF6B5A] hover:underline transition-colors"
                    >
                      {step.linkText}
                    </a>
                  )}
                  {step.descAfter && <span>{step.descAfter}</span>}
                </div>
              </div>
            </FadeUp>
          ))}
        </div>
      </div>
    </section>
  );
}

export interface RoadmapStepConfig {
  number: number;
  title: string;
  timeline: string;
  responsible: string;
  description: string;
  artifactName: string;
  formFields: FormFieldConfig[];
}

export interface FormFieldConfig {
  name: string;
  label: string;
  type: 'text' | 'textarea' | 'select' | 'multiselect' | 'checkbox' | 'date' | 'checklist';
  placeholder?: string;
  required?: boolean;
  options?: { value: string; label: string }[];
}

export const ROADMAP_STEPS: RoadmapStepConfig[] = [
  {
    number: 0,
    title: 'Выбор сценария',
    timeline: '1–3 дня',
    responsible: 'PO / Stream Lead',
    description: 'Выберите 1–3 сценария (например: «покажи операции», «какой тариф»), проверьте наличие API',
    artifactName: 'Список сценариев',
    formFields: [
      {
        name: 'scenarios',
        label: 'Выберите сценарии',
        type: 'multiselect',
        required: true,
        options: [
          { value: 'tariffs', label: 'Тарифы и остатки' },
          { value: 'sbp_transfer', label: 'Перевод по СБП' },
          { value: 'invoicing', label: 'Выставление счетов' },
          { value: 'account_block', label: 'Блокировка счёта' },
          { value: 'company_profile', label: 'Профиль компании' },
          { value: 'transactions', label: 'История операций' },
          { value: 'custom', label: 'Свой сценарий' },
        ],
      },
      { name: 'customScenario', label: 'Опишите свой сценарий', type: 'textarea', placeholder: 'Если выбрали «Свой сценарий»...' },
      {
        name: 'apiAvailability',
        label: 'Наличие API',
        type: 'checklist',
        options: [
          { value: 'api_exists', label: 'API уже существует' },
          { value: 'api_documented', label: 'API задокументировано' },
          { value: 'api_tested', label: 'API протестировано' },
        ],
      },
    ],
  },
  {
    number: 1,
    title: 'Заполнение карточки навыка',
    timeline: '10 минут',
    responsible: 'PO + Системный аналитик',
    description: 'Заполните карточку навыка (название, команда, контакты, сценарии, API)',
    artifactName: 'Карточка навыка',
    formFields: [
      { name: 'skillName', label: 'Название навыка', type: 'text', required: true, placeholder: 'Например: Тарифы и остатки' },
      { name: 'teamName', label: 'Название команды', type: 'text', required: true },
      { name: 'contactPO', label: 'Контакт PO', type: 'text', required: true, placeholder: 'email' },
      { name: 'contactDev', label: 'Контакт разработчика', type: 'text', required: true, placeholder: 'email' },
      { name: 'apiEndpoints', label: 'API эндпоинты', type: 'textarea', required: true, placeholder: 'GET /api/v1/tariffs\nGET /api/v1/accounts/:id/balance' },
      { name: 'businessScenarios', label: 'Бизнес-сценарии (user stories)', type: 'textarea', required: true, placeholder: 'Как клиент, я хочу узнать свой тариф...' },
    ],
  },
  {
    number: 2,
    title: 'Получение доступов в AI Flow',
    timeline: '1 день',
    responsible: 'Разработчик',
    description: 'Оформите доступ к AI Flow для создания сценариев',
    artifactName: 'Заявка на доступ',
    formFields: [
      { name: 'developerEmail', label: 'Email разработчика', type: 'text', required: true },
      { name: 'developerName', label: 'ФИО разработчика', type: 'text', required: true },
      {
        name: 'accessChecklist',
        label: 'Чек-лист доступов',
        type: 'checklist',
        options: [
          { value: 'ai_flow_access', label: 'Доступ к AI Flow запрошен' },
          { value: 'ai_flow_granted', label: 'Доступ к AI Flow получен' },
          { value: 'mcp_repo_access', label: 'Доступ к репозиторию MCP' },
          { value: 'test_env_access', label: 'Доступ к тестовой среде' },
        ],
      },
    ],
  },
  {
    number: 3,
    title: 'Создание MCP-сервера',
    timeline: '1–2 спринта',
    responsible: 'Разработчик',
    description: 'Создание MCP по готовому шаблону (Java/Python), локальное тестирование',
    artifactName: 'Конфигурация MCP-сервера',
    formFields: [
      {
        name: 'template',
        label: 'Шаблон MCP-сервера',
        type: 'select',
        required: true,
        options: [
          { value: 'java', label: 'Java (Spring Boot)' },
          { value: 'python', label: 'Python (FastAPI)' },
        ],
      },
      { name: 'serviceName', label: 'Название сервиса', type: 'text', required: true, placeholder: 'mcp-tariffs-service' },
      { name: 'port', label: 'Порт', type: 'text', placeholder: '8080' },
      { name: 'tools', label: 'Список tools (MCP tools)', type: 'textarea', required: true, placeholder: 'get_tariff — получить текущий тариф\nget_balance — получить остаток' },
      {
        name: 'devChecklist',
        label: 'Чек-лист разработки',
        type: 'checklist',
        options: [
          { value: 'repo_created', label: 'Репозиторий создан' },
          { value: 'template_applied', label: 'Шаблон применён' },
          { value: 'tools_implemented', label: 'Tools реализованы' },
          { value: 'local_tested', label: 'Локальное тестирование пройдено' },
        ],
      },
    ],
  },
  {
    number: 4,
    title: 'Публикация на MCP Platform',
    timeline: '2–3 дня',
    responsible: 'Разработчик',
    description: 'Ревью от MCP платформы, деплой в test/prod через тикет в Jira',
    artifactName: 'Заявка на деплой',
    formFields: [
      { name: 'jiraTicket', label: 'Номер тикета Jira', type: 'text', placeholder: 'SPOT-XXX' },
      { name: 'repoUrl', label: 'URL репозитория', type: 'text', required: true },
      { name: 'reviewNotes', label: 'Комментарии для ревью', type: 'textarea' },
      {
        name: 'deployChecklist',
        label: 'Чек-лист публикации',
        type: 'checklist',
        options: [
          { value: 'code_review', label: 'Code review пройден' },
          { value: 'deployed_test', label: 'Задеплоен в test' },
          { value: 'deployed_prod', label: 'Задеплоен в prod' },
        ],
      },
    ],
  },
  {
    number: 5,
    title: 'Создание сценария в AI Flow',
    timeline: '1 день',
    responsible: 'Разработчик',
    description: 'Создание сценария в AI Flow, настройка MCP, тестирование бизнес-сценариев',
    artifactName: 'Конфигурация сценария',
    formFields: [
      { name: 'scenarioName', label: 'Название сценария в AI Flow', type: 'text', required: true },
      { name: 'triggerPhrases', label: 'Триггерные фразы', type: 'textarea', required: true, placeholder: 'Какой у меня тариф?\nСколько на счёте?\nПокажи остаток' },
      { name: 'mcpServerBinding', label: 'MCP-сервер (привязка)', type: 'text', required: true },
      {
        name: 'scenarioChecklist',
        label: 'Чек-лист настройки',
        type: 'checklist',
        options: [
          { value: 'scenario_created', label: 'Сценарий создан в AI Flow' },
          { value: 'mcp_bound', label: 'MCP-сервер привязан' },
          { value: 'triggers_configured', label: 'Триггеры настроены' },
          { value: 'business_tested', label: 'Бизнес-сценарии протестированы' },
        ],
      },
    ],
  },
  {
    number: 6,
    title: 'Тестирование',
    timeline: '2–3 дня',
    responsible: 'Разработчик + Команда Spotlight + PO',
    description: 'Тестирование на testlink, проверка сценариев, поэтапная раскатка на пользователей',
    artifactName: 'Отчёт о тестировании',
    formFields: [
      { name: 'testEnvironment', label: 'Тестовая среда', type: 'text', placeholder: 'testlink URL' },
      { name: 'testResults', label: 'Результаты тестирования', type: 'textarea', placeholder: 'Опишите результаты...' },
      { name: 'bugs', label: 'Найденные баги', type: 'textarea', placeholder: 'Список багов (если есть)' },
      {
        name: 'testChecklist',
        label: 'Чек-лист тестирования',
        type: 'checklist',
        options: [
          { value: 'smoke_test', label: 'Smoke-тест пройден' },
          { value: 'scenario_test', label: 'Сценарии протестированы' },
          { value: 'edge_cases', label: 'Граничные случаи проверены' },
          { value: 'performance_ok', label: 'Производительность в норме' },
          { value: 'po_approved', label: 'PO подтвердил готовность' },
        ],
      },
    ],
  },
  {
    number: 7,
    title: 'Релиз',
    timeline: '1–2 дня',
    responsible: 'PO + Команда Spotlight',
    description: 'Согласование даты релиза, определение аудитории раскатки',
    artifactName: 'Заявка на релиз',
    formFields: [
      { name: 'releaseDate', label: 'Дата релиза', type: 'date', required: true },
      {
        name: 'audience',
        label: 'Аудитория раскатки',
        type: 'select',
        required: true,
        options: [
          { value: '1_percent', label: '1% пользователей' },
          { value: '5_percent', label: '5% пользователей' },
          { value: '25_percent', label: '25% пользователей' },
          { value: '50_percent', label: '50% пользователей' },
          { value: '100_percent', label: '100% пользователей' },
        ],
      },
      { name: 'releaseNotes', label: 'Release notes', type: 'textarea', placeholder: 'Что нового для пользователей...' },
      {
        name: 'releaseChecklist',
        label: 'Чек-лист релиза',
        type: 'checklist',
        options: [
          { value: 'date_agreed', label: 'Дата согласована' },
          { value: 'audience_defined', label: 'Аудитория определена' },
          { value: 'rollback_plan', label: 'План отката готов' },
          { value: 'monitoring_setup', label: 'Мониторинг настроен' },
        ],
      },
    ],
  },
  {
    number: 8,
    title: 'Вы в Spotlight!',
    timeline: '',
    responsible: '',
    description: 'Можно обновлять свой навык, обновлять базу знаний и новые услуги',
    artifactName: 'Сертификат подключения',
    formFields: [
      {
        name: 'completionChecklist',
        label: 'Что дальше',
        type: 'checklist',
        options: [
          { value: 'docs_updated', label: 'Документация обновлена' },
          { value: 'team_notified', label: 'Команда уведомлена' },
          { value: 'knowledge_base', label: 'База знаний подключена' },
        ],
      },
    ],
  },
  {
    number: 10,
    title: 'Пост-релизный мониторинг',
    timeline: 'Постоянно',
    responsible: 'PO + Разработчик',
    description: 'Мониторинг метрик (обращения, конверсия, снижение нагрузки на саппорт), сбор обратной связи, планирование расширения функционала',
    artifactName: 'Конфигурация мониторинга',
    formFields: [
      {
        name: 'metricsChecklist',
        label: 'Метрики для отслеживания',
        type: 'checklist',
        options: [
          { value: 'requests_count', label: 'Количество обращений через AI' },
          { value: 'conversion', label: 'Конверсия в целевое действие' },
          { value: 'support_reduction', label: 'Снижение нагрузки на поддержку' },
          { value: 'user_satisfaction', label: 'Удовлетворённость пользователей' },
          { value: 'error_rate', label: 'Процент ошибок' },
        ],
      },
      { name: 'feedbackChannel', label: 'Канал сбора обратной связи', type: 'text', placeholder: 'Jira / Slack / Email' },
      { name: 'expansionPlan', label: 'План расширения', type: 'textarea', placeholder: 'Какие новые сценарии планируете добавить?' },
    ],
  },
];

export const TOTAL_STEPS = ROADMAP_STEPS.length;

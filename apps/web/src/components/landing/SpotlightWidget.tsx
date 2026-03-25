'use client';

import { useEffect, useState, useRef } from 'react';
import { SparkleIcon } from './SparkleIcon';

const scenarios = [
  {
    query: 'Какой у меня тариф? Какой будет комиссия за перевод в 500 тыс?',
    response:
      'У вас подключён тариф <strong>«Быстрые платежи»</strong>. Комиссия за перевод 500 000 ₽ составит <strong>750 ₽</strong> (0,15%). Следующее списание за обслуживание — 1 июля.',
  },
  {
    query: 'Какой у меня статус по операциям? Кто мне должен?',
    response:
      'Найдено <strong>3 неоплаченных счёта</strong> на общую сумму <strong>425 000 ₽</strong>:<br>• ООО «ТехноСтрой» — 200 000 ₽ (просрочка 5 дн.)<br>• ИП Сидоров — 150 000 ₽ (срок завтра)<br>• ООО «Логистик» — 75 000 ₽ (в срок)',
  },
  {
    query: 'Покажи самые крупные расходы за месяц',
    response:
      'Топ-3 расхода за июнь:<br>1. <strong>Аренда офиса</strong> — 350 000 ₽<br>2. <strong>Зарплатный проект</strong> — 1 240 000 ₽<br>3. <strong>Закупка оборудования</strong> — 280 000 ₽<br>Общие расходы: <strong>2 870 000 ₽</strong>',
  },
  {
    query: 'Мой счёт заблокирован, что делать?',
    response:
      'Ваш счёт <strong>•••4072</strong> приостановлен по решению ФНС (ст. 76 НК РФ). Для разблокировки:<br>1. Оплатите задолженность по налогам<br>2. Получите решение об отмене в ФНС<br>3. Отправьте его через раздел «Документы»',
  },
];

export function SpotlightWidget() {
  const [text, setText] = useState('');
  const [showResponse, setShowResponse] = useState(false);
  const [responseHtml, setResponseHtml] = useState('');
  const [isActive, setIsActive] = useState(false);
  const scenarioRef = useRef(0);
  const timerRef = useRef<ReturnType<typeof setTimeout>>();

  useEffect(() => {
    let charIndex = 0;
    let isDeleting = false;
    let isPaused = false;

    function type() {
      const current = scenarios[scenarioRef.current];
      if (!isDeleting && !isPaused) {
        charIndex++;
        setText(current.query.substring(0, charIndex));
        if (charIndex === 1) setIsActive(true);
        if (charIndex >= current.query.length) {
          isPaused = true;
          timerRef.current = setTimeout(() => {
            setResponseHtml(current.response);
            setShowResponse(true);
          }, 400);
          timerRef.current = setTimeout(() => {
            isPaused = false;
            isDeleting = true;
            setShowResponse(false);
            type();
          }, 4000);
          return;
        }
        timerRef.current = setTimeout(type, 40 + Math.random() * 40);
      } else if (isDeleting) {
        charIndex--;
        setText(current.query.substring(0, charIndex));
        if (charIndex <= 0) {
          isDeleting = false;
          setIsActive(false);
          scenarioRef.current = (scenarioRef.current + 1) % scenarios.length;
          timerRef.current = setTimeout(type, 800);
          return;
        }
        timerRef.current = setTimeout(type, 20);
      }
    }

    timerRef.current = setTimeout(type, 1500);
    return () => { if (timerRef.current) clearTimeout(timerRef.current); };
  }, []);

  return (
    <div className="max-w-[780px] mx-auto relative">
      <div className="bg-[var(--bg-alt)] rounded-[20px] overflow-hidden relative" style={{ boxShadow: 'var(--shadow-xl), 0 0 0 1px var(--border)' }}>
        {/* Top bar */}
        <div className="bg-white px-4 py-3 flex items-center justify-between border-b border-[var(--border)]">
          <div />
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-full grid place-items-center shadow-[inset_0_0_3px_0_#fff]" style={{ background: 'linear-gradient(0deg, #b1a3ff, #ff1418 80%)' }}>
              <SparkleIcon size={16} className="text-white" />
            </div>
            <span className="text-sm font-semibold text-[var(--text-primary)]">Нейропомощник</span>
          </div>
        </div>

        {/* Search bar */}
        <div
          className={`bg-white rounded-[16px] mx-4 my-3 flex items-center h-14 relative transition-shadow cursor-text ${
            isActive ? 'shadow-[0_2px_12px_rgba(239,49,36,0.1),0_0_0_2px_rgba(239,49,36,0.25)]' : 'shadow-card hover:shadow-card-md'
          }`}
        >
          <div className="w-14 h-14 flex-shrink-0 flex items-center justify-center rounded-xl ml-1">
            <SparkleIcon size={24} className="text-alfa-red" />
          </div>
          <div className="flex-1 h-full flex items-center pr-4 overflow-hidden">
            <span className={`text-base whitespace-nowrap flex items-center ${isActive ? 'text-[var(--text-primary)]' : 'text-[var(--text-tertiary)]'}`}>
              {text}
              <span
                className={`inline-block w-0.5 h-5 bg-alfa-red ml-px flex-shrink-0 ${isActive ? 'animate-[blink-cursor_1s_step-end_infinite]' : 'opacity-0'}`}
              />
            </span>
          </div>
        </div>

        {/* Response */}
        <div
          className={`mx-4 mb-4 bg-white rounded-[16px] overflow-hidden transition-all duration-500 ${
            showResponse ? 'max-h-[400px] opacity-100 translate-y-0' : 'max-h-0 opacity-0 -translate-y-2'
          }`}
          style={{ boxShadow: showResponse ? 'var(--shadow-sm)' : 'none' }}
        >
          <div className="px-4 pt-3.5 pb-2 flex items-center gap-2.5 border-b border-[var(--border)]">
            <div className="w-7 h-7 rounded-full grid place-items-center flex-shrink-0" style={{ background: 'linear-gradient(0deg, #b1a3ff, #ff1418 80%)', boxShadow: 'inset 0 0 2px 0 rgba(255,255,255,0.6)' }}>
              <SparkleIcon size={14} className="text-white" />
            </div>
            <span className="text-[13px] font-semibold text-[var(--text-primary)]">Spotlight</span>
          </div>
          <div className="px-4 pt-3.5 pb-4">
            <div className="text-sm leading-relaxed text-[var(--text-secondary)] [&_strong]:text-[var(--text-primary)] [&_strong]:font-semibold" dangerouslySetInnerHTML={{ __html: responseHtml }} />
          </div>
        </div>

        <div className="px-4 pb-3 text-center">
          <span className="text-[11px] text-[var(--text-quaternary)] font-medium">Нейропомощник доступен всем клиентам Альфа-Бизнес</span>
        </div>
      </div>
      <p className="text-center mt-5 text-[13px] text-[var(--text-tertiary)] font-medium">
        <span className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-[var(--bg-subtle)] border border-[var(--border)]">
          ↑ Так выглядит Spotlight в&nbsp;интернет-банке
        </span>
      </p>

      <style jsx global>{`
        @keyframes blink-cursor { 0%, 100% { opacity: 1; } 50% { opacity: 0; } }
      `}</style>
    </div>
  );
}

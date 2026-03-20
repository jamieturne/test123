'use client';

import type { ReactNode } from 'react';
import type { RoadmapStepConfig, FormFieldConfig } from '@spotlight/shared';
import { ROADMAP_STEPS } from '@spotlight/shared';

export type AdminStepRow = {
  id: string;
  stepNumber: number;
  status: string;
  formData: Record<string, unknown>;
  artifacts: Record<string, unknown>;
  completedAt: string | null;
};

const STATUS_RU: Record<string, string> = {
  locked: 'Заблокирован',
  active: 'Доступен',
  in_progress: 'В работе',
  completed: 'Завершён',
};

function formatFieldValue(value: unknown, field: FormFieldConfig): ReactNode {
  if (value === undefined || value === null || value === '') {
    return <span className="text-[var(--text-quaternary)] italic">не заполнено</span>;
  }
  if (Array.isArray(value)) {
    if (value.length === 0) {
      return <span className="text-[var(--text-quaternary)] italic">не выбрано</span>;
    }
    return (
      <div className="flex flex-wrap gap-1.5">
        {value.map((v) => {
          const s = String(v);
          const optLabel = field.options?.find((o) => o.value === s)?.label ?? s;
          return (
            <span
              key={s}
              className="inline-flex items-center px-2.5 py-1 rounded-lg bg-[var(--bg-alt)] border border-[var(--border)] text-xs font-medium text-[var(--text-primary)]"
            >
              {optLabel}
            </span>
          );
        })}
      </div>
    );
  }
  if (field.type === 'select' && field.options) {
    const s = String(value);
    const optLabel = field.options.find((o) => o.value === s)?.label ?? s;
    return <span className="text-sm text-[var(--text-primary)]">{optLabel}</span>;
  }
  return <span className="text-sm text-[var(--text-primary)] whitespace-pre-wrap break-words">{String(value)}</span>;
}

function Row({ label, children }: { label: string; children: ReactNode }) {
  return (
    <div className="py-2.5 border-b border-[var(--border)] last:border-b-0">
      <div className="text-[11px] font-semibold uppercase tracking-wider text-[var(--text-tertiary)] mb-1">{label}</div>
      <div>{children}</div>
    </div>
  );
}

function ChecklistChips({
  values,
  options,
}: {
  values: unknown;
  options?: { value: string; label: string }[];
}) {
  const arr = Array.isArray(values) ? (values as string[]) : [];
  if (arr.length === 0) return <span className="text-[var(--text-quaternary)] text-sm italic">нет отметок</span>;
  return (
    <ul className="space-y-1">
      {arr.map((v) => {
        const label = options?.find((o) => o.value === v)?.label ?? v;
        return (
          <li key={v} className="flex items-start gap-2 text-sm text-[var(--text-primary)]">
            <span className="text-[var(--green)] mt-0.5">✓</span>
            {label}
          </li>
        );
      })}
    </ul>
  );
}

const step0 = ROADMAP_STEPS.find((s) => s.number === 0);

/** Человекочитаемый артефакт по типу (как после generateArtifacts на бэке) */
function ArtifactReadable({ artifacts }: { artifacts: Record<string, unknown> }) {
  const t = artifacts.type as string | undefined;
  if (!t || Object.keys(artifacts).length === 0) {
    return <p className="text-sm text-[var(--text-quaternary)]">Артефакт ещё не сформирован или пустой</p>;
  }

  if (typeof artifacts.generatedAt === 'string') {
    // handled at bottom
  }

  switch (t) {
    case 'prioritization':
      return (
        <div className="space-y-0">
          <Row label="Тип">{String(artifacts.title ?? 'Решение о подключении')}</Row>
          <Row label="Клиентские сценарии (текст)">
            {artifacts.scenarios ? (
              <span className="text-sm whitespace-pre-wrap">{String(artifacts.scenarios)}</span>
            ) : (
              <span className="text-[var(--text-quaternary)] italic">—</span>
            )}
          </Row>
          <Row label="Сценарии для первого запуска">
            <ChecklistChips
              values={artifacts.selectedScenarios}
              options={step0?.formFields.find((f) => f.name === 'selectedScenarios')?.options}
            />
          </Row>
          <Row label="Уровень сложности">
            <span className="text-sm">
              {step0?.formFields.find((f) => f.name === 'complexityLevel')?.options?.find(
                (o) => o.value === String(artifacts.complexityLevel ?? '')
              )?.label ?? String(artifacts.complexityLevel ?? '—')}
            </span>
          </Row>
          <Row label="Готовность API (чеклист)">
            <ChecklistChips
              values={artifacts.apiReadiness}
              options={step0?.formFields.find((f) => f.name === 'apiReadiness')?.options}
            />
          </Row>
        </div>
      );
    case 'skill_card': {
      const contacts = artifacts.contacts as
        | { po?: { name?: string; email?: string }; techLead?: { name?: string; email?: string } }
        | undefined;
      return (
        <div className="space-y-0">
          <Row label="Продукт">{String(artifacts.productName ?? '—')}</Row>
          <Row label="Команда">{String(artifacts.team ?? '—')}</Row>
          <Row label="Контакты">
            <div className="text-sm space-y-2 text-[var(--text-primary)]">
              <div>
                <span className="text-[var(--text-tertiary)]">PO: </span>
                {contacts?.po
                  ? `${contacts.po.name ?? ''} ${contacts.po.email ? `<${contacts.po.email}>` : ''}`.trim() || '—'
                  : '—'}
              </div>
              <div>
                <span className="text-[var(--text-tertiary)]">Tech Lead: </span>
                {contacts?.techLead
                  ? `${contacts.techLead.name ?? ''} ${contacts.techLead.email ? `<${contacts.techLead.email}>` : ''}`.trim() ||
                    '—'
                  : '—'}
              </div>
            </div>
          </Row>
          <Row label="Таблица сценариев">
            <span className="text-sm whitespace-pre-wrap">{String(artifacts.scenariosTable ?? '—')}</span>
          </Row>
          <Row label="Поля данных клиента">
            <span className="text-sm whitespace-pre-wrap">{String(artifacts.clientDataFields ?? '—')}</span>
          </Row>
          <Row label="Плановая дата запуска">{String(artifacts.plannedLaunchDate ?? '—')}</Row>
          <Row label="Чеклист подготовки">
            <ChecklistChips
              values={artifacts.checklist}
              options={
                ROADMAP_STEPS.find((s) => s.number === 1)?.formFields.find((f) => f.name === 'prepChecklist')?.options
              }
            />
          </Row>
        </div>
      );
    }
    case 'access_request':
      return (
        <div className="space-y-0">
          <Row label="Разработчик">
            <span className="text-sm">
              {(() => {
                const d = artifacts.developer as { name?: string; email?: string } | undefined;
                return d?.name || d?.email ? `${d.name ?? ''} ${d.email ? `<${d.email}>` : ''}`.trim() : '—';
              })()}
            </span>
          </Row>
          <Row label="Статус доступов">
            <ChecklistChips
              values={artifacts.accessStatus}
              options={
                ROADMAP_STEPS.find((s) => s.number === 2)?.formFields.find((f) => f.name === 'accessChecklist')?.options
              }
            />
          </Row>
        </div>
      );
    case 'mcp_config':
      return (
        <div className="space-y-0">
          <Row label="Шаблон">{String(artifacts.template ?? '—')}</Row>
          <Row label="Имя сервиса">{String(artifacts.serviceName ?? '—')}</Row>
          <Row label="URL целевого API">{String(artifacts.targetApiUrl ?? '—')}</Row>
          <Row label="Порт">{String(artifacts.port ?? '—')}</Row>
          <Row label="Tools / описание">
            <span className="text-sm whitespace-pre-wrap">{String(artifacts.tools ?? '—')}</span>
          </Row>
          {artifacts.toolDescriptions != null && (
            <Row label="Описания инструментов">
              <span className="text-sm whitespace-pre-wrap">{String(artifacts.toolDescriptions)}</span>
            </Row>
          )}
          <Row label="Чеклист разработки">
            <ChecklistChips
              values={artifacts.checklist}
              options={
                ROADMAP_STEPS.find((s) => s.number === 3)?.formFields.find((f) => f.name === 'devChecklist')?.options
              }
            />
          </Row>
        </div>
      );
    case 'deploy_request':
      return (
        <div className="space-y-0">
          <Row label="Jira">{String(artifacts.jiraTicket ?? '—')}</Row>
          <Row label="Репозиторий">{String(artifacts.repository ?? '—')}</Row>
          <Row label="Версия">{String(artifacts.version ?? '—')}</Row>
          <Row label="URL MCP после деплоя">{String(artifacts.mcpServerUrl ?? '—')}</Row>
          <Row label="Заметки">
            <span className="text-sm whitespace-pre-wrap">{String(artifacts.notes ?? '—')}</span>
          </Row>
          <Row label="Статус публикации">
            <ChecklistChips
              values={artifacts.publishStatus}
              options={
                ROADMAP_STEPS.find((s) => s.number === 4)?.formFields.find((f) => f.name === 'publishChecklist')?.options
              }
            />
          </Row>
        </div>
      );
    case 'ai_flow_config':
      return (
        <div className="space-y-0">
          <Row label="Название сценария">{String(artifacts.scenarioName ?? '—')}</Row>
          <Row label="URL MCP">{String(artifacts.mcpServerUrl ?? '—')}</Row>
          <Row label="Триггерные фразы">
            <span className="text-sm whitespace-pre-wrap">{String(artifacts.triggers ?? '—')}</span>
          </Row>
          <Row label="Маппинг параметров">
            <span className="text-sm whitespace-pre-wrap">{String(artifacts.paramMapping ?? '—')}</span>
          </Row>
          <Row label="Чеклист Flow">
            <ChecklistChips
              values={artifacts.flowStatus}
              options={
                ROADMAP_STEPS.find((s) => s.number === 5)?.formFields.find((f) => f.name === 'flowChecklist')?.options
              }
            />
          </Row>
        </div>
      );
    case 'e2e_report':
      return (
        <div className="space-y-0">
          <Row label="Дата релиза / раскатки">{String(artifacts.releaseDate ?? '—')}</Row>
          <Row label="Аудитория">
            <span className="text-sm">
              {ROADMAP_STEPS.find((s) => s.number === 6)?.formFields.find((f) => f.name === 'audience')?.options?.find(
                (o) => o.value === String(artifacts.audience ?? '')
              )?.label ?? String(artifacts.audience ?? '—')}
            </span>
          </Row>
          <Row label="Результаты тестов">
            <span className="text-sm whitespace-pre-wrap">{String(artifacts.testResults ?? '—')}</span>
          </Row>
          <Row label="Баги">
            <span className="text-sm whitespace-pre-wrap">{String(artifacts.bugs ?? '—')}</span>
          </Row>
          <Row label="E2E чеклист">
            <ChecklistChips
              values={artifacts.e2eStatus}
              options={
                ROADMAP_STEPS.find((s) => s.number === 6)?.formFields.find((f) => f.name === 'e2eChecklist')?.options
              }
            />
          </Row>
        </div>
      );
    case 'monitoring_config':
      return (
        <div className="space-y-0">
          <Row label="Метрики">
            <ChecklistChips
              values={artifacts.metrics}
              options={
                ROADMAP_STEPS.find((s) => s.number === 7)?.formFields.find((f) => f.name === 'metricsChecklist')?.options
              }
            />
          </Row>
          <Row label="Канал обратной связи">{String(artifacts.feedbackChannel ?? '—')}</Row>
          <Row label="План расширения">
            <span className="text-sm whitespace-pre-wrap">{String(artifacts.expansionPlan ?? '—')}</span>
          </Row>
        </div>
      );
    case 'completion_certificate':
      return (
        <div className="text-center py-2">
          <p className="text-lg font-bold text-[var(--text-primary)]">{String(artifacts.title ?? '')}</p>
          <p className="text-sm text-[var(--text-secondary)] mt-2">{String(artifacts.message ?? '')}</p>
        </div>
      );
    default:
      return (
        <pre className="text-xs p-3 rounded-lg bg-white border border-[var(--border)] overflow-x-auto text-[var(--text-secondary)]">
          {JSON.stringify(artifacts, null, 2)}
        </pre>
      );
  }
}

export function AdminStepDetail({
  step,
  stepConfig,
}: {
  step: AdminStepRow;
  stepConfig: RoadmapStepConfig | undefined;
}) {
  const formData = step.formData && typeof step.formData === 'object' ? step.formData : {};
  const artifacts = step.artifacts && typeof step.artifacts === 'object' ? step.artifacts : {};

  const knownFieldNames = new Set(stepConfig?.formFields.map((f) => f.name) ?? []);
  const extraKeys = Object.keys(formData).filter((k) => !knownFieldNames.has(k));

  return (
    <div className="px-4 pb-4 space-y-5">
      {/* Мета шага из роадмапа */}
      {stepConfig && (
        <div className="rounded-xl bg-white border border-[var(--border)] p-4 text-sm">
          <div className="flex flex-wrap gap-x-4 gap-y-1 text-[var(--text-secondary)]">
            {stepConfig.timeline && (
              <span>
                <span className="text-[var(--text-tertiary)]">Срок: </span>
                {stepConfig.timeline}
              </span>
            )}
            {stepConfig.responsible && (
              <span>
                <span className="text-[var(--text-tertiary)]">Ответственный: </span>
                {stepConfig.responsible}
              </span>
            )}
            {stepConfig.artifactName && (
              <span>
                <span className="text-[var(--text-tertiary)]">Артефакт: </span>
                {stepConfig.artifactName}
              </span>
            )}
          </div>
          {step.completedAt && (
            <div className="mt-2 text-xs text-[var(--text-tertiary)]">
              Завершён: {new Date(step.completedAt).toLocaleString('ru-RU')}
            </div>
          )}
        </div>
      )}

      {/* Данные формы — как в визарде, по полям */}
      <div>
        <h4 className="text-xs font-bold uppercase tracking-wider text-[var(--text-tertiary)] mb-2 flex items-center gap-2">
          <span className="w-1 h-4 bg-alfa-red rounded-full" />
          Данные формы (как заполняет пользователь)
        </h4>
        <div className="rounded-xl bg-white border border-[var(--border)] px-4">
          {stepConfig?.formFields.length ? (
            stepConfig.formFields.map((field) => (
              <div key={field.name} className="py-3 border-b border-[var(--border)] last:border-b-0">
                <div className="text-[11px] font-semibold text-[var(--text-tertiary)] uppercase tracking-wider mb-1">
                  {field.label}
                  {field.required && <span className="text-alfa-red ml-0.5">*</span>}
                  <span className="normal-case font-normal text-[var(--text-quaternary)] ml-2">
                    ({field.type}
                    {field.name ? ` · ${field.name}` : ''})
                  </span>
                </div>
                {formatFieldValue(formData[field.name], field)}
              </div>
            ))
          ) : (
            <p className="py-4 text-sm text-[var(--text-quaternary)]">Нет описания полей для этого шага</p>
          )}
        </div>
      </div>

      {extraKeys.length > 0 && (
        <div>
          <h4 className="text-xs font-bold uppercase tracking-wider text-[var(--text-tertiary)] mb-2">
            Дополнительные поля (не из шаблона шага)
          </h4>
          <div className="rounded-xl bg-white border border-[var(--border)] divide-y divide-[var(--border)]">
            {extraKeys.map((key) => (
              <div key={key} className="px-4 py-2.5">
                <div className="text-[11px] font-mono text-[var(--text-tertiary)] mb-1">{key}</div>
                <pre className="text-xs text-[var(--text-primary)] whitespace-pre-wrap break-words">
                  {typeof formData[key] === 'object'
                    ? JSON.stringify(formData[key], null, 2)
                    : String(formData[key])}
                </pre>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Артефакт */}
      <div>
        <h4 className="text-xs font-bold uppercase tracking-wider text-[var(--text-tertiary)] mb-2 flex items-center gap-2">
          <span className="w-1 h-4 bg-[var(--purple)] rounded-full" />
          Сформированный артефакт
        </h4>
        <div className="rounded-xl bg-[var(--bg-alt)] border border-[var(--border)] p-4">
          <ArtifactReadable artifacts={artifacts} />
          {typeof artifacts.generatedAt === 'string' && (
            <div className="mt-4 pt-3 border-t border-[var(--border)] text-xs text-[var(--text-tertiary)]">
              Сгенерировано: {new Date(artifacts.generatedAt as string).toLocaleString('ru-RU')}
            </div>
          )}
        </div>
      </div>

      {/* Сырой JSON — свернуто, для отладки */}
      <details className="group">
        <summary className="cursor-pointer text-xs font-semibold text-[var(--text-tertiary)] hover:text-[var(--text-secondary)]">
          Сырой JSON (для отладки)
        </summary>
        <div className="mt-2 grid grid-cols-1 md:grid-cols-2 gap-3">
          <div>
            <div className="text-[10px] uppercase text-[var(--text-quaternary)] mb-1">formData</div>
            <pre className="text-[10px] p-3 rounded-lg bg-white border border-[var(--border)] overflow-x-auto max-h-48 overflow-y-auto">
              {JSON.stringify(formData, null, 2)}
            </pre>
          </div>
          <div>
            <div className="text-[10px] uppercase text-[var(--text-quaternary)] mb-1">artifacts</div>
            <pre className="text-[10px] p-3 rounded-lg bg-white border border-[var(--border)] overflow-x-auto max-h-48 overflow-y-auto">
              {JSON.stringify(artifacts, null, 2)}
            </pre>
          </div>
        </div>
      </details>
    </div>
  );
}

export function statusLabelRu(status: string) {
  return STATUS_RU[status] ?? status;
}

'use client';

import type { RoadmapStepConfig } from '@spotlight/shared';

interface Props {
  stepConfig: RoadmapStepConfig;
  formData: Record<string, unknown>;
  artifacts: Record<string, unknown>;
}

export function ArtifactPreview({ stepConfig, formData, artifacts }: Props) {
  if (!artifacts || Object.keys(artifacts).length === 0) return null;

  return (
    <div className="mt-4">
      <div className="flex items-center gap-2 mb-3">
        <svg width={16} height={16} viewBox="0 0 24 24" fill="none" stroke="var(--text-tertiary)" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round">
          <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
          <polyline points="14 2 14 8 20 8" />
        </svg>
        <span className="text-sm font-semibold text-[var(--text-primary)]">
          Артефакт: {stepConfig.artifactName}
        </span>
      </div>

      <div className="bg-[var(--bg-alt)] border border-[var(--border)] rounded-xl p-4">
        {/* Render based on artifact type */}
        {artifacts.type === 'completion_certificate' ? (
          <div className="text-center py-4">
            <div className="text-4xl mb-3">🎉</div>
            <h3 className="text-lg font-bold text-[var(--text-primary)] mb-2">{artifacts.title as string}</h3>
            <p className="text-sm text-[var(--text-secondary)]">{artifacts.message as string}</p>
          </div>
        ) : (
          <div className="space-y-3">
            {Object.entries(formData).map(([key, value]) => {
              if (!value || (Array.isArray(value) && value.length === 0)) return null;
              const fieldConfig = stepConfig.formFields.find(f => f.name === key);
              if (!fieldConfig) return null;

              return (
                <div key={key} className="flex flex-col gap-1">
                  <span className="text-xs font-semibold text-[var(--text-tertiary)] uppercase tracking-wider">
                    {fieldConfig.label}
                  </span>
                  {Array.isArray(value) ? (
                    <div className="flex flex-wrap gap-1.5">
                      {(value as string[]).map(v => {
                        const optLabel = fieldConfig.options?.find(o => o.value === v)?.label || v;
                        return (
                          <span key={v} className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-white border border-[var(--border)] text-xs font-medium text-[var(--text-primary)]">
                            <svg width={10} height={10} viewBox="0 0 24 24" fill="none" stroke="var(--green)" strokeWidth={3} strokeLinecap="round" strokeLinejoin="round">
                              <polyline points="20 6 9 17 4 12" />
                            </svg>
                            {optLabel}
                          </span>
                        );
                      })}
                    </div>
                  ) : (
                    <span className="text-sm text-[var(--text-primary)] whitespace-pre-wrap">{String(value)}</span>
                  )}
                </div>
              );
            })}

            {artifacts.generatedAt && (
              <div className="pt-3 border-t border-[var(--border)] text-xs text-[var(--text-tertiary)]">
                Сгенерировано: {new Date(artifacts.generatedAt as string).toLocaleString('ru-RU')}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

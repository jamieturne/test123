'use client';

import { useState, useEffect } from 'react';
import type { RoadmapStepConfig, FormFieldConfig } from '@spotlight/shared';

interface Props {
  stepConfig: RoadmapStepConfig;
  initialData: Record<string, unknown>;
  onSave: (data: Record<string, unknown>) => void;
  onComplete: (data: Record<string, unknown>) => void;
  saving: boolean;
}

export function WizardStepForm({ stepConfig, initialData, onSave, onComplete, saving }: Props) {
  const [formData, setFormData] = useState<Record<string, unknown>>(initialData || {});

  useEffect(() => {
    setFormData(initialData || {});
  }, [initialData, stepConfig.number]);

  const updateField = (name: string, value: unknown) => {
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const toggleChecklistItem = (name: string, value: string) => {
    const current = (formData[name] as string[]) || [];
    const next = current.includes(value) ? current.filter(v => v !== value) : [...current, value];
    updateField(name, next);
  };

  const toggleMultiSelect = (name: string, value: string) => {
    const current = (formData[name] as string[]) || [];
    const next = current.includes(value) ? current.filter(v => v !== value) : [...current, value];
    updateField(name, next);
  };

  const renderField = (field: FormFieldConfig) => {
    switch (field.type) {
      case 'text':
        return (
          <input
            type="text"
            value={(formData[field.name] as string) || ''}
            onChange={e => updateField(field.name, e.target.value)}
            placeholder={field.placeholder}
            className="w-full px-4 py-3 rounded-xl border border-[var(--border)] bg-[var(--bg-alt)] text-sm text-[var(--text-primary)] focus:outline-none focus:border-alfa-red focus:ring-2 focus:ring-[rgba(239,49,36,0.15)] transition-all placeholder:text-[var(--text-tertiary)]"
          />
        );

      case 'textarea':
        return (
          <textarea
            value={(formData[field.name] as string) || ''}
            onChange={e => updateField(field.name, e.target.value)}
            placeholder={field.placeholder}
            rows={4}
            className="w-full px-4 py-3 rounded-xl border border-[var(--border)] bg-[var(--bg-alt)] text-sm text-[var(--text-primary)] focus:outline-none focus:border-alfa-red focus:ring-2 focus:ring-[rgba(239,49,36,0.15)] transition-all resize-none placeholder:text-[var(--text-tertiary)]"
          />
        );

      case 'select':
        return (
          <select
            value={(formData[field.name] as string) || ''}
            onChange={e => updateField(field.name, e.target.value)}
            className="w-full px-4 py-3 rounded-xl border border-[var(--border)] bg-[var(--bg-alt)] text-sm text-[var(--text-primary)] focus:outline-none focus:border-alfa-red focus:ring-2 focus:ring-[rgba(239,49,36,0.15)] transition-all"
          >
            <option value="">Выберите...</option>
            {field.options?.map(opt => (
              <option key={opt.value} value={opt.value}>{opt.label}</option>
            ))}
          </select>
        );

      case 'date':
        return (
          <input
            type="date"
            value={(formData[field.name] as string) || ''}
            onChange={e => updateField(field.name, e.target.value)}
            className="w-full px-4 py-3 rounded-xl border border-[var(--border)] bg-[var(--bg-alt)] text-sm text-[var(--text-primary)] focus:outline-none focus:border-alfa-red focus:ring-2 focus:ring-[rgba(239,49,36,0.15)] transition-all"
          />
        );

      case 'multiselect':
        return (
          <div className="space-y-2">
            {field.options?.map(opt => {
              const selected = ((formData[field.name] as string[]) || []).includes(opt.value);
              return (
                <button
                  key={opt.value}
                  type="button"
                  onClick={() => toggleMultiSelect(field.name, opt.value)}
                  className={`w-full text-left px-4 py-3 rounded-xl border text-sm transition-all ${
                    selected
                      ? 'border-alfa-red bg-[rgba(239,49,36,0.04)] text-[var(--text-primary)] font-medium'
                      : 'border-[var(--border)] bg-[var(--bg-alt)] text-[var(--text-secondary)] hover:border-[var(--border-hover)]'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <div className={`w-5 h-5 rounded-md border flex-shrink-0 grid place-items-center transition-colors ${
                      selected ? 'bg-alfa-red border-alfa-red' : 'border-[var(--border-hover)] bg-white'
                    }`}>
                      {selected && (
                        <svg width={12} height={12} viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth={3} strokeLinecap="round" strokeLinejoin="round">
                          <polyline points="20 6 9 17 4 12" />
                        </svg>
                      )}
                    </div>
                    {opt.label}
                  </div>
                </button>
              );
            })}
          </div>
        );

      case 'checklist':
        return (
          <div className="space-y-2">
            {field.options?.map(opt => {
              const checked = ((formData[field.name] as string[]) || []).includes(opt.value);
              return (
                <label
                  key={opt.value}
                  className={`flex items-center gap-3 px-4 py-3 rounded-xl border cursor-pointer transition-all ${
                    checked
                      ? 'border-[rgba(48,209,88,0.3)] bg-[rgba(48,209,88,0.04)]'
                      : 'border-[var(--border)] bg-[var(--bg-alt)] hover:border-[var(--border-hover)]'
                  }`}
                >
                  <div
                    onClick={() => toggleChecklistItem(field.name, opt.value)}
                    className={`w-5 h-5 rounded-md border flex-shrink-0 grid place-items-center transition-colors cursor-pointer ${
                      checked ? 'bg-[var(--green)] border-[var(--green)]' : 'border-[var(--border-hover)] bg-white'
                    }`}
                  >
                    {checked && (
                      <svg width={12} height={12} viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth={3} strokeLinecap="round" strokeLinejoin="round">
                        <polyline points="20 6 9 17 4 12" />
                      </svg>
                    )}
                  </div>
                  <span className={`text-sm ${checked ? 'text-[var(--text-primary)] line-through' : 'text-[var(--text-secondary)]'}`}>
                    {opt.label}
                  </span>
                </label>
              );
            })}
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div>
      <div className="space-y-5">
        {stepConfig.formFields.map(field => (
          <div key={field.name}>
            <label className="block text-sm font-medium text-[var(--text-primary)] mb-2">
              {field.label}
              {field.required && <span className="text-alfa-red ml-0.5">*</span>}
            </label>
            {renderField(field)}
          </div>
        ))}
      </div>

      <div className="flex gap-3 mt-6 pt-6 border-t border-[var(--border)]">
        <button
          onClick={() => onSave(formData)}
          disabled={saving}
          className="px-6 py-2.5 border border-[var(--border)] rounded-xl text-sm font-medium text-[var(--text-secondary)] hover:bg-[var(--bg-subtle)] transition-colors disabled:opacity-50 bg-transparent cursor-pointer"
        >
          {saving ? 'Сохранение...' : 'Сохранить черновик'}
        </button>
        <button
          onClick={() => onComplete(formData)}
          disabled={saving}
          className="px-6 py-2.5 bg-alfa-red text-white rounded-xl text-sm font-semibold hover:bg-alfa-red-hover transition-colors disabled:opacity-50"
        >
          {saving ? 'Сохранение...' : 'Завершить шаг'}
        </button>
      </div>
    </div>
  );
}

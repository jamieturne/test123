'use client';

import { useEffect, useState, useCallback } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import { api } from '@/lib/api';
import { ROADMAP_STEPS } from '@spotlight/shared';
import type { RoadmapStepConfig } from '@spotlight/shared';
import { WizardStepForm } from '@/components/wizard/WizardStepForm';
import { ArtifactPreview } from '@/components/wizard/ArtifactPreview';

interface StepData {
  id: string;
  stepNumber: number;
  status: string;
  formData: Record<string, unknown>;
  artifacts: Record<string, unknown>;
  completedAt: string | null;
}

interface OnboardingData {
  id: string;
  currentStep: number;
  status: string;
  team: { id: string; name: string; product: string };
  steps: StepData[];
}

export default function OnboardingWizardPage() {
  const params = useParams();
  const router = useRouter();
  const [onboarding, setOnboarding] = useState<OnboardingData | null>(null);
  const [activeStep, setActiveStep] = useState<number>(0);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  const fetchOnboarding = useCallback(async () => {
    const res = await api.onboardings.get(params.id as string);
    if (res.success && res.data) {
      const data = res.data as OnboardingData;
      setOnboarding(data);
      setActiveStep(data.currentStep);
    } else {
      router.push('/dashboard');
    }
    setLoading(false);
  }, [params.id, router]);

  useEffect(() => { fetchOnboarding(); }, [fetchOnboarding]);

  const handleSave = async (stepNumber: number, formData: Record<string, unknown>) => {
    if (!onboarding) return;
    setSaving(true);

    const artifacts = generateArtifacts(stepNumber, formData);

    await api.onboardings.updateStep(onboarding.id, stepNumber, {
      formData,
      artifacts,
      status: 'in_progress',
    });

    await fetchOnboarding();
    setSaving(false);
  };

  const handleComplete = async (stepNumber: number, formData: Record<string, unknown>) => {
    if (!onboarding) return;
    setSaving(true);

    const artifacts = generateArtifacts(stepNumber, formData);

    await api.onboardings.updateStep(onboarding.id, stepNumber, {
      formData,
      artifacts,
      status: 'completed',
    });

    await fetchOnboarding();
    setSaving(false);
  };

  if (loading || !onboarding) {
    return <div className="max-w-[1200px] mx-auto px-6 py-12 text-[var(--text-secondary)]">Загрузка...</div>;
  }

  const currentStepConfig = ROADMAP_STEPS.find(s => s.number === activeStep);
  const currentStepData = onboarding.steps.find(s => s.stepNumber === activeStep);

  return (
    <div className="max-w-[1200px] mx-auto px-6 py-8">
      {/* Header */}
      <div className="mb-8">
        <Link href="/dashboard" className="text-sm text-[var(--text-tertiary)] no-underline hover:text-[var(--text-primary)] transition-colors mb-4 inline-flex items-center gap-1">
          <svg width={16} height={16} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
            <polyline points="15 18 9 12 15 6" />
          </svg>
          Назад к списку
        </Link>
        <div className="flex items-center justify-between mt-3">
          <div>
            <h1 className="text-2xl font-bold text-[var(--text-primary)]">{onboarding.team.product}</h1>
            <p className="text-sm text-[var(--text-secondary)]">{onboarding.team.name}</p>
          </div>
          <div className={`text-xs font-semibold px-3 py-1 rounded-full ${
            onboarding.status === 'completed'
              ? 'bg-[rgba(48,209,88,0.08)] text-[#1B9E3E]'
              : 'bg-[rgba(239,49,36,0.06)] text-alfa-red'
          }`}>
            {onboarding.status === 'completed' ? 'Подключение завершено' : 'В процессе'}
          </div>
        </div>
      </div>

      {/* Progress bar */}
      <div className="mb-8">
        <div className="flex items-center justify-between text-xs text-[var(--text-tertiary)] mb-2">
          <span>Общий прогресс</span>
          <span>{onboarding.steps.filter(s => s.status === 'completed').length} / {onboarding.steps.length} фаз</span>
        </div>
        <div className="w-full h-2 bg-[var(--bg-alt)] rounded-full overflow-hidden border border-[var(--border)]">
          <div
            className="h-full bg-gradient-to-r from-alfa-red to-[#FF6B5A] rounded-full transition-all duration-500"
            style={{ width: `${(onboarding.steps.filter(s => s.status === 'completed').length / onboarding.steps.length) * 100}%` }}
          />
        </div>
      </div>

      <div className="flex gap-8 flex-col lg:flex-row">
        {/* Step sidebar */}
        <div className="lg:w-72 flex-shrink-0">
          <div className="bg-white border border-[var(--border)] rounded-[var(--radius-lg)] shadow-card overflow-hidden sticky top-20">
            <div className="px-4 py-3 border-b border-[var(--border)] bg-[var(--bg-alt)]">
              <span className="text-xs font-bold uppercase tracking-wider text-[var(--text-tertiary)]">Фазы подключения</span>
            </div>
            <div className="py-2">
              {ROADMAP_STEPS.map((step) => {
                const stepData = onboarding.steps.find(s => s.stepNumber === step.number);
                const status = stepData?.status || 'locked';
                const isActive = activeStep === step.number;

                return (
                  <button
                    key={step.number}
                    onClick={() => status !== 'locked' && setActiveStep(step.number)}
                    disabled={status === 'locked'}
                    className={`w-full text-left px-4 py-3 flex items-center gap-3 transition-colors border-none bg-transparent cursor-pointer ${
                      isActive ? 'bg-[rgba(239,49,36,0.04)]' : 'hover:bg-[var(--bg-alt)]'
                    } ${status === 'locked' ? 'opacity-40 cursor-not-allowed' : ''}`}
                  >
                    <div className={`w-7 h-7 rounded-full grid place-items-center text-xs font-bold flex-shrink-0 ${
                      status === 'completed' ? 'bg-[var(--green)] text-white' :
                      status === 'in_progress' ? 'bg-alfa-red text-white' :
                      isActive ? 'bg-alfa-red text-white' :
                      'bg-[var(--bg-alt)] text-[var(--text-tertiary)] border border-[var(--border)]'
                    }`}>
                      {status === 'completed' ? '✓' : step.number}
                    </div>
                    <div className="min-w-0 flex-1">
                      <div className={`text-sm font-medium truncate ${isActive ? 'text-[var(--text-primary)]' : 'text-[var(--text-secondary)]'}`}>
                        Фаза {step.number}. {step.title}
                      </div>
                      {step.timeline && (
                        <div className="text-[11px] text-[var(--text-tertiary)]">{step.timeline}</div>
                      )}
                    </div>
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* Step content */}
        <div className="flex-1 min-w-0">
          {currentStepConfig && currentStepData && (
            <div className="bg-white border border-[var(--border)] rounded-[var(--radius-lg)] shadow-card">
              <div className="px-6 py-5 border-b border-[var(--border)]">
                <div className="flex items-center justify-between mb-2 flex-wrap gap-2">
                  <h2 className="text-xl font-bold text-[var(--text-primary)]">
                    <span className="text-alfa-red mr-2">Фаза {currentStepConfig.number}.</span>
                    {currentStepConfig.title}
                  </h2>
                  {currentStepConfig.timeline && (
                    <span className="text-xs font-semibold text-alfa-red bg-[rgba(239,49,36,0.06)] px-3 py-1 rounded-full">
                      {currentStepConfig.timeline}
                    </span>
                  )}
                </div>
                {currentStepConfig.subtitle && (
                  <div className="text-[13px] text-[var(--text-secondary)] font-medium mb-2">{currentStepConfig.subtitle}</div>
                )}
                {currentStepConfig.responsible && (
                  <div className="text-xs text-[var(--text-tertiary)] mb-2">Ответственный: {currentStepConfig.responsible}</div>
                )}
                <p className="text-sm text-[var(--text-secondary)] leading-relaxed">{currentStepConfig.description}</p>
                {currentStepConfig.details && currentStepConfig.details.length > 0 && (
                  <details className="mt-3">
                    <summary className="text-xs font-semibold text-alfa-red cursor-pointer hover:underline">Подробный чек-лист фазы</summary>
                    <ul className="mt-2 space-y-1 pl-1">
                      {currentStepConfig.details.map((d, idx) => (
                        <li key={idx} className="text-[13px] text-[var(--text-tertiary)] leading-relaxed flex gap-2">
                          <span className="text-[var(--text-quaternary)] mt-0.5 flex-shrink-0">•</span>
                          <span>{d}</span>
                        </li>
                      ))}
                    </ul>
                  </details>
                )}
              </div>

              <div className="p-6">
                {currentStepData.status === 'completed' ? (
                  <div>
                    <div className="flex items-center gap-2 mb-4 px-4 py-3 rounded-xl bg-[rgba(48,209,88,0.06)] border border-[rgba(48,209,88,0.15)]">
                      <div className="w-5 h-5 rounded-full bg-[var(--green)] grid place-items-center flex-shrink-0">
                        <svg width={12} height={12} viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth={3} strokeLinecap="round" strokeLinejoin="round">
                          <polyline points="20 6 9 17 4 12" />
                        </svg>
                      </div>
                      <span className="text-sm font-medium text-[#1B9E3E]">Шаг завершён</span>
                      {currentStepData.completedAt && (
                        <span className="text-xs text-[var(--text-tertiary)] ml-auto">
                          {new Date(currentStepData.completedAt).toLocaleDateString('ru-RU')}
                        </span>
                      )}
                    </div>
                    <ArtifactPreview
                      stepConfig={currentStepConfig}
                      formData={currentStepData.formData}
                      artifacts={currentStepData.artifacts}
                    />
                  </div>
                ) : currentStepData.status === 'locked' ? (
                  <div className="text-center py-8 text-[var(--text-tertiary)]">
                    <div className="text-4xl mb-3">🔒</div>
                    <p className="text-sm">Этот шаг станет доступен после завершения предыдущего</p>
                  </div>
                ) : (
                  <WizardStepForm
                    stepConfig={currentStepConfig}
                    initialData={currentStepData.formData}
                    onSave={(data) => handleSave(currentStepConfig.number, data)}
                    onComplete={(data) => handleComplete(currentStepConfig.number, data)}
                    saving={saving}
                  />
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

function generateArtifacts(stepNumber: number, formData: Record<string, unknown>): Record<string, unknown> {
  const timestamp = new Date().toISOString();

  switch (stepNumber) {
    case 0:
      return {
        type: 'prioritization',
        title: 'Решение о подключении',
        generatedAt: timestamp,
        scenarios: formData.scenarios,
        selectedScenarios: formData.selectedScenarios || [],
        complexityLevel: formData.complexityLevel,
        apiReadiness: formData.apiReadiness || [],
      };
    case 1:
      return {
        type: 'skill_card',
        title: 'Карточка навыка',
        generatedAt: timestamp,
        productName: formData.productName,
        team: formData.teamName,
        contacts: {
          po: { name: formData.poName, email: formData.poEmail },
          techLead: { name: formData.techLeadName, email: formData.techLeadEmail },
        },
        scenariosTable: formData.scenariosTable,
        clientDataFields: formData.clientDataFields,
        plannedLaunchDate: formData.plannedLaunchDate,
        checklist: formData.prepChecklist || [],
      };
    case 2:
      return {
        type: 'access_request',
        title: 'Заявка на доступы',
        generatedAt: timestamp,
        developer: { name: formData.developerName, email: formData.developerEmail },
        accessStatus: formData.accessChecklist || [],
      };
    case 3:
      return {
        type: 'mcp_config',
        title: 'Конфигурация MCP-сервера',
        generatedAt: timestamp,
        template: formData.template,
        serviceName: formData.serviceName,
        targetApiUrl: formData.targetApiUrl,
        port: formData.port || '8081',
        tools: formData.tools,
        toolDescriptions: formData.toolDescriptions,
        checklist: formData.devChecklist || [],
      };
    case 4:
      return {
        type: 'deploy_request',
        title: 'Заявка на деплой',
        generatedAt: timestamp,
        jiraTicket: formData.jiraTicket,
        repository: formData.repoUrl,
        version: formData.version,
        notes: formData.reviewNotes,
        mcpServerUrl: formData.mcpServerUrl,
        publishStatus: formData.publishChecklist || [],
      };
    case 5:
      return {
        type: 'ai_flow_config',
        title: 'Конфигурация сценария AI Flow',
        generatedAt: timestamp,
        scenarioName: formData.scenarioName,
        mcpServerUrl: formData.mcpServerUrl,
        triggers: formData.triggerPhrases,
        paramMapping: formData.paramMapping,
        flowStatus: formData.flowChecklist || [],
      };
    case 6:
      return {
        type: 'e2e_report',
        title: 'Отчёт о тестировании и план раскатки',
        generatedAt: timestamp,
        releaseDate: formData.releaseDate,
        audience: formData.audience,
        testResults: formData.testResults,
        bugs: formData.bugs,
        e2eStatus: formData.e2eChecklist || [],
      };
    case 7:
      return {
        type: 'monitoring_config',
        title: 'Конфигурация мониторинга',
        generatedAt: timestamp,
        metrics: formData.metricsChecklist || [],
        feedbackChannel: formData.feedbackChannel,
        expansionPlan: formData.expansionPlan,
      };
    default:
      return { generatedAt: timestamp };
  }
}

export interface User {
  id: string;
  email: string;
  name: string;
  role: string;
  createdAt: string;
}

export interface Team {
  id: string;
  name: string;
  product: string;
  description: string;
  ownerId: string;
  createdAt: string;
}

export type StepStatus = 'locked' | 'active' | 'in_progress' | 'completed';
export type OnboardingStatus = 'active' | 'completed' | 'paused';

export interface StepProgress {
  id: string;
  onboardingId: string;
  stepNumber: number;
  status: StepStatus;
  formData: Record<string, unknown> | null;
  artifacts: Record<string, unknown> | null;
  completedAt: string | null;
}

export interface Onboarding {
  id: string;
  teamId: string;
  currentStep: number;
  status: OnboardingStatus;
  createdAt: string;
  updatedAt: string;
  team?: Team;
  steps?: StepProgress[];
}

export interface LoginRequest {
  email: string;
  password: string;
}

export interface RegisterRequest {
  email: string;
  password: string;
  name: string;
}

export interface CreateTeamRequest {
  name: string;
  product: string;
  description: string;
}

export interface UpdateStepRequest {
  formData?: Record<string, unknown>;
  artifacts?: Record<string, unknown>;
  status?: StepStatus;
}

export interface ApiResponse<T = unknown> {
  success: boolean;
  data?: T;
  error?: string;
}

type RuntimeConfigWindow = Window & {
  __APP_CONFIG__?: {
    API_URL?: string;
  };
};

function getApiUrl(): string {
  if (typeof window !== 'undefined') {
    const runtimeUrl = (window as RuntimeConfigWindow).__APP_CONFIG__?.API_URL;
    if (runtimeUrl) return runtimeUrl;
  }

  const publicEnvUrl = process.env.NEXT_PUBLIC_API_URL;
  if (publicEnvUrl) return publicEnvUrl;

  if (typeof window !== 'undefined') {
    const localHosts = new Set(['localhost', '127.0.0.1']);
    if (localHosts.has(window.location.hostname)) {
      return 'http://localhost:3001';
    }
  }

  return '';
}

async function request<T>(path: string, options?: RequestInit): Promise<{ success: boolean; data?: T; error?: string }> {
  const apiUrl = getApiUrl();
  if (!apiUrl) {
    throw new Error('API URL is not configured. Set API_URL (or NEXT_PUBLIC_API_URL) in web environment.');
  }

  const res = await fetch(`${apiUrl}${path}`, {
    credentials: 'include',
    headers: { 'Content-Type': 'application/json', ...options?.headers },
    ...options,
  });
  return res.json();
}

export const api = {
  auth: {
    register: (data: { email: string; password: string; name: string }) =>
      request('/api/auth/register', { method: 'POST', body: JSON.stringify(data) }),
    login: (data: { email: string; password: string }) =>
      request('/api/auth/login', { method: 'POST', body: JSON.stringify(data) }),
    logout: () => request('/api/auth/logout', { method: 'POST' }),
    me: () => request('/api/auth/me'),
  },
  teams: {
    list: () => request('/api/teams'),
    create: (data: { name: string; product: string; description: string }) =>
      request('/api/teams', { method: 'POST', body: JSON.stringify(data) }),
  },
  onboardings: {
    list: () => request('/api/onboardings'),
    create: (teamId: string) =>
      request('/api/onboardings', { method: 'POST', body: JSON.stringify({ teamId }) }),
    get: (id: string) => request(`/api/onboardings/${id}`),
    updateStep: (id: string, step: number, data: Record<string, unknown>) =>
      request(`/api/onboardings/${id}/steps/${step}`, { method: 'PUT', body: JSON.stringify(data) }),
  },
  admin: {
    listSkills: () => request('/api/admin/skills'),
    getSkill: (id: string) => request(`/api/admin/skills/${id}`),
  },
};

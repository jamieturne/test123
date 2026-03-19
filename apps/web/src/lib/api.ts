const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001';

async function request<T>(path: string, options?: RequestInit): Promise<{ success: boolean; data?: T; error?: string }> {
  const res = await fetch(`${API_URL}${path}`, {
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
};

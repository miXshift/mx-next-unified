// services/auth/auth.api.ts
import { fetchApi } from '@utils/api';

export const authApi = {
  async login(email: string, password: string) {
    return fetchApi('/auth/login', {
      method: 'POST',
      body: JSON.stringify({ email, password }),
    });
  },

  async register(email: string, password: string) {
    return fetchApi('/auth/register', {
      method: 'POST',
      body: JSON.stringify({ email, password }),
    });
  },

  async logout() {
    // Clear local storage, cookies etc.
  },
};

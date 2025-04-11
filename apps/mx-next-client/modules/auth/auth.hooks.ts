// services/auth/auth.hooks.ts
import { useState } from 'react';
import { authApi } from './auth.api';

export function useAuth() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  const login = async (email: string, password: string) => {
    try {
      setIsLoading(true);
      setError(null);
      const data = await authApi.login(email, password);
      // Store token, update auth state etc.
      return data;
    } catch (err) {
      setError(err as Error);
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  // Similar implementations for register and logout

  return {
    login,
    isLoading,
    error,
  };
}

import axios from 'axios';
import { TokenResponse } from './types';

const unauthorizedAxiosInstance = axios.create({
  baseURL: import.meta.env.VITE_BACKEND_API_URL,
});

export const refreshTokenApi = (token: string) =>
  unauthorizedAxiosInstance.post<{ token: string }, TokenResponse>('/refresh', {
    data: { token },
  });

export const googleLoginApi = (token: string) =>
  unauthorizedAxiosInstance.post<{ token: string }, TokenResponse>(
    '/auth/google',
    {
      data: { token },
    }
  );

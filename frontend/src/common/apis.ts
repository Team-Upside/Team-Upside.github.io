import axios, { AxiosError } from 'axios';
import { CreateUserDto, UserDto } from './types';

const unauthorizedAxiosInstance = axios.create({
  baseURL: import.meta.env.VITE_BACKEND_API_URL,
});

export const getMeApi = async (token: string) => {
  unauthorizedAxiosInstance.defaults.headers.common[
    'Authorization'
  ] = `Bearer ${token}`;

  try {
    return await unauthorizedAxiosInstance.get<UserDto>('/users/me');
  } catch (error) {
    if (error instanceof AxiosError) {
      if (error.response?.status === 403) {
        window.location.href = '/signup';
      }
    }
  }
};

export const createUserApi = async ({
  token,
  request,
}: {
  token: string;
  request: CreateUserDto;
}) => {
  unauthorizedAxiosInstance.defaults.headers.common[
    'Authorization'
  ] = `Bearer ${token}`;

  return await unauthorizedAxiosInstance.post<CreateUserDto, UserDto>(
    '/users',
    request
  );
};

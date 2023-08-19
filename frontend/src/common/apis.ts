import axios from 'axios';
import { CreateUserDto, UserDto } from './types';

const unauthorizedAxiosInstance = axios.create({
  baseURL: import.meta.env.VITE_BACKEND_API_URL,
});

export const getMeApi = async (token: string) => {
  unauthorizedAxiosInstance.defaults.headers.common[
    'Authorization'
  ] = `Bearer ${token}`;

  return await unauthorizedAxiosInstance.get<UserDto>('/users/me');
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

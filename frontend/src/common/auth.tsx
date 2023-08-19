/* eslint-disable no-console */
import {
  createContext,
  ReactNode,
  useCallback,
  useContext,
  useEffect,
  useLayoutEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import axios, { AxiosInstance } from 'axios';
import { googleLoginApi, refreshTokenApi } from './apis';
import useScript, { ScriptStatus } from './hooks/useScript';
import { LocalStorageKey } from './types';
import { useMutation } from '@tanstack/react-query';
import { useLocalStorageValue } from '@react-hookz/web';

axios.defaults.paramsSerializer = {
  indexes: null,
};

const AxiosContext = createContext<AxiosInstance>(
  axios.create({
    baseURL: import.meta.env.VITE_BACKEND_API_URL,
  })
);

interface AuthContextValue {
  isAuthenticated: boolean;
  setGoogleIdToken: React.Dispatch<React.SetStateAction<string | null>>;
  logout: () => void;
}

declare global {
  const google: typeof import('google-one-tap');
}

const AuthContext = createContext<AuthContextValue>({
  isAuthenticated: !!localStorage.getItem('accessToken'),
  setGoogleIdToken: () => {},
  logout: () => {},
});

const withLock = async (lockName: string, callback: () => Promise<void>) => {
  await navigator.locks.request(
    lockName,
    { ifAvailable: true },
    async (lock) => {
      if (lock) {
        await callback();
      } else {
        await navigator.locks.request(lockName, () => {}); // just wait
      }
    }
  );
};

interface AxiosProviderProps {
  children: ReactNode;
}

export const AuthProvider = ({ children }: AxiosProviderProps) => {
  const [willLogout, setWillLogout] = useState<boolean>(false);
  const [googleIdToken, setGoogleIdToken] = useState<string | null>(null);
  const googleScriptStatus = useScript(
    'https://accounts.google.com/gsi/client',
    willLogout
  );
  const { value: accessToken, set: setAccessToken } = useLocalStorageValue<
    string | null
  >(LocalStorageKey.AccessToken);

  const axiosRef = useRef(
    axios.create({
      baseURL: import.meta.env.VITE_BACKEND_API_URL,
    })
  );

  const { mutateAsync: refreshTokenRequest } = useMutation({
    mutationKey: ['refreshToken'],
    mutationFn: (token: string) => refreshTokenApi(token),
  });
  const { mutateAsync: googleLoginrequest } = useMutation(googleLoginApi);

  const logout = useCallback(() => {
    setWillLogout(true);
  }, []);

  useEffect(() => {
    if (!willLogout || googleScriptStatus !== ScriptStatus.Ready) return;
    google.accounts.id.disableAutoSelect();

    setAccessToken(null);
    setGoogleIdToken(null);
    localStorage.removeItem(LocalStorageKey.AccessToken);
    localStorage.removeItem(LocalStorageKey.RefreshToken);
  }, [willLogout, googleScriptStatus]);

  const refreshAccessToken = useCallback(async () => {
    const refreshToken = localStorage.getItem(LocalStorageKey.RefreshToken);
    if (!refreshToken) return null;
    await withLock('refreshToken', async () => {
      try {
        const { accessToken: newAccessToken, refreshToken: newRefreshToken } =
          await refreshTokenRequest(refreshToken);

        setAccessToken(newAccessToken);

        localStorage.setItem(LocalStorageKey.AccessToken, newAccessToken);
        localStorage.setItem(LocalStorageKey.RefreshToken, newRefreshToken);
      } catch {
        logout();
      }
    });
    return localStorage.getItem(LocalStorageKey.AccessToken);
  }, [refreshTokenRequest, logout]);

  useLayoutEffect(() => {
    if (!accessToken) return undefined;

    const axiosRefCurrent = axiosRef.current;

    const reqInterceptorId = axiosRefCurrent.interceptors.request.use(
      async (config) => {
        try {
          config.headers.set('Authorization', `Bearer ${accessToken}`);
        } catch (error) {
          console.error(error);
        }
        return config;
      }
    );

    const resInterceptorId = axiosRefCurrent.interceptors.response.use(
      (response) => response,
      async (error) => {
        const originalRequest = error.config;

        if (error.response?.status === 401) {
          const newAccessToken = await refreshAccessToken();
          if (newAccessToken) {
            originalRequest.headers.set(
              'Authorization',
              `Bearer ${newAccessToken}`
            );
            return axios(originalRequest);
          }
        }

        return Promise.reject(error);
      }
    );

    return () => {
      axiosRefCurrent.interceptors.request.eject(reqInterceptorId);
      axiosRefCurrent.interceptors.response.eject(resInterceptorId);
    };
  }, [accessToken, refreshAccessToken]);

  useEffect(() => {
    if (accessToken || !googleIdToken) return;

    (async () => {
      const { accessToken: newAccessToken, refreshToken: newRefreshToken } =
        await googleLoginrequest(googleIdToken);

      setAccessToken(newAccessToken);

      localStorage.setItem(LocalStorageKey.AccessToken, newAccessToken);
      localStorage.setItem(LocalStorageKey.RefreshToken, newRefreshToken);
    })();
  }, [googleIdToken, accessToken, googleLoginrequest]);

  const value = useMemo(
    () => ({ isAuthenticated: !!accessToken, setGoogleIdToken, logout }),
    [accessToken, setGoogleIdToken, logout]
  );

  return (
    <AxiosContext.Provider value={axiosRef.current}>
      <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
    </AxiosContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
export const useAxios = () => useContext(AxiosContext);

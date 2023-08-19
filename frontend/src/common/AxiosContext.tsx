/* eslint-disable no-console */
import {
  createContext,
  ReactNode,
  useContext,
  useLayoutEffect,
  useRef,
} from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import axios, { AxiosInstance } from 'axios';

axios.defaults.paramsSerializer = {
  indexes: null,
};

const AxiosContext = createContext<AxiosInstance>(
  axios.create({
    baseURL: import.meta.env.VITE_BACKEND_API_URL,
  })
);

interface AxiosProviderProps {
  children: ReactNode;
}

export const AxiosProvider = ({ children }: AxiosProviderProps) => {
  const axiosRef = useRef(
    axios.create({
      baseURL: import.meta.env.VITE_BACKEND_API_URL,
    })
  );
  const { isAuthenticated, getAccessTokenSilently } = useAuth0();

  useLayoutEffect(() => {
    if (!isAuthenticated) {
      return undefined;
    }
    const axiosRefCurrent = axiosRef.current;

    const reqInterceptorId = axiosRefCurrent.interceptors.request.use(
      async (config) => {
        try {
          const token = await getAccessTokenSilently();
          config.headers.set('Authorization', `Bearer ${token}`);
        } catch (error) {
          console.error(error);
        }
        return config;
      }
    );

    const resInterceptorId = axiosRefCurrent.interceptors.response.use(
      (response) => response,
      (error) => {
        console.log(error);
        return Promise.reject(error);
      }
    );
    return () => {
      axiosRefCurrent.interceptors.request.eject(reqInterceptorId);
      axiosRefCurrent.interceptors.response.eject(resInterceptorId);
    };
  }, [isAuthenticated, getAccessTokenSilently]);

  return (
    <AxiosContext.Provider value={axiosRef.current}>
      {children}
    </AxiosContext.Provider>
  );
};

export const useAxios = () => useContext(AxiosContext);

export default AxiosContext;

import { memo, useLayoutEffect } from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import { useQuery } from '@tanstack/react-query';
import { getMeApi } from '../../common/apis';
import { Outlet, useNavigate } from 'react-router-dom';
import { AxiosError } from 'axios';

const RequiredAuth = () => {
  const {
    user,
    isAuthenticated,
    isLoading,
    loginWithRedirect,
    getAccessTokenSilently,
  } = useAuth0();

  const navigate = useNavigate();

  useLayoutEffect(() => {
    if (!isAuthenticated && !isLoading) {
      loginWithRedirect();
    }
  }, [isAuthenticated, isLoading]);

  const { isLoading: loadingMe } = useQuery({
    queryKey: [user?.me],
    queryFn: async () => {
      try {
        const token = await getAccessTokenSilently();
        return await getMeApi(token);
      } catch (error) {
        if (error instanceof AxiosError) {
          if (error.response?.status === 403) {
            navigate('/signup');
            return null;
          }
        }
      }
    },
    enabled: isAuthenticated,
  });

  if (isLoading || !isAuthenticated || loadingMe) {
    return null;
  }
  return <Outlet />;
};

export default memo(RequiredAuth);

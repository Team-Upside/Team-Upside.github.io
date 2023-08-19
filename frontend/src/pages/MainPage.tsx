import { css } from '@emotion/react';
import { memo, useLayoutEffect, useState } from 'react';
import Navbar from '../common/components/Navbar';
import Card from '../common/components/Card';
import sampleFood1Image from '../assets/sample-food-1.png';
import sampleFood2Image from '../assets/sample-food-2.png';
import { useAuth0 } from '@auth0/auth0-react';
import { useQuery } from '@tanstack/react-query';
import { getMeApi } from '../common/apis';
import { useNavigate } from 'react-router-dom';
import { AxiosError } from 'axios';

const MainPage = () => {
  const [people, setPeople] = useState([
    {
      name: 'Elon Musk',
    },
    {
      name: 'Mark Zuckerberg',
    },
  ]);

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

  return (
    <div
      css={css`
        height: 100vh;
      `}
    >
      <Navbar />
      <div
        css={css`
          padding-top: 12px;
          display: flex;
          justify-content: center;
        `}
      >
        {people.map((person) => (
          <Card
            key={person.name}
            person={person}
            restaurant={{ name: 'Lacoon Pizza' }}
            images={[sampleFood1Image, sampleFood2Image]}
          />
        ))}
      </div>
    </div>
  );
};

export default memo(MainPage);

import { css } from '@emotion/react';
import { memo, useEffect, useState } from 'react';
import Navbar from '../common/components/Navbar';
import Card from '../common/components/Card';
import sampleFood1Image from '../assets/sample-food-1.png';
import sampleFood2Image from '../assets/sample-food-2.png';
import { useAuth0 } from '@auth0/auth0-react';
import { useQuery } from '@tanstack/react-query';
import { getMeApi } from '../common/apis';

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

  useEffect(() => {
    if (!isAuthenticated && !isLoading) {
      loginWithRedirect();
    }
  }, [isAuthenticated, isLoading, loginWithRedirect]);

  const { data } = useQuery({
    queryKey: [user?.name],
    queryFn: async () => {
      const token = await getAccessTokenSilently();
      getMeApi(token);
    },
  });

  if (isLoading || !isAuthenticated) {
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
          margin-top: 12px;
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

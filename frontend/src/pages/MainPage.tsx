import { css } from '@emotion/react';
import { memo } from 'react';
import Navbar from '../common/components/Navbar';
import Card from '../common/components/Card';
import { useAxios } from '../common/AxiosContext';
import { useQuery } from '@tanstack/react-query';
import { CardDto } from '../cards/types';

const MainPage = () => {
  const axios = useAxios();

  const { data: cards } = useQuery({
    queryKey: ['cards'],
    queryFn: async () => {
      const { data } = await axios.get<CardDto[]>('/cards');
      return data;
    },
  });

  return (
    <div
      css={css`
        height: 100vh;
      `}
    >
      <Navbar />
      {cards ? (
        <div
          css={css`
            padding-top: 12px;
            display: flex;
            justify-content: center;
          `}
        >
          {cards.map(({ id, message, user, restaurant }) => (
            <Card
              key={`${user.nickname}-${id}`}
              id={id}
              message={message}
              user={user}
              restaurant={restaurant}
            />
          ))}
        </div>
      ) : null}
    </div>
  );
};

export default memo(MainPage);

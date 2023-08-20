import { css } from '@emotion/react';
import { memo } from 'react';
import Navbar from '../common/components/Navbar';
import Card from '../common/components/Card';
import { useAxios } from '../common/AxiosContext';
import { useQuery } from '@tanstack/react-query';
import { CardDto } from '../cards/types';
import { useTheme } from '@mui/material';
import { useLocalStorageValue } from '@react-hookz/web';
import Tutorial from '../common/components/Tutorial';

const MainPage = () => {
  const axios = useAxios();
  const theme = useTheme();

  const { value, set } = useLocalStorageValue<boolean>('first', {
    defaultValue: true,
  });

  const { data: cards } = useQuery({
    queryKey: ['cards'],
    queryFn: async () => {
      const { data } = await axios.get<CardDto[]>('/cards');
      return data;
    },
  });

  if (value) {
    return <Tutorial onClickClose={() => set(false)} />;
  }

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
          {cards.length === 0 && (
            <h2
              css={css`
                position: absolute;
                width: 100%;
                height: 100%;
                padding-bottom: 80px;
                display: flex;
                justify-content: center;
                align-items: center;
                flex-direction: column;
                color: ${theme.palette.gray[100]};
                font-size: 20px;
                font-weight: 590;
                line-height: 140%;
                letter-spacing: -0.064px;
                text-align: center;
              `}
            >
              No cards left 😢
              <br />
              Why don't you add one?
            </h2>
          )}
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

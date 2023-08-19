import { css } from '@emotion/react';
import { FC, memo, useState } from 'react';
import TinderCard from 'react-tinder-card';
import { theme } from '../../styles/theme';
import { Button, useTheme } from '@mui/material';
import { ReactComponent as ChevronRightIcon } from '../../assets/icons/chevron-right.svg';
import ProfileExample from '../../assets/profile-example.png';
import UserProfileModal from './UserProfileModal';
import { UserDto } from '../types';
import { CardDto, RestaurantDto } from '../../cards/types';
import { useMutation } from '@tanstack/react-query';
import { useAxios } from '../AxiosContext';

const cardStyle = css`
  position: absolute;
  background-color: #fff;
  width: calc(100% - 40px);
  height: 80%;
  height: 524px;
  max-height: 524px;
  box-shadow:
    0px 0px 1px 0px rgba(57, 63, 73, 0.31),
    0px 3px 5px 0px rgba(56, 61, 69, 0.2);
  border-radius: 20px;
  overflow: hidden;
  padding: 11px 11px 23px 11px;
  * {
    user-select: none;
  }
`;

const titleStyle = css`
  font-size: 22px;
  font-weight: 700;
  line-height: 140%;
  letter-spacing: -0.088px;
  color: ${theme.palette.gray[100]};
`;

const distanceStyle = css`
  color: ${theme.palette.gray[40]};
  text-align: center;
  font-size: 14px;
  font-weight: 400;
  line-height: 140%;
  letter-spacing: -0.056px;
`;

interface CardProps {
  id: number;
  message: string;
  user: UserDto;
  restaurant: RestaurantDto;
}

const Card: FC<CardProps> = ({ id, message, user, restaurant }) => {
  const axios = useAxios();

  const theme = useTheme();

  const [isOpen, setOpen] = useState(false);

  const { mutateAsync: approve } = useMutation({
    mutationFn: async () => {
      await axios.post<undefined, CardDto>(`/cards/${id}/approve`);
    },
  });
  const { mutateAsync: ignore } = useMutation({
    mutationFn: async () => {
      await axios.post<undefined, CardDto>(`/cards/${id}/ignore`);
    },
  });

  const outOfFrame = async (direction: string) => {
    if (direction === 'left') {
      await ignore();
      return;
    }
    await approve();
  };

  const [showingPictureIndex, setShowingPictureIndex] = useState(0);

  return (
    <TinderCard
      css={cardStyle}
      preventSwipe={['up', 'down']}
      onCardLeftScreen={outOfFrame}
      swipeRequirementType="position"
    >
      <div
        css={css`
          position: absolute;
          top: 28px;
          left: 50%;
          transform: translateX(-50%);
          display: flex;
          align-items: center;
          gap: 12px;
          padding: 0 20px;
          z-index: 3;
        `}
      >
        <Button type="button" variant="text" onClick={() => setOpen(true)}>
          <img
            css={css`
              width: 60px;
              height: 60px;
              border-radius: 50%;
            `}
            src={user.profile ?? ProfileExample}
            alt="user"
          />
        </Button>
        <div
          css={css`
            width: 192px;
            height: 60px;
            padding: 12px;
            color: ${theme.palette.gray[100]};
            font-size: 13px;
            font-style: normal;
            font-weight: 274;
            line-height: 140%;
            letter-spacing: -0.052px;
            white-space: pre-wrap;
            display: -webkit-box;
            -webkit-line-clamp: 2;
            -webkit-box-orient: vertical;
            text-overflow: ellipsis;
            overflow: hidden;
            background-color: white;
            border-radius: 12px;
            box-shadow:
              0px 0px 1px 0px rgba(57, 63, 73, 0.31),
              0px 3px 5px 0px rgba(56, 61, 69, 0.2);
          `}
        >
          {message}
        </div>
      </div>
      <UserProfileModal
        isOpen={isOpen}
        onClose={() => setOpen(false)}
        user={user}
      />
      <div
        css={css`
          height: 395px;
          border-radius: 20px;
          display: flex;
          justify-content: center;
          align-items: center;
          overflow: hidden;
          position: relative;
        `}
        onClick={() =>
          setShowingPictureIndex(
            (showingPictureIndex + 1) % restaurant.pictures.length
          )
        }
      >
        <div
          css={css`
            width: 100%;
            height: 100%;
            background:
              linear-gradient(
                180deg,
                rgba(0, 0, 0, 0) 0%,
                rgba(0, 0, 0, 0.4) 100%
              ),
              url(${restaurant.pictures[showingPictureIndex]}) center / cover
                no-repeat,
              lightgray 50% / cover no-repeat;
          `}
        />
        <div
          css={css`
            position: absolute;
            width: 100%;
            height: 5px;
            display: flex;
            justify-content: space-between;
            gap: 4px;
            bottom: 14px;
            padding: 0 17px;
          `}
        >
          {restaurant.pictures.map((picture, index) => (
            <div
              key={picture}
              css={css`
                flex: 1;
                height: 100%;
                background-color: ${index === showingPictureIndex
                  ? theme.palette.primary.main
                  : theme.palette.gray[10]};
                border-radius: 300px;
              `}
            />
          ))}
        </div>
      </div>
      <div
        css={css`
          display: flex;
          margin-top: 21px;
          align-items: center;
          gap: 6px;
        `}
      >
        <h2 css={titleStyle}>{restaurant.name}</h2>
        <div
          css={css`
            width: 1px;
            height: 10px;
            background-color: ${theme.palette.gray[40]};
          `}
        />
        <p css={distanceStyle}>279m</p>
      </div>
      <Button
        color="primary"
        css={css`
          text-transform: none;
          font-size: 14px;
          font-weight: 590;
          line-height: 20px;
        `}
      >
        See all menu
        <ChevronRightIcon />
      </Button>
    </TinderCard>
  );
};

export default memo(Card);

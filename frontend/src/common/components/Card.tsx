import { css } from '@emotion/react';
import { FC, memo } from 'react';
import TinderCard from 'react-tinder-card';
import { theme } from '../../styles/theme';
import { Button, useTheme } from '@mui/material';
import { ReactComponent as ChevronRightIcon } from '../../assets/icons/chevron-right.svg';

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
`;

const titleStyle = css`
  font-size: 22px;
  font-style: normal;
  font-weight: 700;
  line-height: 140%;
  letter-spacing: -0.088px;
  color: ${theme.palette.gray[100]};
`;

const distanceStyle = css`
  color: ${theme.palette.gray[40]};
  text-align: center;
  font-size: 14px;
  font-style: normal;
  font-weight: 400;
  line-height: 140%;
  letter-spacing: -0.056px;
`;

interface CardProps {
  person: {
    name: string;
  };
  restaurant: {
    name: string;
  };
  images: string[];
}

const Card: FC<CardProps> = ({ person, restaurant, images }) => {
  const theme = useTheme();
  const swiped = (direction: string, nameToDelete: string) => {
    console.log('removing: ' + nameToDelete);
    // setLastDirection(direction);
  };

  const outOfFrame = (name: string) => {
    console.log(name + ' left the screen!');
  };
  return (
    <TinderCard
      css={cardStyle}
      preventSwipe={['up', 'down']}
      onSwipe={(dir) => swiped(dir, person.name)}
      onCardLeftScreen={() => outOfFrame(person.name)}
    >
      <div
        css={css`
          background-image: url(${images[0]});
          background-size: cover;
          height: 395px;
          border-radius: 20px;
        `}
      />
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
        See menu
        <ChevronRightIcon />
      </Button>
    </TinderCard>
  );
};

export default memo(Card);

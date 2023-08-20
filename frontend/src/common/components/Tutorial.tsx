import { FC, memo } from 'react';
import { css } from '@emotion/react';
import { IconButton, useTheme } from '@mui/material';
import Tab from '../../assets/tab.svg';
import Approve from '../../assets/approve.svg';
import Ignore from '../../assets/ignore.svg';
import { ReactComponent as CloseIcon } from '../../assets/icons/close-plain.svg';

const Row: FC<{ assets: string; title: string; subtitle: string }> = ({
  assets,
  subtitle,
  title,
}) => {
  const theme = useTheme();

  return (
    <div
      css={css`
        display: flex;
        justify-content: center;
        gap: 40px;
      `}
    >
      <img src={assets} alt="" />
      <div
        css={css`
          display: flex;
          flex-direction: column;
          gap: 10px;
          flex-basis: 136px;
        `}
      >
        <p
          css={css`
            color: #fff;
            font-size: 19px;
            font-style: normal;
            font-weight: 590;
            line-height: 20px;
          `}
        >
          {title}
        </p>
        <p
          css={css`
            color: ${theme.palette.gray[20]};
            font-size: 14px;
            font-style: normal;
            font-weight: 400;
            line-height: 20px;
          `}
        >
          {subtitle}
        </p>
      </div>
    </div>
  );
};

interface Props {
  onClickClose: () => void;
}

const Tutorial: FC<Props> = ({ onClickClose }) => {
  const theme = useTheme();

  return (
    <div
      onClick={onClickClose}
      css={css`
        position: relative;
        display: flex;
        flex-direction: column;
        gap: 70px;
        width: 100%;
        height: 100vh;
        background: rgba(0, 0, 0, 0.8);
        backdrop-filter: blur(15px);
        padding: 167px 42px;
        color: ${theme.palette.gray[20]};
      `}
    >
      <IconButton
        type="button"
        css={css`
          position: absolute;
          top: 20px;
          right: 20px;
        `}
        onClick={onClickClose}
      >
        <CloseIcon />
      </IconButton>
      <p
        css={css`
          color: ${theme.palette.gray[20]};
          text-align: center;
          font-size: 20px;
          font-style: normal;
          font-weight: 600;
          line-height: 24px;
        `}
      >
        You can use these gesture to control playback!
      </p>
      {[
        {
          assets: Tab,
          title: 'Tab the screen',
          subtitle: 'Discover menus',
        },
        {
          assets: Approve,
          title: 'Swipe Right',
          subtitle: 'Like this food',
        },
        {
          assets: Ignore,
          title: 'Swipe Left',
          subtitle: 'Not interested!',
        },
      ].map((item) => (
        <Row {...item} />
      ))}
    </div>
  );
};

export default memo(Tutorial);

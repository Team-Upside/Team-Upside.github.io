import { css } from '@emotion/react';
import { memo } from 'react';
import { IconButton, useTheme } from '@mui/material';
import MyUtterance from '../common/components/MyUtterance';
import OpponentUtterance from '../common/components/OpponentUtterance';
import { ReactComponent as ChevronLeftIcon } from '../assets/icons/chevron-left.svg';

const ChatListPage = () => {
  const theme = useTheme();

  return (
    <div
      css={css`
        height: 100vh;
      `}
    >
      <div
        css={css`
          display: flex;
          position: relative;
          justify-content: center;
          align-items: center;
          height: 50px;
          border-bottom: 1px solid ${theme.palette.gray[20]};
        `}
      >
        <IconButton
          css={css`
            position: absolute;
            width: 26px;
            height: 26px;
            padding: 0;
            left: 20px;
          `}
        >
          <ChevronLeftIcon />
        </IconButton>
        <h1
          css={css`
            color: ${theme.palette.gray[70]};
            font-size: 16px;
            font-weight: 590;
            line-height: 140%;
            letter-spacing: -0.064px;
          `}
        >
          Wade
        </h1>
      </div>
      <div
        css={css`
          display: flex;
          flex-direction: column;
          justify-content: center;
          flex: 1;
          padding: 20px 20px 0 20px;
          gap: 24px;
        `}
      >
        <OpponentUtterance />
        <MyUtterance />
      </div>
    </div>
  );
};

export default memo(ChatListPage);

import { css } from '@emotion/react';
import { memo } from 'react';
import { Button, IconButton, useTheme } from '@mui/material';
import MyUtterance from '../common/components/MyUtterance';
import OpponentUtterance from '../common/components/OpponentUtterance';
import { ReactComponent as ChevronLeftIcon } from '../assets/icons/chevron-left.svg';
import sampleFood1Image from '../assets/sample-food-1.png';
import ChatInput from '../common/components/ChatInput';
const ChatListPage = () => {
  const theme = useTheme();

  return (
    <div
      css={css`
        height: 100vh;
        display: flex;
        flex-direction: column;
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
          padding: 0 20px;
          display: flex;
          position: relative;
          justify-content: center;
          align-items: center;
          height: 70px;
          border-bottom: 1px solid ${theme.palette.gray[20]};
        `}
      >
        <img
          src={sampleFood1Image}
          alt="sample-food-1"
          css={css`
            width: 36px;
            height: 36px;
            border-radius: 4px;
            border: 1px solid ${theme.palette.gray[20]};
            margin-right: 12px;
          `}
        />
        <h2
          css={css`
            color: ${theme.palette.gray[100]};
            font-size: 14px;
            font-weight: 510;
            line-height: 140%;
            letter-spacing: -0.056px;
          `}
        >
          Lacoon Pizza
        </h2>
        <div
          css={css`
            width: 1px;
            height: 10px;
            background-color: ${theme.palette.gray[40]};
            margin: 0 6px;
          `}
        />
        <p
          css={css`
            color: ${theme.palette.gray[40]};
            font-size: 12px;
            font-weight: 274;
            line-height: 140%;
            letter-spacing: -0.048px;
          `}
        >
          279m
        </p>
        <div
          css={css`
            flex: 1;
          `}
        />
        <Button
          color="primary"
          variant="outlined"
          css={css`
            border-radius: 6px;
            text-transform: none;
            font-size: 14px;
            font-weight: 600;
          `}
        >
          Invite
        </Button>
      </div>
      <div
        css={css`
          display: flex;
          flex-direction: column;
          justify-content: flex-start;
          flex: 1;
          padding: 20px 20px 0 20px;
          gap: 24px;
        `}
      >
        <OpponentUtterance />
        <MyUtterance />
      </div>
      <ChatInput />
    </div>
  );
};

export default memo(ChatListPage);

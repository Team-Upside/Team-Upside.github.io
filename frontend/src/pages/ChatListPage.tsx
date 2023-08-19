import { css } from '@emotion/react';
import { memo } from 'react';
import Navbar from '../common/components/Navbar';
import { useTheme } from '@mui/material';
import ChatListItem from '../common/components/ChatListItem';

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
          justify-content: center;
          align-items: center;
          height: 50px;
          border-bottom: 1px solid ${theme.palette.gray[20]};
        `}
      >
        <h1
          css={css`
            color: ${theme.palette.gray[70]};
            font-size: 16px;
            font-style: normal;
            font-weight: 590;
            line-height: 140%;
            letter-spacing: -0.064px;
          `}
        >
          Chat
        </h1>
      </div>
      <div
        css={css`
          display: flex;
          flex-direction: column;
          justify-content: center;
          flex: 1;
        `}
      >
        <ChatListItem />
        <ChatListItem />
        <ChatListItem />
        <ChatListItem />
      </div>
      <Navbar />
    </div>
  );
};

export default memo(ChatListPage);

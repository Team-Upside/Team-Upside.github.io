import { css } from '@emotion/react';
import { memo } from 'react';
import Navbar from '../common/components/Navbar';
import { IconButton, useTheme } from '@mui/material';
import ChatListItem from '../common/components/ChatListItem';
import { useAxios } from '../common/AxiosContext';
import { useQuery } from '@tanstack/react-query';
import { ChatroomDto } from '../common/types';
import { ReactComponent as ClosePlainIcon } from '../assets/icons/close-plain.svg';
import { useNavigate } from 'react-router-dom';

const ChatListPage = () => {
  const theme = useTheme();
  const navigate = useNavigate();
  const axios = useAxios();

  const { data: chatrooms } = useQuery({
    queryKey: ['chatrooms'],
    queryFn: async () => {
      const { data } = await axios.get<ChatroomDto[]>('/chatrooms');
      return data;
    },
  });

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
            font-weight: 590;
            line-height: 140%;
            letter-spacing: -0.064px;
          `}
        >
          Chat
        </h1>
        <IconButton
          type="button"
          css={css`
            position: absolute;
            width: 26px;
            height: 26px;
            padding: 0;
            right: 20px;
          `}
          onClick={() => navigate('/')}
        >
          <ClosePlainIcon />
        </IconButton>
      </div>
      <div
        css={css`
          display: flex;
          flex-direction: column;
          justify-content: center;
          flex: 1;
        `}
      >
        {chatrooms?.map((chatroom) => (
          <ChatListItem key={chatroom.id} chatroom={chatroom} />
        ))}
      </div>
      <Navbar />
    </div>
  );
};

export default memo(ChatListPage);

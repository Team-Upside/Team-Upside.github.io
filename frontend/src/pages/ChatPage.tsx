import { css } from '@emotion/react';
import { memo } from 'react';
import { Button, IconButton, useTheme } from '@mui/material';
import MyUtterance from '../common/components/MyUtterance';
import OpponentUtterance from '../common/components/OpponentUtterance';
import { ReactComponent as ChevronLeftIcon } from '../assets/icons/chevron-left.svg';
import sampleFood1Image from '../assets/sample-food-1.png';
import ChatInput from '../common/components/ChatInput';
import { Link, useParams } from 'react-router-dom';
import { useAxios } from '../common/AxiosContext';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { ChatDto, ChatroomDto, UserDto } from '../common/types';
import SystemMessage from '../common/components/SystemMessage';
const ChatListPage = () => {
  const { id } = useParams<{ id: string }>();
  const queryClient = useQueryClient();
  const theme = useTheme();
  const axios = useAxios();

  const { data: me } = useQuery({
    queryKey: ['me'],
    queryFn: async () => {
      const { data } = await axios.get<UserDto>('/users/me');
      return data;
    },
  });

  const { mutateAsync: read } = useMutation({
    mutationFn: async () => {
      await axios.patch(`/chatrooms/${id}/read`);
    },
  });

  const { mutateAsync: send } = useMutation({
    mutationFn: async (message: string) => {
      await axios.post(`/chatrooms/${id}/chats?message=${message}`);
      queryClient.invalidateQueries(['chatrooms', id, 'chats']);
    },
  });

  const { data: chatroom } = useQuery({
    queryKey: ['chatrooms', id],
    queryFn: async () => {
      const { data } = await axios.get<ChatroomDto>(`/chatrooms/${id}`);
      return data;
    },
  });

  const { data: chats } = useQuery({
    queryKey: ['chatrooms', id, 'chats'],
    queryFn: async () => {
      const { data } = await axios.get<ChatDto[]>(`/chatrooms/${id}/chats`);
      await read();
      return data;
    },
    refetchInterval: 2000,
  });

  if (!me) {
    return null;
  }

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
          component={Link}
          to="/chat"
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
          {chatroom?.opponent_user.nickname}
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
          src={chatroom?.restaurant.pictures[0] ?? sampleFood1Image}
          alt=""
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
          {chatroom?.restaurant.name}
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
          type="button"
          onClick={() => {
            send('[INVITE]');
          }}
          disabled={chats?.some((chat) => chat.message === '[INVITE]')}
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
          padding: 20px;
          gap: 24px;
          overflow-y: auto;
        `}
      >
        {chats?.map((chat) => {
          const sender =
            chat.user_id === chatroom?.opponent_user.id
              ? chatroom?.opponent_user
              : me;
          if (chat.message === '[ACCEPT]') {
            return (
              <SystemMessage
                key={chat.id}
                message={`${sender.nickname} accepted the invitation`}
              />
            );
          } else if (chat.message === '[REJECT]') {
            return (
              <SystemMessage
                key={chat.id}
                message={`${sender.nickname} Weber turned down the invitation`}
              />
            );
          }

          return chat.user_id === chatroom?.opponent_user.id ? (
            <OpponentUtterance
              key={chat.id}
              user={chatroom.opponent_user}
              chat={chat}
              acceptDisabled={chats.some(
                (chat) =>
                  chat.message === '[ACCEPT]' || chat.message === '[REJECT]'
              )}
              acceptInvitation={() => {
                send('[ACCEPT]');
              }}
            />
          ) : (
            <MyUtterance key={chat.id} chat={chat} />
          );
        })}
      </div>
      <ChatInput onSubmit={send} />
    </div>
  );
};

export default memo(ChatListPage);

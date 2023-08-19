import { FC, memo } from 'react';
import { css } from '@emotion/react';
import { useTheme } from '@mui/material';
import { ChatDto } from '../types';
import { format } from 'date-fns';

interface MyUtteranceProps {
  chat: ChatDto;
}

const MyUtterance: FC<MyUtteranceProps> = ({ chat }) => {
  const theme = useTheme();
  return (
    <div
      css={css`
        align-self: flex-end;
        max-width: 50%;
      `}
    >
      <div
        css={css`
          border-bottom-left-radius: 16px;
          border-bottom-right-radius: 16px;
          border-top-left-radius: 16px;
          color: white;
          background-color: ${theme.palette.primary.main};
          padding: 10px 12px;
          margin-bottom: 6px;
          font-size: 12px;
          font-weight: 400;
          line-height: 140%;
          width: fit-content;
        `}
      >
        {chat.message === '[INVITE]' ? 'Sent an invitation' : chat.message}
      </div>
      <div
        css={css`
          color: ${theme.palette.gray[50]};
          text-align: right;
          font-size: 10px;
          font-weight: 274;
          line-height: 100%;
        `}
      >
        {format(new Date(chat.created_at), 'a h:mm')}
      </div>
    </div>
  );
};

export default memo(MyUtterance);

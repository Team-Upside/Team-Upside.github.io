import { FC, memo } from 'react';
import { css } from '@emotion/react';
import { Avatar, Button, useTheme } from '@mui/material';
import sampleProfile from '../../assets/sample-profile.png';
import { ChatDto, UserDto } from '../types';
import { format } from 'date-fns';

interface OpponentUtteranceProps {
  user: UserDto;
  chat: ChatDto;
  acceptInvitation: () => void;
  acceptDisabled: boolean;
}

const OpponentUtterance: FC<OpponentUtteranceProps> = ({
  user,
  chat,
  acceptInvitation,
  acceptDisabled,
}) => {
  const theme = useTheme();
  return (
    <div
      css={css`
        display: flex;
        max-width: 50%;
        gap: 12px;
      `}
    >
      <Avatar
        alt=""
        src={user.profile ?? sampleProfile}
        css={css`
          width: 40px;
          height: 40px;
        `}
      />
      <div>
        <div
          css={css`
            color: ${theme.palette.gray[100]};
            font-size: 13px;
            font-weight: 510;
            line-height: 140%;
            letter-spacing: -0.052px;
            margin-bottom: 6px;
          `}
        >
          {user.nickname}
        </div>
        <div
          css={css`
            border-bottom-left-radius: 16px;
            border-bottom-right-radius: 16px;
            border-top-right-radius: 16px;
            color: ${theme.palette.gray[100]};
            background-color: ${theme.palette.gray[10]};
            padding: 10px 12px;
            margin-bottom: 6px;
            font-size: 12px;
            font-weight: 400;
            line-height: 140%;
            width: fit-content;
          `}
        >
          {chat.message === '[INVITE]' ? (
            <>
              <span>{user.nickname} invited me to a meal.</span>
              <Button
                css={css`
                  width: 100%;
                  padding: 6px 0;
                  margin-top: 6px;
                  border-radius: 6px;
                  font-size: 12px;
                  font-weight: 590;
                  line-height: 140%;
                  letter-spacing: -0.048px;
                  text-transform: none;
                `}
                type="button"
                variant="contained"
                onClick={acceptInvitation}
                disableElevation
                disabled={acceptDisabled}
              >
                Accept invitation
              </Button>
            </>
          ) : (
            chat.message
          )}
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
          {format(new Date(chat.created_at), 'hh:mm a')}
        </div>
      </div>
    </div>
  );
};

export default memo(OpponentUtterance);

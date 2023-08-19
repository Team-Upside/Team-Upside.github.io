import { Avatar, useTheme } from '@mui/material';
import sampleProfile from '../../assets/sample-profile.png';
import { css } from '@emotion/react';
import { memo } from 'react';

const ChatListItem = () => {
  const theme = useTheme();
  return (
    <div
      css={css`
        width: 100%;
        padding: 14px 20px;
        display: flex;
        align-items: center;
        gap: 16px;
        border-bottom: 1px solid ${theme.palette.gray[20]};
      `}
    >
      <Avatar
        alt=""
        src={sampleProfile}
        css={css`
          width: 44px;
          height: 44px;
        `}
      />
      <div
        css={css`
          flex: 1;
          display: flex;
          flex-direction: column;
          gap: 4px;
        `}
      >
        <div
          css={css`
            display: flex;
            justify-content: space-between;
          `}
        >
          <h2
            css={css`
              color: ${theme.palette.gray[100]};
              font-size: 16px;
              font-weight: 590;
              line-height: 140%;
              letter-spacing: -0.064px;
            `}
          >
            Alex Linderson
          </h2>
          <p
            css={css`
              color: ${theme.palette.gray[50]};
              text-align: right;
              font-size: 12px;
              font-weight: 274;
              line-height: 140%;
              letter-spacing: -0.048px;
            `}
          >
            2 min ago
          </p>
        </div>
        <div
          css={css`
            display: flex;
            justify-content: space-between;
          `}
        >
          <p
            css={css`
              color: ${theme.palette.gray[80]};
              font-size: 12px;
              font-weight: 274;
              line-height: 140%;
              letter-spacing: -0.048px;
            `}
          >
            How are you today?
          </p>
          <div
            css={css`
              width: 16px;
              height: 16px;
              background-color: ${theme.palette.primary.main};
              border-radius: 50%;
              display: flex;
              justify-content: center;
              align-items: center;
              color: white;
              font-size: 10px;
              font-weight: 400;
              line-height: 12px;
            `}
          >
            1
          </div>
        </div>
      </div>
    </div>
  );
};

export default memo(ChatListItem);

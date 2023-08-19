import { css } from '@emotion/react';
import { memo } from 'react';
import { Button, useTheme } from '@mui/material';

const ChatInput = () => {
  const theme = useTheme();

  return (
    <div
      css={css`
        min-height: 80px;
        border-top: 1px solid ${theme.palette.gray[20]};
        display: flex;
        justify-content: center;
        padding: 20px;
        gap: 8px;
      `}
    >
      <input
        css={css`
          flex: 1;
          border-radius: 6px;
          background-color: ${theme.palette.gray[10]};
          border: none;
          outline: none;
          height: 100%;
          padding: 10px;
          color: ${theme.palette.gray[100]};
        `}
      />
      <Button
        css={css`
          height: 40px;
          border-radius: 6px;
          text-transform: none;
          font-size: 14px;
          font-weight: 590;
        `}
        variant="contained"
        color="primary"
        disableElevation
      >
        Send
      </Button>
    </div>
  );
};

export default memo(ChatInput);

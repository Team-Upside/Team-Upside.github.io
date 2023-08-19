import { css } from '@emotion/react';
import { FC, memo, useCallback, useState } from 'react';
import { Button, useTheme } from '@mui/material';

interface ChatInputProps {
  onSubmit: (message: string) => void;
}

const ChatInput: FC<ChatInputProps> = ({ onSubmit }) => {
  const theme = useTheme();
  const [message, setMessage] = useState('');
  const submit = useCallback(() => {
    onSubmit(message);
    setMessage('');
  }, [message, onSubmit]);

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
        placeholder="Write your message"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        onKeyUp={(e) => {
          if (e.key === 'Enter') {
            submit();
          }
        }}
      />
      <Button
        type="button"
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
        onClick={submit}
      >
        Send
      </Button>
    </div>
  );
};

export default memo(ChatInput);

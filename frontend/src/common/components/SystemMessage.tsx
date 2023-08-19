import { FC, memo } from 'react';
import { css } from '@emotion/react';
import { useTheme } from '@mui/material';

interface SystemMessageProps {
  message: string;
}

const SystemMessage: FC<SystemMessageProps> = ({ message }) => {
  const theme = useTheme();
  return (
    <div
      css={css`
        display: flex;
        justify-content: center;
        align-items: center;
        color: ${theme.palette.primary.main};
        background-color: ${theme.palette.orange[10]};
        width: fit-content;
        font-size: 12px;
        font-weight: 274;
        line-height: 140%;
        letter-spacing: -0.048px;
        border-radius: 300px;
        padding: 8px 20px;
        margin: 0 auto;
      `}
    >
      {message}
    </div>
  );
};

export default memo(SystemMessage);

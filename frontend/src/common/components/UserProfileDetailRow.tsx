import { useTheme } from '@mui/material';
import { FC, memo } from 'react';
import { css } from '@emotion/react';

interface Props {
  category: string;
  value: string;
}

const UserProfileDetailRow: FC<Props> = ({ category, value }) => {
  const theme = useTheme();

  return (
    <div
      css={css`
        display: flex;
        flex-direction: column;
        gap: 12px;
        width: 100%;
      `}
    >
      <div
        css={css`
          display: flex;
          gap: 6px;
        `}
      >
        <span
          css={css`
            flex-basis: 84px;
            flex-shrink: 0;
            color: ${theme.palette.gray[70]};
            font-size: 13px;
            font-style: normal;
            font-weight: 590;
            line-height: 140%;
            letter-spacing: -0.052px;
          `}
        >
          {category}
        </span>
        <span
          css={css`
            color: ${theme.palette.gray[30]};
          `}
        >
          |
        </span>
        <span
          css={css`
            max-width: 216px;
            color: ${theme.palette.gray[70]};
            font-size: 13px;
            font-style: normal;
            font-weight: 400;
            line-height: 140%;
            letter-spacing: -0.052px;
          `}
        >
          {value}
        </span>
      </div>
    </div>
  );
};

export default memo(UserProfileDetailRow);

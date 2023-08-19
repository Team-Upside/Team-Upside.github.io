import { memo } from 'react';
import { css } from '@emotion/react';
import { Avatar, useTheme } from '@mui/material';
import sampleProfile from '../../assets/sample-profile.png';

const OpponentUtterance = () => {
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
        src={sampleProfile}
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
          Alex Linderson
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
          afasdfasd
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
          09:25 AM
        </div>
      </div>
    </div>
  );
};

export default memo(OpponentUtterance);

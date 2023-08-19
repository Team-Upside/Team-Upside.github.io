import { FC, memo } from 'react';
import LoginButton from '../common/components/LoginButton';
import { css } from '@emotion/react';
import { useTheme } from '@mui/material';

const LoginPage: FC = () => {
  const theme = useTheme();

  return (
    <div
      css={css`
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        height: 100vh;
        padding-top: 74px;
        padding-bottom: 260px;
        padding-left: 20px;
        padding-right: 20px;
      `}
    >
      <h1
        css={css`
          color: ${theme.palette.primary.light};
          font-family: SF Pro;
          font-size: 34px;
          font-style: normal;
          font-weight: 590;
          line-height: 130%; /* 44.2px */
          letter-spacing: -0.136px;
          padding-left: 20px;
        `}
      >
        Pairing
        <h1
          css={css`
            color: black;
          `}
        >
          with your
          <br />
          neighborhood
        </h1>
      </h1>
      <LoginButton />
    </div>
  );
};

export default memo(LoginPage);

import { FC, memo } from 'react';
import { css } from '@emotion/react';
import { useAuth0 } from '@auth0/auth0-react';
import { useTheme } from '@mui/material';
import Google from '../../assets/google.png';

const LoginButton: FC = () => {
  const { loginWithRedirect } = useAuth0();

  const theme = useTheme();

  return (
    <button
      onClick={() => loginWithRedirect()}
      type="button"
      css={css`
        position: relative;
        width: 100%;
        height: 50px;
        flex-shrink: 0;
        border-radius: 14px;
        border: 1px solid;
        border-color: ${theme.palette.gray[90]};
        border-radius: 14px;
        background: #fff;
        cursor: pointer;
      `}
    >
      <img
        src={Google}
        alt="Google login"
        css={css`
          position: absolute;
          top: 50%;
          left: 20px;
          width: 18px;
          height: 18px;
          transform: translateY(-50%);
        `}
      />
      <span
        css={css`
          font-size: 16px;
          font-weight: 590;
          line-height: 140%;
          letter-spacing: -0.064px;
        `}
      >
        Continue with Google
      </span>
    </button>
  );
};

export default memo(LoginButton);

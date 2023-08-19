import { FC, memo } from 'react';
import LoginButton from '../common/components/LoginButton';
import { css } from '@emotion/react';

const LoginPage: FC = () => {
  return (
    <div
      css={css`
        display: flex;
        justify-content: center;
        align-items: center;
        height: 100vh;
      `}
    >
      <LoginButton />
    </div>
  );
};

export default memo(LoginPage);

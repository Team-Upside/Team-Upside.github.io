import { FC, memo } from 'react';
import GoogleLoginButton from '../common/components/GoogleLoginButton';

const LoginPage: FC = () => {
  return <GoogleLoginButton />;
};

export default memo(LoginPage);

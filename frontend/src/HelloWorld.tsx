import { FC } from 'react';
import GoogleLoginButton from './common/components/GoogleLoginButton';

const HelloWorld: FC = () => (
  <div>
    <h1 css={{ fontSize: '48px', fontWeight: 590 }}>sia</h1>
    <GoogleLoginButton />
  </div>
);

export default HelloWorld;

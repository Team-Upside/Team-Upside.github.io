import { FC, memo } from 'react';
import { SignupProps } from '../types';

const ProfileImageStep: FC<SignupProps> = () => {
  return (
    <div>
      <h1>Select your profile Image</h1>
    </div>
  );
};

export default memo(ProfileImageStep);

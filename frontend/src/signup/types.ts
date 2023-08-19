import { Dispatch, SetStateAction } from 'react';
import { Gender, MBTI } from '../common/types';

export interface SignupProps {
  signupState: SignupState;
  setSignupState: Dispatch<SetStateAction<SignupState>>;
}

export interface SignupState {
  nickname: string;
  birthdate: string;
  gender: Gender;
  mbti?: MBTI;
  interest?: string;
  favoriteFood?: string;
  profileImage?: string;
}

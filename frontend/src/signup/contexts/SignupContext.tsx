import {
  Dispatch,
  ReactNode,
  createContext,
  useContext,
  useMemo,
  useState,
} from 'react';
import { SignupState } from '../types';
import { Gender, MBTI } from '../../common/types';
import { produce } from 'immer';

const initialState: SignupState = {
  nickname: '',
  birthdate: '',
  gender: Gender.Others,
};

const SignupContext = createContext<SignupState>(initialState);

const initialDispatch = {
  setNickname: () => {},
  setBirthdate: () => {},
  setGender: () => {},
  setMBTI: () => {},
  setInterest: () => {},
  setFavoriteFood: () => {},
  setProfileImage: () => {},
};

const SignupDispatchContext = createContext<{
  setNickname: Dispatch<string>;
  setBirthdate: Dispatch<string>;
  setGender: Dispatch<Gender>;
  setMBTI: Dispatch<MBTI>;
  setInterest: Dispatch<string>;
  setFavoriteFood: Dispatch<string>;
  setProfileImage: Dispatch<string>;
}>(initialDispatch);

const SignupProvider = ({ children }: { children: ReactNode }) => {
  const [signupState, setSignupState] = useState<SignupState>(initialState);

  const signupDispatch = useMemo(
    () => ({
      setNickname: (nickname: string) =>
        setSignupState(
          produce((draft) => {
            if (draft) {
              draft.nickname = nickname;
            }
            return draft;
          })
        ),
      setBirthdate: (birthdate: string) =>
        setSignupState(
          produce((draft) => {
            if (draft) {
              draft.birthdate = birthdate;
            }
            return draft;
          })
        ),
      setGender: (gender: Gender) =>
        setSignupState(
          produce((draft) => {
            if (draft) {
              draft.gender = gender;
            }
            return draft;
          })
        ),
      setMBTI: (mbti: MBTI) =>
        setSignupState(
          produce((draft) => {
            if (draft) {
              draft.mbti = mbti;
            }
            return draft;
          })
        ),
      setInterest: (interest: string) =>
        setSignupState(
          produce((draft) => {
            if (draft) {
              draft.interest = interest;
            }
            return draft;
          })
        ),
      setFavoriteFood: (favoriteFood: string) =>
        setSignupState(
          produce((draft) => {
            if (draft) {
              draft.favoriteFood = favoriteFood;
            }
            return draft;
          })
        ),
      setProfileImage: (profileImage: string) =>
        setSignupState(
          produce((draft) => {
            if (draft) {
              draft.profileImage = profileImage;
            }
            return draft;
          })
        ),
    }),
    [setSignupState]
  );

  return (
    <SignupContext.Provider value={signupState}>
      <SignupDispatchContext.Provider value={signupDispatch}>
        {children}
      </SignupDispatchContext.Provider>
    </SignupContext.Provider>
  );
};

export const useSignupContext = () => useContext(SignupContext);
export const useSignupDispatchContext = () => useContext(SignupDispatchContext);

export default SignupProvider;

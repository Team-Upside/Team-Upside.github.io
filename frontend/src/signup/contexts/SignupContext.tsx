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

type SignupContextType = SignupState & {
  validateNickname: boolean;
  validateBirthdate: boolean;
};

const initialState: SignupContextType = {
  nickname: '',
  validateNickname: false,
  birthdate: '',
  validateBirthdate: false,
  gender: Gender.Others,
};

const SignupContext = createContext<SignupContextType>(initialState);

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

  const validateNickname = useMemo(() => {
    const { nickname } = signupState;

    return nickname !== '' && nickname.length <= 10;
  }, [signupState.nickname]);

  const validateBirthdate = useMemo(
    () =>
      signupState.birthdate.length === 12 &&
      !isNaN(Date.parse(signupState.birthdate)),
    [signupState.birthdate]
  );

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
      setFavoriteFood: (favorite_food: string) =>
        setSignupState(
          produce((draft) => {
            if (draft) {
              draft.favorite_food = favorite_food;
            }
            return draft;
          })
        ),
      setProfileImage: (profile: string) =>
        setSignupState(
          produce((draft) => {
            if (draft) {
              draft.profile = profile;
            }
            return draft;
          })
        ),
    }),
    [setSignupState]
  );

  return (
    <SignupContext.Provider
      value={{
        ...signupState,
        validateNickname,
        validateBirthdate,
      }}
    >
      <SignupDispatchContext.Provider value={signupDispatch}>
        {children}
      </SignupDispatchContext.Provider>
    </SignupContext.Provider>
  );
};

export const useSignupContext = () => useContext(SignupContext);
export const useSignupDispatchContext = () => useContext(SignupDispatchContext);

export default SignupProvider;

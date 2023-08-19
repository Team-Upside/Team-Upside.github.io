import { Button, LinearProgress } from '@mui/material';
import { FC, memo, useCallback, useState } from 'react';
import { css } from '@emotion/react';
import NicknameStep from '../signup/components/NicknameStep';
import BirthdateStep from '../signup/components/BirthdateStep';
import GenderStep from '../signup/components/GenderStep';
import MBTIStep from '../signup/components/MBTIStep';
import InterestStep from '../signup/components/InterestStep';
import FavoriteFoodStep from '../signup/components/FavoriteFoodStep';
import ProfileImageStep from '../signup/components/ProfileImageStep';
import { SIGNUP_TITLES } from '../signup/constants';

const SignupPage: FC = () => {
  const [step, setStep] = useState(0);

  const handleClickNextStep = useCallback(
    () => setStep((prev) => prev + 1),
    [setStep]
  );

  return (
    <div
      css={css`
        display: flex;
        flex-direction: column;
        height: 100vh;
        margin-left: 20px;
        margin-right: 20px;
      `}
    >
      <LinearProgress
        variant="determinate"
        value={(step + 1) * 12.5}
        css={css`
          margin-top: 8px;
          height: 8px;
          border-radius: 8px;
        `}
      />
      {step >= 3 ? (
        <Button
          type="button"
          variant="text"
          css={css`
            align-self: flex-end;
          `}
          onClick={handleClickNextStep}
        >
          Skip
        </Button>
      ) : (
        <div
          css={css`
            height: 36.5px;
          `}
        />
      )}
      <div
        css={css`
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          height: 80%;
          margin-top: 40px;
          padding-bottom: 40px;
        `}
      >
        <div>
          <h1
            css={css`
              margin-bottom: 35px;
            `}
          >
            {SIGNUP_TITLES[step]}
          </h1>
          {step === 0 && <NicknameStep />}
          {step === 1 && <BirthdateStep />}
          {step === 2 && <GenderStep />}
          {step === 3 && <MBTIStep />}
          {step === 4 && <InterestStep />}
          {step === 5 && <FavoriteFoodStep />}
          {step === 6 && <ProfileImageStep />}
        </div>
        <Button variant="contained" onClick={handleClickNextStep}>
          Continued
        </Button>
      </div>
    </div>
  );
};

export default memo(SignupPage);

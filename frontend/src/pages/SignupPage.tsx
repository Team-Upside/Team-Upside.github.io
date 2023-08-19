import { Button, LinearProgress, useTheme } from '@mui/material';
import { FC, memo, useCallback, useMemo, useState } from 'react';
import { css } from '@emotion/react';
import NicknameStep from '../signup/components/NicknameStep';
import BirthdateStep from '../signup/components/BirthdateStep';
import GenderStep from '../signup/components/GenderStep';
import MBTIStep from '../signup/components/MBTIStep';
import InterestStep from '../signup/components/InterestStep';
import FavoriteFoodStep from '../signup/components/FavoriteFoodStep';
import ProfileImageStep from '../signup/components/ProfileImageStep';
import { SIGNUP_TITLES } from '../signup/constants';
import { useSignupContext } from '../signup/contexts/SignupContext';
import LocationShareStep from '../signup/components/LocationShareStep';
import { useNavigate } from 'react-router-dom';
import { useMutation } from '@tanstack/react-query';
import { createUserApi } from '../common/apis';
import { useAuth0 } from '@auth0/auth0-react';

const SignupPage: FC = () => {
  const navigate = useNavigate();

  const [step, setStep] = useState(0);

  const { getAccessTokenSilently } = useAuth0();

  const { validateBirthdate, validateNickname, ...signupRequest } =
    useSignupContext();

  const { mutateAsync: createUser } = useMutation(createUserApi);

  const theme = useTheme();

  const isSkipable = step >= 3 && step !== 7;

  const disabledRequiredButton = useMemo(
    () =>
      (step === 0 && !validateNickname) || (step === 1 && !validateBirthdate),
    [step, validateNickname, validateBirthdate]
  );

  const handleClickNextStep = useCallback(
    () => setStep((prev) => prev + 1),
    [setStep]
  );

  const handleClickCreateUser = useCallback(async () => {
    const token = await getAccessTokenSilently();
    await createUser({ token, request: signupRequest });
    navigate('/');
  }, [createUser, navigate, signupRequest]);

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
          background-color: ${theme.palette.gray[10]};
        `}
      />
      {isSkipable ? (
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
        <div
          css={css`
            height: 100%;
          `}
        >
          <h1
            css={css`
              font-size: 18px;
              font-weight: 590;
              line-height: 140%;
              letter-spacing: -0.072px;
              margin-bottom: ${step >= 6 ? '6px' : '35px'};
            `}
          >
            {SIGNUP_TITLES[step]}
          </h1>
          {step >= 6 && (
            <p
              css={css`
                font-size: 14px;
                font-weight: 274;
                line-height: 140%;
                letter-spacing: -0.056px;
                color: ${theme.palette.gray[60]};
                margin-bottom: ${step >= 6 ? '35px' : undefined};
              `}
            >
              {step === 6
                ? 'Add the picture which represents you the best'
                : 'Share your location and meet your neighborhoods around you'}
            </p>
          )}
          {step === 0 && <NicknameStep />}
          {step === 1 && <BirthdateStep />}
          {step === 2 && <GenderStep />}
          {step === 3 && <MBTIStep />}
          {step === 4 && <InterestStep />}
          {step === 5 && <FavoriteFoodStep />}
          {step === 6 && <ProfileImageStep />}
          {step === 7 && <LocationShareStep />}
        </div>
        <Button
          variant="contained"
          onClick={step !== 7 ? handleClickNextStep : handleClickCreateUser}
          disabled={disabledRequiredButton}
          size="large"
        >
          {step !== 7 ? 'Continue' : 'Allow'}
        </Button>
      </div>
    </div>
  );
};

export default memo(SignupPage);

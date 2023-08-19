import { FC, memo } from 'react';
import { SignupProps } from '../types';
import { Button } from '@mui/material';
import { css } from '@emotion/react';
import { Gender } from '../../common/types';

const buttonStyle = (selected?: boolean) => css`
  flex: 1;
  border-color: '#EB6200';
  background-color: ${selected ? '#FFF2E8' : 'white'};
`;

const GenderStep: FC<SignupProps> = ({ signupState, setSignupState }) => {
  return (
    <div
      css={css`
        display: flex;
        width: 100%;
        gap: 8px;
      `}
    >
      <Button
        variant="outlined"
        type="button"
        size="large"
        css={buttonStyle(signupState.gender === Gender.Male)}
        onClick={() =>
          setSignupState((prev) => ({
            ...prev,
            gender: Gender.Male,
          }))
        }
      >
        Male
      </Button>
      <Button
        variant="outlined"
        type="button"
        size="large"
        css={buttonStyle(signupState.gender === Gender.Female)}
        onClick={() =>
          setSignupState((prev) => ({
            ...prev,
            gender: Gender.Female,
          }))
        }
      >
        Female
      </Button>
      <Button
        variant="outlined"
        type="button"
        size="large"
        css={buttonStyle(signupState.gender === Gender.Others)}
        onClick={() =>
          setSignupState((prev) => ({
            ...prev,
            gender: Gender.Others,
          }))
        }
      >
        Others
      </Button>
    </div>
  );
};

export default memo(GenderStep);

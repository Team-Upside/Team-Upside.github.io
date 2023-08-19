import { TextField, css } from '@mui/material';
import { FC, memo } from 'react';
import { SignupProps } from '../types';

const InterestStep: FC<SignupProps> = ({ setSignupState, signupState }) => {
  return (
    <div>
      <h1>Enter your Interest</h1>
      <TextField
        label={<span>Interest</span>}
        variant="standard"
        value={signupState.interest}
        onChange={(e) =>
          setSignupState((prev) => ({
            ...prev,
            interest: e.target.value,
          }))
        }
        css={css`
          width: 100%;
          margin-top: 35px;
        `}
      />
    </div>
  );
};

export default memo(InterestStep);

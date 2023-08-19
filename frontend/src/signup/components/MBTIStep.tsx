import { FC, memo } from 'react';
import { SignupProps } from '../types';
import { TextField } from '@mui/material';
import { css } from '@emotion/react';

const MBTIStep: FC<SignupProps> = ({ signupState, setSignupState }) => {
  return (
    <div>
      <h1>Enter your MBTI</h1>
      <TextField
        label={<span>MBTI</span>}
        variant="standard"
        value={signupState.mbti}
        onChange={(e) =>
          setSignupState((prev) => ({
            ...prev,
            mbti: e.target.value.toUpperCase(),
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

export default memo(MBTIStep);

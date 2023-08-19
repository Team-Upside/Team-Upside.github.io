import { FC, memo } from 'react';
import { SignupProps } from '../types';
import { TextField } from '@mui/material';
import { css } from '@emotion/react';

const MBTIStep: FC<SignupProps> = ({ signupState, setSignupState }) => {
  return (
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
      `}
    />
  );
};

export default memo(MBTIStep);

import { TextField, css } from '@mui/material';
import { FC, memo } from 'react';
import { SignupProps } from '../types';

const NicknameStep: FC<SignupProps> = ({ setSignupState, signupState }) => {
  return (
    <TextField
      label={<span>Nickname</span>}
      variant="standard"
      value={signupState.nickname}
      onChange={(e) =>
        setSignupState((prev) => ({
          ...prev,
          nickname: e.target.value,
        }))
      }
      css={css`
        width: 100%;
      `}
    />
  );
};

export default memo(NicknameStep);

import { TextField, css } from '@mui/material';
import { FC, memo } from 'react';
import { SignupProps } from '../types';

const NicknameStep: FC<SignupProps> = ({ setSignupState, signupState }) => {
  return (
    <div>
      <h1>Enter your nickname</h1>
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
          margin-top: 35px;
        `}
      />
    </div>
  );
};

export default memo(NicknameStep);

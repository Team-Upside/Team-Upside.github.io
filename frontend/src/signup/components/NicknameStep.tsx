import { TextField, css } from '@mui/material';
import { FC, memo } from 'react';
import {
  useSignupContext,
  useSignupDispatchContext,
} from '../contexts/SignupContext';

const NicknameStep: FC = () => {
  const { nickname } = useSignupContext();
  const { setNickname } = useSignupDispatchContext();

  return (
    <TextField
      label={<span>nickname</span>}
      variant="standard"
      value={nickname}
      onChange={(e) => setNickname(e.target.value)}
      css={css`
        width: 100%;
      `}
    />
  );
};

export default memo(NicknameStep);

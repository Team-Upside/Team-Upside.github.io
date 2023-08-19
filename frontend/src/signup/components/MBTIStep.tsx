import { FC, memo } from 'react';
import { TextField } from '@mui/material';
import { css } from '@emotion/react';
import {
  useSignupContext,
  useSignupDispatchContext,
} from '../contexts/SignupContext';

const MBTIStep: FC = () => {
  const { mbti } = useSignupContext();
  const { setMBTI } = useSignupDispatchContext();

  return (
    <TextField
      label={<span>MBTI</span>}
      variant="standard"
      value={mbti}
      onChange={(e) => setMBTI(e.target.value.toUpperCase())}
      css={css`
        width: 100%;
      `}
    />
  );
};

export default memo(MBTIStep);

import { TextField, css } from '@mui/material';
import { FC, memo } from 'react';
import {
  useSignupContext,
  useSignupDispatchContext,
} from '../contexts/SignupContext';

const InterestStep: FC = () => {
  const { interest } = useSignupContext();
  const { setInterest } = useSignupDispatchContext();

  return (
    <TextField
      label={<span>Interest</span>}
      variant="standard"
      value={interest}
      onChange={(e) => setInterest(e.target.value)}
      css={css`
        width: 100%;
      `}
    />
  );
};

export default memo(InterestStep);

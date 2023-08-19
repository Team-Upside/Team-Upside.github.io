import { TextField, css } from '@mui/material';
import { FC, memo, useState } from 'react';
import {
  useSignupContext,
  useSignupDispatchContext,
} from '../contexts/SignupContext';

const BirthdateStep: FC = () => {
  const { birthdate, validateBirthdate } = useSignupContext();
  const { setBirthdate } = useSignupDispatchContext();

  const [visibleError, setVisibleError] = useState(false);

  return (
    <TextField
      label={<span>date of birth</span>}
      variant="standard"
      value={birthdate}
      placeholder="YYYYMMDD"
      onChange={(e) => setBirthdate(e.target.value)}
      error={!validateBirthdate && visibleError}
      helperText={
        !validateBirthdate && visibleError && 'Please validate your birthdate.'
      }
      onFocus={() => setVisibleError(false)}
      onBlur={() => {
        setVisibleError(true);
        if (birthdate.length === 8) {
          setBirthdate(
            `${birthdate.slice(0, 4)}. ${birthdate.slice(
              4,
              6
            )}. ${birthdate.slice(6, 8)}`
          );
        }
      }}
      css={css`
        width: 100%;
      `}
    />
  );
};

export default memo(BirthdateStep);

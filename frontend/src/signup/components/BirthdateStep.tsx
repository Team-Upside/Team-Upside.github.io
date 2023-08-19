import { TextField, css } from '@mui/material';
import { FC, memo } from 'react';
import { SignupProps } from '../types';

const BirthdateStep: FC<SignupProps> = ({ signupState, setSignupState }) => {
  return (
    <TextField
      label={<span>Birthdate</span>}
      variant="standard"
      value={signupState.birthdate}
      placeholder="YYYYMMDD"
      onChange={(e) =>
        setSignupState((prev) => ({ ...prev, birthdate: e.target.value }))
      }
      onBlur={() =>
        setSignupState((prev) => {
          if (prev.birthdate.length === 8) {
            return {
              ...prev,
              birthdate: `${prev.birthdate.slice(0, 4)}. ${prev.birthdate.slice(
                4,
                6
              )}. ${prev.birthdate.slice(6, 8)}`,
            };
          }
          return prev;
        })
      }
      css={css`
        width: 100%;
      `}
    />
  );
};

export default memo(BirthdateStep);

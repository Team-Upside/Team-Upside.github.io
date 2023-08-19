import { TextField, css } from '@mui/material';
import { FC, memo } from 'react';
import { SignupProps } from '../types';

const FavoriteFoodStep: FC<SignupProps> = ({ setSignupState, signupState }) => {
  return (
    <TextField
      label={<span>Favorite Food</span>}
      variant="standard"
      value={signupState.favoriteFood}
      onChange={(e) =>
        setSignupState((prev) => ({
          ...prev,
          favoriteFood: e.target.value,
        }))
      }
      css={css`
        width: 100%;
      `}
    />
  );
};

export default memo(FavoriteFoodStep);

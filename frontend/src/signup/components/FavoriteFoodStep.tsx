import { TextField, css } from '@mui/material';
import { FC, memo } from 'react';
import { SignupProps } from '../types';

const FavoriteFoodStep: FC<SignupProps> = ({ setSignupState, signupState }) => {
  return (
    <div>
      <h1>Enter your Favorite Food</h1>
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
          margin-top: 35px;
        `}
      />
    </div>
  );
};

export default memo(FavoriteFoodStep);

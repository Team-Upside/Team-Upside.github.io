import { TextField, css } from '@mui/material';
import { FC, memo } from 'react';
import {
  useSignupContext,
  useSignupDispatchContext,
} from '../contexts/SignupContext';

const FavoriteFoodStep: FC = () => {
  const { favorite_food } = useSignupContext();
  const { setFavoriteFood } = useSignupDispatchContext();

  return (
    <TextField
      label={<span>Favorite Food</span>}
      variant="standard"
      value={favorite_food}
      onChange={(e) => setFavoriteFood(e.target.value)}
      css={css`
        width: 100%;
      `}
    />
  );
};

export default memo(FavoriteFoodStep);

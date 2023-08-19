import { TextField, css } from '@mui/material';
import { FC, memo } from 'react';
import {
  useSignupContext,
  useSignupDispatchContext,
} from '../contexts/SignupContext';

const FavoriteFoodStep: FC = () => {
  const { favoriteFood } = useSignupContext();
  const { setFavoriteFood } = useSignupDispatchContext();

  return (
    <TextField
      label={<span>Favorite Food</span>}
      variant="standard"
      value={favoriteFood}
      onChange={(e) => setFavoriteFood(e.target.value)}
      css={css`
        width: 100%;
      `}
    />
  );
};

export default memo(FavoriteFoodStep);

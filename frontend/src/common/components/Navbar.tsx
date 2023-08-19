import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import { memo } from 'react';
import { css } from '@emotion/react';
import { Button, IconButton } from '@mui/material';
import { ReactComponent as NotificationIcon } from '../../assets/icons/notification.svg';
import { ReactComponent as UserFavoriteIcon } from '../../assets/icons/user-favorite.svg';
import { ReactComponent as PlusIcon } from '../../assets/icons/plus.svg';

const Navbar = () => {
  return (
    <AppBar
      position="absolute"
      color="transparent"
      elevation={0}
      variant="outlined"
      css={css`
        top: auto;
        bottom: 0;
        & .MuiToolbar-root {
          min-height: 80px;
          height: 80px;
        }
      `}
    >
      <Toolbar>
        <div
          css={css`
            flex-grow: 1;
            display: flex;
            gap: 10px;
          `}
        >
          <IconButton color="inherit" size="large">
            <NotificationIcon />
          </IconButton>
          <IconButton color="inherit" size="large">
            <UserFavoriteIcon />
          </IconButton>
        </div>
        <Button
          color="primary"
          variant="contained"
          css={css`
            width: 56px;
            min-width: 56px;
            height: 56px;
            border-radius: 16px;
            box-shadow:
              0px 1px 3px 0px rgba(0, 0, 0, 0.3),
              0px 4px 8px 3px rgba(0, 0, 0, 0.15);
          `}
        >
          <PlusIcon />
        </Button>
      </Toolbar>
    </AppBar>
  );
};

export default memo(Navbar);

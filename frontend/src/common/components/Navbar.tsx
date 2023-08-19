import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import logo from '../../assets/logo.png';
import { memo } from 'react';
import { css } from '@emotion/react';
import { IconButton } from '@mui/material';
import { ReactComponent as NotificationIcon } from '../../assets/icons/notification.svg';
import { ReactComponent as UserFavoriteIcon } from '../../assets/icons/user-favorite.svg';

const Navbar = () => {
  return (
    <AppBar
      position="static"
      color="transparent"
      elevation={0}
      css={css`
        & .MuiToolbar-root {
          min-height: 50px;
        }
      `}
    >
      <Toolbar>
        <div
          css={css`
            flex-grow: 1;
          `}
        >
          <img src={logo} alt="logo" />
        </div>
        <IconButton color="inherit">
          <NotificationIcon />
        </IconButton>
        <IconButton color="inherit">
          <UserFavoriteIcon />
        </IconButton>
      </Toolbar>
    </AppBar>
  );
};

export default memo(Navbar);

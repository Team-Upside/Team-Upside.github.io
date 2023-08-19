import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import { memo } from 'react';
import { css } from '@emotion/react';
import { Button, IconButton } from '@mui/material';
import { ReactComponent as ChatIcon } from '../../assets/icons/chat.svg';
import { ReactComponent as PlusIcon } from '../../assets/icons/plus.svg';
import { Link, useNavigate } from 'react-router-dom';

const Navbar = () => {
  const navigate = useNavigate();

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
          <IconButton color="inherit" size="large" component={Link} to="/chat">
            <ChatIcon />
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
          `}
          onClick={() => navigate(`/post?restaurant_id=1`)}
          disableElevation
        >
          <PlusIcon />
        </Button>
      </Toolbar>
    </AppBar>
  );
};

export default memo(Navbar);

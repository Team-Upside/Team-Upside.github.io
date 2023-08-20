import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import { memo } from 'react';
import { css } from '@emotion/react';
import { Badge, Button, IconButton } from '@mui/material';
import { ReactComponent as ChatIcon } from '../../assets/icons/chat.svg';
import { ReactComponent as PlusIcon } from '../../assets/icons/plus.svg';
import { Link, useNavigate } from 'react-router-dom';
import { useAxios } from '../AxiosContext';
import { useQuery } from '@tanstack/react-query';
import { ChatroomDto } from '../types';

const Navbar = () => {
  const navigate = useNavigate();
  const axios = useAxios();

  const { data: chatrooms } = useQuery({
    queryKey: ['chatrooms'],
    queryFn: async () => {
      const { data } = await axios.get<ChatroomDto[]>('/chatrooms');
      return data;
    },
  });

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
            <Badge
              badgeContent={chatrooms?.filter((x) => x.unread_count > 0).length}
              color="primary"
            >
              <ChatIcon />
            </Badge>
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
          onClick={() => navigate('/post')}
          disableElevation
        >
          <PlusIcon />
        </Button>
      </Toolbar>
    </AppBar>
  );
};

export default memo(Navbar);

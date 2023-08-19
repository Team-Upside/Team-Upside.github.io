import { FC, memo, useEffect } from 'react';
import { useAuth } from '../common/auth';
import { useNavigate } from 'react-router-dom';

const MainPage: FC = () => {
  const { isAuthenticated } = useAuth();

  const navigate = useNavigate();

  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/login');
    }
  }, []);

  return (
    <div>
      <h1>Hello world!</h1>
    </div>
  );
};

export default memo(MainPage);

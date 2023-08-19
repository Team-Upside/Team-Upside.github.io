import { FC, StrictMode } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Global, css } from '@emotion/react';
import globalStyles from './styles/globalStyles';
import Swipe from './Swipe';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { AuthProvider } from './common/auth';
import LoginPage from './pages/LoginPage';
import MainPage from './pages/MainPage';
import SignupPage from './pages/SignupPage';

const queryClient = new QueryClient();

const App: FC = () => (
  <StrictMode>
    <Global styles={globalStyles} />
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <div
          css={css`
            margin: 0 auto;
            background-color: white;
            min-width: 360px;
            max-width: 430px;
            position: relative;
            overflow: hidden;
          `}
        >
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<MainPage />} />
              <Route path="/login" element={<LoginPage />} />
              <Route path="/signup" element={<SignupPage />} />
              <Route path="/swipe" element={<Swipe />} />
            </Routes>
          </BrowserRouter>
        </div>
      </AuthProvider>
    </QueryClientProvider>
  </StrictMode>
);

export default App;

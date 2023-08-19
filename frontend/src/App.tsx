import { FC, StrictMode } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Global, css } from '@emotion/react';
import globalStyles from './styles/globalStyles';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { AuthProvider } from './common/auth';
import { ThemeProvider } from '@mui/material';
import SignupProvider from './signup/contexts/SignupContext';
import { theme } from './styles/theme';
import LoginPage from './pages/LoginPage';
import MainPage from './pages/MainPage';
import SwipePage from './pages/SwipePage';
import SignupPage from './pages/SignupPage';
import ChatListPage from './pages/ChatListPage';

const queryClient = new QueryClient();

const App: FC = () => (
  <StrictMode>
    <Global styles={globalStyles} />
    <ThemeProvider theme={theme}>
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
                <Route
                  path="/signup"
                  element={
                    <SignupProvider>
                      <SignupPage />
                    </SignupProvider>
                  }
                />
                <Route path="/swipe" element={<SwipePage />} />
                <Route path="/chat" element={<ChatListPage />} />
              </Routes>
            </BrowserRouter>
          </div>
        </AuthProvider>
      </QueryClientProvider>
    </ThemeProvider>
  </StrictMode>
);

export default App;

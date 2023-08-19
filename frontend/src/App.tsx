import { FC, StrictMode } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Global, css } from '@emotion/react';
import globalStyles from './styles/globalStyles';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import LoginPage from './pages/LoginPage';
import MainPage from './pages/MainPage';
import SignupPage from './pages/SignupPage';
import { ThemeProvider } from '@mui/material';
import { theme } from './styles/theme';
import SignupProvider from './signup/contexts/SignupContext';
import { Auth0Provider } from '@auth0/auth0-react';
import { AxiosProvider } from './common/AxiosContext';
import ChatListPage from './pages/ChatListPage';
import RequiredAuth from './common/components/RequiredAuth';
import ChatPage from './pages/ChatPage';
import PostPage from './pages/PostPage';

const queryClient = new QueryClient();

const App: FC = () => (
  <StrictMode>
    <Global styles={globalStyles} />
    <ThemeProvider theme={theme}>
      <QueryClientProvider client={queryClient}>
        <Auth0Provider
          domain={import.meta.env.VITE_AUTH0_DOMAIN}
          clientId={import.meta.env.VITE_AUTH0_CLIENT_ID}
          authorizationParams={{
            redirect_uri: window.location.origin,
            audience: import.meta.env.VITE_AUTH0_AUDIENCE,
          }}
        >
          <AxiosProvider>
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
                  <Route element={<RequiredAuth />}>
                    <Route path="/" element={<MainPage />} />
                    <Route path="/chat" element={<ChatListPage />} />
                    <Route path="/chat/:id" element={<ChatPage />} />
                    <Route path="/post" element={<PostPage />} />
                  </Route>
                  <Route path="/login" element={<LoginPage />} />
                  <Route
                    path="/signup"
                    element={
                      <SignupProvider>
                        <SignupPage />
                      </SignupProvider>
                    }
                  />
                </Routes>
              </BrowserRouter>
            </div>
          </AxiosProvider>
        </Auth0Provider>
      </QueryClientProvider>
    </ThemeProvider>
  </StrictMode>
);

export default App;

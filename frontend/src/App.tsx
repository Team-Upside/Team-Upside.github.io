import { FC, StrictMode } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import HelloWorld from './HelloWorld';
import { Global } from '@emotion/react';
import globalStyles from './styles/globalStyles';
import Swipe from './Swipe';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { AuthProvider } from './common/auth';

const queryClient = new QueryClient();

const App: FC = () => (
  <StrictMode>
    <Global styles={globalStyles} />
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<HelloWorld />} />
            <Route path="/swipe" element={<Swipe />} />
          </Routes>
        </BrowserRouter>
      </AuthProvider>
    </QueryClientProvider>
  </StrictMode>
);

export default App;

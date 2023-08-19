import { FC, StrictMode } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import HelloWorld from './HelloWorld';
import { Global } from '@emotion/react';
import globalStyles from './styles/globalStyles';

const App: FC = () => (
  <StrictMode>
    <Global styles={globalStyles} />
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HelloWorld />} />
      </Routes>
    </BrowserRouter>
  </StrictMode>
);

export default App;

import { FC, StrictMode } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import HelloWorld from './HelloWorld';
import { Global, css } from '@emotion/react';
import globalStyles from './styles/globalStyles';
import Swipe from './Swipe';

const App: FC = () => (
  <StrictMode>
    <Global styles={globalStyles} />
    <div
      css={css`
        margin: 0 auto;
        background-color: white;
        max-width: 430px;
        position: relative;
        overflow: hidden;
      `}
    >
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<HelloWorld />} />
          <Route path="/swipe" element={<Swipe />} />
        </Routes>
      </BrowserRouter>
    </div>
  </StrictMode>
);

export default App;

import { css } from '@emotion/react';
import emotionReset from 'emotion-reset';

const globalStyles = css`
  ${emotionReset}
  *, *::after, *::before {
    box-sizing: border-box;
    font-family: 'SF Pro Display', 'Pretendard', sans-serif !important;
  }
  code {
    font-family: monospace;
  }
  html {
    background-color: black;
  }
`;

export default globalStyles;

import { css, useTheme } from '@mui/material';
import { FC, memo } from 'react';
import {
  useSignupContext,
  useSignupDispatchContext,
} from '../contexts/SignupContext';

const InterestStep: FC = () => {
  const { interest } = useSignupContext();
  const { setInterest } = useSignupDispatchContext();

  const theme = useTheme();

  return (
    <div
      css={css`
        display: flex;
        flex-direction: column;
        gap: 10px;
        width: 100%;
        padding: 20px;
        border: none;
        border-radius: 6px;
        background-color: ${theme.palette.gray[10]};
      `}
    >
      <textarea
        value={interest}
        onChange={(e) => setInterest(e.target.value)}
        rows={5}
        placeholder="Write about your hobbies or interests."
        maxLength={300}
        css={css`
          width: 100%;
          min-height: 128px;
          resize: none;
          outline: none;
          font-size: 13px;
          font-style: normal;
          font-weight: 274;
          line-height: 140%;
          letter-spacing: -0.052px;
          border: none;
          border-radius: 6px;
          background-color: ${theme.palette.gray[10]};
        `}
      />
      <p
        css={css`
          text-align: right;
          color: ${theme.palette.gray[40]};
          font-family: SF Pro;
          font-size: 12px;
          font-style: normal;
          font-weight: 274;
          line-height: 140%;
          letter-spacing: -0.048px;
        `}
      >
        {interest?.length}/300
      </p>
    </div>
  );
};

export default memo(InterestStep);

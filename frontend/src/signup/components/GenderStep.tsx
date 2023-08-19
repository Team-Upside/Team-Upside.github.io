import { FC, memo } from 'react';
import { Button } from '@mui/material';
import { css } from '@emotion/react';
import { Gender } from '../../common/types';
import {
  useSignupContext,
  useSignupDispatchContext,
} from '../contexts/SignupContext';

const buttonStyle = (selected?: boolean) => css`
  flex: 1;
  border-color: '#EB6200';
  background-color: ${selected ? '#FFF2E8' : 'white'};
`;

const GenderStep: FC = () => {
  const { gender } = useSignupContext();
  const { setGender } = useSignupDispatchContext();

  return (
    <div
      css={css`
        display: flex;
        width: 100%;
        gap: 8px;
      `}
    >
      <Button
        variant="outlined"
        type="button"
        size="large"
        css={buttonStyle(gender === Gender.Male)}
        onClick={() => setGender(Gender.Male)}
      >
        Male
      </Button>
      <Button
        variant="outlined"
        type="button"
        size="large"
        css={buttonStyle(gender === Gender.Female)}
        onClick={() => setGender(Gender.Female)}
      >
        Female
      </Button>
      <Button
        variant="outlined"
        type="button"
        size="large"
        css={buttonStyle(gender === Gender.Others)}
        onClick={() => setGender(Gender.Others)}
      >
        Others
      </Button>
    </div>
  );
};

export default memo(GenderStep);

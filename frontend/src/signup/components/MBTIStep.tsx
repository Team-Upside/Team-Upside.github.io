import { FC, memo } from 'react';
import { css } from '@emotion/react';
import {
  useSignupContext,
  useSignupDispatchContext,
} from '../contexts/SignupContext';
import { MBTI } from '../../common/types';
import { Button, Grid } from '@mui/material';
import { theme } from '../../styles/theme';

const itemStyle = (selected: boolean) => css`
  width: 100%;
  border-radius: 300px;
  border: 1px solid ${theme.palette.gray[10]};
  border-color: ${selected
    ? theme.palette.primary.main
    : theme.palette.gray[30]};
  background-color: ${selected ? theme.palette.orange[10] : 'white'};
  color: ${selected ? theme.palette.primary.main : theme.palette.gray[70]};
`;

const MBTIStep: FC = () => {
  const { mbti } = useSignupContext();
  const { setMBTI } = useSignupDispatchContext();

  return (
    <Grid container spacing={2}>
      {Object.values(MBTI).map((mbtiItem) => (
        <Grid item xs={3} key={mbtiItem}>
          <Button
            type="button"
            onClick={() => setMBTI(mbtiItem)}
            variant="outlined"
            css={itemStyle(mbti === mbtiItem)}
          >
            {mbtiItem}
          </Button>
        </Grid>
      ))}
    </Grid>
  );
};

export default memo(MBTIStep);

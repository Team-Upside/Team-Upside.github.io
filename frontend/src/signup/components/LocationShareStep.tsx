import { FC, memo } from 'react';
import { css } from '@emotion/react';
import { ReactComponent as LocationIcon } from '../../assets/icons/location-share.svg';
import { useLocation } from 'react-router-dom';

const LocationShareStep: FC = () => {
  useLocation();

  return (
    <div
      css={css`
        display: flex;
        justify-content: center;
        align-items: center;
        height: calc(100% - 40px);
      `}
    >
      <LocationIcon
        css={css`
          width: 138px;
          height: 116px;
        `}
      />
    </div>
  );
};

export default memo(LocationShareStep);

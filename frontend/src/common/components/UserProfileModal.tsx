import { FC, memo } from 'react';
import Sheet from 'react-modal-sheet';
import { css } from '@emotion/react';
import { IconButton, useTheme } from '@mui/material';
import { ReactComponent as CloseIcon } from '../../assets/icons/close-plain.svg';
import ProfileExample from '../../assets/profile-example.png';
import UserProfileDetailRow from './UserProfileDetailRow';
import { Gender, MBTI } from '../types';

interface Props {
  isOpen: boolean;
  onClose: () => void;
}

const UserProfileModal: FC<Props> = ({ isOpen, onClose }) => {
  const theme = useTheme();

  return (
    <Sheet
      isOpen={isOpen}
      onClose={onClose}
      css={css`
        .react-modal-sheet-container {
          max-width: 430px;
          height: 85% !important;
          left: 50% !important;
          transform: translateX(-50%) !important;
          border-top-right-radius: 16px !important;
          border-top-left-radius: 16px !important;
        }
      `}
    >
      <Sheet.Container>
        <Sheet.Header
          disableDrag
          css={css`
            display: flex;
            justify-content: flex-end;
            padding: 20px;
            padding-bottom: 0px;
          `}
        >
          <IconButton type="button" onClick={onClose}>
            <CloseIcon />
          </IconButton>
        </Sheet.Header>
        <Sheet.Content
          css={css`
            display: flex;
            flex-direction: column;
            align-items: center;
            padding: 0 24px;
            gap: 16px;
          `}
        >
          <div
            css={css`
              display: flex;
              flex-direction: column;
              gap: 14px;
            `}
          >
            <img
              src={ProfileExample}
              alt="user"
              css={css`
                width: 180px;
                height: 180px;
              `}
            />
            <div
              css={css`
                display: flex;
                justify-content: center;
                align-items: center;
                gap: 8px;
              `}
            >
              <span
                css={css`
                  color: #000;
                  font-size: 26px;
                  font-style: normal;
                  font-weight: 590;
                  line-height: 140%;
                  letter-spacing: -0.104px;
                `}
              >
                Dustin
              </span>
              <span
                css={css`
                  color: #c1c7cd;
                `}
              >
                |
              </span>
              <span
                css={css`
                  color: ${theme.palette.gray[60]};
                  font-size: 18px;
                  font-style: normal;
                  font-weight: 274;
                  line-height: 140%;
                  letter-spacing: -0.072px;
                `}
              >
                21
              </span>
            </div>
          </div>
          <UserProfileDetailRow category="Gender" value={Gender.Male} />
          <UserProfileDetailRow category="MBTI" value={MBTI.Enfj} />
          <UserProfileDetailRow
            category="Interest"
            value={`Yesterday has little to do with annual leave or repetition. For some reason, I'm taking on a new job, and this is for me again? Yesterday has little to do with annual leave or repetition. For some reason, I'm taking on a new job, and this is for me again? I'm taking on a new job, and this is for me`}
          />
          <UserProfileDetailRow category="Favorite Food" value="Pizza" />
        </Sheet.Content>
      </Sheet.Container>
      <Sheet.Backdrop />
    </Sheet>
  );
};

export default memo(UserProfileModal);

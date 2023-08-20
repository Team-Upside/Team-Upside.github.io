import { FC, memo, useMemo } from 'react';
import Sheet from 'react-modal-sheet';
import { css } from '@emotion/react';
import { IconButton, useTheme } from '@mui/material';
import { ReactComponent as CloseIcon } from '../../assets/icons/close-plain.svg';
import AgentIcon from '../../assets/agent-icon.png';
import UserProfileDetailRow from './UserProfileDetailRow';
import { MBTI, UserDto } from '../types';

interface Props {
  isOpen: boolean;
  onClose: () => void;
  user: UserDto;
}

const UserProfileModal: FC<Props> = ({ isOpen, onClose, user }) => {
  const theme = useTheme();

  const {
    nickname,
    birthdate,
    gender,
    favorite_food,
    interest,
    mbti,
    profile,
  } = user;

  const age = useMemo(() => {
    const TODAY = new Date();
    let baseAge =
      TODAY.getFullYear() -
      new Date(birthdate.replaceAll('. ', '-')).getFullYear();

    const diffInMonth =
      TODAY.getMonth() - new Date(birthdate.replaceAll('. ', '-')).getMonth();

    if (diffInMonth < 0) {
      return baseAge - 1;
    }
    return baseAge;
  }, [birthdate]);

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
              src={profile ?? AgentIcon}
              alt={nickname}
              css={css`
                width: 180px;
                height: 180px;
                border: 1px solid;
                border-color: ${theme.palette.gray[20]};
                border-radius: 50%;
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
                {nickname}
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
                {age}
              </span>
            </div>
          </div>
          <UserProfileDetailRow category="Gender" value={gender} />
          {mbti && <UserProfileDetailRow category="MBTI" value={MBTI.Enfj} />}
          {interest && (
            <UserProfileDetailRow category="Interest" value={interest} />
          )}
          {favorite_food && (
            <UserProfileDetailRow
              category="Favorite Food"
              value={favorite_food}
            />
          )}
        </Sheet.Content>
      </Sheet.Container>
      <Sheet.Backdrop />
    </Sheet>
  );
};

export default memo(UserProfileModal);

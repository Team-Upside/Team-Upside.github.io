import { ChangeEvent, FC, memo, useCallback, useId, useState } from 'react';
import { css } from '@emotion/react';
import { IconButton, useTheme } from '@mui/material';
import { ReactComponent as AddIcon } from '../../assets/icons/add.svg';
import { ReactComponent as CloseIcon } from '../../assets/icons/close.svg';
import { useAxios } from '../../common/AxiosContext';
import { useSignupDispatchContext } from '../contexts/SignupContext';
import { UserDto } from '../../common/types';

const ProfileImageStep: FC = () => {
  const fileId = useId();

  const axios = useAxios();
  const theme = useTheme();

  const { setProfileImage } = useSignupDispatchContext();

  const [, setFile] = useState<File | null>(null);
  const [previewImage, setPreviewImage] = useState<string | null>(null);

  const readFileAsync = useCallback((file: File | null) => {
    return new Promise<string>((resolve, reject) => {
      const reader = new FileReader();

      if (!file) {
        reader.onerror = reject;
      }

      reader.readAsDataURL(file as Blob);
      reader.onloadend = () => resolve(reader.result as string);
    });
  }, []);

  const handleChange = useCallback(
    async (e: ChangeEvent<HTMLInputElement>) => {
      const file = e.target.files?.item(0);
      if (!file) {
        return;
      }

      try {
        const fileUrl = await readFileAsync(file);
        setPreviewImage(fileUrl);

        const {
          data: { profile },
        } = await axios.post<{ file: File }, { data: UserDto }>(
          '/users/profile',
          { file },
          {
            headers: {
              'Content-Type': 'multipart/form-data',
            },
          }
        );

        setProfileImage(profile ?? '');
      } catch (error) {
        // do something
      }
    },
    [readFileAsync, setPreviewImage]
  );

  return (
    <div>
      <label
        htmlFor={fileId}
        css={css`
          position: relative;
          display: flex;
          width: 100px;
          height: 120px;
          flex-direction: column;
          justify-content: center;
          align-items: center;
          flex-shrink: 0;
          border-radius: 12px;
          border: 1px solid;
          border-color: ${theme.palette.gray[30]};
          background-color: ${theme.palette.gray[10]};
          background-image: url(${previewImage});
          background-size: contain;
          background-repeat: no-repeat;
          background-position: center;
          cursor: pointer;
        `}
      >
        {!previewImage ? <AddIcon /> : null}
        {previewImage && (
          <IconButton
            onClick={(e) => {
              e.preventDefault();
              setFile(null);
              setPreviewImage(null);
            }}
            css={css`
              position: absolute;
              top: -6px;
              right: -6px;
              padding: 0;
              z-index: 2;
            `}
          >
            <CloseIcon />
          </IconButton>
        )}
      </label>
      <input
        type="file"
        id={fileId}
        onChange={handleChange}
        accept="image/*"
        css={css`
          display: none;
        `}
      />
    </div>
  );
};

export default memo(ProfileImageStep);

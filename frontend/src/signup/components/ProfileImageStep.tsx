import { ChangeEvent, FC, memo, useCallback, useId, useState } from 'react';
import { css } from '@emotion/react';
import { useTheme } from '@mui/material';
import { ReactComponent as AddIcon } from '../../assets/icons/add.svg';

const ProfileImageStep: FC = () => {
  const fileId = useId();

  const theme = useTheme();

  const [file, setFile] = useState<File | null>(null);
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
        `}
      >
        {!previewImage ? <AddIcon /> : null}
      </label>
      <input
        type="file"
        id={fileId}
        onChange={handleChange}
        css={css`
          display: none;
        `}
      />
    </div>
  );
};

export default memo(ProfileImageStep);

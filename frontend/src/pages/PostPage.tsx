import {
  FC,
  memo,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import { css } from '@emotion/react';
import { Button, IconButton, useTheme } from '@mui/material';
import { ReactComponent as CloseIcon } from '../assets/icons/close-plain.svg';
import { useLocation, useNavigate } from 'react-router-dom';
import { useMutation } from '@tanstack/react-query';
import { useAxios } from '../common/AxiosContext';
import { CardDto, CreateCardDto } from '../cards/types';

const PostPage: FC = () => {
  const theme = useTheme();

  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const axios = useAxios();

  const navigate = useNavigate();
  const { search } = useLocation();
  const params = new URLSearchParams(search);
  const restaurant_id = useMemo(
    () => Number(params.get('restaurant_id')) ?? null,
    [params]
  );

  const [message, setMessage] = useState<string>('');

  useEffect(() => {
    textareaRef.current?.focus();
  }, []);

  const { mutateAsync } = useMutation({
    mutationFn: async (createCardDto: CreateCardDto) => {
      return await axios.post<CreateCardDto, CardDto>('/cards', createCardDto);
    },
  });
  const handleSubmitCard = useCallback(async () => {
    if (!restaurant_id) {
      return;
    }

    try {
      await mutateAsync({ restaurant_id: Number(restaurant_id), message });
      navigate('/');
    } catch (error) {
      // do something
    }
  }, [restaurant_id, mutateAsync, message]);

  return (
    <div
      css={css`
        height: 100vh;
      `}
    >
      <header
        css={css`
          position: relative;
          display: flex;
          justify-content: space-between;
          align-items: center;
          width: 100%;
          padding: 9px 20px;
          border-bottom: 1px solid;
          border-color: ${theme.palette.gray[20]};
        `}
      >
        <IconButton type="button" onClick={() => navigate('..')}>
          <CloseIcon />
        </IconButton>
        <h1
          css={css`
            position: absolute;
            left: 50%;
            transform: translateX(-50%);
            color: ${theme.palette.gray[70]};
            font-size: 16px;
            font-style: normal;
            font-weight: 590;
            line-height: 140%;
            letter-spacing: -0.064px;
          `}
        >
          Post
        </h1>
        <Button
          type="button"
          variant="contained"
          disabled={message === ''}
          onClick={handleSubmitCard}
        >
          Upload
        </Button>
      </header>
      <div
        css={css`
          width: 100%;
          padding: 24px 20px;
        `}
      >
        <textarea
          ref={textareaRef}
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          css={css`
            width: 100%;
            outline: none;
            resize: none;
            min-height: 184px;
            font-size: 15px;
            font-style: normal;
            font-weight: 400;
            line-height: 140%;
            letter-spacing: -0.06px;
            border: none;
            ::placeholder {
              color: ${theme.palette.gray[30]};
            }
          `}
          placeholder="What do you want to talk about?"
        />
      </div>
    </div>
  );
};

export default memo(PostPage);

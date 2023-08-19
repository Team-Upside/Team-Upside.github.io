import { FC, memo, useCallback, useEffect, useRef, useState } from 'react';
import { css } from '@emotion/react';
import { Button, IconButton, MenuItem, Select, useTheme } from '@mui/material';
import { ReactComponent as CloseIcon } from '../assets/icons/close-plain.svg';
import { useNavigate } from 'react-router-dom';
import { useMutation, useQuery } from '@tanstack/react-query';
import { useAxios } from '../common/AxiosContext';
import { CardDto, CreateCardDto, RestaurantDto } from '../cards/types';

const PostPage: FC = () => {
  const theme = useTheme();

  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const axios = useAxios();

  const navigate = useNavigate();

  const [message, setMessage] = useState<string>('');
  const [selectedRestaurantId, setSelectedRestaurantId] = useState<number>(-1);

  const { data: restaurants } = useQuery({
    queryKey: ['restaurants'],
    queryFn: async () => {
      const { data } = await axios.get<RestaurantDto[]>('/restaurants');
      return data ?? [];
    },
  });

  useEffect(() => {
    textareaRef.current?.focus();
  }, []);

  const { mutateAsync } = useMutation({
    mutationFn: async (createCardDto: CreateCardDto) => {
      return await axios.post<CreateCardDto, CardDto>('/cards', createCardDto);
    },
  });
  const handleSubmitCard = useCallback(async () => {
    if (selectedRestaurantId === -1) {
      return;
    }

    try {
      await mutateAsync({
        restaurant_id: selectedRestaurantId,
        message,
      });
      navigate('/');
    } catch (error) {
      // do something
    }
  }, [selectedRestaurantId, mutateAsync, message]);

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
        <Select
          value={selectedRestaurantId}
          onChange={(e) => setSelectedRestaurantId(Number(e.target.value))}
          css={css`
            margin-bottom: 24px;
          `}
        >
          {restaurants?.map(({ id, name }) => (
            <MenuItem key={id} value={id}>
              {name}
            </MenuItem>
          ))}
        </Select>
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

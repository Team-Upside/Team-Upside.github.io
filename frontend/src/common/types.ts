import type { RestaurantDto } from '../cards/types';

export interface UserDto {
  id: string;
  nickname: string;
  birthdate: string;
  gender: Gender;
  mbti: string | null;
  interest: string | null;
  favorite_food: string | null;
  profile: string | null;
}

export type CreateUserDto = Pick<UserDto, 'nickname' | 'birthdate' | 'gender'> &
  Partial<UserDto>;

export enum Gender {
  Male = 'MALE',
  Female = 'FEMALE',
  Others = 'OTHERS',
}

export enum MBTI {
  Istj = 'ISTJ',
  Isfj = 'ISFJ',
  Istp = 'ISTP',
  Isfp = 'ISFP',
  Intj = 'INTJ',
  Intp = 'INTP',
  Infj = 'INFJ',
  Infp = 'INFP',
  Estp = 'ESTP',
  Esfp = 'ESFP',
  Estj = 'ESTJ',
  Esfj = 'ESFJ',
  Entj = 'ENTJ',
  Entp = 'ENTP',
  Enfj = 'ENFJ',
  Enfp = 'ENFP',
}

export interface ChatroomDto {
  id: number;
  restaurant: RestaurantDto;
  opponent_user: UserDto;
  unread_count: number;
  last_message: string;
  created_at: string;
  updated_at: string;
}

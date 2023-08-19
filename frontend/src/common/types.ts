export interface UserDto {
  id: string;
  nickname: string;
  birthdate: string;
  gender: Gender;
  mbti: string;
  interest: string;
  favorite_food: string;
  profile: string;
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

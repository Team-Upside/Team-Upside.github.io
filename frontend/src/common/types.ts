export interface TokenResponse {
  accessToken: string;
  refreshToken: string;
}

export enum LocalStorageKey {
  AccessToken = 'ACCESS_TOKEN',
  RefreshToken = 'REFRESH_TOKEN',
}

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

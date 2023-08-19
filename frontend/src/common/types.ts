export interface TokenResponse {
  accessToken: string;
  refreshToken: string;
}

export enum LocalStorageKey {
  AccessToken = 'ACCESS_TOKEN',
  RefreshToken = 'REFRESH_TOKEN',
}

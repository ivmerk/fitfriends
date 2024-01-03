import {
  AUTH_TOKEN_KEY_NAME,
  REFRESH_TOKEN_KEY_NAME,
} from '../common/constant';

export type Token = string;

export const getToken = (): Token => {
  const token = localStorage.getItem(AUTH_TOKEN_KEY_NAME);
  return token ?? '';
};

export const getRefreshToken = (): Token => {
  const refreshToken = localStorage.getItem(REFRESH_TOKEN_KEY_NAME);
  return refreshToken ?? '';
};

export const saveToken = (token: Token, refreshToken: Token): void => {
  localStorage.setItem(AUTH_TOKEN_KEY_NAME, token);
  localStorage.setItem(REFRESH_TOKEN_KEY_NAME, refreshToken);
};

export const dropToken = (): void => {
  localStorage.removeItem(AUTH_TOKEN_KEY_NAME);
  localStorage.removeItem(REFRESH_TOKEN_KEY_NAME);
};

import { BookStoreModel } from '@src/model';
import { getTokenFromStorage } from './storage';

export const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

export const getUserIdFromToken = () => {
  const token = getTokenFromStorage();

  return token ? atob(token) : null;
};

export const getUserFromToken = (users: BookStoreModel.User[]) => {
  const id = getUserIdFromToken();

  return users.find((user) => user.id === id);
};

export const generateId = () => (+new Date()).toString();

export const errorWithMessage = (message: string) => {
  const error = new Error('ERROR');

  error.message = message;

  return error;
};

export const logError = (error: any) => {
  /* eslint-disable-next-line no-console */
  console.error(error);
};

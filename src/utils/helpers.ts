import { BookStoreModel } from '@src/model';
import { getTokenFromStorage } from './storage';

export const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

export const getUserIdFromToken = () => atob(getTokenFromStorage());

export const getUserFromToken = (users: BookStoreModel.User[]) => {
  const id = getUserIdFromToken();

  return users.find(((user) => user.id === id));
};

export const generateId = () => (+new Date()).toString();

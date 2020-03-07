import { STORAGE_DATA_KEY, STORAGE_TOKEN_KEY } from '@src/constants';
import * as initialData from '@src/initial-data.json';

export const loadInitialData = () => {
  console.log(initialData);

  localStorage.setItem(
    STORAGE_DATA_KEY, JSON.stringify(initialData),
  );
};


export const getItemFromStorage = <T>(key: string = null): T => {
  const db = JSON.parse(localStorage.getItem(STORAGE_DATA_KEY));

  return key ? db[key] : db;
};

export const saveItemToStorage = <T>(key: string, data: T[]) => {
  const db = getItemFromStorage();

  db[key] = data;

  localStorage.setItem(
    STORAGE_DATA_KEY, JSON.stringify(db),
  );
};

export const getTokenFromStorage = (): string => sessionStorage.getItem(STORAGE_TOKEN_KEY);

export const saveTokenToStorage = (token: string) => sessionStorage.setItem(
  STORAGE_TOKEN_KEY, token,
);

export const removeTokenFromStorage = () => sessionStorage.removeItem(STORAGE_TOKEN_KEY);

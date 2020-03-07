import {
  getItemFromStorage,
  loadInitialData,
  saveTokenToStorage,
  removeTokenFromStorage,
} from '@utils/storage';
import { delay, getUserFromToken } from '@utils/helpers';
import { API_DELAY } from '@src/constants';
import { BookStoreModel } from '@src/model';
import { UsersModel } from './model';
import { DATA_KEY } from './constants';

export const getList = async (): Promise<BookStoreModel.User[]> => {
  let users = getItemFromStorage<BookStoreModel.User[]>(DATA_KEY);

  if (!users) {
    loadInitialData();
    users = getItemFromStorage(DATA_KEY);
  }

  await delay(API_DELAY);

  if (!users) {
    throw new Error('User data failure');
  }

  return users;
};

export const loginByToken = async (): Promise<UsersModel.LoginResponse> => {
  const users = await getList();
  const user = getUserFromToken(users);

  if (!user) {
    throw new Error('No acive user session');
  }

  const { password: removePassword, ...activeUser } = user;

  return { activeUser };
};

export const login = async (
  username: string,
  password: string,
): Promise<UsersModel.LoginResponse> => {
  const users = await getList();

  const user = users.find(((usr) => usr.username === username && usr.password === password));

  if (!user) {
    throw new Error('Login failed. Bad credentials or user does not exist');
  }

  const { password: removePassword, ...activeUser } = user;
  const token = btoa(activeUser.id);

  saveTokenToStorage(token);

  return { activeUser };
};

export const logout = async () => {
  removeTokenFromStorage();

  delay(API_DELAY);
};

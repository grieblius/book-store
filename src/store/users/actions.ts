import { action, ErrorActionModel } from '@utils/redux';

import { Types } from './constants';
import { UsersModel } from './model';

export const initRequest = action(Types.USERS.INIT.REQUEST);
export const initReceive = action<UsersModel.LoginResponse>(Types.USERS.INIT.RECEIVE);
export const initError = action<ErrorActionModel>(Types.USERS.INIT.ERROR);

export const loginRequest = action<UsersModel.LoginRequest>(Types.USERS.LOGIN.REQUEST);
export const loginReceive = action<UsersModel.LoginResponse>(Types.USERS.LOGIN.RECEIVE);
export const loginError = action<ErrorActionModel>(Types.USERS.LOGIN.ERROR);

export const logoutRequest = action(Types.USERS.LOGOUT.REQUEST);
export const logoutReceive = action(Types.USERS.LOGOUT.RECEIVE);
export const logoutError = action<ErrorActionModel>(Types.USERS.LOGOUT.ERROR);

export const listRequest = action(Types.USERS.LIST.REQUEST);
export const listReceive = action<UsersModel.ListResponse>(Types.USERS.LIST.RECEIVE);
export const listError = action<ErrorActionModel>(Types.USERS.LIST.ERROR);

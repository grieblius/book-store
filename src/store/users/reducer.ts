import { ActionModel } from '@utils/redux';
import { Types } from './constants';
import { UsersModel } from './model';

export const initialState: UsersModel.Reducer = {
  users: [],
  activeUser: null,
};

export default (
  state: UsersModel.Reducer = initialState,
  action:
  | ActionModel<UsersModel.LoginResponse, typeof Types.USERS.INIT.RECEIVE>
  | ActionModel<UsersModel.LoginResponse, typeof Types.USERS.LOGIN.RECEIVE>
  | ActionModel<null, typeof Types.USERS.LOGOUT.RECEIVE>
  | ActionModel<UsersModel.ListResponse, typeof Types.USERS.LIST.RECEIVE>,
): UsersModel.Reducer => {
  switch (action.type) {
    case Types.USERS.INIT.RECEIVE:
    case Types.USERS.LOGIN.RECEIVE: {
      const { activeUser } = action.payload;

      return {
        ...state,
        activeUser,
      };
    }
    case Types.USERS.LOGOUT.RECEIVE: {
      return {
        ...state,
        activeUser: null,
      };
    }
    case Types.USERS.LIST.RECEIVE: {
      const { users } = action.payload;

      return {
        ...state,
        users,
      };
    }
    default: {
      return state;
    }
  }
};

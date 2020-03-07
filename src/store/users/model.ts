import { BookStoreModel } from '@src/model';

export namespace UsersModel {
  export interface State {
    usersReducer: Reducer;
    requestReducer: RequestReducer;
  }

  export interface Reducer {
    users: BookStoreModel.User[];
    activeUser: BookStoreModel.User;
  }

  export interface RequestReducer {
    isUsersInitLoading: boolean;
    isUsersLoginLoading: boolean;
    isUsersListLoading: boolean;
    usersInitError: string;
    usersLoginError: string;
    usersListError: string;
  }

  export interface LoginRequest {
    username: string;
    password: string;
  }

  export interface LoginResponse {
    activeUser: BookStoreModel.User;
  }

  export interface ListResponse {
    users: BookStoreModel.User[];
  }
}

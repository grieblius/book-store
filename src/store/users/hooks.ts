import { useSelector, useDispatch } from 'react-redux';
import { bindActionCreators } from 'redux';

import { UsersModel } from './model';

import {
  initRequest, loginRequest, logoutRequest, listRequest,
} from './actions';

const useUsersState = (): [
  UsersModel.Reducer,
  UsersModel.RequestReducer,
  typeof actions,
] => {
  const requestState = useSelector<UsersModel.State, UsersModel.RequestReducer>(
    (state) => state.requestReducer,
  );

  const storeState = useSelector<UsersModel.State, UsersModel.Reducer>(
    (state) => state.usersReducer,
  );

  const actions = bindActionCreators(
    {
      initRequest,
      loginRequest,
      logoutRequest,
      listRequest,
    },
    useDispatch(),
  );

  return [storeState, requestState, actions];
};

export default useUsersState;

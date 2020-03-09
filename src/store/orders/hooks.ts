import { useSelector, useDispatch } from 'react-redux';
import { bindActionCreators } from 'redux';

import { OrdersModel } from './model';

import {
  listRequest,
  userListRequest,
  updateStatusRequest,
  itemAddRequest,
  itemAddError,
  itemRemoveRequest,
  itemUpdateQuantityRequest,
} from './actions';

const useOrdersState = (): [
  OrdersModel.Reducer,
  OrdersModel.RequestReducer,
  typeof actions,
] => {
  const requestState = useSelector<OrdersModel.State, OrdersModel.RequestReducer>(
    (state) => state.requestReducer,
  );

  const storeState = useSelector<OrdersModel.State, OrdersModel.Reducer>(
    (state) => state.ordersReducer,
  );

  const actions = bindActionCreators(
    {
      listRequest,
      userListRequest,
      updateStatusRequest,
      itemAddRequest,
      itemAddError,
      itemRemoveRequest,
      itemUpdateQuantityRequest,
    },
    useDispatch(),
  );

  return [storeState, requestState, actions];
};

export default useOrdersState;

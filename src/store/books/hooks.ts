import { useSelector, useDispatch } from 'react-redux';
import { bindActionCreators } from 'redux';

import { BooksModel } from './model';

import {
  listRequest,
  itemRequest,
  createRequest,
  editRequest,
  deleteRequest,
} from './actions';

const useBooksState = (): [
  BooksModel.Reducer,
  BooksModel.RequestReducer,
  typeof actions,
] => {
  const requestState = useSelector<BooksModel.State, BooksModel.RequestReducer>(
    (state) => state.requestReducer,
  );

  const storeState = useSelector<BooksModel.State, BooksModel.Reducer>(
    (state) => state.booksReducer,
  );

  const actions = bindActionCreators(
    {
      listRequest,
      itemRequest,
      createRequest,
      editRequest,
      deleteRequest,
    },
    useDispatch(),
  );

  return [storeState, requestState, actions];
};

export default useBooksState;

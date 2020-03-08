import * as React from 'react';
import {
  Route, Redirect, RouteProps, useLocation,
} from 'react-router';

import useUsersState from '@store/users/hooks';
import { BookStoreModel } from '@src/model';

type Props = {
  userRole?: BookStoreModel.UserRole;
} & RouteProps;

const AuthRoute: React.FC<Props> = ({
  children,
  path,
  exact,
  userRole,

}: Props) => {
  const [{ activeUser }] = useUsersState();
  const location = useLocation();
  const isAuth = activeUser && (!userRole || userRole === activeUser.role);

  return (
    <Route path={path} exact={exact}>
      {isAuth ? (
        children
      ) : (
        <Redirect
          to={{
            pathname: '/login',
            state: { from: location },
          }}
        />
      )}
    </Route>
  );
};
export default AuthRoute;

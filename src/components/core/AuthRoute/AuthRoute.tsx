import * as React from 'react';
import {
  Route, Redirect, RouteProps, useLocation,
} from 'react-router';

import useUsersState from '@store/users/hooks';

const AuthRoute: React.FC<RouteProps> = ({
  children,
  path,
  exact,

}: RouteProps) => {
  const [usersState] = useUsersState();
  const location = useLocation();

  return (
    <Route path={path} exact={exact}>
      {usersState.activeUser ? (
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

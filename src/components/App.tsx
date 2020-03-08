import * as React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { hot } from 'react-hot-loader';
import CssBaseline from '@material-ui/core/CssBaseline';

import Loader from '@components/common/Loader';
import AuthRoute from '@components/core/AuthRoute';
import useUsersState from '@store/users/hooks';

const Home = React.lazy(() => import('@components/pages/Home'));
const SignIn = React.lazy(() => import('@components/pages/SignIn'));
const SignOut = React.lazy(() => import('@components/pages/SignOut'));
const Orders = React.lazy(() => import('@components/pages/Orders'));
const Admin = React.lazy(() => import('@components/pages/Admin'));

const App: React.FC = () => {
  const [{ activeUser }, , { initRequest }] = useUsersState();

  React.useEffect(() => {
    if (!activeUser) {
      initRequest();
    }
  }, []);

  return (
    <Router>
      <CssBaseline />
      <Switch>
        <Route path="/login">
          <React.Suspense fallback={<Loader open />}>
            <SignIn />
          </React.Suspense>
        </Route>
        <Route path="/logout">
          <React.Suspense fallback={<Loader open />}>
            <SignOut />
          </React.Suspense>
        </Route>
        <AuthRoute path="/orders" exact>
          <React.Suspense fallback={<Loader open />}>
            <Orders />
          </React.Suspense>
        </AuthRoute>
        <AuthRoute path="/admin" userRole="admin" exact>
          <React.Suspense fallback={<Loader open />}>
            <Admin />
          </React.Suspense>
        </AuthRoute>
        <Route path="/">
          <React.Suspense fallback={<Loader open />}>
            <Home />
          </React.Suspense>
        </Route>
      </Switch>
    </Router>
  );
};

declare let module: object;

export default hot(module)(App);

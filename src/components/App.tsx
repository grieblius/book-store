import * as React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { hot } from 'react-hot-loader';
import CssBaseline from '@material-ui/core/CssBaseline';

import useUsersState from '@store/users/hooks';
import AuthRoute from './core/AuthRoute';

import SignIn from './pages/SignIn';
import SignOut from './pages/SignOut';
import Home from './pages/Home';
import Orders from './pages/Orders';
import Admin from './pages/Admin';

const App: React.FC = () => {
  const [{ activeUser }, , { initRequest }] = useUsersState();

  React.useEffect(() => {
    if (!activeUser) {
      initRequest();
    }
  }, []);

  return (
    <>
      <CssBaseline />
      <Router>
        <Switch>
          <Route path="/login">
            <SignIn />
          </Route>
          <Route path="/logout">
            <SignOut />
          </Route>
          <AuthRoute path="/orders" exact>
            <Orders />
          </AuthRoute>
          <AuthRoute path="/admin" userRole="admin" exact>
            <Admin />
          </AuthRoute>
          <Route path="/">
            <Home />
          </Route>
        </Switch>
      </Router>
    </>
  );
};

declare let module: object;

export default hot(module)(App);

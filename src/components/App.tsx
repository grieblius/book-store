import * as React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { hot } from 'react-hot-loader';
import CssBaseline from '@material-ui/core/CssBaseline';

import Loader from '@components/common/Loader';
import AuthRoute from '@components/core/AuthRoute';
import useUsersState from '@store/users/hooks';
import PageTemplate from './core/PageTemplate';

const Home = React.lazy(() => import('@components/pages/Home'));
const SignIn = React.lazy(() => import('@components/pages/SignIn'));
const SignOut = React.lazy(() => import('@components/pages/SignOut'));
const Orders = React.lazy(() => import('@components/pages/Orders'));
const AdminUsers = React.lazy(() => import('@components/pages/admin/AdminUsers'));
const AdminBooks = React.lazy(() => import('@components/pages/admin/AdminBooks'));

type AppContextModel = {
  pageTitle: string;
  isLoading?: boolean;
  error?: string;
  setPageTitle: (pageTitle: string) => void;
  setIsLoading: (isLoading: boolean) => void;
  setError: (error: string) => void;
};

export const AppContext = React.createContext<AppContextModel>(null);

const App: React.FC = () => {
  const [{ activeUser }, , { initRequest }] = useUsersState();
  const [pageTitle, setPageTitle] = React.useState<string>(null);
  const [isLoading, setIsLoading] = React.useState(false);
  const [error, setError] = React.useState<string>(null);

  React.useEffect(() => {
    if (!activeUser) {
      initRequest();
    }
  }, []);

  const context = {
    pageTitle,
    isLoading,
    error,
    setPageTitle,
    setIsLoading,
    setError,
  };

  return (
    <AppContext.Provider value={context}>
      <Router>
        <CssBaseline />
        <PageTemplate title={pageTitle} isLoading={isLoading} error={error}>
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
            <AuthRoute path="/admin/users" userRole="admin">
              <React.Suspense fallback={<Loader open />}>
                <AdminUsers />
              </React.Suspense>
            </AuthRoute>
            <AuthRoute path="/admin/books" userRole="admin">
              <React.Suspense fallback={<Loader open />}>
                <AdminBooks />
              </React.Suspense>
            </AuthRoute>
            <Route path="/">
              <React.Suspense fallback={<Loader open />}>
                <Home />
              </React.Suspense>
            </Route>
          </Switch>
        </PageTemplate>
      </Router>
    </AppContext.Provider>
  );
};

declare let module: object;

export default hot(module)(App);

import * as React from 'react';
import { hot } from 'react-hot-loader';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import CssBaseline from '@material-ui/core/CssBaseline';

import Loader from '@components/common/Loader';
import PageTemplate, { PageTemplateModel } from '@components/core/PageTemplate';
import AuthRoute from '@components/core/AuthRoute';
import useUsersState from '@store/users/hooks';
import useOrdersState from '@store/orders/hooks';

const Home = React.lazy(() => import('@components/pages/Home'));
const SignIn = React.lazy(() => import('@components/pages/SignIn'));
const SignOut = React.lazy(() => import('@components/pages/SignOut'));
const Orders = React.lazy(() => import('@components/pages/Orders'));
const AdminUsers = React.lazy(() => import('@components/pages/admin/AdminUsers'));
const AdminBooks = React.lazy(() => import('@components/pages/admin/AdminBooks'));
const AdminOrders = React.lazy(() => import('@components/pages/admin/AdminOrders'));

type AppContextModel = PageTemplateModel & {
  setPageTemplateProps: (props: PageTemplateModel) => void;
};

export const AppContext = React.createContext<AppContextModel>(null);

const App: React.FC = () => {
  const [{ activeUser }, , { initRequest }] = useUsersState();
  const [, , { userListRequest }] = useOrdersState();


  const [pageTemplateProps, setPageTemplateProps] = React.useState<PageTemplateModel>({
    title: null,
    isLoading: false,
    error: null,
    maxContainerWidth: 'md',
  });

  React.useEffect(() => {
    if (!activeUser) {
      initRequest();
    }
  }, []);

  React.useEffect(() => {
    if (activeUser) {
      userListRequest();
    }
  }, [activeUser]);

  const context = { ...pageTemplateProps, setPageTemplateProps };

  return (
    <AppContext.Provider value={context}>
      <Router>
        <CssBaseline />
        <PageTemplate
          title={pageTemplateProps.title}
          isLoading={pageTemplateProps.isLoading}
          error={pageTemplateProps.error}
          maxContainerWidth={pageTemplateProps.maxContainerWidth}
        >
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
            <AuthRoute path="/admin/orders" userRole="admin">
              <React.Suspense fallback={<Loader open />}>
                <AdminOrders />
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

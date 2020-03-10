import * as React from 'react';
import { Route, Switch, useRouteMatch } from 'react-router-dom';

import List from './List';
import Form from './Form';

const AdminBooks: React.FC = () => {
  const { path } = useRouteMatch();

  return (
    <Switch>
      <Route path={`${path}/form/:id?`}>
        <Form />
      </Route>
      <Route path={path}>
        <List />
      </Route>
    </Switch>
  );
};

export default AdminBooks;

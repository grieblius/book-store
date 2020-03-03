import * as React from 'react';
import { hot } from 'react-hot-loader';

import Button from '@material-ui/core/Button';

const App: React.FunctionComponent = () => (
  <Button variant="contained" color="primary">
    Hello World
  </Button>
);

declare let module: object;

export default hot(module)(App);

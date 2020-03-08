import 'core-js/stable';
import 'regenerator-runtime/runtime';
import * as React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';

import App from '@components/App';
import configureStore from './store';


const rootEl = document.getElementById('root');

render(
  <Provider store={configureStore()}>
    <App />
  </Provider>,
  rootEl,
);

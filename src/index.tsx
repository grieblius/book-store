import 'core-js/stable';
import 'regenerator-runtime/runtime';
import * as React from 'react';
import { render } from 'react-dom';

import App from '@components/App';

const rootEl = document.getElementById('root');

render(<App />, rootEl);

import React from 'react';
import { render } from 'react-dom';
import { debug } from 'rinter';

import { ControllerContext } from '../../src';

import createController from './controller';
import App from './components/App';

const controller = debug(createController());

render(
  <ControllerContext.Provider value={controller}>
    <App />
  </ControllerContext.Provider>,
  document.getElementById('app')
);

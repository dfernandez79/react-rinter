import React from 'react';
import { render } from 'react-dom';
import { debug } from 'rinter';

import { Provider } from '../../src';

import { createController } from './controller';
import ErrorMessage from './error-message';
import NumberFacts from './number-facts';

const numbers = debug(createController(), debug.SILENT);

const App = () => (
  <Provider controller={numbers}>
    <div>
      <ErrorMessage />
      <NumberFacts />
    </div>
  </Provider>
);

render(<App />, document.getElementById('app'));

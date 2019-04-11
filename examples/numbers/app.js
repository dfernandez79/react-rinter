import React from 'react';
import { render } from 'react-dom';

import { Provider } from '../../src';

import { createController } from './controller';
import ErrorMessage from './ErrorMessage';
import NumberFacts from './NumberFacts';

const numbers = createController();

const App = () => (
  <Provider controller={numbers}>
    <div>
      <ErrorMessage />
      <NumberFacts />
    </div>
  </Provider>
);

render(<App />, document.getElementById('app'));

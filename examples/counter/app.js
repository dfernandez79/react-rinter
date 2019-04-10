import React from 'react';
import { render } from 'react-dom';
import { controller, debug } from 'rinter';

import { Provider, Consumer } from '../../src';

const createCounter = controller({
  initialState: 0,
  mutators: {
    increment: state => state + 1,
    decrement: state => state - 1,
  },
});

const counter = debug(createCounter());

const App = () => (
  <Provider controller={counter}>
    <Consumer>
      {(state, controller) => (
        <div>
          Clicked: {state} times
          <div>
            <button onClick={controller.increment}>+</button>
            <button onClick={controller.decrement}>-</button>
          </div>
        </div>
      )}
    </Consumer>
  </Provider>
);

render(<App />, document.getElementById('app'));

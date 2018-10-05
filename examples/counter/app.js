import React from 'react';
import { render } from 'react-dom';

import ControllerSubscription from '../../src';
import CounterController from '.';

const counter = new CounterController();

const App = () => (
  <ControllerSubscription source={counter}>
    {value => (
      <div>
        Clicked: {value.count} times
        <div>
          <button onClick={() => counter.increment()}>+</button>
          <button onClick={() => counter.decrement()}>-</button>
        </div>
      </div>
    )}
  </ControllerSubscription>
);

render(<App />, document.getElementById('app'));

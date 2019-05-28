import React from 'react';
import { render } from 'react-dom';
import { controller } from 'rinter';

import { StateChangeSubscription } from '../../src';

const createCounter = controller({
  initialState: 0,

  mutators: {
    increment: state => state + 1,
    decrement: state => state - 1,
  },

  methods: {
    incrementIfOdd() {
      if (this.state % 2 !== 0) {
        this.increment();
      }
    },

    incrementAsync() {
      setTimeout(() => {
        this.increment();
      }, 1000);
    },
  },
});

const counter = createCounter();

const App = () => (
  <StateChangeSubscription source={counter}>
    {count => (
      <div>
        <p>
          Clicked: <span id="value">{count}</span> times
          <button id="increment" onClick={counter.increment}>
            +
          </button>
          <button id="decrement" onClick={counter.decrement}>
            -
          </button>
          <button id="incrementIfOdd" onClick={counter.incrementIfOdd}>
            Increment if odd
          </button>
          <button id="incrementAsync" onClick={counter.incrementAsync}>
            Increment async
          </button>
        </p>
      </div>
    )}
  </StateChangeSubscription>
);

render(<App />, document.getElementById('app'));

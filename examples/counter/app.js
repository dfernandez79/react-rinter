import React from 'react';
import { render } from 'react-dom';
import { controller } from 'rinter';

import { Subscription } from '../../src';

import './counter.css';

const createCounter = controller({
  initialState: 0,

  mutators: {
    increment: state => state + 1,
    decrement: state => (state > 1 ? state - 1 : 0),
  },
});

const counter = createCounter();

const App = () => (
  <Subscription source={counter}>
    {(count, controller) => (
      <div className="main">
        <div className="container">
          <div className="bigNumber">{count}</div>
          <div className="buttonContainer">
            <button className="button" onClick={controller.increment}>
              ▲
            </button>
            <button className="button" onClick={controller.decrement}>
              ▼
            </button>
          </div>
        </div>
      </div>
    )}
  </Subscription>
);

render(<App />, document.getElementById('app'));

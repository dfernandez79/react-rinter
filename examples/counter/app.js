import React from 'react';
import { render } from 'react-dom';
import DefaultController, { debug } from 'rinter';

import { Provider, Consumer } from '../../src';

export default class CounterController extends DefaultController {
  increment() {
    this.assign({ count: this.state.count + 1 });
  }

  decrement() {
    this.assign({ count: this.state.count - 1 });
  }
}

const counter = debug(new CounterController({ count: 0 }));

const App = () => (
  <Provider controller={counter}>
    <Consumer>
      {(state, controller) => (
        <div>
          Clicked: {state.count} times
          <div>
            <button onClick={() => controller.increment()}>+</button>
            <button onClick={() => controller.decrement()}>-</button>
          </div>
        </div>
      )}
    </Consumer>
  </Provider>
);

render(<App />, document.getElementById('app'));

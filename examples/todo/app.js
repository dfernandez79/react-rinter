import React from 'react';
import { render } from 'react-dom';

import { Provider, Consumer } from '../../src';

import TodoController from '.';

const App = ({ controller }) => (
  <Provider controller={controller}>
    <Consumer>
      {({ draft, list }, controller) => (
        <div>
          <div>
            <input
              value={draft}
              onChange={evt => controller.changeDraft(evt.target.value)}
            />
            <button onClick={() => controller.add(draft)}>Add</button>
          </div>
          {list.map(todo => (
            <div key={todo.id}>
              {todo.text}{' '}
              <button onClick={() => controller.remove(todo.id)}>Remove</button>
            </div>
          ))}
        </div>
      )}
    </Consumer>
  </Provider>
);

render(
  <App controller={new TodoController()} />,
  document.getElementById('app')
);

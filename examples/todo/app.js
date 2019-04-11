/* eslint-disable react/prop-types */
import React from 'react';
import { render } from 'react-dom';

import { Subscription } from '../../src';

import TodoController from '.';

const App = ({ controller }) => (
  <Subscription source={controller}>
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
  </Subscription>
);

render(
  <App controller={new TodoController()} />,
  document.getElementById('app')
);

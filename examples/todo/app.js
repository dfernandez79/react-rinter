import React from 'react';
import { render } from 'react-dom';

import ControllerSubscription from '../../src';
import TodoController from '.';

const todoList = new TodoController();

const App = () => (
  <ControllerSubscription source={todoList}>
    {value => (
      <div>
        <div>
          <input
            value={value.draft}
            onChange={evt => todoList.changeDraft(evt.target.value)}
          />
          <button onClick={() => todoList.add(value.draft)}>Add</button>
        </div>
        {value.list.map(todo => (
          <div key={todo.id}>
            {todo.text}{' '}
            <button onClick={() => todoList.remove(todo.id)}>Remove</button>
          </div>
        ))}
      </div>
    )}
  </ControllerSubscription>
);

render(<App />, document.getElementById('app'));

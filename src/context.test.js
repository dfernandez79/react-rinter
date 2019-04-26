import React from 'react';
import controller from 'rinter';
import { render, cleanup } from 'react-testing-library';

import { Provider, Consumer } from '.';

const createController = controller({
  initialState: { message: 'It Worked!' },
  mutators: {
    updateMessage: () => ({ message: 'A new message' }),
  },
});

afterEach(cleanup);

test('multiple consumers', () => {
  const controller = createController();

  const { getByTestId } = render(
    <Provider controller={controller}>
      <div>
        <Consumer>
          {state => <div data-testid="1">{state.message}</div>}
        </Consumer>
        <Consumer>
          {state => <div data-testid="2">{state.message}</div>}
        </Consumer>
        <Consumer>
          {state => <div data-testid="3">{state.message}</div>}
        </Consumer>
      </div>
    </Provider>
  );

  expect(getByTestId('1').innerHTML).toBe('It Worked!');
  expect(getByTestId('2').innerHTML).toBe('It Worked!');
  expect(getByTestId('3').innerHTML).toBe('It Worked!');
});

test('update multiple consumers', () => {
  const controller = createController();

  const { getByTestId } = render(
    <Provider controller={controller}>
      <div>
        <Consumer>
          {state => <div data-testid="1">{state.message}</div>}
        </Consumer>
        <Consumer>
          {state => <div data-testid="2">{state.message}</div>}
        </Consumer>
        <Consumer>
          {state => <div data-testid="3">{state.message}</div>}
        </Consumer>
      </div>
    </Provider>
  );

  controller.updateMessage();

  expect(getByTestId('1').innerHTML).toBe('A new message');
  expect(getByTestId('2').innerHTML).toBe('A new message');
  expect(getByTestId('3').innerHTML).toBe('A new message');
});

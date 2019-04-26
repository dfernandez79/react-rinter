import React from 'react';
import controller from 'rinter';
import { render, cleanup } from 'react-testing-library';
import { filter } from 'rxjs/operators';

import { Subscription } from '.';

const createController = controller({
  initialState: { message: 'It Worked!' },
  mutators: {
    updateMessage: (state, message = 'A new message') => ({ message }),
  },
});

afterEach(cleanup);

test('react to controller changes', () => {
  const controller = createController();

  const { getByTestId } = render(
    <Subscription source={controller}>
      {state => <div data-testid="test">{state.message}</div>}
    </Subscription>
  );

  expect(getByTestId('test').innerHTML).toBe('It Worked!');
  controller.updateMessage();
  expect(getByTestId('test').innerHTML).toBe('A new message');
});

test('unsubscribe during unmount', () => {
  const mockUnsubscribe = jest.fn();

  const controller = {
    state: 'Test',
    changes: {
      subscribe: jest.fn(() => ({ unsubscribe: mockUnsubscribe })),
    },
  };

  const { unmount } = render(
    <Subscription source={controller}>
      {state => <div>{state.message}</div>}
    </Subscription>
  );

  expect(controller.changes.subscribe.mock.calls.length).toBe(1);
  expect(mockUnsubscribe.mock.calls.length).toBe(0);

  unmount();

  expect(mockUnsubscribe.mock.calls.length).toBe(1);
});

test('filter state changes using pipe', () => {
  const controller = createController();

  const { getByTestId } = render(
    <Subscription
      source={controller}
      pipeChanges={[filter(s => s.message === 'Pass')]}
    >
      {state => <div data-testid="test">{state.message}</div>}
    </Subscription>
  );

  expect(getByTestId('test').innerHTML).toBe('It Worked!');
  controller.updateMessage('Something');
  expect(getByTestId('test').innerHTML).toBe('It Worked!');
  controller.updateMessage('Pass');
  expect(getByTestId('test').innerHTML).toBe('Pass');
});

import React from 'react';
import controller from 'rinter';
import { render, cleanup } from 'react-testing-library';

import { StateChangeSubscription } from '.';

const createController = controller({
  initialState: { message: 'It Worked!', other: 'Other Message' },
  mutators: {
    updateMessage: (state, message = 'A new message') => ({
      ...state,
      message,
    }),
    updateOther: (state, other) => ({ ...state, other }),
  },
});

afterEach(cleanup);

test('react to controller changes', () => {
  const controller = createController();

  const { getByTestId } = render(
    <StateChangeSubscription source={controller}>
      {state => <div data-testid="test">{state.message}</div>}
    </StateChangeSubscription>
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
      pipe() {
        return this;
      },
    },
  };

  const { unmount } = render(
    <StateChangeSubscription source={controller}>
      {state => <div>{state.message}</div>}
    </StateChangeSubscription>
  );

  expect(controller.changes.subscribe.mock.calls.length).toBe(1);
  expect(mockUnsubscribe.mock.calls.length).toBe(0);

  unmount();

  expect(mockUnsubscribe.mock.calls.length).toBe(1);
});

test('map state changes', () => {
  const controller = createController();

  const { getByTestId } = render(
    <StateChangeSubscription source={controller} mapState={s => s.message}>
      {state => <div data-testid="test">{state}</div>}
    </StateChangeSubscription>
  );

  expect(getByTestId('test').innerHTML).toBe('It Worked!');
  controller.updateOther('Something');
  expect(getByTestId('test').innerHTML).toBe('It Worked!');
  controller.updateMessage('Pass');
  expect(getByTestId('test').innerHTML).toBe('Pass');
});

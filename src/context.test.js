import test from 'ava';

import { configure, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

import React from 'react';
import controller from 'rinter';

import { Provider, Consumer } from '.';

configure({ adapter: new Adapter() });

const createController = controller({
  initialState: { message: 'It Worked!' },
  mutators: {
    updateMessage: () => ({ message: 'A new message' }),
  },
});

test('multiple consumers', t => {
  const controller = createController();

  const expected = shallow(
    <div>
      <div>It Worked!</div>
      <div>It Worked!</div>
      <div>It Worked!</div>
    </div>
  ).html();

  const actual = shallow(
    <Provider controller={controller}>
      <div>
        <Consumer>{state => <div>{state.message}</div>}</Consumer>
        <Consumer>{state => <div>{state.message}</div>}</Consumer>
        <Consumer>{state => <div>{state.message}</div>}</Consumer>
      </div>
    </Provider>
  ).html();

  t.is(actual, expected);
});

test('update multiple consumers', t => {
  const controller = createController();

  let expected = shallow(
    <div>
      <div>It Worked!</div>
      <div>It Worked!</div>
      <div>It Worked!</div>
    </div>
  ).html();

  const wrapper = shallow(
    <Provider controller={controller}>
      <div>
        <Consumer>{state => <div>{state.message}</div>}</Consumer>
        <Consumer>{state => <div>{state.message}</div>}</Consumer>
        <Consumer>{state => <div>{state.message}</div>}</Consumer>
      </div>
    </Provider>
  );

  let actual = wrapper.html();

  t.is(actual, expected);

  expected = shallow(
    <div>
      <div>A new message</div>
      <div>A new message</div>
      <div>A new message</div>
    </div>
  ).html();

  controller.updateMessage();
  actual = wrapper.html();
  t.is(actual, expected);
});

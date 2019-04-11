import test from 'ava';

import { configure, shallow, mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

import React from 'react';
import controller from 'rinter';

import './setup-virtualdom';
import { Subscription } from '.';

configure({ adapter: new Adapter() });

const createController = controller({
  initialState: { message: 'It Worked!' },
  mutators: {
    updateMessage: () => ({ message: 'A new message' }),
  },
});

test('react to controller changes', t => {
  const controller = createController();
  const wrapper = shallow(
    <Subscription source={controller}>
      {state => <div>{state.message}</div>}
    </Subscription>
  );
  let expected = shallow(<div>It Worked!</div>).html();
  let actual = wrapper.html();
  t.is(actual, expected);

  controller.updateMessage();

  expected = shallow(<div>A new message</div>).html();
  actual = wrapper.html();
  t.is(actual, expected);
});

test('unsubscribe during unmount', t => {
  const controller = createController();
  const wrapper = mount(
    <Subscription source={controller}>
      {state => <div>{state.message}</div>}
    </Subscription>
  );
  t.is('<div>It Worked!</div>', wrapper.html());

  wrapper.unmount();

  controller.updateMessage();
  wrapper.mount();
  t.is('<div>A new message</div>', wrapper.html());
});

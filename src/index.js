import React from 'react';
import PropTypes from 'prop-types';

import { createSubscription } from 'create-subscription';

const Context = React.createContext();

const ControllerSubscription = createSubscription({
  getCurrentValue: controller => controller.state,
  subscribe: (controller, callback) => {
    const subscription = controller.changes.subscribe(callback);
    return () => subscription.unsubscribe();
  },
});

export const Provider = ({ controller, children }) => (
  <Context.Provider value={controller}>{children}</Context.Provider>
);

Provider.propTypes = {
  controller: PropTypes.shape({
    state: PropTypes.any,
    changes: PropTypes.shape({
      subscribe: PropTypes.func,
    }),
  }),
  children: PropTypes.node,
};

export const Consumer = ({ children }) => (
  <Context.Consumer>
    {controller => (
      <ControllerSubscription source={controller}>
        {state => children(state, controller)}
      </ControllerSubscription>
    )}
  </Context.Consumer>
);

Consumer.propTypes = {
  children: PropTypes.func,
};

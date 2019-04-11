import React from 'react';
import { createSubscription } from 'create-subscription';

import { controllerPropType, childrenPropType } from './proptypes';

const ControllerSubscription = createSubscription({
  getCurrentValue: controller => controller.state,
  subscribe: (controller, callback) => {
    const subscription = controller.changes.subscribe(callback);
    return () => subscription.unsubscribe();
  },
});

const Subscription = ({ source, children }) => (
  <ControllerSubscription source={source}>
    {state => children(state, source)}
  </ControllerSubscription>
);

Subscription.propTypes = {
  source: controllerPropType,
  children: childrenPropType,
};

export default Subscription;

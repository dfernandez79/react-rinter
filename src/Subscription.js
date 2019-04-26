import React from 'react';
import { createSubscription } from 'create-subscription';

import {
  controllerPropType,
  childrenPropType,
  pipePropType,
} from './proptypes';

const ControllerSubscription = createSubscription({
  getCurrentValue: ({ controller }) => controller.state,
  subscribe: ({ controller, pipeChanges }, callback) => {
    const changes = Array.isArray(pipeChanges)
      ? controller.changes.pipe(...pipeChanges)
      : controller.changes;
    const subscription = changes.subscribe(callback);
    return () => subscription.unsubscribe();
  },
});

const Subscription = ({ source, pipeChanges, children }) => (
  <ControllerSubscription source={{ controller: source, pipeChanges }}>
    {state => children(state, source)}
  </ControllerSubscription>
);

Subscription.propTypes = {
  source: controllerPropType,
  pipeChanges: pipePropType,
  children: childrenPropType,
};

export default Subscription;

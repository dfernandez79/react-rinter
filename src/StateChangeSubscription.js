import React from 'react';
import PropTypes from 'prop-types';
import { createSubscription } from 'create-subscription';
import { map } from 'rxjs/operators';

const Subscription = createSubscription({
  getCurrentValue: ({ controller, mapState }) => mapState(controller.state),
  subscribe: ({ controller, mapState }, callback) => {
    const changes = controller.changes.pipe(map(mapState));
    const subscription = changes.subscribe(callback);
    return () => subscription.unsubscribe();
  },
});

const StateChangeSubscription = ({ source, mapState, children }) => (
  <Subscription source={{ controller: source, mapState }}>
    {children}
  </Subscription>
);

StateChangeSubscription.propTypes = {
  source: PropTypes.shape({
    state: PropTypes.any,
    changes: PropTypes.shape({
      subscribe: PropTypes.func,
      pipe: PropTypes.func,
    }),
  }).isRequired,
  mapState: PropTypes.func,
  children: PropTypes.func.isRequired,
};

StateChangeSubscription.defaultProps = {
  mapState: state => state,
};

export default StateChangeSubscription;

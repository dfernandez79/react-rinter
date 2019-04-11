import PropTypes from 'prop-types';

export const controllerPropType = PropTypes.shape({
  state: PropTypes.any,
  changes: PropTypes.shape({
    subscribe: PropTypes.func,
  }),
});

export const childrenPropType = PropTypes.func.isRequired;

import React from 'react';
import PropTypes from 'prop-types';

import { controllerPropType, childrenPropType } from './proptypes';
import Subscription from './Subscription';

import { share } from 'rinter';

const Context = React.createContext();

export const Provider = ({ controller, children }) => (
  <Context.Provider value={share(controller)}>{children}</Context.Provider>
);

Provider.propTypes = {
  controller: controllerPropType,
  children: PropTypes.node,
};

export const Consumer = ({ children }) => (
  <Context.Consumer>
    {controller => <Subscription source={controller}>{children}</Subscription>}
  </Context.Consumer>
);

Consumer.propTypes = {
  children: childrenPropType,
};

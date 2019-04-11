import React from 'react';
import { Status } from './controller';
import { Consumer } from '../../src';

const ErrorMessage = () => (
  <Consumer>
    {({ status, error }) =>
      status === Status.ERROR ? <div>{error}</div> : null
    }
  </Consumer>
);

export default ErrorMessage;

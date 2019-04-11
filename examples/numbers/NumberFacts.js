import React from 'react';
import { Status } from './controller';
import { Consumer } from '../../src';

const NumberFacts = () => (
  <Consumer>
    {({ status, number, text }, controller) => (
      <div>
        <div>{number}</div>
        <div>{text}</div>
        <div>
          <button
            onClick={controller.refresh}
            disabled={status === Status.LOADING}
          >
            Refresh
          </button>
        </div>
      </div>
    )}
  </Consumer>
);

export default NumberFacts;

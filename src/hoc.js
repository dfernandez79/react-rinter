import React, { useMemo } from 'react';
import ControllerContext from './ControllerContext';
import { StateChangeSubscription } from '.';

function getDisplayName(WrappedComponent) {
  return WrappedComponent.displayName || WrappedComponent.name || 'Component';
}

function defaultMapControllerToProps(controller) {
  return { controller };
}

function defaultMapStateToProps(state) {
  return { state };
}

export function withController(
  mapControllerToProps = defaultMapControllerToProps
) {
  return WrappedComponent => {
    const NewComponent = props => (
      <ControllerContext.Consumer>
        {controller => (
          <WrappedComponent
            {...mapControllerToProps(controller, props)}
            {...props}
          />
        )}
      </ControllerContext.Consumer>
    );

    NewComponent.displayName = `WithController(${getDisplayName(
      WrappedComponent
    )})`;

    return NewComponent;
  };
}

export function connect(
  mapStateToProps = defaultMapStateToProps,
  mapControllerToProps = defaultMapControllerToProps
) {
  return WrappedComponent => {
    const NewComponent = props => {
      const mapState = useMemo(state => mapStateToProps(state, props), [props]);

      return (
        <ControllerContext.Consumer>
          {controller => (
            <StateChangeSubscription source={controller} mapState={mapState}>
              {mappedState => (
                <WrappedComponent
                  {...mappedState}
                  {...mapControllerToProps(controller, props)}
                  {...props}
                />
              )}
            </StateChangeSubscription>
          )}
        </ControllerContext.Consumer>
      );
    };

    NewComponent.displayName = `Connect(${getDisplayName(WrappedComponent)})`;

    return NewComponent;
  };
}

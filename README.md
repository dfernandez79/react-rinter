# React Rinter

A React context for subscribing to [Rinter]'s Controller changes.

This package uses React's [create-subscription]. It exports a `Provider` and a
`Consumer` to detect controller changes (see [React Context API]).

## Usage

1. Add a `Provider` object to rendering tree, and pass the controller to it
   (usually done in the application root).
2. Access to the controller state using a `Consumer`. Note that the `Consumer`
   `children` is not a React element but a function that receives the current
   state and the controller (see [Render Prop]).

```js
import { Provider, Consumer } from 'react-rinter';

// myController is a Rinter controller object

<Provider controller={myController}>
  <Consumer>
    {(state, controller) => <div>{/* Do something to display state */}</div>}
  </Consumer>
</Provider>;
```

[rinter]: https://github.com/dfernandez79/rinter
[create-subscription]:
  https://github.com/facebook/react/tree/master/packages/create-subscription
[react context api]: https://reactjs.org/docs/context.html#reactcreatecontext
[render prop]: https://reactjs.org/docs/render-props.html

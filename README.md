# React Rinter

This package exports React components to do unicast or multicast subscriptions
to a [Rinter]'s Controller changes.

## Usage

### Single Consumer (unicast)

Add a `Subscription` element to the rendering tree, and pass the controller to
it (usually done in the application root).

The `children` property is not a React element but a function that receives the
current state and the controller (see [Render Prop]):

```js
import { Subscription } from 'react-rinter';

// myController is a Rinter controller object

<Subscription controller={myController}>
  {(state, controller) => <div>{/* Do something to display state */}</div>}
</Subscription>;
```

### Multiple Consumers (multicast)

## License

MIT

[rinter]: https://github.com/dfernandez79/rinter
[create-subscription]:
  https://github.com/facebook/react/tree/master/packages/create-subscription
[react context api]: https://reactjs.org/docs/context.html#reactcreatecontext
[render prop]: https://reactjs.org/docs/render-props.html

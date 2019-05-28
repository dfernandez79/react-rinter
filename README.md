# React Rinter

Components and hooks to use [Rinter] with React.

## Usage

- **Create the controller** that you'll like to use in your app.
- Optionally **use `ControllerContext`** (a [React Context]) to provide or
  consume the controller.
- **Subscribe to changes** using `StateChangeSubscription`.

### Create the controller

```js
import controller from 'rinter';

const createController = controller({
  initialState: [],
  mutators: {
    add: (state, text) => [...state, { text }],
  },
});

const todoList = createController();
```

### Use `ControllerContext``

```js
import { ControllerContext } from 'react-rinter';

const App = () => (
  <ControllerContext.Provider value={todoList}>
    <TodoListApp />
  </ControllerContext.Provider>
);
```

```js
import { ControllerContext } from 'react-rinter';

const MyComponent = () => (
  <ControllerContext.Consumer>
    {controller => <InnerComponent controller={controller} />}
  </ControllerContext.Consumer>
);
```

### Subscribe to changes

### Multiple Consumers (multicast)

```js
import { Provider, Consumer } from 'rinter';

// myController is a Rinter controller object

<Provider controller={controller}>
  <div>
    <Consumer>
      {state => <div>{/* Do something to display state */}</div>}
    </Consumer>
    <Consumer>
      {state => <div>{/* Do something to display state */}</div>}
    </Consumer>
    <Consumer>
      {state => <div>{/* Do something to display state */}</div>}
    </Consumer>
  </div>
</Provider>;
```

## License

MIT

[rinter]: https://github.com/dfernandez79/rinter
[create-subscription]:
  https://github.com/facebook/react/tree/master/packages/create-subscription
[react context api]: https://reactjs.org/docs/context.html#reactcreatecontext
[render prop]: https://reactjs.org/docs/render-props.html

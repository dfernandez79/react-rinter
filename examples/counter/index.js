import { AbstractController } from 'rinter';

export default class CounterController extends AbstractController {
  constructor(initialValue = { count: 0 }) {
    super(initialValue);
  }

  increment() {
    this._setState({ count: this.state.count + 1 });
  }

  decrement() {
    this._setState({ count: this.state.count - 1 });
  }
}

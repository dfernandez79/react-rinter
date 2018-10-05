import { AbstractController } from 'rinter';
import { maxBy, isNumber } from 'lodash';

const nextId = list => {
  const maxIdItem = maxBy(list, 'id');
  return maxIdItem !== undefined && isNumber(maxIdItem.id)
    ? maxIdItem.id + 1
    : 1;
};

export default class TodoController extends AbstractController {
  constructor(initialValue = { draft: '', list: [] }) {
    super(initialValue);
  }

  changeDraft(text) {
    this._setState({ draft: text });
  }

  add(text) {
    this._setState({
      list: [...this.state.list, { id: nextId(this.state.list), text }],
    });
  }

  remove(id) {
    this._setState({
      list: this.state.list.filter(todo => todo.id !== id),
    });
  }
}

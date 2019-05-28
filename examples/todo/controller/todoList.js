import { controller } from 'rinter';

let lastId = 1;
function nextId() {
  lastId = lastId + 1;
  return lastId;
}

const create = text => ({ id: nextId(), text, completed: false });
const toggle = ({ completed, ...rest }) => ({ ...rest, completed: !completed });

export default controller({
  initialState: [],

  mutators: {
    add: (state, text) => [...state, create(text)],
    toggle: (state, id) =>
      state.map(todo => (todo.id === id ? toggle(todo) : todo)),
  },
});

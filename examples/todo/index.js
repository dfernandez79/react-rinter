import { maxBy, isNumber } from 'lodash';
import { controller } from 'rinter';

const nextId = list => {
  const maxIdItem = maxBy(list, 'id');
  return maxIdItem !== undefined && isNumber(maxIdItem.id)
    ? maxIdItem.id + 1
    : 1;
};

export default controller({
  initialState: { draft: '', list: [] },
  mutators: {
    changeDraft: (state, text) => ({ ...state, draft: text }),

    add: (state, text) => ({
      ...state,
      list: [...state.list, { id: nextId(state.list), text }],
    }),

    remove: (state, id) => ({
      ...state,
      list: state.list.filter(todo => todo.id !== id),
    }),
  },
});

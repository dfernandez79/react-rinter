import { controller } from 'rinter';

export const SHOW = {
  ALL: 'SHOW_ALL',
  COMPLETED: 'SHOW_COMPLETED',
  ACTIVE: 'SHOW_ACTIVE',
};

export default controller({
  initialState: 'SHOW_ALL',
  mutators: {
    set: (state, newState) => newState,
  },
});

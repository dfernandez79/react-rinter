import { compose } from 'rinter';

import todoList from './todoList';
import visibilityFilter from './visbilityFilter';

export default compose({
  list: todoList,
  filter: visibilityFilter,
});

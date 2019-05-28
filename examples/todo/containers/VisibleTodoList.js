import { connect } from '../../../src';
import TodoList from '../components/TodoList';

const getVisibleTodos = (todos, filter) => {
  switch (filter) {
    case 'SHOW_ALL':
      return todos;
    case 'SHOW_COMPLETED':
      return todos.filter(t => t.completed);
    case 'SHOW_ACTIVE':
      return todos.filter(t => !t.completed);
    default:
      throw new Error('Unknown filter: ' + filter);
  }
};

const mapStateToProps = ({ list, filter }) => ({
  todos: getVisibleTodos(list, filter),
});

const mapControllerToProps = controller => ({
  onTodoClick: controller.list.toggle,
});

const VisibleTodoList = connect(
  mapStateToProps,
  mapControllerToProps
)(TodoList);

export default VisibleTodoList;

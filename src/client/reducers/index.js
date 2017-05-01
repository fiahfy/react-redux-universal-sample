import * as ActionTypes from '../actions';

function todos(state = [], action) {
  switch (action.type) {
    case ActionTypes.RECEIVE_TODOS: {
      return action.todos;
    }
    case ActionTypes.CREATE_TODO: {
      const { todo } = action;
      return state.concat(todo);
    }
    case ActionTypes.DELETE_TODO: {
      const { todo } = action;
      return state.filter(item => item.id !== todo.id);
    }
    default:
      return state;
  }
}

export default {
  todos,
};

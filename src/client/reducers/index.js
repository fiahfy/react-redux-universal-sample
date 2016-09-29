import * as ActionTypes from '../actions'

function todos(state = [], action) {
  switch (action.type) {
    case ActionTypes.RECEIVE_TODOS: {
      const { todos } = action
      state = todos
      return state
    }
    case ActionTypes.CREATE_TODO: {
      const { todo } = action
      return state.concat(todo)
    }
    case ActionTypes.DELETE_TODO: {
      const { todo } = action
      state = state.filter(item => item.id !== todo.id)
      return state
    }
    default:
      return state
  }
}

export default {
  todos,
}

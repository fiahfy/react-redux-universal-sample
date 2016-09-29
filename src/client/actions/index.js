import fetch from 'isomorphic-fetch'
import ExecutionEnvironment from 'fbjs/lib/ExecutionEnvironment'

export const RECEIVE_TODOS = 'RECEIVE_TODOS'
export const CREATE_TODO = 'CREATE_TODO'
export const DELETE_TODO = 'DELETE_TODO'

let apiBaseURL = ''
if (!ExecutionEnvironment.canUseDOM) {
  apiBaseURL = 'http://localhost:3000'
}

export function fetchTodos() {
  return dispatch =>
    fetch(`${apiBaseURL}/api/todos/`)
      .then(response => response.json())
      .then(json => dispatch({
        type: RECEIVE_TODOS,
        todos: json,
      }))
}

export function createTodo(todo) {
  return (dispatch) => {
    dispatch({
      type: CREATE_TODO,
      todo,
    })
    return fetch(`${apiBaseURL}/api/todos/`, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(todo),
    })
      .then(() => fetch(`${apiBaseURL}/api/todos/`))
      .then(response => response.json())
      .then(json => dispatch({
        type: RECEIVE_TODOS,
        todos: json,
      }))
  }
}

export function deleteTodo(todo) {
  return (dispatch) => {
    dispatch({
      type: DELETE_TODO,
      todo,
    })
    return fetch(`${apiBaseURL}/api/todos/${todo.id}/`, {
      method: 'DELETE',
    })
      .then(() => fetch(`${apiBaseURL}/api/todos/`))
      .then(response => response.json())
      .then(json => dispatch({
        type: RECEIVE_TODOS,
        todos: json,
      }))
  }
}

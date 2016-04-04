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
  return dispatch => {
    return fetch(`${apiBaseURL}/api/todos/?__method=GET`)
      .then(response => response.json())
      .then(json => dispatch({
        type:  RECEIVE_TODOS,
        todos: json
      }))
  }
}

export function createTodo(todo) {
  return dispatch => {
    dispatch({
      type: CREATE_TODO,
      todo: todo
    })
    return fetch(`${apiBaseURL}/api/todos/?__method=POST&text=${todo.text}`)
      .then(() => fetch(`${apiBaseURL}/api/todos/?__method=GET`))
      .then(response => response.json())
      .then(json => dispatch({
        type:  RECEIVE_TODOS,
        todos: json
      }))
  }
}

export function deleteTodo(todo) {
  return dispatch => {
    dispatch({
      type: DELETE_TODO,
      todo: todo
    })
    return fetch(`${apiBaseURL}/api/todos/?__method=DELETE&id=${todo.id}`)
      .then(() => fetch(`${apiBaseURL}/api/todos/?__method=GET`))
      .then(response => response.json())
      .then(json => dispatch({
        type:  RECEIVE_TODOS,
        todos: json
      }))
  }
}

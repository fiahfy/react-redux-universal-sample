import 'babel-polyfill'
import React from 'react'
import ReactDOM from 'react-dom'
import Root from './client/containers/root'
import {configureStore} from './client/store'
import history from './client/history'

let initialState
try {
  initialState = window.__initialState
} catch (e) {
  initialState = {}
}
const store = configureStore(history, initialState)

ReactDOM.render(
  <Root store={store} />,
  document.querySelector('#app')
)

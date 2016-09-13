import 'babel-polyfill'
import React from 'react'
import ReactDOM from 'react-dom'
import {syncHistoryWithStore} from 'react-router-redux'
import Root from './client/containers/root'
import {configureStore} from './client/store'
import baseHistory from './client/history'

let initialState
try {
  initialState = window.__initialState
} catch (e) {
  initialState = {}
}
const store = configureStore(baseHistory, initialState)
const history = syncHistoryWithStore(baseHistory, store)

ReactDOM.render(
  <Root store={store} history={history} />,
  document.querySelector('#app')
)

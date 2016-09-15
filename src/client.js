import 'babel-polyfill'
import React from 'react'
import ReactDOM from 'react-dom'
import {syncHistoryWithStore} from 'react-router-redux'
import Root from './client/containers/root'
import {configureStore} from './client/store'
import baseHistory from './client/history'

// Needed for onTouchTap
// http://stackoverflow.com/a/34015469/988941
import injectTapEventPlugin from 'react-tap-event-plugin';
injectTapEventPlugin();

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

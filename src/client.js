import 'babel-polyfill';
import React from 'react';
import ReactDOM from 'react-dom';
import { syncHistoryWithStore } from 'react-router-redux';
import injectTapEventPlugin from 'react-tap-event-plugin';
import Root from './client/containers/root';
import configureStore from './client/store';
import baseHistory from './client/history';

// Needed for onTouchTap
// http://stackoverflow.com/a/34015469/988941
injectTapEventPlugin();

let initialState;
try {
  initialState = window.__initialState; // eslint-disable-line no-undef, no-underscore-dangle
} catch (e) {
  initialState = {};
}
const store = configureStore(baseHistory, initialState);
const history = syncHistoryWithStore(baseHistory, store);

ReactDOM.render(
  <Root store={store} history={history} />, // eslint-disable-line react/jsx-filename-extension
  document.querySelector('#app'), // eslint-disable-line no-undef
);

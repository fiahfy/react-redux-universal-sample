import 'babel-polyfill';
import React from 'react';
import { render } from 'react-dom';
import { AppContainer } from 'react-hot-loader';
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

/* eslint-disable react/jsx-filename-extension, no-undef */
function renderApp(RootComponent) {
  render(
    <AppContainer>
      <RootComponent store={store} history={history} />
    </AppContainer>,
    document.querySelector('#app'),
  );
}
/* eslint-enable react/jsx-filename-extension, no-undef */

renderApp(Root);
if (module.hot) {
  module.hot.accept('./client/containers/root', () => {
    const nextRoot = require('./client/containers/root').default // eslint-disable-line
    renderApp(nextRoot);
  });
}

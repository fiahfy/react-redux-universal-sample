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
// @see http://stackoverflow.com/a/34015469/988941
injectTapEventPlugin();

let initialState;
try {
  initialState = window.__initialState; // eslint-disable-line no-undef, no-underscore-dangle
} catch (e) {
  initialState = {};
}
const store = configureStore(baseHistory, initialState);
const history = syncHistoryWithStore(baseHistory, store);

function renderApp(RootComponent) {
  render(
    /* eslint-disable react/jsx-filename-extension */
    <AppContainer>
      <RootComponent store={store} history={history} />
    </AppContainer>,
    /* eslint-enable react/jsx-filename-extension */
    document.querySelector('#app'), // eslint-disable-line no-undef
  );
}

renderApp(Root);
if (module.hot) {
  module.hot.accept('./client/containers/root', () => {
    const nextRoot = require('./client/containers/root').default; // eslint-disable-line global-require
    renderApp(nextRoot);
  });
}

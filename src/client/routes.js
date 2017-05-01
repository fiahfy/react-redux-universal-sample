import React from 'react';
import { Route, IndexRoute } from 'react-router';
import App from './containers/app';
import Main from './containers/main';

/* eslint-disable react/jsx-filename-extension */
export default (
  <Route path="/" component={App}>
    <IndexRoute component={Main} />
  </Route>
);
/* eslint-enable react/jsx-filename-extension */

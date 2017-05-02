import React from 'react';
import ReactDOMServer from 'react-dom/server';
import { match } from 'react-router';
import { syncHistoryWithStore } from 'react-router-redux';
import { loadOnServer } from 'redux-connect';
import serialize from 'serialize-javascript';
import baseHistory from '../../client/history';
import routes from '../../client/routes';
import configureStore from '../../client/store';
import Html from '../../client/containers/html';
import Root from '../../client/containers/root';

export default async function (ctx) {
  global.navigator = {
    userAgent: ctx.headers['user-agent'],
  };
  await new Promise((resolve) => {
    const store = configureStore(baseHistory);
    const history = syncHistoryWithStore(baseHistory, store);
    match(
      { history, routes, location: ctx.originalUrl },
      (error, redirectLocation, renderProps) => {
        if (error) {
          ctx.status = 500;
          ctx.body = error.message;
          resolve();
          return;
        } else if (redirectLocation) {
          ctx.redirect(redirectLocation.pathname + redirectLocation.search);
          resolve();
          return;
        } else if (!renderProps) {
          ctx.status = 404;
          ctx.body = 'Not found';
          resolve();
          return;
        }

        loadOnServer({ ...renderProps, store }).then(() => {
          try {
            const initialState = serialize(store.getState());
            /* eslint-disable react/jsx-filename-extension */
            const markup = ReactDOMServer.renderToString(
              <Root store={store} renderProps={renderProps} />,
            );

            ctx.body = `<!DOCTYPE html>${ReactDOMServer.renderToStaticMarkup(
              <Html markup={markup} initialState={initialState} />,
            )}`;
            /* eslint-enable react/jsx-filename-extension */
          } catch (e) {
            ctx.status = 500;
            ctx.body = e.stack;
            console.error(e.stack); // eslint-disable-line no-console
          }
          resolve();
        });
      },
    );
  });
}

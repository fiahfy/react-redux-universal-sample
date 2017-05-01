import { createStore, applyMiddleware, compose, combineReducers } from 'redux';
import { routerMiddleware, routerReducer } from 'react-router-redux';
import { reducer as reduxAsyncConnect } from 'redux-connect';
import thunk from 'redux-thunk';
import createLogger from 'redux-logger';
import ExecutionEnvironment from 'fbjs/lib/ExecutionEnvironment';
import reducers from './reducers';
import DevTools from './containers/dev-tools';

const voidMiddleware = () => next => (action) => {
  next(action);
};

export default function configureStore(history, initialState = {}) {
  let reduxLoggerMiddleware = voidMiddleware;
  if (ExecutionEnvironment.canUseDOM) {
    reduxLoggerMiddleware = createLogger();
  }

  const reduxRouterMiddleware = routerMiddleware(history);

  const finalCreateStore = compose(
    applyMiddleware(thunk),
    applyMiddleware(reduxRouterMiddleware),
    applyMiddleware(reduxLoggerMiddleware),
    DevTools.instrument(),
  )(createStore);

  const store = finalCreateStore(combineReducers({
    routing: routerReducer,
    reduxAsyncConnect,
    ...reducers,
  }), initialState);


  if (module.hot) {
    module.hot.accept('./reducers', () => {
      const nextRootReducer = require('./reducers').default // eslint-disable-line
      store.replaceReducer(nextRootReducer);
    });
  }

  return store;
}

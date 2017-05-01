import React, { Component, PropTypes } from 'react';
import { Provider } from 'react-redux';
import { applyRouterMiddleware, Router } from 'react-router';
import { useScroll } from 'react-router-scroll';
import { ReduxAsyncConnect } from 'redux-connect';
import { MuiThemeProvider } from 'material-ui';
import routes from '../routes';

export default class Root extends Component {
  /* eslint-disable react/forbid-prop-types */
  static propTypes = {
    store: PropTypes.object.isRequired,
    history: PropTypes.object,
    renderProps: PropTypes.object,
  };
  /* eslint-enable */
  static defaultProps = {
    renderProps: null,
  }
  render() {
    const { store, history, renderProps } = this.props;

    let component;

    if (renderProps) {
      component = (
        <div>
          <ReduxAsyncConnect {...renderProps} />
        </div>
      );
    } else {
      const render = props => <ReduxAsyncConnect
        {...props}
        filter={item => !item.deferred}
        render={applyRouterMiddleware(useScroll())}
      />;

      component = (
        <div>
          <Router
            render={render}
            history={history}
            routes={routes}
          />
        </div>
      );
    }

    return (
      <Provider store={store} key="provider">
        <MuiThemeProvider>
          {component}
        </MuiThemeProvider>
      </Provider>
    );
  }
}

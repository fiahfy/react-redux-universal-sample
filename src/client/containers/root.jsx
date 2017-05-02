import React, { Component } from 'react';
import PropTypes from 'prop-types';
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
  /* eslint-enable react/forbid-prop-types */
  static defaultProps = {
    history: null,
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

      // @see https://github.com/ReactTraining/react-router/issues/2704#issuecomment-261310093
      if (!this.routes) {
        this.routes = routes;
      }

      component = (
        <div>
          <Router
            render={render}
            history={history}
            routes={this.routes}
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

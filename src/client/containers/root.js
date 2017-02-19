import React, { Component, PropTypes } from 'react'
import { Provider } from 'react-redux'
import { applyRouterMiddleware, Router } from 'react-router'
import { useScroll } from 'react-router-scroll'
import { ReduxAsyncConnect } from 'redux-connect'
import { MuiThemeProvider } from 'material-ui'
import routes from '../routes'

export default class Root extends Component {
  static propTypes = {
    store: PropTypes.object.isRequired,
    history: PropTypes.object.isRequired,
    renderProps: PropTypes.object,
  };
  static defaultProps = {
    renderProps: null,
  }
  render() {
    const { store, history, renderProps } = this.props

    let component

    if (renderProps) {
      component = (
        <div>
          <ReduxAsyncConnect {...renderProps} />
        </div>
      )
    } else {
      const render = props => <ReduxAsyncConnect
        {...props}
        filter={item => !item.deferred}
        render={applyRouterMiddleware(useScroll())}
      />

      component = (
        <div>
          <Router
            render={render}
            history={history}
          >
            {routes}
          </Router>
        </div>
      )
    }

    return (
      <Provider store={store} key="provider">
        <MuiThemeProvider>
          {component}
        </MuiThemeProvider>
      </Provider>
    )
  }
}

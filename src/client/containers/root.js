import React, {Component, PropTypes} from 'react'
import {Router} from 'react-router'
import {Provider} from 'react-redux'
import {ReduxAsyncConnect} from 'redux-connect'
import {MuiThemeProvider} from 'material-ui'

import DevTools from './dev-tools'
import routes from '../routes'

export default class Root extends Component {
  static propTypes = {
    store:       PropTypes.object.isRequired,
    history:     PropTypes.object,
    renderProps: PropTypes.object
  };
  render() {
    const {store, history, renderProps} = this.props

    const hasDevTools = false
    const devTools = hasDevTools ? <DevTools /> : null

    let component = (
      <div>
        <Router render={(props) =>
          <ReduxAsyncConnect {...props} filter={item => !item.deferred} />
        } history={history}>
          {routes}
        </Router>
        {devTools}
      </div>
    )
    if (renderProps) {
      component = (
        <div>
          <ReduxAsyncConnect {...renderProps} />
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

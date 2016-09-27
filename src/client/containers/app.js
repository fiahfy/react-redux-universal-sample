import React, { Component, PropTypes } from 'react'
import { AppBar } from 'material-ui'

export default class App extends Component {
  static propTypes = {
    children: PropTypes.object,
  };
  render() {
    return (
      <div>
        <AppBar
          title="React Redux Universal Sample"
          showMenuIconButton={false}
        />
        {this.props.children}
      </div>
    )
  }
}

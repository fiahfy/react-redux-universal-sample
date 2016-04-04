import React, {Component} from 'react'
import {AppBar} from 'material-ui'

export default class App extends Component {
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

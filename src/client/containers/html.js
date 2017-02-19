import React, { Component, PropTypes } from 'react'
import Helmet from 'react-helmet'

export default class Html extends Component {
  static propTypes = {
    markup: PropTypes.string.isRequired,
    initialState: PropTypes.string.isRequired,
  };
  render() {
    const { markup, initialState } = this.props

    const head = Helmet.rewind()

    /* eslint-disable react/no-danger */
    return (
      <html lang="en">
        <head>
          {head.base.toComponent()}
          {head.title.toComponent()}
          {head.meta.toComponent()}
          {head.link.toComponent()}
          {head.script.toComponent()}
          <meta charSet="utf-8" />
          <meta name="viewport" content="width=device-width,user-scalable=0,initial-scale=1" />
          <script src="/assets/js/bundle.js" defer />
        </head>
        <body>
          <div id="app" dangerouslySetInnerHTML={{ __html: markup }} />
          <script dangerouslySetInnerHTML={{ __html: `window.__initialState=${initialState}` }} />
        </body>
      </html>
    )
    /* eslint-enable */
  }
}

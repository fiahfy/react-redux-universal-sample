import webpack from 'webpack'
import clientConfig from './webpack.config.client.babel'

const config = {
  entry: [clientConfig.entry].concat([
    'webpack-dev-server/client?http://localhost:8080',
    'webpack/hot/dev-server'
  ]),
  plugins: [].concat([
    new webpack.HotModuleReplacementPlugin()
  ]),
  devServer: {
    proxy: [{
      path: '/',
      target: 'http://localhost:3000',
      secure: false
    }]
  }
}

export default Object.assign({}, clientConfig, config)

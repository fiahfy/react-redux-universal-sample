import webpack from 'webpack'
import serverConfig from './webpack.config.server.babel'

const config = {
  entry: [serverConfig.entry].concat([
    'webpack/hot/poll?1000'
  ]),
  plugins: [].concat([
    new webpack.HotModuleReplacementPlugin()
  ])
}

export default Object.assign({}, serverConfig, config)

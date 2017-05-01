import webpack from 'webpack'
import config from './webpack.config.server.babel'

export default {
  ...config,
  entry: [
    'webpack/hot/poll?1000',
    config.entry,
  ],
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
  ],
}

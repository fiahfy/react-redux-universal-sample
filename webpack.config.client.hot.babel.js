import webpack from 'webpack'
import clientConfig from './webpack.config.client.babel'

export default {
  ...clientConfig,
  entry: [
    'react-hot-loader/patch',
    clientConfig.entry,
  ],
  output: {
    ...clientConfig.output,
    publicPath: 'http://localhost:8080/assets/',
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NamedModulesPlugin(),
  ],
  devServer: {
    port: 8080,
    inline: true,
    hot: true,
    proxy: [{
      path: '/',
      target: 'http://localhost:3000',
      secure: false,
    }],
  },
}

// const config = {
//   entry: [clientConfig.entry].concat([
//     'webpack-dev-server/client?http://localhost:8080',
//     'webpack/hot/dev-server'
//   ]),
//   plugins: [].concat([
//     new webpack.HotModuleReplacementPlugin()
//   ]),
//   devServer: {
//     proxy: [{
//       path: '/',
//       target: 'http://localhost:3000',
//       secure: false
//     }]
//   }
// }
//
// export default Object.assign({}, clientConfig, config)

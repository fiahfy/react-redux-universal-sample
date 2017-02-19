import baseConfig from './webpack.config.base.babel'

const config = {
  target: 'web',
  entry: './src/client.js',
  output: {
    path: __dirname + '/public/assets/',
    publicPath: '/assets/',
    filename: 'js/bundle.js',
  },
}

export default Object.assign({}, baseConfig, config)

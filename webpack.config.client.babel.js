import config from './webpack.config.base.babel'

export default {
  ...config,
  target: 'web',
  entry: './client.js',
  output: {
    path: __dirname + '/public/assets/',
    publicPath: '/assets/',
    filename: 'js/bundle.js',
  },
}

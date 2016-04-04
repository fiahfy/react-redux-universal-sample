import baseConfig from './base.babel'

const config = {
  target: 'web',
  entry: './src/client.js',
  output: {
    path: './public/assets/',
    publicPath: '/assets/',
    filename: 'js/bundle.js'
  }
}

export default Object.assign({}, baseConfig, config)

import fs from 'fs'
import config from './webpack.config.base.babel'

const nodeModules = fs.readdirSync('node_modules')
  .filter(dir => dir !== '.bin')

export default {
  ...config,
  target: 'node',
  entry: './server.js',
  output: {
    path: __dirname + '/public/assets/',
    publicPath: '/assets/',
    filename: '../../bundle.js',
    libraryTarget: 'commonjs2',
  },
  externals: nodeModules,
}

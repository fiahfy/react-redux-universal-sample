import fs from 'fs'
import baseConfig from './webpack.config.base.babel'

const nodeModules = fs.readdirSync('node_modules')
  .filter(dir => dir !== '.bin')

const config = {
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

export default Object.assign({}, baseConfig, config)

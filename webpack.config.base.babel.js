export default {
  devtool: 'cheap-source-map',
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
        options: {
          plugins: ['transform-decorators-legacy'],
          presets: ['es2015', 'stage-0', 'react'],
        },
      },
    ],
  },
}
